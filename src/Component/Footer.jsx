"use client"
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Information */}
        <div>
          <h1 className="text-2xl font-bold text-blue-500">
            ReSellHub
          </h1>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            A modern resell marketplace where users can buy, sell, and grow their business seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer">Resell Application</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact</h2>

          <div className="space-y-3 text-gray-400 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </p>

            <p className="flex items-center gap-2">
              <FaPhone /> +880 1XXXXXXXXX
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope /> support@resellhub.com
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>

          <div className="flex gap-4 text-xl">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-sky-400"
            >
              <FaTwitter />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ReSellHub. All rights reserved.
      </div>
    </motion.footer>
  );
}