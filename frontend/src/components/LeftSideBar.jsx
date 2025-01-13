import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../Redux/authSlice'
import CreatePost from './CreatePost'
import UserSearchDialog from './SearchUser'
import { setPosts, setSelectedPost } from '../Redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import exampleImage from '../assets/logo.png';

const LeftSideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [showSupportPopup, setShowSupportPopup] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const { likeNotification } = useSelector(store => store.realTimeNotification);

    const logoutHandler = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/user/logout', { withCredentials: true });
        if (res.data.success) {
            dispatch(setAuthUser(null));
            dispatch(setSelectedPost(null));
            dispatch(setPosts([]));
            navigate("/login");
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
    }

    const sidebarHandler = (textType) => {
      if (textType === 'Logout') {
          logoutHandler();
      } else if (textType === "Create") {
          setOpen(true);
      } else if (textType === "Profile") {
        navigate(`/profile/${user?._id}`);
      } else if (textType === "Home") {
          navigate("/");
      }  else if (textType === "Search") {
        setOpenSearch(true);
      } 
        else if (textType === "Deals") {
          navigate(`/explore`);
      } 
    };

    const sidebarItems = [
      { icon: <Home />, text: "Home" },
      { icon: <Search />, text: "Search" },
      { icon: <TrendingUp />, text: "Deals" },
      // { icon: <Heart />, text: "Notifications" },
      { icon: <PlusSquare />, text: "Create" },
      {
          icon: (
              <Avatar className='w-6 h-6'>
                  <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
          ),
          text: "Profile"
      },
      { icon: <LogOut />, text: "Logout" },

    ]



    return (
        <div
          style={{

             background: "linear-gradient(to bottom, #DF5D4A, #d40054)"
            
          }}
          className={`fixed top-0 z-10 left-0 h-screen ${isSidebarOpen ? 'w-[70%]' : 'w-[36%]'} sm:w-[25%] md:w-[20%] lg:w-[16%] transition-all shadow-lg`}
        >
          <div className="flex flex-col h-full justify-between">
            {/* Logo Section */}
            <div className="flex items-center justify-center py-6 border-b border-gray-200">
              <img
                src={exampleImage}
                alt="Dealy"
                className="w-32 h-32 object-contain transform transition duration-300 hover:scale-125 cursor-pointer"
                onClick={() => setShowSupportPopup(true)}
              />
            </div>
      
            {/* Sidebar Items */}
            <div className="mt-6 px-4 space-y-3">
              {sidebarItems.map((item, index) => (
                <div
                  onClick={() => sidebarHandler(item.text)}
                  key={index}
                  
                  className="flex items-center gap-4 relative hover:bg-custom-hover cursor-pointer rounded-lg p-3 transition duration-200"
                >
                  <span className="text-xl text-white">{item.icon}</span>
                  <span className="text-white font-medium">{item.text}</span>
      
                  {/* Notification Badge */}
                  {item.text === 'Notifications' && likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className="absolute top-2 right-2 h-5 w-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full"
                        >
                          {likeNotification.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="p-2">
                          {likeNotification.length === 0 ? (
                            <p className="text-sm">No new notifications</p>
                          ) : (
                            likeNotification.map((notification) => (
                              <div
                                key={notification.userId}
                                className="flex items-center gap-2 my-2"
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={notification.userDetails?.profilePicture}
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="text-sm">
                                  <span className="font-bold">
                                    {notification.userDetails?.username}
                                  </span>{' '}
                                  liked your post
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              ))}
            </div>
      
            {/* Additional Components */}
            <div className="px-4 mb-6">
              <CreatePost open={open} setOpen={setOpen} />
              <UserSearchDialog open={openSearch} setOpen={setOpenSearch} />
            </div>
            {showSupportPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Support
              </h2>
              <p className="text-gray-600">For support, email us at:</p>
              <p className="text-blue-600 font-medium">extradeep7704@gmail.com</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setShowSupportPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
          </div>
        </div>
        
      );
      
}

export default LeftSideBar
