import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

const Home = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Fetch doctors from the backend
        axios.get('http://localhost:5000/api/doctors')
          .then(response => {
            setDoctors(response.data);
          })
          .catch(error => {
            console.error('Error fetching doctors:', error.response ? error.response.data : error.message);
          });
      }, []);
    
  return (
    <>
      <Navbar/>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Doctors</h1>

        <div className="space-y-6">
          {doctors.map((doctor, index) => (
             <div key={doctor._id} >
            <Link  to ="/appointment" 
              className={`flex items-center mb-5 p-4 rounded-lg shadow-md ${
                index % 2 === 0 ? 'bg-pink-400' : 'bg-purple-400'
              } ${index === 0 && 'mt-4'}`}
            >      
                <img 
                  src={`http://localhost:5000/${doctor.image}`} 
                  alt={doctor.name}
                  className="rounded-full w-24 h-24 object-cover"
                />
              {/* Doctor Info */}
              <div className="w-3/4 ml-4 text-white">
                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <p className="text-lg">{doctor.specialty}</p>
                <div className="mt-2">
                  {doctor.availability.map((slot, idx) => (
                    <p key={idx} className="text-sm">
                      {slot.day}: {slot.startTime} - {slot.endTime}
                    </p>
                  ))}
                </div>
              </div>
            
            </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;
