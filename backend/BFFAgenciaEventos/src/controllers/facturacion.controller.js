const apiClient = require('../utils/apiClient');

// Obtener todas las facturas
const getFacturas = async (req, res) => {
  try {
    const response = await apiClient.get('/facturacion');
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al obtener facturas:', error.message);
    res.status(500).json({ message: 'Error al obtener facturas' });
  }
};

// Obtener una factura por ID
const getFacturaById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.get(`/facturacion/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al obtener factura con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al obtener factura' });
  }
};

// Crear una nueva factura
const createFactura = async (req, res) => {
  try {
    const response = await apiClient.post('/facturacion', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('❌ Error al crear factura:', error.message);
    res.status(500).json({ message: 'Error al crear factura' });
  }
};

// Actualizar una factura
const updateFactura = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.put(`/facturacion/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al actualizar factura con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al actualizar factura' });
  }
};

// Eliminar una factura
const deleteFactura = async (req, res) => {
  const { id } = req.params;
  try {
    await apiClient.delete(`/facturacion/${id}`);
    res.json({ message: 'Factura eliminada correctamente' });
  } catch (error) {
    console.error(`❌ Error al eliminar factura con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al eliminar factura' });
  }
};

module.exports = {
  getFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura,
};
