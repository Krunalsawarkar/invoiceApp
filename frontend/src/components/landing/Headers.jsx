import React, { useState } from "react";
import { useEffect } from "react";
import { FileText, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../layout/ProfileDropdown";
import Button from "../ui/Button";

const Headers = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticate = false;

  const user = { name: "Jhon", email: "johndoe@gmail.com" };
  const navigate = useNavigate();
  const logout = () => {};

  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gray-100 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-[#ff9d5c] flex items-center justify-center">
              <FileText className="text-[#192c38] w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-[#192c38]">Ai Invoice</span>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors  duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#192c38] after:transition-all hover:after:w-full "
            >
              Features
            </a>
            <a
              href="#testimonial "
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors  duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#192c38] after:transition-all hover:after:w-full "
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors  duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#192c38] after:transition-all hover:after:w-full "
            >
              FAQ
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticate ? (
              <ProfileDropdown
                isOpen={profileDropdown}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdown(!profileDropdown);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                onLogout={logout}
              />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-gray-900 font-bold transition-colors  duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#192c38] after:transition-all hover:after:w-full "
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-[#ff822f] to-[#ff9d5b] hover:bg-gray-800 text-[#14242f] px-3 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-[#192c38] hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-50 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#testimonial "
              className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
            >
              FAQ
            </a>
            <div className="border-t border-gray-200 my-2"></div>
            {isAuthenticate ? (
              <div className="p-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="w-full"
                  isLoading={false}
                >
                  Go to Dashboard
                </Button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-left bg-[#ff9d5c] hover:bg-[#FE7F2D] hover:shadow-lg font-semibold text-[#233D4D] px-4 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Headers;
