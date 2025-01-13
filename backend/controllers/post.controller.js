import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import sharp from "sharp";
import { getReceiverSocketId, io } from "../socket/socket.js";

import puppeteer from 'puppeteer';



export const addNewPost = async (req, res) => {

    try {

        const { caption , products } = req.body;
        const coverImage = req.file;
        const authorId = req.id;

        if (!caption) return res.status(400).json({ message: 'caption required' });
        let coverImageUrl = '';

        if(coverImage){
            const optimizedImageBuffer = await sharp(coverImage.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

             // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        coverImageUrl = cloudResponse.secure_url;
        }
      

        const post = await Post.create({
            caption,
            products: products,
            coverImage: coverImageUrl,
            author: authorId,
            
        });

        const user = await User.findById(authorId);
        if (user) {
            user?.posts.push(post?._id);
            await user.save();
        }

        await post.populate({ path: 'author', select: '-password' });

        return res.status(201).json({
            message: 'New post added',
            post,
            success: true,
        });
        

    } catch (error) {
        console.log("Error : ", error);
        
    }

};


export const getAllPost  = async (req, res) => {
    try {

        const posts = await Post.find().sort({ createdAt: -1 })
                        .populate({ path: 'author', select: 'username profilePicture' })
                        .populate({
                            path: 'comments',
                            sort: { createdAt: -1 },
                            populate: {
                                path: 'author',
                                select: 'username profilePicture'
                            }
                        })
                     

                        return res.status(200).json({
                            posts,
                            success: true
                        })
        
    } catch (error) {
        console.log("Error in getAllPost ", error);
        
    }
};

export const getSinglePost = async (req, res) => {
    try {
      const { idOrSlug } = req.params;
  
      
      const singlepost = await Post.findOne({
        $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
      })
        .populate({ path: 'author', select: 'username profilePicture' })
        .populate({
          path: 'comments',
          sort: { createdAt: -1 },
          populate: {
            path: 'author',
            select: 'username profilePicture',
          },
        });
  
      if (!singlepost) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }
  
      return res.status(200).json({
        singlepost,
        success: true,
      });
    } catch (error) {
      console.log('Error in getSinglePost:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error while fetching post',
      });
    }
  };
  

export const getUserPost   = async (req, res) => {
    try {

        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'username profilePicture'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username profilePicture'
            }
        });
        

        return res.status(200).json({
            posts,
            success: true
        });
        
    } catch (error) {
        console.log("Error in getUserPost", error);
        
    }
};

export const likePost  = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id; 

        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
        await post.save();

        //Socket io implementation
        const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
         
        const postOwnerId = post?.author.toString();
        if(postOwnerId !== likeKrneWalaUserKiId){
            // emit a notification event
            const notification = {
                type:'like',
                userId:likeKrneWalaUserKiId,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);
        }

        return res.status(200).json({message:'Post liked', success:true});

        
    } catch (error) {
        console.log("Error in likePost ", error);
        
    }
};

export const dislikePost  = async (req, res) => {
    try {
     
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        // like logic started
        await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
        await post.save();

        
        // implement socket io for real time notification
        const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
        const postOwnerId = post?.author.toString();
        if(postOwnerId !== likeKrneWalaUserKiId){
            // emit a notification event
            const notification = {
                type:'dislike',
                userId:likeKrneWalaUserKiId,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);
        }
        

        return res.status(200).json({message:'Post disliked', success:true});


    } catch (error) {
        console.log("Error in dislikePost ", error);
        
    }
};


export const addComment  = async (req, res) => {
    try {

        const postId = req.params.id;
        const commentKrneWalaUserKiId = req.id;

        const {text} = req.body;

        const post = await Post.findById(postId);


        if(!text) return res.status(400).json({message:'text is required', success:false});


        const comment = await Comment.create({
            text,
            author:commentKrneWalaUserKiId,
            post:postId
        })

        await comment.populate({
            path:'author',
            select:"username profilePicture"
        });
        
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:'Comment Added',
            comment,
            success:true
        });
        
    } catch (error) {
        console.log("Error in addComment ", error);
        
    }
};

export const getCommentsOfPost   = async (req, res) => {
    try {

        const postId = req.params.id;
        const comments = await Comment.find({post:postId}).populate('author', 'username profilePicture');

        if(!comments) return res.status(404).json({message:'No comments found for this post', success:false});

        return res.status(200).json({success:true,comments});



        
    } catch (error) {
        console.log("Error in getCommentsOfPost  ", error);
        
    }
};

