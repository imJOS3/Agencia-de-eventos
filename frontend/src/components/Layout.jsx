// src/components/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6">ERP Eventos</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
        <Link to="/clientes" className="text-gray-700 hover:text-blue-500">Clientes</Link>
        <Link to="/eventos" className="text-gray-700 hover:text-blue-500">Eventos</Link>
        <Link to="/inventario" className="text-gray-700 hover:text-blue-500">Inventario</Link>
        <Link to="/facturacion" className="text-gray-700 hover:text-blue-500">Facturación</Link>
        <Link to="/proveedores" className="text-gray-700 hover:text-blue-500">Proveedores</Link>
        <Link to="/calendario" className="text-gray-700 hover:text-blue-500">calendario</Link>
        <Link to="/login" className="text-gray-700 hover:text-red-500 mt-10">Cerrar sesión</Link>
      </nav>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
