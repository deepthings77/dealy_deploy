import React,{useEffect} from "react";
import { Outlet ,useLocation} from "react-router-dom";
import Feed from "./Feed";
import FeedForExplore from "./FeedForExplore";

const ExplorePage = () => {
  
 const location = useLocation();
   useEffect(() => {
     
     
     
     window.scrollTo({
       top: 0,
       behavior: 'smooth', 
     });
    
     
     
   }, [location]);


  return (
    <div className='flex '>
    <div className='flex-grow'>
        <FeedForExplore />
        <Outlet />
       </div>
       </div>
 
  );
};

export default ExplorePage;