export const deletePost   = async (req, res) => {

    try {

        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Post not found', success:false});

         // check if the logged-in user is the owner of the post
        if(post.author.toString() !== authorId) return res.status(403).json({message:'Unauthorized'});

        // delete post
        await Post.findByIdAndDelete(postId);

        // remove the post id from the user's post
        let user = await User.findById(authorId);
        user.posts = user?.posts.filter(id => id.toString() !== postId);
        await user.save();

        // delete associated comments
        await Comment.deleteMany({post:postId});

        return res.status(200).json({
            success:true,
            message:'Post deleted'
        });
  
    } catch (error) {
        console.log("Error in deletePost  ", error);
        
    }
};

export const bookmarkPost    = async (req, res) => {
    
    try {

        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Post not found', success:false});

        const user = await User.findById(authorId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if(user?.bookmarks.includes(post?._id)){
            // already bookmarked -> remove from the bookmark


            await user.updateOne({$pull:{bookmarks:post?._id}});
            await user.save();
            return res.status(200).json({type:'unsaved', message:'Post removed from bookmark', success:true,bookmarks: user?.bookmarks.filter((id) => id.toString() !== postId)});




        }else{


            // bookmark krna pdega
            await user.updateOne({$addToSet:{bookmarks:post?._id}});
            await user.save();
            return res.status(200).json({type:'saved', message:'Post bookmarked', success:true,bookmarks:  [...user.bookmarks, post?._id]});


        }


        
    } catch (error) {
        console.log("Error in bookmarkPost   ", error);
        
    }
};

export const getProductDataAmazon = async (req,res) => {
    let browser;
    try {
        const { url } = req.body;

        if (!url || !url.includes('amazon')) {
            return res.status(400).json({ error: 'Invalid Amazon URL' });
          }

       

        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          );
          
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.waitForSelector('#productTitle', { timeout: 10000 });

          const title = await page.$eval('#productTitle', (el) => el.textContent.trim());
          const price = await page.$eval(
            '.a-price-whole',
            (el) => el.textContent.trim()
          ).catch(() => 'Price not available');
      
          const imageUrl = await page.$eval(
            '#landingImage',
            (el) => el.getAttribute('src')
          );
      
          res.json({ title, price, imageUrl });
          
          

    } catch (error) {
        console.log("Error in getProductData ", error);
        res.status(500).json({ error: 'Failed to scrape the Amazon product page' });
        
    }finally {
        if (browser) await browser.close();
      }
};

export const getProductDataFlipkart = async (req, res) => {
    let browser;
    try {

        const { url } = req.body;

        
        if (!url || !url.includes('flipkart')) {
            return res.status(400).json({ error: 'Invalid flipkart URL' });
          }

       

        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          );
          
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.waitForSelector('.VU-ZEz', { timeout: 10000 });

          const title = await page.$eval('.VU-ZEz', (el) => el.textContent.trim());
          const price = await page.$eval(
            'Nx9bqj CxhGGd',
            (el) => el.textContent.trim()
          ).catch(() => 'Price not available');
      
          const imageUrl = await page.$eval(
            '.gqcSqV YGE0gZ',
            (el) => el.getAttribute('src')
          ).catch(() => 'Image not available');
      
          res.json({ title, price , imageUrl });
        
          
        
    } catch (error) {
        console.log("Error in getProductData ", error);
        res.status(500).json({ error: 'Failed to scrape the Flipkart product page' });
        
    }
};

export const getProductDataMyntra = async (req, res) => {
    let browser;
    try {

        const { url } = req.body;

        
        if (!url || !url.includes('myntra')) {
            return res.status(400).json({ error: 'Invalid myntra URL' });
          }

       

        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          );
          
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.waitForSelector('.pdp-name', { timeout: 10000 });

          const title = await page.$eval('.pdp-name', (el) => el.textContent.trim());
          const price = await page.$eval(
            '.pdp-price',
            (el) => el.textContent.trim()
          ).catch(() => 'Price not available');
      
          const imageUrl = await page.$eval(
            '.img img-responsive img-loaded',
            (el) => el.getAttribute('src')
          ).catch(() => 'Image not available');
      
          res.json({ title, price , imageUrl });
        
          
        
    } catch (error) {
        console.log("Error in getProductData ", error);
        res.status(500).json({ error: 'Failed to scrape the Mytra product page' });
        
    }

};