package com.agencia.msvc_facturacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroFactura;

    private Date fechaEmision;

    private double total;

    private String estado; // Pendiente, pagada, cancelada

    @ManyToOne
    private Evento evento;

    @ManyToOne
    private Cliente cliente;
}
