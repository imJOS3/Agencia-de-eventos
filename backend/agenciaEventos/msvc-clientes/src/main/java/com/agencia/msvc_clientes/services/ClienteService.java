package com.agencia.msvc_clientes.services;


import com.agencia.msvc_clientes.entity.Cliente;
import com.agencia.msvc_clientes.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> listar() {
        return repository.findAll();
    }

    public Optional<Cliente> porId(Long id) {
        return repository.findById(id);
    }

    public Cliente guardar(Cliente cliente) {
        return repository.save(cliente);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public boolean existePorEmail(String email) {
        return repository.existsByEmail(email);
    }
}
