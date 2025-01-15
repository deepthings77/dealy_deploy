import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import TinderCardComponent from "./TinderCard";
import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import FeedForExplore from "./FeedForExplore";

const ExplorePage = () => {
  
 


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
