// src/components/Sidebar.tsx
import React, { useState } from "react";
import { FaFileAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Button";

const Sidebar: React.FC = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menu = [{ name: "Dashboard", icon: <FaFileAlt />, to: "/" }];

  return (
    <>
      {/* Top bar for mobile (<1100px) */}
      <div className="lg1100:hidden flex items-center justify-between bg-white border-b px-4 py-2 shadow fixed top-0 left-0 right-0 z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-700 focus:outline-none"
        >
          <FaBars />
        </button>
        <img
          src="https://i.imgur.com/LlEguS5.png"
          alt="SDNP Logo"
          className="h-8"
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r shadow-md z-30 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        w-64 lg1100:translate-x-0 lg1100:w-64`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-center h-16 border-b">
          <img
            src="https://i.imgur.com/LlEguS5.png"
            alt="SDNP Logo"
            className="h-10"
          />
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

            {/* Logout Button */}
            <li>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-4 px-4 py-2 rounded-md font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <span className="text-lg">
                  <FaSignOutAlt />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Modal Logout */}
      <Modal
        visible={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Konfirmasi Logout
          </h2>
          <p className="text-gray-600 mb-8">Apakah Anda yakin ingin keluar?</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsLogoutModalOpen(false)}
              text="Tidak"
              styleType="secondary"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
