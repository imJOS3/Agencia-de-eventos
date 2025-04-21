import { useState } from "react";
import Layout from "../components/Layout";

export default function Clientes() {
  const [showModal, setShowModal] = useState(false);

  const clientes = [
    {
      id: 1,
      nombre: "Ana Martínez",
      correo: "ana.martinez@example.com",
      telefono: "3124567890",
      ciudad: "Bogotá",
      registrado: "2025-04-01",
    },
    {
      id: 2,
      nombre: "Julián Torres",
      correo: "julian.torres@example.com",
      telefono: "3001234567",
      ciudad: "Medellín",
      registrado: "2025-03-15",
    },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          + Agregar Cliente
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Correo</th>
              <th className="px-6 py-4">Teléfono</th>
              <th className="px-6 py-4">Ciudad</th>
              <th className="px-6 py-4">Registrado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{cliente.nombre}</td>
                <td className="px-6 py-4">{cliente.correo}</td>
                <td className="px-6 py-4">{cliente.telefono}</td>
                <td className="px-6 py-4">{cliente.ciudad}</td>
                <td className="px-6 py-4">{cliente.registrado}</td>
                <td className="px-6 py-4 text-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Nuevo Cliente</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Correo</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Ciudad</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end pt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
