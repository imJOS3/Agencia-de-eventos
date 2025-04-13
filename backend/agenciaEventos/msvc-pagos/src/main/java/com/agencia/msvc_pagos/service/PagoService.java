package com.agencia.msvc_pagos.service;

import com.agencia.msvc_pagos.entity.Pago;

import java.util.List;
import java.util.Optional;

public interface PagoService {
    List<Pago> listar();
    Optional<Pago> porId(Long id);
    Pago guardar(Pago pago);
    void eliminar(Long id);
}
