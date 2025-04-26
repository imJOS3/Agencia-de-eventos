import { useState } from "react";
import Layout from "../components/Layout";

export default function Facturacion() {
  const [showModal, setShowModal] = useState(false);

  const facturas = [
    {
      id: 1,
      cliente: "María López",
      monto: 1500000,
      fecha: "2025-04-15",
      estado: "Pagada",
    },
    {
      id: 2,
      cliente: "Carlos Méndez",
      monto: 850000,
      fecha: "2025-04-18",
      estado: "Pendiente",
    },
    {
      id: 3,
      cliente: "Ana Torres",
      monto: 1200000,
      fecha: "2025-04-20",
      estado: "Pagada",
    },
  ];

  return (
    <Layout>

      <div className="p-5">


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Facturación</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          + Nueva Factura
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Monto</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{factura.cliente}</td>
                <td className="px-6 py-4">${factura.monto.toLocaleString()}</td>
                <td className="px-6 py-4">{factura.fecha}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${factura.estado === "Pagada"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}`}>
                    {factura.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                    Ver
                  </button>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm">
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                    Eliminar
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
            <h2 className="text-xl font-semibold mb-4">Crear nueva factura</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Cliente</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Monto</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Fecha</label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Estado</label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                  <option>Pagada</option>
                  <option>Pendiente</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>

    </Layout>
  );
}
