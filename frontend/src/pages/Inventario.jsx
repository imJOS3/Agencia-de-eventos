import { useState } from "react";
import Layout from "../components/Layout";

export default function Inventario() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    nombre: "",
    categoria: "",
    cantidad: 0,
    estado: "Disponible",
  });

  const [inventario, setInventario] = useState([
    {
      id: 1,
      nombre: "Silla Tiffany Blanca",
      categoria: "Mobiliario",
      cantidad: 120,
      estado: "Disponible",
    },
    {
      id: 2,
      nombre: "Carpa 4x4m",
      categoria: "Estructuras",
      cantidad: 4,
      estado: "Mantenimiento",
    },
    {
      id: 3,
      nombre: "Luces LED RGB",
      categoria: "Iluminación",
      cantidad: 60,
      estado: "Disponible",
    },
  ]);

  // Funciones para manejar el modal de ver, editar, eliminar y agregar
  const handleVer = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleEditar = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleEliminar = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleGuardarEdicion = (event) => {
    event.preventDefault();
    const updatedInventario = inventario.map((item) =>
      item.id === selectedItem.id ? { ...selectedItem } : item
    );
    setInventario(updatedInventario);
    setShowEditModal(false);
  };

  const handleEliminarArticulo = () => {
    const updatedInventario = inventario.filter(
      (item) => item.id !== selectedItem.id
    );
    setInventario(updatedInventario);
    setShowDeleteModal(false);
  };

  const handleAgregarArticulo = (event) => {
    event.preventDefault();
    const newId = inventario.length ? inventario[inventario.length - 1].id + 1 : 1;
    const newArticulo = { ...newItem, id: newId };
    setInventario([...inventario, newArticulo]);
    setShowModal(false);
    setNewItem({ nombre: "", categoria: "", cantidad: 0, estado: "Disponible" });
  };

  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Inventario</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            + Nuevo Artículo
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Artículo</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Cantidad</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inventario.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.nombre}</td>
                  <td className="px-6 py-4">{item.categoria}</td>
                  <td className="px-6 py-4">{item.cantidad}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.estado === "Disponible"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleVer(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => handleEditar(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(item)}
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

        {/* Modal Ver */}
        {showModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Detalles del Artículo</h2>
              <div>
                <p><strong>Nombre del Artículo:</strong> {selectedItem.nombre}</p>
                <p><strong>Categoría:</strong> {selectedItem.categoria}</p>
                <p><strong>Cantidad:</strong> {selectedItem.cantidad}</p>
                <p><strong>Estado:</strong>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedItem.estado === "Disponible"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedItem.estado}
                  </span>
                </p>
              </div>
              <div className="flex justify-end pt-4 space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Editar */}
        {showEditModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Editar Artículo</h2>
              <form onSubmit={handleGuardarEdicion} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Nombre del Artículo</label>
                  <input
                    type="text"
                    value={selectedItem.nombre}
                    onChange={(e) => setSelectedItem({ ...selectedItem, nombre: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Categoría</label>
                  <input
                    type="text"
                    value={selectedItem.categoria}
                    onChange={(e) => setSelectedItem({ ...selectedItem, categoria: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Cantidad</label>
                  <input
                    type="number"
                    value={selectedItem.cantidad}
                    onChange={(e) => setSelectedItem({ ...selectedItem, cantidad: e.target.value })}
                    min="0"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
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

        {/* Modal Eliminar */}
        {showDeleteModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Eliminar Artículo</h2>
              <p>¿Estás seguro de que deseas eliminar el artículo "{selectedItem.nombre}"?</p>
              <div className="flex justify-end pt-4 space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEliminarArticulo}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para agregar artículo */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Artículo</h2>
              <form onSubmit={handleAgregarArticulo} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Nombre del Artículo</label>
                  <input
                    type="text"
                    value={newItem.nombre}
                    onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Categoría</label>
                  <input
                    type="text"
                    value={newItem.categoria}
                    onChange={(e) => setNewItem({ ...newItem, categoria: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Cantidad</label>
                  <input
                    type="number"
                    value={newItem.cantidad}
                    onChange={(e) => setNewItem({ ...newItem, cantidad: e.target.value })}
                    min="0"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
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
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Agregar
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
