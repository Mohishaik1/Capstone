import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ImageSlider from "../components/ImageSlider";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Register } from "./index";

// Import local images
import kaaba1 from "../assets/Images/HeroImages/Kabaa 1.jpg";
import kaaba2 from "../assets/Images/HeroImages/Kaaba 2.jpg";
import kaaba3 from "../assets/Images/HeroImages/Kaaba 3.jpg";
import madina1 from "../assets/Images/HeroImages/Madina 1.jpg";
import madina3 from "../assets/Images/HeroImages/Madina 3.jpg";

//Slider Images
import services from "../assets/Images/SliderImages/services.gif";

// Local videos
import hero from "../assets/videos/hero.mp4";

function Home() {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Animation state
  const [isVisible, setIsVisible] = useState({
    mainContent: false,
    features: false,
    cta: false,
  });

  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const fullText = "Experience The Journey Of a Lifetime";

  // Refs for scroll animations
  const mainContentRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.dataset.section;
          if (targetId) {
            setIsVisible((prev) => ({ ...prev, [targetId]: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const elements = [
      { ref: mainContentRef, id: "mainContent" },
      { ref: featuresRef, id: "features" },
      { ref: ctaRef, id: "cta" },
    ];

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      elements.forEach(({ ref, id }) => {
        if (ref.current) {
          ref.current.dataset.section = id;
          observer.observe(ref.current);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      elements.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Typewriter effect with looping
  useEffect(() => {
    if (!isVisible.mainContent) return;

    if (isPaused) {
      // Pause before starting next action
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        if (typewriterText.length === fullText.length) {
          setIsDeleting(true);
        } else {
          setIsDeleting(false);
        }
      }, 2000); // Pause duration (2 seconds)
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && typewriterText.length < fullText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setTypewriterText(fullText.slice(0, typewriterText.length + 1));
      }, 80); // Typing speed
      return () => clearTimeout(timeout);
    } else if (!isDeleting && typewriterText.length === fullText.length) {
      // Finished typing, pause before deleting
      setIsPaused(true);
    } else if (isDeleting && typewriterText.length > 0) {
      // Deleting backward
      const timeout = setTimeout(() => {
        setTypewriterText(fullText.slice(0, typewriterText.length - 1));
      }, 50); // Deleting speed (faster than typing)
      return () => clearTimeout(timeout);
    } else if (isDeleting && typewriterText.length === 0) {
      // Finished deleting, pause before typing again
      setIsPaused(true);
    }
  }, [isVisible.mainContent, typewriterText, isDeleting, isPaused, fullText]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Cursor blink speed
    return () => clearInterval(cursorInterval);
  }, []);

  // Local images for the slider, can be changed if needed.
  const sliderImages = [
    {
      src: kaaba1,
      alt: "Kaaba at day",
      caption: "Sacred Journey to Mecca",
      description:
        "Experience the spiritual journey of Hajj and Umrah with Al-Hateem",
    },
    {
      src: kaaba2,
      alt: "Kaaba view",
      caption: "The Holy Kaaba",
      description:
        "The most sacred site in Islam, the direction of prayer for Muslims worldwide",
    },
    {
      src: madina1,
      alt: "Prophet's Mosque",
      caption: "Visit the Prophet's Mosque",
      description: "Pay your respects at the Prophet's Mosque in Medina",
    },
    // {
    //   src: madina2,
    //   alt: "Medina Mosque",
    //   caption: "Beautiful Medina",
    //   description: "Experience the peace and tranquility of the Prophet's city"
    // },
    {
      src: kaaba3,
      alt: "Kaaba architecture",
      caption: "Islamic Heritage",
      description: "Discover the beautiful Islamic architecture and heritage",
    },
    {
      src: madina3,
      alt: "Medina landscape",
      caption: "Spiritual Journey",
      description: "Embark on a journey of faith and spiritual growth",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .initial-hidden {
          opacity: 0;
        }

        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: currentColor;
          margin-left: 4px;
          animation: blink 1s infinite;
          vertical-align: text-bottom;
          
        }
      `}</style>

      <div className="min-h-screen bg-white font-extrabold">
        {/* Modern Navigation */}
        <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white-200 opacity-80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 via-emerald-400 to-green-700 rounded-lg flex items-center justify-center animate-pulse shadow-lg shadow-green-500/50">
                    <span className="text-white font-bold text-lg">AH</span>
                  </div>
                </div>
                <div className="ml-3 relative">
                  <h1
                    className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-400 via-yellow-400 to-green-600 drop-shadow-sm"
                    style={{
                      backgroundSize: "200% auto",
                      animation: "shimmer 3s linear infinite",
                    }}
                  >
                    Al-Hateem Haj-Umrah
                  </h1>
                  {/* Sparkle effect */}
                  <span
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s ease-in-out infinite",
                      mixBlendMode: "overlay",
                    }}
                  ></span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link
                    to="/"
                    className="text-black-700 hover:text-green-600 hover:bg-black px-3 py-2 rounded-md text-sm font-extrabold transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    to="/packages"
                    className="text-black-700 hover:text-green-600 hover:bg-black px-3 py-2 rounded-md text-sm font-extrabold transition-colors duration-200"
                  >
                    Packages
                  </Link>
                  <Link
                    to="/contact"
                    className="text-black-700 hover:text-green-600 hover:bg-black px-3 py-2 rounded-md text-sm font-extrabold transition-colors duration-200"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/login"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Admin Login
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/packages"
                    className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Packages
                  </Link>
                  <Link
                    to="/contact"
                    className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    to="/login"
                    className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section with Image Slider */}

        <section className="relative animate-fade-in-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ImageSlider
              images={sliderImages}
              autoPlay={true}
              interval={5000}
            />
          </div>
        </section>

         <section className="flex justify-center items-center mt-10">
          <div className="">
            <img src={services} alt="our services" />
             </div>
        </section>


        {/* Main Content Section */}
        <section
          ref={mainContentRef}
          className="py-20 bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-16 ${
                isVisible.mainContent ? "animate-fade-in-up" : "initial-hidden"
              }`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-center justify-center">
                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 bg-clip-text text-transparent">
                  {typewriterText}
                  {isVisible.mainContent && showCursor && (
                    <span className="typewriter-cursor bg-green-600"></span>
                  )}
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl ml-2 inline-block animate-float">
                  💫
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Embark on a spiritual journey to the holy lands of Mecca and
                Medina with our expertly crafted Hajj and Umrah packages. We
                provide comprehensive services to make your pilgrimage
                comfortable and meaningful.
              </p>
            </div>

            

            {/* Video Section */}
            <div
              className={`max-w-4xl mx-auto ${
                isVisible.mainContent
                  ? "animate-scale-in delay-300"
                  : "initial-hidden"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-pulse-glow">
                <div className="aspect-video">
                  <video
                    src={hero}
                    controls
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover"
                    poster={kaaba1}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-16 ${
                isVisible.features ? "animate-fade-in-up" : "initial-hidden"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Al-Hateem?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive services to make your spiritual journey
                comfortable and memorable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div
                className={`text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                  isVisible.features
                    ? "animate-fade-in-left delay-200"
                    : "initial-hidden"
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform transition-transform duration-500 hover:rotate-360 hover:scale-110">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Expert Guidance
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our experienced Islamic scholars and Hajj guides accompany you
                  throughout your journey, ensuring proper rituals and spiritual
                  fulfillment. We provide comprehensive guidance for all Hajj
                  and Umrah rites.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className={`text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                  isVisible.features
                    ? "animate-fade-in-up delay-400"
                    : "initial-hidden"
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform transition-transform duration-500 hover:rotate-360 hover:scale-110">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Premium Accommodation
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Comfortable hotels near the holy sites with modern amenities,
                  ensuring your rest and comfort during the pilgrimage.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className={`text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                  isVisible.features
                    ? "animate-fade-in-right delay-600"
                    : "initial-hidden"
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform transition-transform duration-500 hover:rotate-360 hover:scale-110">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  24/7 Support
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Round-the-clock assistance and support throughout your
                  journey, ensuring peace of mind for you and your family.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Promotion Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
                <span className="px-4 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                  ✨ Why Al-Hateem
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Your Trusted Pilgrimage Partner
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full"></div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100 transform hover:scale-[1.02] transition-all duration-500">
              <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 p-1">
                <div className="bg-white p-8 sm:p-10 md:p-12 rounded-3xl">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                        Experience the{" "}
                        <span className="font-bold text-green-700">
                          sacred journey of a lifetime
                        </span>{" "}
                        with Al-Hateem Hajj & Umrah Services, your trusted
                        partner for seamless pilgrimage arrangements.
                      </p>
                    </div>
                  </div>

                  {/* Key Features Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">💰</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">
                          Affordable Packages
                        </h4>
                        <p className="text-sm text-gray-600">
                          Budget-friendly options without compromising quality
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">🏨</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">
                          Premium Accommodations
                        </h4>
                        <p className="text-sm text-gray-600">
                          Comfortable stays near holy sites
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">🤝</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">
                          24/7 Support
                        </h4>
                        <p className="text-sm text-gray-600">
                          Reliable assistance throughout your journey
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">⭐</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">
                          Years of Experience
                        </h4>
                        <p className="text-sm text-gray-600">
                          Deep commitment to excellence
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="text-center">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                      Al-Hateem ensures that every pilgrim performs their rites
                      with{" "}
                      <span className="font-semibold text-green-700">
                        peace of mind
                      </span>{" "}
                      and{" "}
                      <span className="font-semibold text-green-700">
                        complete devotion
                      </span>
                      . Begin your journey to Makkah and Madinah today.
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <span className="text-2xl">🕋</span>
                      <span>Where Faith Meets Flawless Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-green-600">100+</div>
                <div className="text-sm text-gray-600">Happy Pilgrims</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-2">📦</div>
                <div className="text-2xl font-bold text-blue-600">Affordable</div>
                <div className="text-sm text-gray-600">Tour Packages</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-purple-600">4.9/5</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-orange-600">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="py-20 bg-gradient-to-r from-green-600 to-green-700 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 ${
                isVisible.cta ? "animate-fade-in-down" : "initial-hidden"
              }`}
            >
              Ready to Begin Your Spiritual Journey?
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto ${
                isVisible.cta
                  ? "animate-fade-in-up delay-200"
                  : "initial-hidden"
              }`}
            >
              Join thousands of pilgrims who have trusted Al-Hateem for their
              Hajj and Umrah journeys
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${
                isVisible.cta ? "animate-scale-in delay-400" : "initial-hidden"
              }`}
            >
              <Link
                to="/packages"
                className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              >
                View Packages
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">AH</span>
                  </div>
                  <h3 className="text-xl font-bold">Al-Hateem Haj-Umrah</h3>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  Your trusted partner for Hajj and Umrah journeys. We provide
                  comprehensive services to make your spiritual journey
                  comfortable and meaningful.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/packages"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Packages
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  {/* <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Book Now</Link></li> */}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2 text-gray-400">
                  <p>📧 alhateem.vja@gmail.com</p>
                  <p>📞 +91 9908667187</p>
                  <p>📍 Vijayawada, Andhra Pradesh</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 Al-Hateem Haj-Umrah. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
