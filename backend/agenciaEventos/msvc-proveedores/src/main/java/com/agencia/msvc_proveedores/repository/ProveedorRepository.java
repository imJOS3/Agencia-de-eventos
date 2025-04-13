package com.agencia.msvc_proveedores.repository;

import com.agencia.msvc_proveedores.entity.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
}
