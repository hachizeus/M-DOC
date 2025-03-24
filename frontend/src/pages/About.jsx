import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          About <span className="text-blue-600">Reliance Hospital</span>
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
        {/* Image Section */}
        <div className="rounded-lg shadow-xl overflow-hidden">
          <img 
            src={assets.about_image} 
            alt="Hospital Facility" 
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-8">
          <p className="text-gray-600 leading-relaxed">
            Reliance Hospital Limited is a recognized healthcare institution committed to delivering 
            personalized services through local expertise and global standards.
          </p>

          {/* Mission Section */}
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide community-focused healthcare through quality services, professional integrity, 
              and active participation in Universal Healthcare initiatives.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be East Africa's leading healthcare provider through innovative solutions, 
              sustainable practices, and exemplary patient care.
            </p>
          </div>

          {/* Core Values */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Core Values</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Patient-Centered Care', 'Professional Integrity', 'Team Collaboration', 
                'Innovative Solutions', 'Community Focus', 'Continuous Improvement'].map((value, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  {value}
                </li>
              ))}
            </ul>
          </div>

          {/* Mandate Section */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mandate</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Provide quality healthcare to Nairobi County and surrounding regions</li>
              <li>Collaborate with health organizations to promote community wellness</li>
              <li>Maintain position as the preferred healthcare provider in the region</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Why <span className="text-blue-600">Choose Us</span>
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-12" />
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Efficiency",
              content: "Streamlined appointment scheduling that fits into your busy lifestyle."
            },
            {
              title: "Convenience",
              content: "Access to a network of trusted healthcare professionals in your area."
            },
            {
              title: "Personalization",
              content: "Tailored recommendations and reminders to help you stay on top of your health."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="border border-gray-200 p-8 rounded-xl hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group cursor-pointer"
            >
              <div className="space-y-4 group-hover:text-white">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-blue-50">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;