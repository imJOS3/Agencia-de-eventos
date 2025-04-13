package com.agencia.msvc_inventario.service;

import com.agencia.msvc_inventario.entity.ItemInventario;

import java.util.List;
import java.util.Optional;

public interface InventarioService {
    List<ItemInventario> listar();
    Optional<ItemInventario> porId(Long id);
    ItemInventario guardar(ItemInventario item);
    void eliminar(Long id);
}
