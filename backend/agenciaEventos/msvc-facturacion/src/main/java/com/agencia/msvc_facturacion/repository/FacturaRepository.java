package com.agencia.msvc_facturacion.repository;

import com.agencia.msvc_facturacion.entity.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<Factura, Long> {
}
