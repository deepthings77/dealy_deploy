import React,{useEffect} from "react";
import { Outlet ,useLocation} from "react-router-dom";
import Feed from "./Feed";
import FeedForExplore from "./FeedForExplore";
import useGetAllPostProducts  from "../hooks/useGetAllPostProducts";

const ExplorePage = () => {
  
 const location = useLocation();

 useGetAllPostProducts();
 
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
