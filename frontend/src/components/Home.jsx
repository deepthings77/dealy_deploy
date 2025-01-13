import React from 'react'
import CreatePost from './CreatePost'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router-dom'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'



const Home = () => {

  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div>   
       <div className='flex '>
            <div className='flex-grow'>
                <Feed />
                <Outlet />
                
            </div>
            <div className="hidden sm:block mt-4 sm:mt-0">
            <RightSidebar />
            </div>
        </div>
      
    </div>
  )
}

export default Home
