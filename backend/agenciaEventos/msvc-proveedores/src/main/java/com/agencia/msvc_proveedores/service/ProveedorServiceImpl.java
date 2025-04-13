package com.agencia.msvc_proveedores.service;

import com.agencia.msvc_proveedores.entity.Proveedor;
import com.agencia.msvc_proveedores.repository.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorServiceImpl implements ProveedorService {

    private final ProveedorRepository repository;

    public ProveedorServiceImpl(ProveedorRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Proveedor> listar() {
        return repository.findAll();
    }

    @Override
    public Optional<Proveedor> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    public Proveedor guardar(Proveedor proveedor) {
        return repository.save(proveedor);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
