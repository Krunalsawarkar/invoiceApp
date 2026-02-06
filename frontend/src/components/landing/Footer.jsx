import React from "react";
import { Link } from "react-router-dom";
import { FileText, Twitter, Github, Linkedin } from "lucide-react";

const FooterLink = ({ to, children }) => (
  <Link to={to} className="text-gray-400 hover:text-white transition-colors">
    {children}
  </Link>
);

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-[#233D4D] rounded-lg flex items-center justify-center hover:bg-[#FE7F2D] transition-all"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-[#FE7F2D] p-2 rounded-lg">
                <FileText className="w-6 h-6 text-[#233D4D]" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                AI Invoice App
              </span>
            </Link>
            <p className="text-gray-400">
              The smartest way to create and send professional invoices.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink to="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Social
            </h3>
            <div className="flex space-x-4">
              <SocialLink href="#">
                <Twitter className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#">
                <Github className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#">
                <Linkedin className="w-5 h-5" />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Invoicify AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
