import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '../Redux/authSlice';
import { readFileAsDataURL } from '../lib/utils';

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector(store => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
      profilePhoto: user?.profilePicture,
      bio: user?.bio || '',
      gender: user?.gender || ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);


  const fileChangeHandler = async(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePhoto: file });
      const dataUrl = await readFileAsDataURL(file);
      setPreviewImage(dataUrl);
    }
    }

  const selectChangeHandler = (value) => {
      setInput({ ...input, gender: value });
  }

  const editProfileHandler = async (e) => {
      
        const formData = new FormData();
        let isUpdated = false;

        if (input.bio !== user?.bio) {
          formData.append('bio', input.bio);
          isUpdated = true;
        }
        
        if (input.gender !== user?.gender) {
          formData.append('gender', input.gender);
          isUpdated = true;
        }
        
        if(input.profilePhoto){
            formData.append("profilePhoto", input.profilePhoto);
            isUpdated = true;

        }
        if (input.username && input.username !== user?.username) {
          formData.append('username', input.username);
          isUpdated = true;
        }
        if (!isUpdated) {
          toast.error('No changes detected');
          return;
        }
    

    try {

      setLoading(true);
            const res = await axios.post('https://www.dealyshop.me/api/v1/user/profile/edit', formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                const updatedUserData = {
                    ...user,
                    bio:res.data.user?.bio,
                    profilePicture:res.data.user?.profilePicture,
                    gender:res.data.user?.gender,
                    username: res.data.user?.username
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }
            
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messasge);
      
    } finally {
      setLoading(false);
    }
  }



  return (
    <div
      style={{
        background: '#131423',
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <section className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="font-bold text-xl">Edit Profile</h1>

        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={previewImage || user?.profilePicture} alt="post_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
            </div>
          </div>

          <input ref={imageRef} onChange={fileChangeHandler} type="file" className="hidden" />
          <Button
            onClick={() => imageRef?.current.click()}
            className="bg-[#0095F6] h-8 hover:bg-[#318bc7]"
          >
            Change photo
          </Button>
        </div>
        <div>
  <h1 className="font-bold text-xl mb-2">Username</h1>
  <input
    type="text"
    value={input.username}
    onChange={(e) => setInput({ ...input, username: e.target.value })}
    name="username"
    className="w-full border rounded-md p-2"
    placeholder={user?.username}
  />
</div>

        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="focus-visible:ring-transparent"
          />
        </div>

        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          {loading ? (
            <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]"
            >
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );

}

export default EditProfile
