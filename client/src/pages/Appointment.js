import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Appointment = () => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the logged-in user's information
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const user = response.data;
                // Pre-fill the form fields with the fetched user data
                setValue('name', user.name);
                setValue('email', user.email); // Email is read-only
                setLoading(false); // Data is loaded
            } catch (error) {
                setErrorMessage('Failed to load user data.');
                setLoading(false); // Stop loading on error
            }
        };

        fetchUserData();
    }, [setValue]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/appointments',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setSuccessMessage(response.data.message);
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/home');
            }, 3000);
            reset();
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.error : 'Error creating appointment.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching user data
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Create an Appointment</h1>

                {successMessage && (
                    <div className="text-center mb-4">
                        <p className="text-green-500 text-lg font-semibold">{successMessage}</p>
                    </div>
                )}
                {errorMessage && (
                    <div className="text-center mb-4">
                        <p className="text-red-500 text-lg font-semibold">{errorMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            readOnly
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Phone Number Field */}
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            {...register('phoneNumber', { required: 'Phone number is required' })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>

                    {/* Country Field */}
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-lg font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            id="country"
                            {...register('country', { required: 'Country is required' })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                                errors.country ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    </div>

                    {/* Issue Field */}
                    <div className="mb-4">
                        <label htmlFor="issue" className="block text-lg font-medium text-gray-700">Issue</label>
                        <input
                            type="text"
                            id="issue"
                            {...register('issue', { required: 'Issue is required' })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                                errors.issue ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.issue && <p className="text-red-500 text-sm">{errors.issue.message}</p>}
                    </div>

                    {/* Description Field */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            {...register('description', { required: 'Description is required' })}
                            rows="4"
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Appointment;
