
import Posts from './Posts'
import React, { useState, useEffect } from 'react';

const Feed = () => {

  

  return (
    <div style={{
       background: "#DF514E"
    }} className="flex-1 my-0 flex flex-col items-center px-4 sm:px-10 md:px-20 lg:px-32">       
        <Posts />       
    </div>
  );

}

export default Feed
