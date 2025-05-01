const apiClient = require('../config/apiClient');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const response = await apiClient.post('/auth/register', req.body);
    res.json(response.data);  // Respuesta con los datos de usuario, si es necesario
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.message);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// Función para autenticar un usuario (login) y devolver un token JWT
const loginUser = async (req, res) => {
  try {
    const response = await apiClient.post('/auth/login', req.body);
    
    if (response.data && response.data.token) {
      // El token JWT se devuelve al frontend
      res.json({ token: response.data.token });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('❌ Error al autenticar usuario:', error.message);
    res.status(500).json({ message: 'Error al autenticar usuario' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
