import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/Navbar';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/allusers');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">All Users</h1>
          {loading ? (
            <p className="text-center text-gray-700">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                <thead className="bg-pink-400 text-white">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">ID</th>
                    <th className="py-3 px-4 border-b text-left">Name</th>
                    <th className="py-3 px-4 border-b text-left">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="py-3 px-4 border-b">{user._id}</td>
                      <td className="py-3 px-4 border-b">{user.name}</td>
                      <td className="py-3 px-4 border-b">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
