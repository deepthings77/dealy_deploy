import React,{useEffect} from "react";
import Products from "./Products";

const FeedForExplore = () => {
    
    return (
        <div
            style={{
                background: "#DF514E",
            }}
            className="flex-1 my-0 flex flex-col items-center px-4 sm:px-10 md:px-20 lg:px-32 "
        >
            <Products />
        </div>
    );
};

export default FeedForExplore;
