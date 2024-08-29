import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const History = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setError('You are not logged in. Please log in to view your appointments.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/appointments/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request headers
                    },
                });

                // Sort appointments by creation date (newest first)
                const sortedAppointments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAppointments(sortedAppointments);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch appointments.');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(appointments.filter((appointment) => appointment._id !== id));
        } catch (err) {
            setError('Failed to delete appointment.');
        }
    };

    const getStatus = (appointment) => {
        if (appointment.adminReply) {
            return 'approved';
        }
        return 'pending';
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold text-center mb-8">My Appointment History</h1>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && appointments.length === 0 && (
                    <p className="text-center">You have no appointments.</p>
                )}

                {!loading && appointments.length > 0 && (
                    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                        <ul className="divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                                <li key={appointment._id} className="py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">{appointment.issue}</p>
                                            <p className="text-sm text-gray-500 mb-2">{appointment.description}</p>
                                            <p className="text-sm text-gray-400">
                                                {new Date(appointment.createdAt).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Status: <span className={`font-semibold ${getStatus(appointment) === 'approved' ? 'text-green-600' : 'text-yellow-500'}`}>{getStatus(appointment).charAt(0).toUpperCase() + getStatus(appointment).slice(1)}</span>
                                            </p>
                                            {appointment.adminReply && (
                                                <p className="text-sm text-green-500">Dr Reply: {appointment.adminReply}</p>
                                            )}
                                        </div>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => handleDelete(appointment._id)}
                                                className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-500 transition duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default History;
