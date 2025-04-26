import { useState } from "react";
import Layout from "../components/Layout";

export default function Clientes() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clientes, setClientes] = useState([
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
  ]);

  const abrirModalVer = (cliente) => {
    setClienteSeleccionado(cliente);
    setShowViewModal(true);
  };

  const abrirModalEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setShowEditModal(true);
  };

  const handleCrearCliente = (e) => {
    e.preventDefault();
    const form = e.target;
    const nuevoCliente = {
      id: clientes.length + 1,
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      ciudad: form.ciudad.value,
      registrado: new Date().toISOString().slice(0, 10),
    };
    setClientes([...clientes, nuevoCliente]);
    setShowCreateModal(false);
    form.reset();
  };

  const handleEditarCliente = (e) => {
    e.preventDefault();
    const form = e.target;
    const actualizado = {
      ...clienteSeleccionado,
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      ciudad: form.ciudad.value,
    };
    setClientes(clientes.map((c) => (c.id === actualizado.id ? actualizado : c)));
    setShowEditModal(false);
  };

  const eliminarCliente = (id) => {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <button
            onClick={() => setShowCreateModal(true)}
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
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => abrirModalVer(cliente)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => abrirModalEditar(cliente)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarCliente(cliente.id)}
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

        {/* Modal Crear Cliente */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Nuevo Cliente</h2>
              <form onSubmit={handleCrearCliente} className="space-y-4">
                <InputField name="nombre" label="Nombre" />
                <InputField name="correo" label="Correo" type="email" />
                <InputField name="telefono" label="Teléfono" type="tel" />
                <InputField name="ciudad" label="Ciudad" />
                <div className="flex justify-end pt-4 space-x-2">
                  <Button onClick={() => setShowCreateModal(false)} text="Cancelar" type="button" />
                  <Button text="Guardar" type="submit" color="primary" />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Ver Cliente */}
        {showViewModal && clienteSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-6">Detalle del Cliente</h2>
              <div className="space-y-4">
                <InfoField label="Nombre" value={clienteSeleccionado.nombre} />
                <InfoField label="Correo" value={clienteSeleccionado.correo} />
                <InfoField label="Teléfono" value={clienteSeleccionado.telefono} />
                <InfoField label="Ciudad" value={clienteSeleccionado.ciudad} />
                <InfoField label="Registrado" value={clienteSeleccionado.registrado} />
              </div>
              <div className="flex justify-end pt-6">
                <Button onClick={() => setShowViewModal(false)} text="Cerrar" />
              </div>
            </div>
          </div>
        )}

        {/* Modal Editar Cliente */}
        {showEditModal && clienteSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2>
              <form onSubmit={handleEditarCliente} className="space-y-4">
                <InputField name="nombre" label="Nombre" defaultValue={clienteSeleccionado.nombre} />
                <InputField name="correo" label="Correo" type="email" defaultValue={clienteSeleccionado.correo} />
                <InputField name="telefono" label="Teléfono" type="tel" defaultValue={clienteSeleccionado.telefono} />
                <InputField name="ciudad" label="Ciudad" defaultValue={clienteSeleccionado.ciudad} />
                <div className="flex justify-end pt-4 space-x-2">
                  <Button onClick={() => setShowEditModal(false)} text="Cancelar" type="button" />
                  <Button text="Actualizar" type="submit" color="primary" />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function InputField({ name, label, type = "text", defaultValue = "" }) {
  return (
    <div>
      <label className="block text-sm text-gray-700">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function Button({ onClick, text, type = "button", color = "gray" }) {
  const colors = {
    gray: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${colors[color]}`}
    >
      {text}
    </button>
  );
}
