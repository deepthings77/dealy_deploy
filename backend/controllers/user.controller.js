import {User} from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Post } from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { toast } from 'sonner';
import {sendEmailVerfication, sendWelcomeEmail} from '../middlewares/Email.js';
import admin from '../utils/firebase.js';

export const googleLogin = async (req, res) => {
    try {
        const { idToken  } = req.body;

        if (!idToken ) {
            return res.status(400).json({ success: false, message: "ID Token is required" });
        }
        // Verify Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name, picture, uid } = decodedToken;

        // Check if the user already exists in MongoDB
        let user = await User.findOne({ email });

        let updatedname = name.trim()+ Math.floor(1000 + Math.random() * 9000).toString();

        const hashedPassword = await bcrypt.hash(email, 10);

        if (!user) {
            // If the user does not exist, create a new one
            user = await User.create({
                username: updatedname || email.split("@")[0],

                email,
                password: hashedPassword,
                profilePicture: picture,
                firebaseUID: uid,
                isVerified: true, // Google accounts are considered verified
            });
        }

        // Generate a JWT for the user
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

        return res.status(201).cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json({
            success: true,
            message: `Welcome back ${user.username}`,
            user
        });
    } catch (error) {
        console.error("Error in googleLogin:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const register = async (req, res) => {

    try {
        const {username, email, password} = req.body;
        
        if (!username || !email || !password) {
            
            return res.status(401).json({
                message: "Username, email, and password are required. Please check!",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        const userbyUsername = await User.findOne({ username });

        if (user) {
            
            return res.status(401).json({
                message: "User already exists",
                success: false,
            });
        };
        if (userbyUsername) {
            
            return res.status(401).json({
                message: "Username already exists",
                success: false,
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        await User.create({
            username,
            email,
            password: hashedPassword,
            verificationCode, 
            verificationCodeExpires: Date.now() + 24*60 * 60 * 1000,
        });
        await  sendEmailVerfication(email, verificationCode);

     
        
        return res.status(201).json({
            message: "Account created successfully. Please verify your email.",
            success: true,
        });


    } catch (e) {
        console.log("Error in register", e);
        res.status(500).json({ message: "Internal server error", success: false });

    }
};

export const verifyEmail = async (req, res) => {
    try {
        const {code}=req.body 
        
        let user= await User.findOne({
            verificationCode:code,
            verificationCodeExpires:{$gt:Date.now()}
            
        })
        
        if (!user) {
            return res.status(400).json({success:false,message:"Inavlid or Expired Code"})
                
            }
          
     user.isVerified=true;
     user.verificationCode=undefined;
     user.verificationCodeExpires = undefined;
    
     await user.save()
     await sendWelcomeEmail(user.email,user.username)
     return res.status(200).json({success:true,message:"Email Verifed Successfully"})
    } catch (error) {
        console.log("Error in verifyEmail", error);
        res.status(500).json({ message: "Internal server error", success: false });

    }
};

export const login = async (req, res) => {

    try {

        const {email, password} = req.body;

        if (!email || !password) {
            
            return res.status(401).json({
                message: "Email and password are required. Please check!",
                success: false,
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
           
            return res.status(401).json({
                message: "User not found",
                success: false,
            });
        }
        
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Email not verified. Please verify your email before logging in.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
         
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        };

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

         // populate each post if in the posts array
         const populatedPosts = await Promise.all(
            user.posts.map( async (postId) => {
                const post = await Post.findById(postId);
                if(post?.author.equals(user?._id)){
                    return post;
                }
                return null;
            })
        )

        user = {
            _id: user?._id,
            username: user?.username,
            email: user?.email,
            profilePicture: user?.profilePicture,
            bio: user?.bio,
            followers: user?.followers,
            following: user?.following,
            posts: populatedPosts
        }

        

        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict',  maxAge: 7 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${user?.username}`,
            success: true,
            user
        });




    } catch (error) {
        toast.error("Error in login");  
        console.log("Error in login", error);
        res.status(500).json({ message: "Internal server error", success: false });

    }
};

export const logout = async (req, res) => {
    try {
        
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
        
    } catch (error) {
        
        console.log("Error in logout", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }   
};

export const getProfile  = async (req, res) => {

    try {

        const userId = req.params.id;
        let user = await User.findById(userId).populate({path:'posts', createdAt:-1}).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true
        });
        
    } catch (error) {

        console.log("Error in getProfile", error);
        
    }

};

export const editProfile  = async (req, res) => {
    try {

        const userId = req.id;
        const { bio, gender,username } = req.body;
        const profilePicture = req.file;

        let cloudResponse;

       

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            
            cloudResponse = await cloudinary.uploader.upload(fileUri);
            
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found. in editProfile',
                success: false
            });
        };

        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({
                    message: 'Username already exists. Please choose another.',
                    success: false,
                });
            }
            user.username = username;
        }



        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated successfully',
            success: true,
            user
        });




        
    } catch (error) {
        console.log("Error in editProfile ", error);
        return res.status(500).json({
            message: 'An error occurred while updating the profile.',
            success: false,
        });
    }
};

export const getSuggestedUsers = async (req, res) => {

    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        });

    } catch (error) {
        console.log("Error in getSuggestedUsers", error);
    }

};

export const followOrUnfollow  = async (req, res) => {

    try {

        const followKrneWala = req.id;
        const jiskoFollowKrunga  = req.params.id;

        if (followKrneWala === jiskoFollowKrunga) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(followKrneWala);
        const targetUser = await User.findById(jiskoFollowKrunga);

        if (!user || !targetUser) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        const isFollowing = user.following.includes(jiskoFollowKrunga);
        if(isFollowing){

            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        }else{

            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'followed successfully', success: true });

        }

        
    } catch (error) {
        console.log("Error in followOrUnfollow", error);
        
    }

};

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from query parameters
        if (!query) {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }

        // Perform a case-insensitive search in the database
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } }, // Search by username
                { name: { $regex: query, $options: 'i' } },     // Search by name
            ],
        }).select('username name profilePicture bio'); // Select only relevant fields to return

        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};