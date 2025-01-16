import React, {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  const [shuffledUsers, setShuffledUsers] = useState([]);

  useEffect(() => {
    
    const shuffled = [...suggestedUsers].sort(() => Math.random() - 0.5);
    setShuffledUsers(shuffled);
  }, [suggestedUsers]);

  return (
    <div className="bg-#131423 p-4 rounded-lg shadow-md border border-gray-300">
    
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-white text-lg">Suggested for you</h1>
        
      </div>

      <div className="space-y-4  max-h-96 overflow-y-auto no-scrollbar">
        {shuffledUsers.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-2 hover:bg-custom-hover rounded-md transition duration-200 border border-gray-300"
          >
            <div className="flex items-center gap-3">
              <Link to={`/profile/${user?._id}`}>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user?.profilePicture} alt="user_profile_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <h1 className="font-semibold text-white text-sm">
                  <Link to={`/profile/${user?._id}`} className="hover:underline">
                    {user?.username}
                  </Link>
                </h1>
                <span
                  className="text-gray-500 text-xs block overflow-hidden text-ellipsis whitespace-nowrap w-40"
                  title={user?.bio || 'Bio here...'}
                >
                  {user?.bio || 'No bio available'}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
