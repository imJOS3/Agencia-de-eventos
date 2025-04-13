package com.agencia.auth.service;

import com.agencia.auth.entity.Usuario;
import com.agencia.auth.repository.UsuarioRepository;
import com.agencia.auth.service.UsuarioService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioServiceImpl(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Usuario> listar() {
        return repository.findAll();
    }

    @Override
    public Optional<Usuario> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        return repository.save(usuario);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Usuario> porUsername(String username) {
        return repository.findByUsername(username);
    }
}
