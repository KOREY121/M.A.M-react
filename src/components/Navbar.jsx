import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition duration-500 ease-in-out px-6 py-4 flex justify-between items-center ${
        isScrolled ? 'bg-gray-800 text-white shadow-md' : 'bg-white text-gray-800'
      }`}
    >
      <Link to="/" className="text-xl font-bold">
        🍴 KOREY'S KITCHEN
      </Link>
      
      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex gap-6 items-center flex-col md:flex-row bg-gray-800 md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto p-6 md:p-0 text-white ${
          isScrolled ? 'md:text-white' : 'md:text-gray-800'
        }`}
      >
        <li>
          <Link to="/" className="hover:text-orange-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-orange-400">
            About
          </Link>
        </li>
        <li>
          <Link to="/menu" className="hover:text-orange-400">
            Menu
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-orange-400">
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="bg-teal-300 hover:bg-teal-400 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
