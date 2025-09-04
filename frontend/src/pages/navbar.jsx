import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold">Mi Panel</h1>
        <ul className="flex gap-6">
          <li className="hover:text-gray-200 cursor-pointer">Inicio</li>
          <li className="hover:text-gray-200 cursor-pointer">Eventos</li>
          <li className="hover:text-gray-200 cursor-pointer">Clientes</li>
          <li className="hover:text-gray-200 cursor-pointer">Inventario</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
