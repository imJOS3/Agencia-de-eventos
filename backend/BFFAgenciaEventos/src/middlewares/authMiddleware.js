const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado, token faltante' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = user;  // El usuario autenticado estará disponible en `req.user`
    next();
  });
};

module.exports = (req, res, next) => {
  if (!req.session.token) {
    return res.status(401).json({ message: 'No autorizado: token faltante' });
  }
  next();
};

module.exports = authenticateToken;