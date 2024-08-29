import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-purple-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Admin Dashboard */}
        <Link
          to="/home"
          className="text-white text-2xl font-bold hover:text-gray-300"
        >
          Dr Appointment
        </Link>

        {/* Center: User Requests */}
       <div>
       <Link
          to="/home"
          className="text-white text-lg font-semibold hover:text-gray-300"
        >
          Home
        </Link>


        {/* Right Side: Create Doctor */}
        <Link
          to="/history"
          className="text-white text-lg ml-5 font-semibold hover:text-gray-300"
        >
          History
        </Link>

       </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
