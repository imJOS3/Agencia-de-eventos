package com.agencia.msvc_facturacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "facturas")
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroFactura;

    @Temporal(TemporalType.DATE)
    private Date fechaEmision;

    private double total;

    private String estado; // Pendiente, pagada, cancelada

    // Referencias a otros microservicios usando solo IDs
    private Long eventoId;

    private Long clienteId;
}
