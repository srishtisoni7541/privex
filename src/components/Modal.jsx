import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
      <motion.div
        initial={{ y: "-50vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-50vh", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl p-6 w-full max-w-lg relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-white bg-gray-300 hover:bg-red-500 p-2 rounded-full transition-all"
        >
          ✖
        </button>

        {/* Modal Content */}
        <div className="text-gray-800 text-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
