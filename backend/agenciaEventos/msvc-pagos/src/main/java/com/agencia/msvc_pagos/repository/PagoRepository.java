package com.agencia.msvc_pagos.repository;

import com.agencia.msvc_pagos.entity.Pago;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PagoRepository extends JpaRepository<Pago, Long> {
}
