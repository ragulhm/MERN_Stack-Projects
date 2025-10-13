
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchProducts } from '../services/api';
import type { Product } from '../types';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [myAds, setMyAds] = useState<Product[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);
  
  // Form state - would be populated by `user` object
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');

  useEffect(() => {
    if (user) {
      const loadMyAds = async () => {
        setLoadingAds(true);
        const allProducts = await fetchProducts();
        setMyAds(allProducts.filter(p => p.seller.id === user.id));
        setLoadingAds(false);
      };
      loadMyAds();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to see your profile.</div>;
  }
  
  const handleSave = () => {
      // API call to update user profile
      console.log("Saving profile...", { name, phone, location });
      setIsEditing(false);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Profile Info Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <div className="relative">
                <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-primary" />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-light">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                </button>
            </div>
            <div className="flex-1 mt-4 md:mt-0 text-center md:text-left">
                {isEditing ? (
                    <div className="space-y-4">
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold w-full p-2 border rounded" />
                        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="text-gray-600 w-full p-2 border rounded" />
                        <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="text-gray-600 w-full p-2 border rounded" />
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-primary">{user.name}</h1>
                        <p className="text-gray-600 mt-1">{user.email}</p>
                        <p className="text-gray-600">{user.phone}</p>
                        <p className="text-gray-600">{user.location}</p>
                        <p className="text-sm text-gray-400 mt-2">Joined: {new Date(user.joinedDate).toLocaleDateString()}</p>
                    </>
                )}
            </div>
             <div className="mt-4 md:mt-0">
                {isEditing ? (
                    <div className="flex space-x-2">
                        <button onClick={handleSave} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Save</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400">Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">Edit Profile</button>
                )}
            </div>
        </div>
      </div>
      
      {/* My Ads Section */}
      <div id="my-ads" className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">My Ads</h2>
        {loadingAds ? <Spinner /> : (
            <div className="space-y-4">
                {myAds.length > 0 ? myAds.map(ad => (
                    <div key={ad.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md">
                        <div className="flex items-center space-x-4">
                            <img src={ad.images[0]} alt={ad.title} className="w-20 h-20 object-cover rounded-md" />
                            <div>
                                <h3 className="font-semibold text-lg">{ad.title}</h3>
                                <p className="text-gray-600">${ad.price}</p>
                                <p className={`text-sm font-bold ${ad.isSold ? 'text-red-500' : 'text-green-500'}`}>{ad.isSold ? 'Sold' : 'Active'}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Link to={`/sell/${ad.id}`} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm">Edit</Link>
                            <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 text-sm">Delete</button>
                        </div>
                    </div>
                )) : <p>You haven't posted any ads yet.</p>}
            </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
