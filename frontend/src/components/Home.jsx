import React , {useEffect} from 'react'
import CreatePost from './CreatePost'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { Outlet,useLocation  } from 'react-router-dom'

import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers'

import useGetAllPost from '../hooks/useGetAllPost';
import { useDispatch } from 'react-redux';

const Home = () => {
  
  useGetSuggestedUsers();
  // useGetAllPost();
  
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { resetToFirstPage } = useGetAllPost();


  useEffect(() => {
    
    
    
    window.scrollTo({
      top:location,
      behavior: 'smooth',
    });

    resetToFirstPage();
   
  }, []);
  useEffect(() => {
    
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
   
  }, [location]);

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


// import React from 'react'
// import CreatePost from './CreatePost'
// import Feed from './Feed'
// import RightSidebar from './RightSidebar'
// import { Outlet } from 'react-router-dom'
// import useGetAllPost from '../hooks/useGetAllPost'
// import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers'



// const Home = () => {

//   useGetAllPost();
//   useGetSuggestedUsers();

//   return (
//     <div>   
//        <div className='flex '>
//             <div className='flex-grow'>
//                 <Feed />
//                 <Outlet />
                
//             </div>
//             <div className="hidden sm:block mt-4 sm:mt-0">
//             <RightSidebar />
//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default Home
