import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>kOREY'Skitchen@gmail.com</li>
            <li>+234 70105 62579</li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-orange-400">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400">
                Contact us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                User Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                Terms
              </a>
            </li>
          </ul>
        </div>

        {/* Locations Section */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Locations</h3>
          <ul className="space-y-2 text-sm max-h-48 overflow-y-auto pr-2">
            <li>Lekki</li>
            <li>Ikoyi</li>
            <li>Victoria Island</li>
            <li>Marina</li>
            <li>Yaba</li>
            <li>Ikeja</li>
            <li>Egbeda</li>
          </ul>
        </div>

        {/* Restaurants Section */}
        <div className="col-span-2">
          <h3 className="text-lg font-bold text-white mb-4">Restaurants</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li>kOREY'S Kitchen, Lekki</li>
              <li>kOREY'S Kitchen, Ikoyi</li>
              <li>kOREY'S Kitchen, V.I</li>
              <li>kOREY'S Kitchen, Marina</li>
              <li>kOREY'S Kitchen, Yaba</li>
              <li>kOREY'S Kitchen, Egbeda</li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400">
              🌐
            </a>
            <a href="#" className="hover:text-orange-400">
              📘
            </a>
            <a href="#" className="hover:text-orange-400">
              🐦
            </a>
            <a href="#" className="hover:text-orange-400">
              📸
            </a>
            <a href="#" className="hover:text-orange-400">
              ▶️
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © 2025 kOREY'S kitchen. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
