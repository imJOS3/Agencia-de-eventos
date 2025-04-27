package com.agencia.msvc_facturacion.controller;

import com.agencia.msvc_facturacion.entity.Factura;
import com.agencia.msvc_facturacion.service.FacturaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class FacturaController {

    private final FacturaService service;

    public FacturaController(FacturaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Factura> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Factura> detalle(@PathVariable Long id) {
        return service.porId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Factura> crear(@RequestBody Factura factura) {
        return ResponseEntity.ok(service.guardar(factura));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Factura factura) {
        return service.porId(id).map(f -> {
            f.setNumeroFactura(factura.getNumeroFactura());
            f.setFechaEmision(factura.getFechaEmision());
            f.setTotal(factura.getTotal());
            f.setEstado(factura.getEstado());
            f.setEventoId(factura.getEventoId());
            f.setClienteId(factura.getClienteId());
            return ResponseEntity.ok(service.guardar(f));
        }).orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return service.porId(id)
                .<ResponseEntity<Void>>map(e -> {
                    service.eliminar(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
