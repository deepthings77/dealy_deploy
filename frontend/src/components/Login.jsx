import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import exampleImage from '../assets/logo.png';



const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/api/v1/user/login', input, {
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

            background: "#DF514E"
           
         }} className="flex items-center justify-center w-full h-screen px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={signupHandler}
            style={{
              background: 'linear-gradient(to bottom, #DF5D4A, #d40054)'
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
            <p className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600">
                Signup
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

export default Login