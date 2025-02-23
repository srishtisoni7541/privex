import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100vh", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
