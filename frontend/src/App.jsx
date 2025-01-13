import { useEffect } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import MainLayout from './components/MainLayout'
import ProtectedRoutes from './components/ProtectedRoutes'
import SinglePost from './components/SinglePost'
import ExplorePage from './components/Explore'
import { Toaster } from "sonner";
import { io } from "socket.io-client";
import { setSocket } from './Redux/socketSlice'
import { setLikeNotification } from './Redux/rtnSlice'
import { setOnlineUsers } from './Redux/chatSlice'
import Description from './components/Description'

import VerifyEmailScreen from './components/EmailVerify'


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/explore',
        element: <ProtectedRoutes><ExplorePage /></ProtectedRoutes>
      },
      
  
    ]
  },

  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/posts/:postId',
    element: <SinglePost />
  },
 
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/verify-email',
    element: <VerifyEmailScreen />
  },
  {
    path: '/des',
    element: <Description />
  },
])



export default function App() {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { socket } = useSelector(store => store.socketio);


  useEffect(() => {
    if (user) {
      const socketio = io('https://www.dealyshop.me', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
     
      dispatch(setSocket(socketio));

      
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
    
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);




  return (
    <>
    <Toaster />
    <RouterProvider router={browserRouter} />
    </>
  )
}