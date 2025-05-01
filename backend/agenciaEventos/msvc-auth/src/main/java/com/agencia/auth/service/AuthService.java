package com.agencia.auth.service;

import com.agencia.auth.dto.AuthResponse;
import com.agencia.auth.dto.LoginRequest;
import com.agencia.auth.dto.RegisterRequest;
import com.agencia.auth.entity.Usuario;
import com.agencia.auth.repository.UsuarioRepository;
import com.agencia.auth.config.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioService usuarioService, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (usuarioService.porUsername(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está en uso");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getName());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuarioService.guardar(usuario);

        String token = jwtService.generateToken(usuario);
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioService.porUsername(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtService.generateToken(usuario);
        return new AuthResponse(token);
    }
}
