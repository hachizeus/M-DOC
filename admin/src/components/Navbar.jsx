import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/adminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/doctorContext';

const NavBar = () => {
    const { aToken, setAToken } = useContext(AdminContext); // Access context
    
    const {dToken, setDToken} = useContext(DoctorContext)
    const navigate = useNavigate()


    const handleLogout = () => {
        navigate('/')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
        localStorage.removeItem('aToken'); // Remove token from local storage
        setAToken(''); // Clear the token in context
    };

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Logo" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>
            <button onClick={handleLogout} className='text-sm text-red-500'>Logout</button>
        </div>
    );
}

export default NavBar;