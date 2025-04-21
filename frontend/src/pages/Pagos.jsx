import { useState } from "react";
import Layout from "../components/Layout";

export default function Pagos() {
  const [showModal, setShowModal] = useState(false);

  const pagos = [
    {
      id: 1,
      factura: "#F-001",
      cliente: "María López",
      monto: 500000,
      metodo: "Transferencia",
      fecha: "2025-04-16",
      estado: "Confirmado",
    },
    {
      id: 2,
      factura: "#F-002",
      cliente: "Carlos Méndez",
      monto: 850000,
      metodo: "Efectivo",
      fecha: "2025-04-18",
      estado: "Pendiente",
    },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pagos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          + Registrar Pago
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Factura</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Monto</th>
              <th className="px-6 py-4">Método</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{pago.factura}</td>
                <td className="px-6 py-4">{pago.cliente}</td>
                <td className="px-6 py-4">${pago.monto.toLocaleString()}</td>
                <td className="px-6 py-4">{pago.metodo}</td>
                <td className="px-6 py-4">{pago.fecha}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${pago.estado === "Confirmado"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}`}>
                    {pago.estado}
                  </span>
                </td>
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
            <h2 className="text-xl font-semibold mb-4">Registrar nuevo pago</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Factura</label>
                <input
                  type="text"
                  placeholder="#F-001"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Cliente</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Monto</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Método de pago</label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                  <option>Transferencia</option>
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Fecha</label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                />
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
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
