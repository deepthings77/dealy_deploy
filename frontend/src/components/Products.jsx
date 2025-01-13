import React ,{useState,useEffect} from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import Product from './Product'

const Products = () => {

    const {posts} = useSelector(store=>store.post);
    // const allProducts = posts.flatMap((post) => post.products);
    const [shuffledProducts, setShuffledProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');




    const combineProductsWithCaptions = () => {
        const allProducts = posts.flatMap((post) =>
          post.products.map((product) => ({
            product,
            caption: post.caption,
          }))
        );
        return allProducts;
      };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
      };
    
      useEffect(() => {
        
        const initialProducts = combineProductsWithCaptions();
        setShuffledProducts(shuffleArray(initialProducts));
    
        
        // const intervalId = setInterval(() => {
        //   const shuffled = shuffleArray([...initialProducts]);
        //   setShuffledProducts(shuffled);
        // }, 50000);
    
        
        // return () => clearInterval(intervalId);

      }, [posts]);

      const cleanedSearchTerm = searchTerm.trim();
   
      const filteredProducts = cleanedSearchTerm
      ? shuffledProducts.filter((item) =>
          item.caption.toLowerCase().includes(cleanedSearchTerm.toLowerCase())
        )
      : shuffledProducts;

    return (
        <div>
            <div className="my-4">
                <input
                type="text"
                placeholder="Search by caption..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
             </div>

            {filteredProducts.map((item, index) => (
        <Product
          key={index}
          product={item.product}
          caption={item.caption}
        />
      ))}
        </div>
    );
}

export default Products
