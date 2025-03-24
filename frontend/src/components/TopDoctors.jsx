import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    // Define the specialties you want to filter by
    const specialtiesToShow = ['Gynecologist', 'General Physician', 'Pediatricians'];

    // Filter doctors based on specialty
    const filteredDoctors = doctors.filter(item => 
         specialtiesToShow.includes(item.speciality)
    );

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Browse through our extensive list of professional doctors with ease.</p>
            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {filteredDoctors.slice(0, 10).map((item, index) => (
                    <div
                    onClick={() => {
                      if (item.available) {
                        navigate(`/appointment/${item._id}`);
                      } else {
                        alert('Cannot book unavailable doctor');
                      }
                    }}
                    className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                    key={item._id} // Use unique id as key
                  >
                        <img className='bg-blue-100' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className= {`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                                <p>{item.available ? 'Available':'Not Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate('/doctors')} className='bg-blue-200 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
        </div>
    );
}

export default TopDoctors;