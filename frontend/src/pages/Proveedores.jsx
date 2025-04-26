import { useState } from "react";
import Layout from "../components/Layout";

export default function Proveedores() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProveedor, setCurrentProveedor] = useState(null);

  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      nombre: "Decoraciones Luna",
      categoria: "Decoración",
      telefono: "3001234567",
      correo: "contacto@luna.com",
    },
    {
      id: 2,
      nombre: "DJ Sonic Boom",
      categoria: "Música",
      telefono: "3109876543",
      correo: "sonic@boom.com",
    },
    {
      id: 3,
      nombre: "Eventos Gourmet",
      categoria: "Catering",
      telefono: "3011122334",
      correo: "gourmet@eventos.com",
    },
  ]);

  const handleAddOrUpdateProveedor = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const proveedor = {
      id: isEditing ? currentProveedor.id : proveedores.length + 1,
      nombre: formData.get("nombre"),
      categoria: formData.get("categoria"),
      telefono: formData.get("telefono"),
      correo: formData.get("correo"),
    };

    if (isEditing) {
      const updatedProveedores = proveedores.map((prov) =>
        prov.id === currentProveedor.id ? proveedor : prov
      );
      setProveedores(updatedProveedores);
    } else {
      setProveedores([...proveedores, proveedor]);
    }

    setShowModal(false);
    setIsEditing(false);
    setCurrentProveedor(null);
  };

  const handleEditProveedor = (prov) => {
    setIsEditing(true);
    setCurrentProveedor(prov);
    setShowModal(true);
  };

  const handleDeleteProveedor = (id) => {
    const updatedProveedores = proveedores.filter((prov) => prov.id !== id);
    setProveedores(updatedProveedores);
  };

  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Proveedores</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            + Nuevo Proveedor
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4">Correo</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((prov) => (
                <tr key={prov.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{prov.nombre}</td>
                  <td className="px-6 py-4">{prov.categoria}</td>
                  <td className="px-6 py-4">{prov.telefono}</td>
                  <td className="px-6 py-4">{prov.correo}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                      Ver
                    </button>
                    <button
                      onClick={() => handleEditProveedor(prov)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProveedor(prov.id)}
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
                {isEditing ? "Editar proveedor" : "Agregar nuevo proveedor"}
              </h2>
              <form onSubmit={handleAddOrUpdateProveedor} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    defaultValue={isEditing ? currentProveedor.nombre : ""}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Categoría</label>
                  <input
                    type="text"
                    name="categoria"
                    defaultValue={isEditing ? currentProveedor.categoria : ""}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    defaultValue={isEditing ? currentProveedor.telefono : ""}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Correo</label>
                  <input
                    type="email"
                    name="correo"
                    defaultValue={isEditing ? currentProveedor.correo : ""}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                    required
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
                    {isEditing ? "Actualizar" : "Guardar"}
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
