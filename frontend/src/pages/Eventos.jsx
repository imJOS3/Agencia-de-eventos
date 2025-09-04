import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useEventosStore } from "../store/useEventosStore";

export default function Eventos() {
  const {
    eventos,
    eventoSeleccionado,
    setEventoSeleccionado,
    fetchEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
  } = useEventosStore();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    fecha: "",
    lugar: "",
    tipo: "",
    estado: "Pendiente",
  });

  const [modals, setModals] = useState({ crear: false, ver: false, editar: false });

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      correo: "",
      telefono: "",
      fecha: "",
      lugar: "",
      tipo: "",
      estado: "Pendiente",
    });
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    await crearEvento(form);
    setModals({ ...modals, crear: false });
    resetForm();
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    await actualizarEvento({ ...form, id: eventoSeleccionado.id });
    setModals({ ...modals, editar: false });
    setEventoSeleccionado(null);
    resetForm();
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      await eliminarEvento(id);
    }
  };

  const abrirModal = (tipo, evento = null) => {
    if (evento) {
      setEventoSeleccionado(evento);
      setForm({
        nombre: evento.nombre,
        correo: evento.correo,
        telefono: evento.telefono,
        fecha: evento.fecha,
        lugar: evento.lugar,
        tipo: evento.tipo,
        estado: evento.estado,
      });
    }
    setModals({ crear: false, ver: false, editar: false, [tipo]: true });
  };

  const cerrarModal = () => {
    setModals({ crear: false, ver: false, editar: false });
    setEventoSeleccionado(null);
    resetForm();
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Eventos</h1>
        <button
          onClick={() => abrirModal("crear")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Nuevo Evento
        </button>
      </div>

      {/* Tabla de eventos */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Lugar</th>
              <th className="px-4 py-3 text-left">Tipo</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No hay eventos registrados.
                </td>
              </tr>
            ) : (
              eventos.map((evento) => (
                <tr key={evento.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{evento.nombre}</td>
                  <td className="px-4 py-3">{evento.fecha}</td>
                  <td className="px-4 py-3">{evento.lugar}</td>
                  <td className="px-4 py-3">{evento.tipo}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        evento.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : evento.estado === "Confirmado"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {evento.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => abrirModal("ver", evento)}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => abrirModal("editar", evento)}
                      className="text-yellow-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(evento.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Crear/Editar */}
      {(modals.crear || modals.editar) && (
        <Modal
          titulo={modals.crear ? "Nuevo Evento" : "Editar Evento"}
          onClose={cerrarModal}
        >
          <FormularioEvento form={form} onChange={handleChange} onSubmit={modals.crear ? handleCrear : handleEditar} onCancel={cerrarModal} />
        </Modal>
      )}

      {/* Modal Ver */}
      {modals.ver && eventoSeleccionado && (
        <Modal titulo="Detalle del Evento" onClose={cerrarModal}>
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {eventoSeleccionado.nombre}</p>
            <p><strong>Fecha:</strong> {eventoSeleccionado.fecha}</p>
            <p><strong>Lugar:</strong> {eventoSeleccionado.lugar}</p>
            <p><strong>Tipo:</strong> {eventoSeleccionado.tipo}</p>
            <p><strong>Correo:</strong> {eventoSeleccionado.correo}</p>
            <p><strong>Teléfono:</strong> {eventoSeleccionado.telefono}</p>
            <p><strong>Estado:</strong> {eventoSeleccionado.estado}</p>
            <div className="text-right">
              <button onClick={cerrarModal} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}

function Modal({ children, titulo, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-semibold mb-4">{titulo}</h2>
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function FormularioEvento({ form, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre del evento" className="input" required />
      <input type="email" name="correo" value={form.correo} onChange={onChange} placeholder="Correo de contacto" className="input" required />
      <input type="text" name="telefono" value={form.telefono} onChange={onChange} placeholder="Teléfono de contacto" className="input" required />
      <input type="date" name="fecha" value={form.fecha} onChange={onChange} className="input" required />
      <input type="text" name="lugar" value={form.lugar} onChange={onChange} placeholder="Lugar del evento" className="input" required />
      <select name="tipo" value={form.tipo} onChange={onChange} className="input" required>
        <option value="">Seleccione tipo de evento</option>
        <option value="Conferencia">Conferencia</option>
        <option value="Fiesta">Fiesta</option>
        <option value="Reunión">Reunión</option>
        <option value="Otro">Otro</option>
      </select>
      <select name="estado" value={form.estado} onChange={onChange} className="input">
        <option value="Pendiente">Pendiente</option>
        <option value="Confirmado">Confirmado</option>
        <option value="Cancelado">Cancelado</option>
      </select>

      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Guardar
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition">
          Cancelar
        </button>
      </div>
    </form>
  );
}
