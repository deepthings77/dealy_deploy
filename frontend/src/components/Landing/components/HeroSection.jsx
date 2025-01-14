import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center flex tracking-wide">
      Welcome to
         <div className="flex items-center justify-center">
         <img className="h-20 w-26 mr-2" src={logo} alt="Logo" />
         </div>
      </h1>
      <p className="mt-10 text-lg text-center text-white max-w-4xl">
      Your all-in-one solution for wishlist sharing and e-commerce cart management
      </p>
      <div className="flex justify-center my-10">
      <Link
    to="/signup"
    className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
  >
    Start for free
  </Link>
        
       
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
