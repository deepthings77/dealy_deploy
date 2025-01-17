import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '../hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import axios from 'axios';


import exampleImage from '../assets/logofordealy.png';

import exImage from '../assets/logo.png';
const Profile = () => {

  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  
  useEffect(() => {
    
    if (userProfile) {
      setIsFollowing(userProfile.followers?.includes(user?._id) || false);
      setFollowersCount(userProfile.followers?.length || 0);
    }

  }, [userProfile, user]);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' 
  ? userProfile?.posts 
  : isLoggedInUserProfile 
    ? userProfile?.bookmarks 
    : [];

  const handleFollowUnfollow = async () => {
    try {

      
    
      const response = await axios.post(
        `https://dealy-deploy.vercel.app/api/v1/user/followorunfollow/${userId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`, 
          },
        }
      );

      if (response.data.success) {
        if (isFollowing) {
          setIsFollowing(false);
          setFollowersCount((prev) => prev - 1);
        } else {
          setIsFollowing(true);
          setFollowersCount((prev) => prev + 1); 
        }

      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
       // Revert optimistic update in case of error
    setIsFollowing(isFollowing);
    setFollowersCount((prev) => (isFollowing ? prev + 1 : prev - 1));
    }
  };

  return (
    <div
      style={{
        background: "#131423",
        minHeight: "100vh",
        marginLeft: "16%",
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "flex-start", 
      }}
      className="flex  max-w-full justify-center mx-auto px-4 sm:px-6 md:px-10 "
    >
      <div className="flex flex-col gap-10 md:gap-20 p-4 md:p-8 w-full">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          
          <section className="flex items-center justify-center">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 shadow-lg">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilephoto"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
  
          
          <section>
            <div className="flex flex-col gap-4 md:gap-5">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-lg font-semibold text-white">
                  {userProfile?.username}
                </span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="bg-custom-hover text-white shadow-md hover:bg-gray-200 h-8 px-4 text-sm"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleFollowUnfollow}
                      variant={isFollowing ? "secondary" : "default"}
                      className={`h-8 px-4 text-sm shadow-md ${
                        isFollowing
                          ? "bg-white text-gray-800"
                          : "bg-[#0095F6] text-white hover:bg-[#d40054]"
                      }`}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                    {isFollowing && (
                      <Button
                        variant="secondary"
                        className="h-8 px-4 text-sm bg-white text-gray-800 shadow-md"
                      >
                        Message
                      </Button>
                    )}
                  </>
                )}
              </div>
  
              <div className="flex items-center gap-4 text-sm text-white">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts?.length}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {followersCount}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following.length}
                  </span>{" "}
                  following
                </p>
              </div>
  
              <div className="flex flex-col gap-1 text-sm text-white">
                <span className="font-semibold">
                  {userProfile?.bio || "bio here..."}
                </span>
                <span>Powered by 
                  <img src={exImage} alt="logo" className="h-16 w-16 inline-block mx-1" />
                </span>
              </div>

            </div>
          </section>
        </div>
  
       
        <div className="border-t border-gray-200 pt-4">
         
          <div className="flex items-center justify-center gap-6 text-sm text-white">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold border-b-2 border-white" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>


            {isLoggedInUserProfile && (
              <span
                className={`py-3 cursor-pointer ${activeTab === "saved" ? "font-bold border-b-2 border-white" : ""}`}
                onClick={() => handleTabChange("saved")}
              >
                BOOKMARKS
              </span>
            )}


          </div>
  
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mx-10">
            {displayedPost?.map((post) => (
              <Link to={`/posts/${post?._id}`} key={post?._id}>
                <div className="relative group cursor-pointer">
                  <img
                    src={post.coverImage || exampleImage}
                    alt="postimage"
                    className="rounded-lg shadow-md my-2 w-full aspect-square object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                  <div className='text-white text-sm block truncate'>{post?.caption}</div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-white space-x-4">
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <Heart />
                        <span>{post?.likes.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <MessageCircle />
                        <span>{post?.comments.length}</span>
                        
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
