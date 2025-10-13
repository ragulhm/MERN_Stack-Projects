
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-light text-white mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Popular Categories</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><a href="#" className="hover:text-accent">Cars</a></li>
              <li><a href="#" className="hover:text-accent">Flats for rent</a></li>
              <li><a href="#" className="hover:text-accent">Mobile Phones</a></li>
              <li><a href="#" className="hover:text-accent">Jobs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Trending Locations</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><a href="#" className="hover:text-accent">New York</a></li>
              <li><a href="#" className="hover:text-accent">Los Angeles</a></li>
              <li><a href="#" className="hover:text-accent">Chicago</a></li>
              <li><a href="#" className="hover:text-accent">Houston</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">About Us</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><a href="#" className="hover:text-accent">About AdPlaza Group</a></li>
              <li><a href="#" className="hover:text-accent">Careers</a></li>
              <li><a href="#" className="hover:text-accent">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Follow Us</h3>
            <div className="flex space-x-4">
                <a href="#" className="hover:text-accent">F</a>
                <a href="#" className="hover:text-accent">T</a>
                <a href="#" className="hover:text-accent">I</a>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary mt-8 pt-4 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AdPlaza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
