
import axios from "axios";
import { useEffect,useState } from "react";
import { useDispatch,useSelector  } from "react-redux";
import { appendPosts,clearPosts } from '../Redux/postSlice';

const useGetAllPost = () => {

    const [page, setPage] = useState(1);
    const [newerPage, setNewerPage] = useState(1); 
    const { hasMore } = useSelector((state) => state.post);
    const [loading, setLoading] = useState(false);
    const [loadingNewer, setLoadingNewer] = useState(false);

    const dispatch = useDispatch();

    

    useEffect(() => {
        
        const fetchAllPost = async (currentPage, direction = "older") => {
            try {
                setLoading(true); 
                const res = await axios.get(`https://dealy-deploy-vercel.vercel.app/api/v1/post/all?page=${currentPage}&limit=15`, { withCredentials: true });
                
                if (res.data.success) { 
                    
                    dispatch(appendPosts({ posts: res.data.posts, hasMore: res.data.hasMore }));
                   
                }
            } catch (error) {
                console.log(error);
            }finally {
                setLoading(false); 
              }
        }

        
        fetchAllPost(page);
    }, [page]);


  const loadMorePosts = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };

  const resetToFirstPage = () => {
    dispatch(clearPosts());
    setPage(1); 
    
  };


  return { loadMorePosts,loading,resetToFirstPage  };
};



export default useGetAllPost;


// import { setPosts } from "../Redux/postSlice";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const useGetAllPost = () => {



//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchAllPost = async () => {
//             try {
                
//                 const res = await axios.get('https://dealy-deploy-vercel.vercel.app/api/v1/post/all', { withCredentials: true });
                
//                 if (res.data.success) { 
                    
//                     dispatch(setPosts(res.data.posts));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllPost();
//     }, []);
// };



// export default useGetAllPost;