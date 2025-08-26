import React from "react";

interface HeaderProps {
  name?: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <header className="bg-white px-4 py-3 lg1100:px-6 lg1100:py-6 shadow-md">
      {/* Hanya tampil di layar >=1100px */}
      <h1 className="hidden lg1100:block text-xl font-bold text-gray-800">
        Selamat Datang di Simulasi Dana Non Pemerintah 👋
      </h1>

      {/* Name masih bisa muncul (misalnya "Simulasi KPBU") */}
      {name && (
        <p className="text-sm lg1100:text-base text-gray-600 mt-1">
          {name}
        </p>
      )}
    </header>
  );
};

export default Header;
