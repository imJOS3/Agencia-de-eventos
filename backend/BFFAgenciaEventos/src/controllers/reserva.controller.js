const apiClient = require('../utils/apiClient');


// Obtener todas las reservas
const getReservas = async (req, res) => {
  try {
    const response = await apiClient.get('/reservas');
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al obtener reservas:', error.message);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};

// Obtener una reserva por ID
const getReservaById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.get(`/reservas/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al obtener reserva con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al obtener reserva' });
  }
};

// Crear una nueva reserva
const createReserva = async (req, res) => {
  try {
    const response = await apiClient.post('/reservas', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('❌ Error al crear reserva:', error.message);
    res.status(500).json({ message: 'Error al crear reserva' });
  }
};

// Actualizar una reserva
const updateReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await apiClient.put(`/reservas/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error al actualizar reserva con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al actualizar reserva' });
  }
};

// Eliminar una reserva
const deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    await apiClient.delete(`/reservas/${id}`);
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    console.error(`❌ Error al eliminar reserva con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al eliminar reserva' });
  }
};

module.exports = {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
};
