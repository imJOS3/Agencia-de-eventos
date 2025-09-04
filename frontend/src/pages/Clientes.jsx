import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import useClientesStore from "../store/useClientesStore";

export default function Clientes() {
  const {
    clientes,
    clienteSeleccionado,
    setClienteSeleccionado,
    fetchClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
  } = useClientesStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    fetchClientes(); // carga inicial desde la API
  }, []);

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowCreateModal(false);
        setShowViewModal(false);
        setShowEditModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if ((showCreateModal || showViewModal || showEditModal) && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showCreateModal, showViewModal, showEditModal]);

  const abrirModalVer = (cliente) => {
    setClienteSeleccionado(cliente);
    setShowViewModal(true);
  };

  const abrirModalEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setShowEditModal(true);
  };

  const handleCrearCliente = async (e) => {
    e.preventDefault();
    const form = e.target;
    const nuevoCliente = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      ciudad: form.ciudad.value,
    };
    await crearCliente(nuevoCliente);
    setShowCreateModal(false);
    form.reset();
  };

  const handleEditarCliente = async (e) => {
    e.preventDefault();
    const form = e.target;
    const actualizado = {
      ...clienteSeleccionado,
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      ciudad: form.ciudad.value,
    };
    await actualizarCliente(actualizado);
    setShowEditModal(false);
  };

  const handleEliminar = async (id, nombre) => {
    if (confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      await eliminarCliente(id);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Nuevo Cliente
        </button>
      </div>

      {/* Contenedor flex en lugar de tabla */}
      <div className="flex flex-wrap gap-4">
        {clientes.length === 0 ? (
          <p className="text-gray-700">No hay clientes registrados.</p>
        ) : (
          clientes.map((cliente) => (
            <div
              key={cliente.id}
              className="flex flex-col justify-between border rounded-lg shadow-md p-4 w-full sm:w-[48%] lg:w-[30%] bg-white"
            >
              <div>
                <h3 className="text-lg font-semibold">{cliente.nombre}</h3>
                <p className="text-gray-700">{cliente.correo}</p>
                <p className="text-gray-700">{cliente.telefono}</p>
                <p className="text-gray-700">{cliente.ciudad}</p>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => abrirModalVer(cliente)}
                  aria-label={`Ver detalles de ${cliente.nombre}`}
                  className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Ver
                </button>
                <button
                  onClick={() => abrirModalEditar(cliente)}
                  aria-label={`Editar a ${cliente.nombre}`}
                  className="text-yellow-700 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(cliente.id, cliente.nombre)}
                  aria-label={`Eliminar a ${cliente.nombre}`}
                  className="text-red-700 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- MODALES --- */}

      {/* Modal Crear */}
      {showCreateModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-crear"
          ref={modalRef}
          tabIndex="-1"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 id="titulo-crear" className="text-xl font-bold mb-4">
              Nuevo Cliente
            </h2>
            <form onSubmit={handleCrearCliente} className="flex flex-col gap-3">
              <label>
                Nombre
                <input type="text" name="nombre" required className="border p-2 rounded w-full" />
              </label>
              <label>
                Correo
                <input type="email" name="correo" required className="border p-2 rounded w-full" />
              </label>
              <label>
                Teléfono
                <input type="text" name="telefono" required className="border p-2 rounded w-full" />
              </label>
              <label>
                Ciudad
                <input type="text" name="ciudad" required className="border p-2 rounded w-full" />
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:ring-2 focus:ring-blue-400"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-400"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ver */}
      {showViewModal && clienteSeleccionado && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-ver"
          ref={modalRef}
          tabIndex="-1"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 id="titulo-ver" className="text-xl font-bold mb-2">
              Detalle del Cliente
            </h2>
            <p>
              <strong>Nombre:</strong> {clienteSeleccionado.nombre}
            </p>
            <p>
              <strong>Correo:</strong> {clienteSeleccionado.correo}
            </p>
            <p>
              <strong>Teléfono:</strong> {clienteSeleccionado.telefono}
            </p>
            <p>
              <strong>Ciudad:</strong> {clienteSeleccionado.ciudad}
            </p>
            <div className="mt-4 text-right">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-400"
                onClick={() => setShowViewModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditModal && clienteSeleccionado && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-editar"
          ref={modalRef}
          tabIndex="-1"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 id="titulo-editar" className="text-xl font-bold mb-4">
              Editar Cliente
            </h2>
            <form onSubmit={handleEditarCliente} className="flex flex-col gap-3">
              <label>
                Nombre
                <input
                  type="text"
                  name="nombre"
                  defaultValue={clienteSeleccionado.nombre}
                  required
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Correo
                <input
                  type="email"
                  name="correo"
                  defaultValue={clienteSeleccionado.correo}
                  required
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Teléfono
                <input
                  type="text"
                  name="telefono"
                  defaultValue={clienteSeleccionado.telefono}
                  required
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Ciudad
                <input
                  type="text"
                  name="ciudad"
                  defaultValue={clienteSeleccionado.ciudad}
                  required
                  className="border p-2 rounded w-full"
                />
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:ring-2 focus:ring-blue-400"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-400"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
