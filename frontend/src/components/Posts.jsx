import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import useGetAllPost from '../hooks/useGetAllPost';

const Posts = () => {
 
  const { posts ,hasMore } = useSelector((store) => store.post);
  const { loadMorePosts,loading,loadPreviousPosts  } = useGetAllPost();


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      loadMorePosts(); 
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  return (
    <div>
         {posts.map((post) => (
        <Post key={post?._id} post={post} />
      ))}

{loading && (
        <div className="loading-spinner">
          <p className="text-2xl items-center text-white">Loading more content...</p>
        </div>
      )}
      {!hasMore && posts.length > 0 && (
        <div className="no-more-posts">
          <p className="text-center text-white">You have reached the end!</p>
        </div>
      )}
    </div>
  )
}

export default Posts


// import React from 'react'
// import Post from './Post'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { useEffect } from 'react'

// const Posts = () => {
//   const {posts} = useSelector(store=>store.post);

  

//   return (
//     <div>
     
        
//         {
//             posts.map((post) => <Post key={post?._id} post={post}/>  )
//         }
      
//     </div>
//   )
// }

// export default Posts
