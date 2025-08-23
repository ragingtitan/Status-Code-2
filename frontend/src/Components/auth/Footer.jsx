import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Brand & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold ">Job <span className="text-yellow-400">Force</span></h2>
          <p className="mt-2 text-gray-400">Your AI-powered job search assistant.</p>
          <p className="mt-1 text-gray-500 text-sm">© {new Date().getFullYear()} JobForce AI. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 md:mt-0 flex space-x-8">
          <a href="/features" className="text-gray-300 hover:text-yellow-400 transition duration-300">Features</a>
          <a href="/about" className="text-gray-300 hover:text-yellow-400 transition duration-300">About</a>
          <a href="/contact" className="text-gray-300 hover:text-yellow-400 transition duration-300">Contact</a>
          <a href="/privacy" className="text-gray-300 hover:text-yellow-400 transition duration-300">Privacy Policy</a>
        </div>

        {/* Social Icons */}
        <div className="mt-6 md:mt-0 flex space-x-5">
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300 text-2xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300 text-2xl">
            <FaLinkedin />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300 text-2xl">
            <FaGithub />
          </a>
          <a href="mailto:support@jobforce.ai" className="text-gray-400 hover:text-yellow-400 transition duration-300 text-2xl">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-10 left-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
