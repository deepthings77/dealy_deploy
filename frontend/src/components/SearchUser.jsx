import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader , DialogTitle} from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserSearchDialog = ({ open, setOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const res = await axios.get(`https://www.dealyshop.me/api/v1/user/search`, {
        params: { query: searchTerm }, 
        withCredentials: true, 
    });

      const data = await res.data;
      if (data.success) {
        setSearchResults(data.users); 
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
    
    setLoading(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)} style={{
          background: "#131423"   
          
        }}
        className="overflow-y-auto max-h-screen p-4"
      >
        <DialogTitle className="text-center font-bold text-white p-1">Search</DialogTitle>
        {/* <DialogHeader className="text-center font-semibold">
          Search Users
        </DialogHeader> */}

        {/* Search Input */}
        <div className="flex gap-2 mb-4">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="w-full"
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="bg-custom-hover hover:bg-blue-600"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <Link to={`/profile/${user?._id}`}>
              <div
                key={user?._id}
                className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
              >
                <Avatar>
                  <AvatarImage src={user.profilePicture} alt="user_img" />
                  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-semibold text-sm">{user?.username}</h1>
                  <span className="text-gray-600 text-sm line-clamp-2 overflow-hidden text-ellipsis"
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                    }}>  
                         {user.bio || "No bio available"}</span>
                </div>
                
              </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              {loading ? "Searching..." : "No users found"}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSearchDialog;
