
import { setProductPosts } from "../Redux/postSlice";
import axios from "axios";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";

const useGetAllPostProducts = () => {



    const dispatch = useDispatch();
    const { productPosts } = useSelector((store) => store.post);
    


    useEffect(() => {
        const fetchAllPostProducts = async () => {
            try {
                

                const res = await axios.get(`https://dealy-deploy.vercel.app/api/v1/post/allproducts`, { withCredentials: true });
    
    
                if (res.data.success) { 
                   
                    dispatch(setProductPosts(res.data.postsproducts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPostProducts();
    }, []);
};



export default useGetAllPostProducts;