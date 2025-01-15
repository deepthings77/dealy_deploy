// import React ,{useState,useEffect} from 'react'
// import Post from './Post'
// import { useSelector } from 'react-redux'
// import Product from './Product'


// const Products = () => {

//     const {posts} = useSelector(store=>store.post);
//     // const allProducts = posts.flatMap((post) => post.products);
//     const [shuffledProducts, setShuffledProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');




//     const combineProductsWithCaptions = () => {
//         const allProducts = posts.flatMap((post) =>
//           post.products.map((product) => ({
//             product,
//             caption: post.caption,
//           }))
//         );
//         return allProducts;
//       };

//     const shuffleArray = (array) => {
//         return array.sort(() => Math.random() - 0.5);
//       };
    
//       useEffect(() => {
        
//         const initialProducts = combineProductsWithCaptions();
//         setShuffledProducts(shuffleArray(initialProducts));
    
        
//         // const intervalId = setInterval(() => {
//         //   const shuffled = shuffleArray([...initialProducts]);
//         //   setShuffledProducts(shuffled);
//         // }, 50000);
    
        
//         // return () => clearInterval(intervalId);

//       }, [posts]);

//       const cleanedSearchTerm = searchTerm.trim();
   
//       const filteredProducts = cleanedSearchTerm
//       ? shuffledProducts.filter((item) =>
//           item.caption.toLowerCase().includes(cleanedSearchTerm.toLowerCase())
//         )
//       : shuffledProducts;

//     return (
//         <div>
//             <div className="my-4">
//                 <input
//                 type="text"
//                 placeholder="Search by caption..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//                 />
//              </div>

//             {filteredProducts.map((item, index) => (
//         <Product
//           key={index}
//           product={item.product}
//           caption={item.caption}
//         />
//       ))}
//         </div>
//     );
// }

// export default Products


import React, { useState, useEffect, useCallback } from "react";
import Product from "./Product";
import { useSelector } from "react-redux";

const Products = () => {
  const { posts } = useSelector((store) => store.post);
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [limit] = useState(10); // Number of products per "page"
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false);

  // Combine products with captions from posts
  const combineProductsWithCaptions = () => {
    return posts.flatMap((post) =>
      post.products.map((product) => ({
        product,
        caption: post.caption,
      }))
    );
  };

  // Shuffle products array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Load more products when user scrolls to the bottom
  const loadMoreProducts = useCallback(() => {
    if (loading) return;

    setLoading(true);

    const startIndex = page * limit;
    const nextProducts = allProducts.slice(startIndex, startIndex + limit);

    if (nextProducts.length > 0) {
      setVisibleProducts((prev) => [...prev, ...nextProducts]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  }, [allProducts, limit, page, loading]);

  // Set up scroll listener for infinite scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMoreProducts();
    }
  }, [loadMoreProducts]);

  // Initialize products on component mount
  useEffect(() => {
    const initialProducts = shuffleArray(combineProductsWithCaptions());
    setAllProducts(initialProducts);
    setVisibleProducts(initialProducts.slice(0, limit));
  }, [posts, limit]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by caption..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            if (searchTerm === "") {
              setVisibleProducts(allProducts.slice(0, page * limit));
            } else {
              const filtered = allProducts.filter((item) =>
                item.caption.toLowerCase().includes(searchTerm)
              );
              setVisibleProducts(filtered.slice(0, limit));
              setPage(1);
            }
          }}
        />
      </div>

      {visibleProducts.map((item, index) => (
        <Product key={index} product={item.product} caption={item.caption} />
      ))}

      {loading && <p>Loading more products...</p>}
      {!loading && visibleProducts.length === allProducts.length && (
        <p>No more products to load.</p>
      )}
    </div>
  );
};

export default Products;
