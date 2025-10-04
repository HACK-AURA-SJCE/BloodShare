import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, MapPin, Clock } from "lucide-react";
const sliderImages = [
  "/images/image4.png",
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png"

];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  {/* Add Nearby Link */}
{/* <Link
  to="/nearby"
  className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
>
  Nearby
</Link> */}
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sliderImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Save Lives with{" "}
                <span className="text-red-400"> BloodConnect</span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-200">
                Connect donors with hospitals instantly. Join our community of
                life-savers and make blood donation easier, faster, and more
                efficient.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Become a Donor
              </Link>
              <Link
                to="/signup"
                className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-50 transition-all"
              >
                Register Hospital
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">10,000+</div>
                <div className="font-medium text-gray-200">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">500+</div>
                <div className="font-medium text-gray-200">
                  Partner Hospitals
                </div>
              </div>
            </div>
          </div>

          {/* Right visual card */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent"></div>

              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
                  <Heart className="w-10 h-10 text-white" fill="white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 text-center">
                  Every 2 seconds, someone needs blood
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">
                      Community
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Link to="/nearby">
                      <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">
                        Nearby
                      </div>
                    </Link>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">
                      Instant
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  );
};

export default HeroSection;
