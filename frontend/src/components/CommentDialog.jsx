import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts } from '../Redux/postSlice'

import exampleImage from '../assets/logofordealy.png';

const CommentDialog = ({ open, setOpen }) => {

    const [text, setText] = useState("");
    const { selectedPost, posts } = useSelector(store => store.post);
    const [comment, setComment] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (selectedPost) {
          setComment(selectedPost.comments);
        }
    }, [selectedPost]);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
          setText(inputText);
        } else {
          setText("");
        }
    }

    const sendMessageHandler = async () => {
        try {
            const res = await axios.post(`https://www.dealyshop.me/api/v1/post/${selectedPost?._id}/comment`, { text }, {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true
              });

            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);
        
                const updatedPostData = posts.map(p =>
                  p?._id === selectedPost?._id ? { ...p, comments: updatedCommentData } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }


            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            
        }

    }






    return (
      <Dialog open={open}>
        <DialogContent  onInteractOutside={() => setOpen(false)} style={{
            background: "linear-gradient(to bottom, #DF5D4A, #d40054)"   
            
          }} className="max-w-5xl p-0 flex flex-col h-[90vh]">
            <DialogTitle className="text-center font-small text-white p-1">Comments</DialogTitle>
            
            <div className='flex flex-1'>
                <div className='w-1/2'>
                        
                        <img
                            className='w-full h-full object-contain rounded-l-lg'
                            src={selectedPost?.coverImage || exampleImage }
                            alt="post_img"
                        />
                        
                    
                </div>
                <div className='w-1/2 flex flex-col justify-between'>
                    <div className='flex items-center justify-between p-4'>
                        <div  className='flex gap-3 items-center'>

                            <Link>
                                <Avatar>
                                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <Link className='font-medium text-white'>{selectedPost?.author?.username}</Link>
                                {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                            </div>

                        </div>

                        {/* <Dialog>
                            <DialogTrigger asChild>
                            <MoreHorizontal  className='cursor-pointer' />
                            </DialogTrigger>
                            <DialogContent  className="flex flex-col items-center text-sm text-center">
                            <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                                Unfollow
                            </div>
                            <div className='cursor-pointer w-full'>
                                Add to favorites
                            </div>
                            </DialogContent>
                        </Dialog> */}



                    </div>

                    <hr />

                    <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                                {comment.length > 0 ? (
                        comment.map((comment) => (
                            <Comment key={comment?._id} comment={comment} />
                        ))
                        ) : (
                        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                        )}
                    </div>

                    <div className='p-4'>
                        <div className='flex items-center gap-2'>
                            <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />
                            <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
                        </div>
                    </div>



                </div>




            </div>

        </DialogContent>
      </Dialog>  


    )


}

export default CommentDialog