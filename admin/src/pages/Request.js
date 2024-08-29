import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from '../components/Navbar';

const Request = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setError('You are not logged in as admin.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/admin/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointments(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch appointments.');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Appointment Requests</h1>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && appointments.length === 0 && (
                    <p className="text-center">No appointment requests found.</p>
                )}

                {!loading && appointments.length > 0 && (
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                        <ul className="divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                                <li key={appointment._id} className="py-4">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div className="flex-grow">
                                            <p className="text-lg font-medium text-gray-800">
                                                {appointment.userId.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <span className="font-bold">Issue:</span> {appointment.issue}
                                            </p>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-4">
                                            <Link
                                                to={`/request/${appointment._id}`}
                                                className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-500 transition duration-200"
                                            >
                                                View Details
                                            </Link>
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

export default Request;
