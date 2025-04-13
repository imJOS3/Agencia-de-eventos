package com.agencia.msvc_facturacion.service;

import com.agencia.msvc_facturacion.entity.Factura;

import java.util.List;
import java.util.Optional;

public interface FacturaService {
    List<Factura> listar();
    Optional<Factura> porId(Long id);
    Factura guardar(Factura factura);
    void eliminar(Long id);
}
