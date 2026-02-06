import React from "react";
import { Link } from "react-router-dom";
import DashboardImg from "../../assets/dashboard.png";

const Hero = () => {
  const isAuthenticated = false;
  return (
    <section className="relative bg-[#fbfbfb] overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[60px_60px]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FE7F2D] leading-tight">
            AI Powered Invoicing, Made Effortless
          </h1>
          <p className=" text-base sm:text-xl text-[#233D4D] mb-8 leading-relaxed max-w-3xl mx-auto">
            Let our AI create invoices from simple text, generate payment
            reminders, and provide smart insights to help you manage your
            finances
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {isAuthenticated ? (
              <Link
                className="bg-gradient-to-r from-[#ff822f] to-[#ff9d5b] text-[#14242f] px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-900 transition-all duration-200 hover:scale-105 hover:shadow-2xl transform"
                to="/dashboard"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-gradient-to-r from-[#ff822f] to-[#ff9d5b] text-[#14242f] px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-900 transition-all duration-200 hover:scale-105 hover:shadow-2xl transform"
              >
                Get Started for free
              </Link>
            )}
            <a
              href="#features"
              className="border-2 border-[#14242f] text-[#14242f] px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-black transition-all duration-200 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 relative max-w-5xl mx-auto">
          {/* Insert image here */}
          <img
            src={DashboardImg}
            alt=""
            className="rounded-2xl shadow-2xl shadow-gray-300 border-4 border-gray-200/20 mx-auto block"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
