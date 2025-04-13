package com.agencia.msvc_inventario.service;

import com.agencia.msvc_inventario.entity.ItemInventario;
import com.agencia.msvc_inventario.repository.ItemInventarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioServiceImpl implements InventarioService {

    private final ItemInventarioRepository repository;

    public InventarioServiceImpl(ItemInventarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ItemInventario> listar() {
        return repository.findAll();
    }

    @Override
    public Optional<ItemInventario> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    public ItemInventario guardar(ItemInventario item) {
        return repository.save(item);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
