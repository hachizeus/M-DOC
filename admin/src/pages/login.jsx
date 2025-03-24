import React, { useState, useContext } from 'react'; // Ensure useContext is imported
import { assets } from '../assets/assets';
import { AdminContext } from '../context/adminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/doctorContext';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState(''); // Fixed typo from 'emai' to 'email'
    const [password, setPassword] = useState('');
    const { setAToken, backendUrl } = useContext(AdminContext);

    const { setDToken } = useContext(DoctorContext);


    const onSubmitHandler = async (event) => { // Fixed parameter name from 'even' to 'event'
        event.preventDefault(); // Correctly prevent default form submission
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password }); 
                if (data.success) {
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token);
                    console.log("Context token set:", data.token);
                     
                }else{
                    toast.error(data.message)
                }
            } else {
                // Handle Doctor login if needed
                const {data} = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token);
                    console.log("Context token set:", data.token);
                     
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
           
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-95 bg-white shadow-md rounded-lg w-full max-w-sm'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login
                </p>
                <div className='w-full'>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        type="email"
                        required
                        className='border border-[#DADADA] rounded w-full p-2'
                    />
                </div>
                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700'>Password</label>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        type="password"
                        required
                        className='border border-[#DADADA] rounded w-full p-2'
                    />
                </div>
                <button
                    type='submit'
                    className='bg-primary text-white w-full py-2 rounded-md text-base'
                >
                    Login
                </button>

                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                        : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    );
}

export default Login;