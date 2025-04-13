package com.agencia.msvc_inventario.controller;

import com.agencia.msvc_inventario.entity.ItemInventario;
import com.agencia.msvc_inventario.service.InventarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventario")
public class InventarioController {

    private final InventarioService service;

    public InventarioController(InventarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<ItemInventario> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemInventario> detalle(@PathVariable Long id) {
        return service.porId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ItemInventario> crear(@RequestBody ItemInventario item) {
        return ResponseEntity.ok(service.guardar(item));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody ItemInventario item) {
        return service.porId(id).map(i -> {
            i.setNombre(item.getNombre());
            i.setDescripcion(item.getDescripcion());
            i.setCantidadDisponible(item.getCantidadDisponible());
            i.setUnidad(item.getUnidad());
            return ResponseEntity.ok(service.guardar(i));
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
