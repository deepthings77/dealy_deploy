import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { auth, googleProvider, signInWithPopup } from '../firebase.js';
import { setAuthUser } from '../Redux/authSlice';

import exampleImage from '../assets/logo.png';



const Signup = () => {

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
      e.preventDefault();
      try {
          setLoading(true);

          const res = await axios.post('https://www.dealyshop.me/api/v1/user/register', input, {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true
          });

          if (res.data.success) {
              navigate("/verify-email");
              toast.success(res.data.message);
              setInput({
                  username: "",
                  email: "",
                  password: ""
              });
          }
      } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
      } finally {
          setLoading(false);
      }
  }

  const handleGoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();

        // Send the ID token to your backend
        const response = await axios.post("https://www.dealyshop.me/api/v1/user/google-login", { idToken }, { withCredentials: true });

        if(response.data.success){
          dispatch(setAuthUser(response.data.user));
          navigate("/");
          toast.success(response.data.message);
        }
        
    } catch (error) {
        console.error("Error during Google login:", error);
        toast.error(error.response.data.message);
    }
};

  useEffect(()=>{
      if(user){
          navigate("/");
      }
  },[])


  return (
    <div style={{

        background: "#131423"
       
     }} className="flex items-center justify-center w-full h-screen px-4 sm:px-6 lg:px-8">
        <form
            onSubmit={signupHandler}
            style={{

                background: "#D40054 "
               
             }}
            className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg"
        >
            <div className="text-center">
                <img
                                src={exampleImage}
                                alt="Dealy"
                                className="w-16 h-16 object-contain mx-auto transform transition duration-300 hover:scale-110"
                              />
                              
                <p className="text-sm text-white">
                    Signup to make your own online store
                </p>
            </div>
            <div className="flex justify-center">
        <button
       
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
          onClick={handleGoogleLogin}
          type="button"
        >
          Login/Signup with Google
        </button>
        </div>
            <div>
                <label className="block font-medium text-gray-700">Username</label>
                <Input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={changeEventHandler}
                    className="w-full mt-2"
                />
            </div>
            <div>
                <label className="block font-medium text-gray-700">Email</label>
                <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="w-full mt-2"
                />
            </div>
            <div>
                <label className="block font-medium text-gray-700">Password</label>
                <div className="relative">
                <Input
                    type={passwordVisible ? "text" : "password"} 
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    className="w-full mt-2"
                />
                <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility state
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
            </div>
            </div>
            <div>
                {loading ? (
                    <Button className="w-full">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full">
                        Signup
                    </Button>
                )}
            </div>
            
            <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600">
                    Login
                </Link>
            </p>
            <p className="text-center text-sm">
            Haven't verified your email yet?{' '}
              <Link to="/verify-email" className="text-blue-600">
               Go to Email Verification
              </Link>
            </p>
        </form>
    </div>
);

}

export default Signup
