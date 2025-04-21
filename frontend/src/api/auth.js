// src/api/auth.js
export const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        return data // Devuelve el token y usuario
      } else {
        throw new Error(data.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      throw new Error(error.message || 'Error de conexión')
    }
  }
  
  export const registerUser = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        return data // Devuelve el token y usuario
      } else {
        throw new Error(data.message || 'Error al registrar usuario')
      }
    } catch (error) {
      throw new Error(error.message || 'Error de conexión')
    }
  }
  