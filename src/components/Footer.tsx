// src/components/Footer.tsx
'use client';

import { Instagram, Facebook, Twitter, Mail, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: 3 Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3">
            {/* Company */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-orange-500 transition">About us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Team</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Careers</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-orange-500 transition">Help & Support</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Partner with us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Ride with us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-orange-500 transition">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Refund & Cancellation</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* MIDDLE: Empty Space */}
          <div className="lg:col-span-1"></div>

          {/* RIGHT: Follow Us + Subscribe */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-lg mb-6">FOLLOW US</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm mb-6">Receive exclusive offers in your mailbox</p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your email"
                  className="w-full pl-14 pr-6 py-5 bg-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-sm hover:from-yellow-400 hover:to-orange-400 transition shadow-lg hover:shadow-orange-500/50 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="text-green-400 text-sm mt-4 animate-pulse">
                Thank you! You're subscribed
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>All rights Reserved © FoodWagen, 2025</p>
          <p className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Me
          </p>
        </div>
      </div>
    </footer>
  );
}