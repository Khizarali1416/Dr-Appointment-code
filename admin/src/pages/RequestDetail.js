import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const RequestDetail = () => {
    const { id } = useParams(); // Retrieve the appointment ID from the URL
    const [appointment, setAppointment] = useState(null); // Use singular form as we're fetching details of a single appointment
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reply, setReply] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchAppointmentDetail = async () => {
            try {
                const token = localStorage.getItem('token');
        
                if (!token) {
                    setError('You are not logged in as admin.');
                    setLoading(false);
                    return;
                }
        
                const response = await axios.get(`http://localhost:5000/api/admin/appointments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointment(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch appointment details.');
                setLoading(false);
            }
        };

        fetchAppointmentDetail();
    }, [id]);

    const handleReply = async () => {
        try {
            const token = localStorage.getItem('token');

            await axios.post('http://localhost:5000/api/admin/reply', {
                appointmentId: id,
                adminReply: reply,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Clear the reply input and show success message
            setReply('');
            setSuccessMessage('Reply sent successfully!');

            // Hide the success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err) {
            setError('Failed to send reply.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Appointment Detail</h1>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                {appointment && (
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="flex-grow">
                                <p className="text-lg font-medium text-gray-800">
                                    {appointment.userId.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Issue:</span> {appointment.issue}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Description:</span> {appointment.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Phone:</span> {appointment.phoneNumber}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Country:</span> {appointment.country}
                                </p>
                                <p className="text-sm text-gray-400">
                                    <span className="font-bold">Status:</span> {appointment.status}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {new Date(appointment.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-4 flex flex-col">
                                {appointment.adminReply && (
                                    <p className="text-sm text-green-500 mb-2">
                                        <span className="font-bold">Reply:</span> {appointment.adminReply}
                                    </p>
                                )}
                                <textarea
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type your reply..."
                                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                />
                                <button
                                    onClick={handleReply}
                                    className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-500 transition duration-200"
                                >
                                    Send Reply
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RequestDetail;
