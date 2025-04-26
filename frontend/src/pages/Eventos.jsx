import { useState } from "react";
import Layout from "../components/Layout";

export default function Eventos() {
  const [eventos, setEventos] = useState([
    {
      id: 1,
      nombre: "Boda de Ana & Luis",
      fecha: "2025-05-15",
      cliente: "Ana Pérez",
      estado: "Confirmado",
    },
    {
      id: 2,
      nombre: "Fiesta Corporativa XYZ",
      fecha: "2025-06-01",
      cliente: "Carlos Gómez",
      estado: "Pendiente",
    },
    {
      id: 3,
      nombre: "Cumpleaños Laura",
      fecha: "2025-07-20",
      cliente: "Laura Díaz",
      estado: "Cancelado",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    cliente: "",
    estado: "Pendiente",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvento) {
      // Actualizar evento
      setEventos((prevEventos) =>
        prevEventos.map((evento) =>
          evento.id === editingEvento.id ? { ...evento, ...formData } : evento
        )
      );
    } else {
      // Agregar nuevo evento
      const newEvento = {
        id: Date.now(),
        ...formData,
      };
      setEventos((prevEventos) => [...prevEventos, newEvento]);
    }
    setFormData({ nombre: "", fecha: "", cliente: "", estado: "Pendiente" });
    setEditingEvento(null);
    setShowModal(false);
  };

  const handleEdit = (evento) => {
    setEditingEvento(evento);
    setFormData({
      nombre: evento.nombre,
      fecha: evento.fecha,
      cliente: evento.cliente,
      estado: evento.estado,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      setEventos((prevEventos) => prevEventos.filter((evento) => evento.id !== id));
    }
  };

  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Eventos</h1>
          <button
            onClick={() => {
              setEditingEvento(null);
              setFormData({ nombre: "", fecha: "", cliente: "", estado: "Pendiente" });
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            + Nuevo Evento
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-200 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{evento.nombre}</td>
                  <td className="px-6 py-4">{evento.fecha}</td>
                  <td className="px-6 py-4">{evento.cliente}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        evento.estado === "Confirmado"
                          ? "bg-green-100 text-green-600"
                          : evento.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {evento.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                      Ver
                    </button>
                    <button
                      onClick={() => handleEdit(evento)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(evento.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
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
              <h2 className="text-xl font-semibold mb-4">
                {editingEvento ? "Editar Evento" : "Agregar nuevo evento"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Nombre del evento</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Cliente</label>
                  <input
                    type="text"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingEvento(null);
                      setFormData({ nombre: "", fecha: "", cliente: "", estado: "Pendiente" });
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
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
