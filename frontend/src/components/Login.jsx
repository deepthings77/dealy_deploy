import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../Redux/authSlice';
import exampleImage from '../assets/logo.png';
import { auth, googleProvider, signInWithPopup } from '../firebase.js';



const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleGoogleLogin = async () => {
      try {
        

          const result = await signInWithPopup(auth, googleProvider);
          const idToken = await result.user.getIdToken();
  
          // Send the ID token to your backend
          const response = await axios.post("https://www.dealyshop.me/api/v1/user/google-login", { idToken  }, { withCredentials: true });
  
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
  

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('https://www.dealyshop.me/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
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
              background: '#D40054 '
            }}
            className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg"
          >
            <div className="text-center">
              
              <img
                src={exampleImage}
                alt="Dealy"
                className="w-32 h-32 object-contain mx-auto transform transition duration-300 hover:scale-110"
              />
              
              <p className="text-sm text-white mt-2">Login into your shop</p>
            </div>
            <div>
      
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
                  Login
                </Button>
              )}
            </div>
            <div className="flex justify-center">
        <button
       
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
          onClick={handleGoogleLogin}
          type="button"
        >
          Login with Google
        </button>
      </div>
            <p className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>
              <div className='flex justify-center'>
              
              </div>
            </p>
          
          </form>
          

          
        </div>

      );
}

export default Login