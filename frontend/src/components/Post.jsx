import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger , DialogTitle} from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '../Redux/postSlice'
import { Badge } from './ui/badge'
import {Link} from 'react-router-dom';
import exampleImage from '../assets/logofordealy.png';


import SharePopup from './SharePopUp';


const Post = ({ post }) => {

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { user , userProfile} = useSelector(store => store.auth);
    
    const [copied, setCopied] = useState(false);
    const { posts } = useSelector(store => store.post);
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes.length);
    const [comment, setComment] = useState(post.comments);
    const dispatch = useDispatch();

    const [showFullText, setShowFullText] = useState(false);
    const [bookmarked, setbookmarked] = useState(
      userProfile?.bookmarks.some((bookmark) => bookmark?._id === post?._id) || false
    );

    const [openSharePopup, setOpenSharePopup] = useState(false);

   
      
    
    const handleCopy = () => {
      navigator.clipboard.writeText(`${window.location.origin}/posts/${post?._id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };


    



    const toggleTextHandler = () => {
      setShowFullText((prev) => !prev);
    };
  

    const changeEventHandler = (e) => {

      const inputText = e.target.value;
      if (inputText.trim()) {
          setText(inputText);
      } else {
          setText("");
      }
        
    }

    const likeOrDislikeHandler = async () => {
      try {

        const action = liked ? 'dislike' : 'like';
        const res = await axios.get(`https://dealy-deploy.onrender.com/api/v1/post/${post?._id}/${action}`, { withCredentials: true });

       
        if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // apne post ko update krunga
                const updatedPostData = posts.map(p =>
                    p?._id === post?._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user?._id) : [...p.likes, user?._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
        }
        
      } catch (error) {
        
        console.log(error);
      }


    }

    const commentHandler = async () => {
        try {

            const res = await axios.post(`https://dealy-deploy.onrender.com/api/v1/post/${post?._id}/comment`, { text }, {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true
              });

              

              if (res.data.success) {
                  const updatedCommentData = [...comment, res.data.comment];
                  setComment(updatedCommentData);

                  const updatedPostData = posts.map(p =>
                      p?._id === post?._id ? { ...p, comments: updatedCommentData } : p
                  );

                  dispatch(setPosts(updatedPostData));
                  toast.success(res.data.message);
                  setText("");
              }
          
        } catch (error) {
           console.log(error);
        }


    }

    const deletePostHandler = async () => {
        try {

          const res = await axios.delete(`https://dealy-deploy.onrender.com/api/v1/post/delete/${post?._id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }

          
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.messsage);
        }

    }

    const bookmarkHandler = async () => {
      try {
        
        const res = await axios.get(
          `https://dealy-deploy.onrender.com/api/v1/post/${post?._id}/bookmark`,
          { withCredentials: true }
        );
    
        if (res.data.success) {
          setbookmarked(!bookmarked);
          
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log("Error in bookmarkHandler:", error);
        toast.error("Something went wrong while bookmarking.");
      }
    };
    
    const handleShare = () => {
      const postUrl = `${window.location.origin}/posts/${post?._id}`;
    
      // Check if the browser supports the Web Share API
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this post!",
            text: post?.caption,
            url: postUrl,
          })
          .then(() => {
            toast.success("Post shared successfully!");
          })
          .catch((error) => {
            console.error("Error sharing:", error);
            toast.error("Failed to share the post.");
          });
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard
          .writeText(postUrl)
          .then(() => {
            toast.success("Post URL copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy URL: ", err);
            toast.error("Failed to copy the URL.");
          });
      }
    };

   
    
    

  return (
    <div style={{
      background: "linear-gradient(to bottom , #DF5D4A, #d40054)"            
     }} className='my-8 w-full max-w-lg mx-auto border border-gray-300 rounded-lg shadow-md p-6 bg-white '>
        <div className='flex items-center justify-between'>

            <div className='flex items-center gap-2'>

                <Link to={`/profile/${post.author?._id}`}>
              
                  <Avatar>
                      <AvatarImage src={post.author?.profilePicture} alt="post_image" />
                      <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                </Link>
                <div className='flex items-center gap-3 text-white font-medium ' >
                       
                          <h1>{post.author?.username}</h1>
                        
                        {user?._id === post.author?._id &&  <Badge variant="secondary">Author</Badge>}
                </div>


            </div>

            <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                    <DialogTitle className="text-center font-bold text-Black p-1">Others</DialogTitle>
                        {/* {
                        post?.author?._id !== user?._id && <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
                        }
                        
                        <Button variant='ghost' className="cursor-pointer w-fit">Add to favorites</Button> */}
                        {
                            user && user?._id === post?.author?._id && <Button onClick={deletePostHandler} variant='ghost' className="cursor-pointer font-bold  hover:bg-[#d40054] w-fit">Delete</Button>
                        }
                        {
                          <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={`${window.location.origin}/posts/${post?._id}`}
                            className="border rounded px-2 py-1 flex-1"
                          />
                          <button onClick={handleCopy} className="bg-blue-500 text-white px-4 py-1 rounded">
  {copied ? "Copied!" : "Copy URL"}
</button>
                        </div>
                        }
                    </DialogContent>
            </Dialog>

        </div>

                        
        {post.coverImage && (
    <img
        className='rounded-sm my-2 w-full aspect-square object-constain'
        src={post.coverImage}
        alt="post_img"
    />
)}

    {/* Horizontal Scrollable Section */}
    <div  className="flex gap-4 overflow-x-scroll no-scrollbar p-2">
      {post.products.map((product, index) => (
        <div
          key={index}
          
          className="flex-shrink-0 w-64 p-4 border rounded-lg shadow-md bg-white"
        >
          {/* Product Image */}
          <img
            src={exampleImage}
            alt={product.name}
            className="w-full h-32 object-cover rounded-md mb-2"
          />
          {/* Product Details */}
          <h2 className="text-sm font-bold mb-1 truncate">{product}</h2>
          <p className="text-sm text-gray-600 mb-1">Product : {index+1}</p>
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
      
        <div className='flex items-center justify-between my-2'>
            <div className='flex items-center gap-3'>

                {
                  liked ? <FaHeart onClick={likeOrDislikeHandler} size={'24'} className='cursor-pointer text-white' /> 
                  : <FaRegHeart onClick={likeOrDislikeHandler} size={'22px'} className='cursor-pointer hover:text-white' />
                }

                <MessageCircle onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                    }} className='cursor-pointer  hover:text-white' />
                

                <Send
                  className="cursor-pointer  hover:text-white"
                  onClick={() => {
                    handleShare();
                  }}
                />
                {openSharePopup && (
  <SharePopup postUrl={`${window.location.origin}/post/${post?._id}`} setOpenSharePopup={setOpenSharePopup} />
)}
           </div>
            {
                  bookmarked  ? <Bookmark onClick={bookmarkHandler} size={'24'} className='cursor-pointer text-white' /> 
                  : <Bookmark onClick={bookmarkHandler} size={'22px'} className='cursor-pointer hover:text-white' />
            }



            
        </div>
    
        <span className='font-medium block mb-2 text-white' >{postLike} likes</span>
        <p>
        {/* <span className="font-medium mr-2 text-white ">{post.author?.username}</span> */}
        <span
          className={`caption-text ${showFullText ? 'show-full' : '' } text-white font-medium`}
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: showFullText ? 'unset' : 2,
          }}
        >
          {post.caption}
        </span>

        {/* Show More / Show Less Button */}
        <span
          onClick={toggleTextHandler}
          className="text-black-500 cursor-pointer"
        >
          {showFullText ? 'Show less' : 'Show more'}
        </span>
        </p>

        

        {
                comment.length > 0 && (
                    <span onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                    }} className='cursor-pointer text-sm text-gray-400'>View all {comment.length} comments</span>
                )
        }
        <CommentDialog open={open} setOpen={setOpen} />
        
        <div className='flex items-center justify-between border-t border-grey-300 mt-2 pt-2'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    value={text}
                    onChange={changeEventHandler}
                    className='outline-none text-sm w-full border-gray-600    p-2 rounded'
                />
                {
                    text && <span onClick={commentHandler} className='m-1 text-black cursor-pointer'>Post</span>
                }

        </div>
      
    </div>
  )
}

export default Post
