import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '../lib/utils';
import { Loader2 } from 'lucide-react';
import { toast , Toaster} from 'sonner';


import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../Redux/postSlice';


const CreatePost = ({ open, setOpen }) => {


    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const dispatch = useDispatch();

    const [productUrls, setProductUrls] = useState([""]);


    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
        setFile(file);
        const dataUrl = await readFileAsDataURL(file);
        setImagePreview(dataUrl);
        }

    };
    const createPostHandler = async (e) => {

        const formData = new FormData();
        formData.append("caption", caption);

        if (file) formData.append("image", file);

        

        productUrls.forEach((url, index) => {
            formData.append(`products`, url);
        });
        
        

        try{

            setLoading(true);
            const res = await axios.post('https://dealy-deploy.onrender.com/api/v1/post/addpost', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(setPosts([res.data.post, ...posts]));// [1] -> [1,2] -> total element = 2

                          

                
                toast.success(res.data.message);
                setOpen(false);
            }



        } catch (error) {

            toast.error(error.response.data.message);

        } finally {

            setLoading(false);
            setCaption("");
            setImagePreview("");
            setProductUrls([""]);
            setFile("");
            

        }





    };


    const handleProductUrlChange = (index, value) => {
        const updatedUrls = [...productUrls];
        updatedUrls[index] = value;
        setProductUrls(updatedUrls);
    };

    const addProductUrlField = () => {
        setProductUrls([...productUrls, ""]);
    };

    const removeProductUrlField = (index) => {
        const updatedUrls = productUrls.filter((_, i) => i !== index);
        setProductUrls(updatedUrls);
    };

    return (

        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false) }style={{
            background: "linear-gradient(to bottom, #DF5D4A, #d40054)"   
            
          }} className="overflow-y-auto max-h-screen p-4" >
                <DialogTitle className='text-center font-bold text-white p-1'>Create New Collection</DialogTitle>

                {/* <DialogHeader className='text-center font-semibold'>Create New Collection</DialogHeader> */}

                <div className='flex gap-3 items-center'>
                    <Avatar>
                        <AvatarImage src={user?.profilePicture} alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>{user?.username}</h1>
                        
                    </div>
                </div>

                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />

                {
                    imagePreview && (
                        <div className='w-full h-64 flex items-center justify-center'>
                        <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
                        </div>
                    )
                }


                <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
                
                <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</Button>

                {/* Dynamic Input Fields for Product URLs */}
                <div className="space-y-2 mt-4">
                    <h3 className="text-sm font-semibold">Product URLs</h3>
                    {productUrls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => handleProductUrlChange(index, e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder={`Product URL ${index + 1}`}
                            />
                            {index > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeProductUrlField(index)}
                                    className="text-red-500"
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="ghost" onClick={addProductUrlField}>
                        + Add Product URL
                    </Button>
                </div>

                {
                    caption && (
                        loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                        ) : (
                        <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
                        )
                    )
                }


            </DialogContent>
        </Dialog>



    )

};

export default CreatePost