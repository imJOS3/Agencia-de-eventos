package com.agencia.msvc_pagos.controller;

import com.agencia.msvc_pagos.entity.Pago;
import com.agencia.msvc_pagos.service.PagoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    private final PagoService service;

    public PagoController(PagoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pago> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> detalle(@PathVariable Long id) {
        return service.porId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pago> crear(@RequestBody Pago pago) {
        return ResponseEntity.ok(service.guardar(pago));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Pago pago) {
        return service.porId(id).map(p -> {
            p.setClienteId(pago.getClienteId());
            p.setMonto(pago.getMonto());
            p.setFecha(pago.getFecha());
            p.setMetodoPago(pago.getMetodoPago());
            p.setDescripcion(pago.getDescripcion());
            return ResponseEntity.ok(service.guardar(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return service.porId(id)
                .<ResponseEntity<Void>>map(p -> {
                    service.eliminar(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
