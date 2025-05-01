const apiClient = require('../utils/apiClient');

// Obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    const response = await apiClient.get('/clientes');
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al obtener clientes:', error.message);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

// Obtener un cliente por ID
const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.get(`/clientes/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al obtener cliente con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al obtener cliente' });
  }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
  try {
    const response = await apiClient.post('/clientes', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('❌ Error al crear cliente:', error.message);
    res.status(500).json({ message: 'Error al crear cliente' });
  }
};

// Actualizar un cliente
const updateCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.put(`/clientes/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al actualizar cliente con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await apiClient.delete(`/clientes/${id}`);
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error(`❌ Error al eliminar cliente con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
