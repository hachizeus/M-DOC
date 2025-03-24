import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-info">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Contact <span className="text-blue-600">US</span>
        </h2>
    
        <a 
          href="https://www.google.com/maps/place/Reliance+Hospital+Limited/@-1.3156134,36.8228376,17z/data=!3m1!4b1!4m6!3m5!1s0x182f11ac78903779:0x3bfc81e0b750b54e!8m2!3d-1.3156134!4d36.8254125!16s%2Fg%2F11gdy6k_2y?entry=ttu"
          target="_blank" 
          rel="noopener noreferrer"
        >
          
        </a>
      </div>

      <div className="map-container">
        <iframe
          title="Reliance Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7665634231303!2d36.822837573585346!3d-1.3156134356559825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11ac78903779%3A0x3bfc81e0b750b54e!2sReliance%20Hospital%20Limited!5e0!3m2!1sen!2ske!4v1741155180028!5m2!1sen!2ske"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <h2 className='className="text-xl font-semibold text-gray-800 mb-3'>Our Quick Contacts</h2>
          <p className='text-gray-500'>+254 792 777 111</p>
          <p className='text-gray-500'>+254 792 050 505</p>
          <p className='text-gray-500'>+254 722 818 066</p>
          <p className='text-gray-500'>P.O Box 4166 - 00506 Nairobi</p>
        </div>
      </div>
    </div>
  )
}

export default Contact