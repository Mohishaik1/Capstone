//Modules
import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";

//Images
import makkaImages from '../assets/Images/ZiyaratImages/Makka ziyarat images';
import madinaImages from '../assets/Images/ZiyaratImages/Madina ziyarat places';



const Packages = () => {
  const [plans, setPlans] = useState([]);
  const [visibleElements, setVisibleElements] = useState({});

  useEffect(()=>{
    async function fetchPackages(){
      try {
        const {data} = await axios.get('http://localhost:5500/api/user/addpackages')
        setPlans(data);
        // console.log(plans);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, []);

  // Intersection Observer for sliding animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.dataset.animateId;
          if (elementId) {
            setVisibleElements((prev) => ({ ...prev, [elementId]: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all elements with data-animate-id attribute
    const animatedElements = document.querySelectorAll('[data-animate-id]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [plans, makkaImages, madinaImages]);

  // const [packages, addPackages] = useState({
  //   name:'',
  //   days:'',
  //   cost:'',
  //   departure:'',
  //   departureDate:''
  // })`



  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile-Friendly Navigation */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6 sticky top-0 z-10 bg-white/80 backdrop-blur-md w-full py-4 px-4 sm:px-6 rounded-xl shadow-lg mb-6 sm:mb-8 border border-white/50">
          <Link 
            to='/' 
            className="text-gray-800 font-bold text-sm sm:text-base md:text-lg px-5 py-2.5 hover:bg-green-500/20 hover:text-green-700 hover:scale-105 rounded-lg transition-all duration-300 border border-gray-200/50 hover:border-green-500/50"
          >
            Home
          </Link>
          <Link 
            to='/contact' 
            className="text-gray-800 font-bold text-sm sm:text-base md:text-lg px-5 py-2.5 hover:bg-green-500/20 hover:text-green-700 hover:scale-105 rounded-lg transition-all duration-300 border border-gray-200/50 hover:border-green-500/50"
          >
            Contact Us
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-extrabold italic mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            Discover Our Spiritual Journeys
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto px-2">
            Explore our carefully curated Hajj and Umrah packages designed to provide a meaningful and comfortable pilgrimage experience.
          </p>
        </div>
        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              data-animate-id={`package-${index}`}
              className={`bg-white h-150 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border-2 border-gray-100 ${
                visibleElements[`package-${index}`]
                  ? 'translate-x-0 opacity-100'
                  : index % 3 === 0
                  ? '-translate-x-20 opacity-0'
                  : index % 3 === 1
                  ? 'translate-y-20 opacity-0'
                  : 'translate-x-20 opacity-0'
              }`}
            >
              {/* Package Image */}
              {plan.image ? (
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold shadow-lg text-sm sm:text-base">
                    {plan.cost}
                  </div>
                </div>
              ) : (
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold shadow-lg text-sm sm:text-base">
                    {plan.cost}
                  </div>
                </div>
              )}
              
              {/* Package Details */}
              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-3 sm:mb-4 text-center font-extrabold">
                  {plan.name}
                </h2>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <span className="text-gray-600 font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration
                    </span>
                    <span className="text-gray-900 font-bold text-xs sm:text-sm md:text-base">{plan.days} days</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <span className="text-gray-600 font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      From
                    </span>
                    <span className="text-gray-900 font-bold text-xs sm:text-sm md:text-base truncate ml-2">{plan.departure}</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <span className="text-gray-600 font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Departure
                    </span>
                    <span className="text-gray-900 font-bold text-xs sm:text-sm">
                      {plan.departureDate ? new Date(plan.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA'}
                    </span>
                  </div>
                </div>
                {/* Dropdown Button */}
                <button className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-sm sm:text-base">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

       <div className="mt-12 sm:mt-16 mb-12">
        <h2 
          data-animate-id="makka-title"
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold italic mb-6 sm:mb-8 text-center transition-all duration-700 ${
            visibleElements['makka-title']
              ? 'translate-y-0 opacity-100'
              : '-translate-y-10 opacity-0'
          }`}
        >
          ZIYARAT PLACES IN MAKKA
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {makkaImages.map((image, index) => (
            <div
              key={index}
              data-animate-id={`makka-${index}`}
              className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border-2 border-gray-100 ${
                visibleElements[`makka-${index}`]
                  ? 'translate-x-0 translate-y-0 opacity-100'
                  : index % 4 === 0 || index % 4 === 2
                  ? '-translate-x-20 opacity-0'
                  : 'translate-x-20 opacity-0'
              }`}
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">
                  {image.name}
                </h3>
                {image.description && (
                  <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
       </div>

       <div className="mt-12 sm:mt-16 mb-12">
        <h2 
          data-animate-id="madina-title"
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold italic mb-6 sm:mb-8 text-center transition-all duration-700 ${
            visibleElements['madina-title']
              ? 'translate-y-0 opacity-100'
              : '-translate-y-10 opacity-0'
          }`}
        >
          ZIYARAT PLACES IN MADINA
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {madinaImages.map((image, index) => (
            <div
              key={index}
              data-animate-id={`madina-${index}`}
              className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border-2 border-gray-100 ${
                visibleElements[`madina-${index}`]
                  ? 'translate-x-0 translate-y-0 opacity-100'
                  : index % 4 === 0 || index % 4 === 2
                  ? '-translate-x-20 opacity-0'
                  : 'translate-x-20 opacity-0'
              }`}
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">
                  {image.name}
                </h3>
                {image.description && (
                  <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
       </div>

        {/* Packages Include Section */}
        <div className="text-center mt-8 sm:mt-12">
          <h2 
            data-animate-id="packages-include-title"
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold italic mb-6 sm:mb-8 transition-all duration-700 ${
              visibleElements['packages-include-title']
                ? 'translate-y-0 opacity-100'
                : '-translate-y-10 opacity-0'
            }`}
          >
            Our Packages Include
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            <div 
              data-animate-id="include-0"
              className={`bg-white border-2 border-green-100 rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-700 ${
                visibleElements['include-0']
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-left text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  Comprehensive travel arrangements including flights, accommodation, and local transportation.
                </p>
              </div>
            </div>
            
            <div 
              data-animate-id="include-1"
              className={`bg-white border-2 border-blue-100 rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-700 ${
                visibleElements['include-1']
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-20 opacity-0'
              }`}
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-left text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  Guided tours of significant religious sites with knowledgeable guides.
                </p>
              </div>
            </div>
            
            <div 
              data-animate-id="include-2"
              className={`bg-white border-2 border-purple-100 rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-700 ${
                visibleElements['include-2']
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-20 opacity-0'
              }`}
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-left text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  24/7 customer support to assist you throughout your journey.
                </p>
              </div>
            </div>
            
            <div 
              data-animate-id="include-3"
              className={`bg-white border-2 border-orange-100 rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-700 ${
                visibleElements['include-3']
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-left text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  All necessary permits and documentation for a hassle-free experience.
                </p>
              </div>
            </div>
            
            <div 
              data-animate-id="include-4"
              className={`bg-white border-2 border-pink-100 rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-700 ${
                visibleElements['include-4']
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-20 opacity-0'
              }`}
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-left text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  Culturally immersive experiences to enrich your pilgrimage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;
