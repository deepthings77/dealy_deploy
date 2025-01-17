import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-18 mr-2" src={logo} alt="Logo" />
           
          </div>
          {/* <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul> */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
          <Link to="/login" className="py-2 px-3 border rounded-md text-white">
    Log In
  </Link>
  <Link
    to="/signup"
    className="bg-custom-hover py-2 px-3 rounded-md"
  >
    Create an account
  </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-#131423 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            
            <div className="flex space-x-6">
            <Link to="/login" className="py-2 px-3 border rounded-md text-white">
    Log In
  </Link>
  <Link
    to="/signup"
    className="py-2 px-3 rounded-md bg-custom-hover"
  >
    Create an account
  </Link>
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
