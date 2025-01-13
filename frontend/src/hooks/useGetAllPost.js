import { setPosts } from "../Redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {



    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                
                const res = await axios.get('https://www.dealyshop.me/api/v1/post/all', { withCredentials: true });
                
                if (res.data.success) { 
                    
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
};



export default useGetAllPost;