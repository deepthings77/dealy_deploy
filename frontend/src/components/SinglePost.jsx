import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'

import { toast } from 'sonner'

import { Badge } from './ui/badge'
import {Link} from 'react-router-dom';

import exampleImage from '../assets/logofordealy.png';


const SinglePost = () => {
  const { postId } = useParams(); // Extract ID or slug from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullText, setShowFullText] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleTextHandler = () => {
    setShowFullText((prev) => !prev);
  };

    
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${post?._id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };



  useEffect(() => {
    // Fetch single post data
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://dealy-deploy.vercel.app/api/v1/post/posts/${postId}`, { withCredentials: true }); // Backend endpoint
        

        if (res.data.success) {
          setPost(res.data.singlepost);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;

  return (
    post && (
      <div style={{
         background: "#131423"
        
      }} className="my-8 w-full max-w-lg mx-auto border border-gray-300 rounded-lg bg-gray-50 shadow-md p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.author?._id}`}>
              <Avatar>
                <AvatarImage
                  src={post.author?.profilePicture}
                  alt="post_image"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="font-semibold text-sm md:text-base text-white">
                {post.author?.username}
              </h1>
            </div>
          </div>
        </div>
  
        {/* Post Image */}
        {post.coverImage && (
    <img
        className='rounded-sm my-2 w-full aspect-square object-constain'
        src={post.coverImage}
        alt="post_img"
    />
)}
        {/* Product Carousel */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar p-2">
          {post.products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 md:w-64 p-4 bg-white border rounded-lg shadow-md"
            >
              <img
                src={exampleImage}
                alt={product.name}
                className="w-full h-28 md:h-32 object-cover rounded-md mb-2"
              />
              <h2 className="text-sm font-bold mb-1 truncate">{product}</h2>
              {/* <p className="text-sm text-gray-600 mb-1">Price: ₹500</p> */}
              <a
                href={product}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 underline"
              >
                Go to Product
              </a>
            </div>
          ))}
        </div>
  
        {/* Caption Section */}
        <p className="text-sm md:text-base mt-4">
          {/* <span className="font-medium mr-2 text-white">{post.author?.username}</span> */}
          <span
            className={`caption-text ${showFullText ? 'show-full' : '' } text-white`}
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: showFullText ? 'unset' : 2, // Truncate after 2 lines
            }}
          >
            {post.caption}
          </span>
          <span
            onClick={toggleTextHandler}
            className="text-gray-500 cursor-pointer"
          >
            {showFullText ? 'Show less' : 'Show more'}
          </span>
        </p>
  
        {/* Copy URL Section */}
        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/post/${postId}`}
            className="border rounded px-2 py-1 flex-1"
          />
          <button onClick={handleCopy} className="bg-custom-hover text-white px-4 py-1 rounded">
  {copied ? "Copied!" : "Copy URL"}
</button>
        </div>
      </div>
    )
  );
  
};

export default SinglePost;
