import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-purple-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Admin Dashboard */}
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-gray-300"
        >
          Admin Dashboard
        </Link>

        {/* Center: User Requests */}
       <div>
       <Link
          to="/"
          className="text-white text-lg font-semibold hover:text-gray-300"
        >
          Users
        </Link>
       <Link
          to="/request"
          className="text-white text-lg ml-5 font-semibold hover:text-gray-300"
        >
          Requests
        </Link>

        {/* Right Side: Create Doctor */}
        <Link
          to="/create"
          className="bg-white text-purple-500 px-4 py-2 ml-5 rounded-md font-semibold hover:bg-gray-200"
        >
          Create Doctor
        </Link>

       </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
