package com.agencia.msvc_proveedores.controller;

import com.agencia.msvc_proveedores.entity.Proveedor;
import com.agencia.msvc_proveedores.service.ProveedorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {

    private final ProveedorService service;

    public ProveedorController(ProveedorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Proveedor> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> detalle(@PathVariable Long id) {
        return service.porId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Proveedor> crear(@RequestBody Proveedor proveedor) {
        return ResponseEntity.ok(service.guardar(proveedor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Proveedor proveedor) {
        return service.porId(id).map(p -> {
            p.setNombre(proveedor.getNombre());
            p.setTipo(proveedor.getTipo());
            p.setContacto(proveedor.getContacto());
            p.setEmail(proveedor.getEmail());
            p.setTelefono(proveedor.getTelefono());
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
