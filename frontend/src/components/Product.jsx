import React, { useEffect, useState } from 'react'
import exampleImage from '../assets/logofordealy.png';
import axios from 'axios';



const Product = ({ product, caption }) => {
    

    return (
        <a
            href={product}
            target="_blank"
            rel="noopener noreferrer"
            className="block my-8 w-full max-w-lg mx-auto border border-gray-300 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300"
        >
            <img
                src={exampleImage}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-800 truncate">
                {caption}
            </h3>
            {/* <p className="text-sm text-gray-600">{product}</p> */}
            {/* <p className="text-lg font-bold text-green-600">Price: NA</p> */}
        </a>
    );
}

export default Product
