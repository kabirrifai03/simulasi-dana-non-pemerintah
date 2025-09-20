// src/components/Sidebar.tsx
import React, { useState } from "react";
import {  FaBars, FaHome,  FaExclamationTriangle, FaCheckSquare, FaWallet, FaCalculator } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Button";

const Sidebar: React.FC = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <FaHome />, to: "/" },
    { name: "Simulasi Risiko", icon: <FaExclamationTriangle />, to: "/simulasi-risiko" },
    { name: "Simulasi Kelayakan Umum", icon: <FaCheckSquare />, to: "/simulasi-kelayakan-umum" },
    { name: "Simulasi Kelayakan Ekonomis", icon: <FaWallet />, to: "/SimulasiKelayakanEkonomis" },
    { name: "Simulasi Hitung Dampak Sosial", icon: <FaCalculator />, to: "/SimulasiDampakSosial" },

    
  ];


  return (
    <>
    {/* Top bar for mobile (<1100px) */}
    <div className="lg1100:hidden flex items-center justify-between bg-white border-b px-4 py-5 shadow fixed top-0 left-0 right-0 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-gray-700 focus:outline-none"
      >
        <FaBars />
      </button>


    </div>


      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r shadow-md z-30 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        w-64 lg1100:translate-x-0 lg1100:w-64`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-center h-20 border-b gap-4">
          <a href="/" className="flex items-center gap-4">
            <img
              src="https://i.imgur.com/LlEguS5.png"
              alt="SDNP Logo"
              className="h-12"
            />
            <img
              src="https://i.imgur.com/cYtXjUk.png"
              alt="Badan Pangan Nasional Logo"
              className="h-10"
            />
          </a>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <ul className="flex flex-col gap-2 p-4">
            {menu.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-2 rounded-md font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setIsOpen(false)} // close sidebar after click (mobile)
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
