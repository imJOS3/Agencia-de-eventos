const apiClient = require('../utils/apiClient');


const getProveedores = async (req, res) => {
  try {
    const response = await apiClient.get('/proveedores');
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al obtener proveedores:', error.message);
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
};

const getProveedorById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.get(`/proveedores/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al obtener proveedor con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al obtener el proveedor' });
  }
};

const createProveedor = async (req, res) => {
  try {
    const response = await apiClient.post('/proveedores', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('❌ Error al crear proveedor:', error.message);
    res.status(500).json({ message: 'Error al crear el proveedor' });
  }
};

const updateProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.put(`/proveedores/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al actualizar proveedor con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al actualizar el proveedor' });
  }
};

const deleteProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    await apiClient.delete(`/proveedores/${id}`);
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error(`❌ Error al eliminar proveedor con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al eliminar el proveedor' });
  }
};

module.exports = {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
};
