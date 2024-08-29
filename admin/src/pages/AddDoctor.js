import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import AdminNavbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AddDoctor = (doctorData) => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      availability: [{ day: 'Monday', startTime: '', endTime: '' }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'availability'
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('specialty', data.specialty);
    formData.append('image', data.image[0]);
  
    data.availability.forEach((slot, index) => {
      formData.append(`availability[${index}][day]`, slot.day);
      formData.append(`availability[${index}][startTime]`, slot.startTime);
      formData.append(`availability[${index}][endTime]`, slot.endTime);
    });
  
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/doctors', formData, config);
      console.log('Doctor added successfully:', response.data);
      reset(); // Reset the form on success
    } catch (error) {
      console.error('Error adding doctor:', error.response ? error.response.data : error.message);
    }
  };
  
  
  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Doctor</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Specialty Field */}
            <div>
              <label htmlFor="specialty" className="block text-gray-700">Specialty</label>
              <input
                id="specialty"
                type="text"
                {...register('specialty', { required: 'Specialty is required' })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty.message}</p>}
            </div>

            {/* Availability Fields */}
            <div>
              <label className="block text-gray-700">Availability</label>
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-4 mb-2">
                  <select
                    {...register(`availability.${index}.day`, { required: 'Day is required' })}
                    className="w-1/3 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>

                  <input
                    type="time"
                    {...register(`availability.${index}.startTime`, { required: 'Start time is required' })}
                    className="w-1/3 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="time"
                    {...register(`availability.${index}.endTime`, { required: 'End time is required' })}
                    className="w-1/3 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-2 py-1 bg-pink-400 text-white rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ day: 'Monday', startTime: '', endTime: '' })}
                className="px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              >
                Add Availability
              </button>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-gray-700">Doctor Image</label>
              <input
                id="image"
                type="file"
                {...register('image', { required: 'Doctor image is required' })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-pink-400 text-white py-2 px-4 rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              Add Doctor
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
