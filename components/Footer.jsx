import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        
        {/* Project Name & Tagline */}
        <h2 className="text-xl font-semibold">ProductApp</h2>
        <p className="text-gray-400 text-sm mt-1">
          Manage, list, and showcase my products efficiently.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <FaGithub size={18} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} ProductApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
