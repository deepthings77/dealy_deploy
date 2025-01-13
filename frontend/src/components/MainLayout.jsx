import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSideBar from './LeftSideBar'
import { useState } from 'react';

const MainLayout = () => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">

      <div className="hidden lg:block ">
        <LeftSideBar />
      </div>

      <div className="lg:hidden ">
        <button
          className="p-2 bg-green-500 text-white fixed top-0 left-0 z-20"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        {isSidebarOpen && <LeftSideBar />}
      </div>

      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout