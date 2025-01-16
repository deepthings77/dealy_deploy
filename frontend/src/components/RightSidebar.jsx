import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div
      style={{
          background: "#131423"
      }}
      className="fixed top-0 z-0 right-0 px-6 py-4 border-l border-gray-200 w-[23%] h-screen shadow-lg"
    >
      {/* User Profile Section */}
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-14 h-14">
            <AvatarImage src={user?.profilePicture} alt="profile_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 overflow-hidden">
          <h1 className="font-semibold text-gray-800 text-base">
            <Link to={`/profile/${user?._id}`} className="hover:underline">
              {user?.username}
            </Link>
          </h1>
          <span
            className="text-gray-600 text-sm block truncate"
            title={user?.bio || 'Bio here...'}
          >
            {user?.bio || 'Bio here...'}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-300"></div>

      {/* Suggested Users Section */}
      <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;
