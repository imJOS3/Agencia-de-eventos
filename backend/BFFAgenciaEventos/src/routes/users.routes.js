const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { getUserById } = require('../services/userService');

// GET /users/:id - solo con token válido
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

module.exports = router;
