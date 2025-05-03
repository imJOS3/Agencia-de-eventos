const apiClient = require('../utils/apiClient');


// Obtener todos los pagos
const getPagos = async (req, res) => {
  try {
    const response = await apiClient.get('/pagos');
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al obtener pagos:', error.message);
    res.status(500).json({ message: 'Error al obtener pagos' });
  }
};

// Obtener un pago por ID
const getPagoById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.get(`/pagos/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al obtener pago con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al obtener pago' });
  }
};

// Crear un nuevo pago
const createPago = async (req, res) => {
  try {
    const response = await apiClient.post('/pagos', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('❌ Error al crear pago:', error.message);
    res.status(500).json({ message: 'Error al crear pago' });
  }
};

// Actualizar un pago
const updatePago = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.put(`/pagos/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al actualizar pago con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al actualizar pago' });
  }
};

// Eliminar un pago
const deletePago = async (req, res) => {
  const { id } = req.params;
  try {
    await apiClient.delete(`/pagos/${id}`);
    res.json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    console.error(`❌ Error al eliminar pago con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al eliminar pago' });
  }
};

module.exports = {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago,
};
