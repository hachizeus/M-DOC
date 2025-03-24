import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my mt-40 text-sm'>
                {/*----Left side---- */}
                <div>
                    <img className='mb-1 w-20' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Reliance Hospital Limited is a recognized Healthcare services delivery institution which envisages that our clients appreciate products and services built around their unique needs and provided by professionals with deep expertise in their talents and local markets.</p>
                </div>
                {/*----Center side---- */}
                <div>
                    <p className='text-xl font-medium mb-5'>Visiting Hours</p>
                    <ul className='flex flex-col gap-2 text-gray-600 '>
                        <li>06:00am – 7:00am</li>
                        <li>11:00am – 01:00pm</li>
                        <li>04:00pm – 06:00pm</li>
                    </ul>
                </div>
                {/*----Right side---- */}
                <div>
                    <p className='text-xl font-medium mb-5'>Contacts</p>
                    <ul className='flex flex-col gap-2 text-gray-600 '>
                        <li>info@thereliancehospital.co.ke</li>
                        <li>+254 792 777 111</li>
                        <li>+254 792 050 505</li>
                        <li>P.0 Box 4166 - 00506 Nairobi</li>
                        <li>Ole Shapara Avenue Junction, South C, NRB.</li>
                    </ul>

                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright © 2025 Reliance Hospital </p>

            </div>
        </div>
    )
}

export default Footer