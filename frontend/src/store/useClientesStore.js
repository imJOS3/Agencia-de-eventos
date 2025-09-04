// src/store/useClientesStore.js
import { create } from "zustand";
import api from "../lib/api"; // cliente axios configurado

const useClientesStore = create((set) => ({
  clientes: [],
  clienteSeleccionado: null,
  loading: false,
  error: null,

  // 🔹 Para seleccionar cliente manualmente
  setClienteSeleccionado: (cliente) => set({ clienteSeleccionado: cliente }),

  // 🔹 Obtener todos los clientes
  fetchClientes: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/clientes");
      set({ clientes: data, loading: false });
    } catch (error) {
      set({ error: "Error al obtener clientes", loading: false });
    }
  },

  // 🔹 Crear cliente
  crearCliente: async (nuevoCliente) => {
    try {
      const { data } = await api.post("/clientes", nuevoCliente);
      set((state) => ({
        clientes: [...state.clientes, data],
      }));
    } catch (error) {
      console.error("❌ Error al crear cliente:", error.message);
      set({ error: "Error al crear cliente" });
    }
  },

  // 🔹 Actualizar cliente
  actualizarCliente: async (clienteActualizado) => {
    try {
      const { data } = await api.put(
        `/clientes/${clienteActualizado.id}`,
        clienteActualizado
      );
      set((state) => ({
        clientes: state.clientes.map((cliente) =>
          cliente.id === clienteActualizado.id ? data : cliente
        ),
      }));
    } catch (error) {
      console.error("❌ Error al actualizar cliente:", error.message);
      set({ error: "Error al actualizar cliente" });
    }
  },

  // 🔹 Eliminar cliente
  eliminarCliente: async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      set((state) => ({
        clientes: state.clientes.filter((cliente) => cliente.id !== id),
      }));
    } catch (error) {
      console.error("❌ Error al eliminar cliente:", error.message);
      set({ error: "Error al eliminar cliente" });
    }
  },

  // 🔹 Obtener un cliente por ID
  fetchClienteById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(`/clientes/${id}`);
      set({ clienteSeleccionado: data, loading: false });
    } catch (error) {
      set({ error: "Error al obtener el cliente", loading: false });
    }
  },
}));

export default useClientesStore;
