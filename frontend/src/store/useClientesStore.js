// src/store/useClientesStore.js
import { create } from 'zustand'
import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
})

export const useClientesStore = create((set) => ({
  clientes: [],
  loading: false,
  error: null,

  fetchClientes: async () => {
    set({ loading: true, error: null })
    try {
      const response = await API.get('/clientes')
      set({ clientes: response.data, loading: false })
    } catch (err) {
      console.error('Error al obtener clientes:', err)
      set({ error: err, loading: false })
    }
  },
}))
