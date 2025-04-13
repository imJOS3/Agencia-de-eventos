package com.agencia.msvc_proveedores.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String tipo; // Ej: música, catering, etc.

    private String contacto;

    private String email;

    private String telefono;
}
