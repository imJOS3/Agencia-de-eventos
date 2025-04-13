package com.agencia.msvc_proveedores.service;

import com.agencia.msvc_proveedores.entity.Proveedor;

import java.util.List;
import java.util.Optional;

public interface ProveedorService {
    List<Proveedor> listar();
    Optional<Proveedor> porId(Long id);
    Proveedor guardar(Proveedor proveedor);
    void eliminar(Long id);
}
