package com.agencia.msvc_clientes.controller;


import com.agencia.msvc_clientes.entity.Cliente;
import com.agencia.msvc_clientes.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cliente> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> detalle(@PathVariable Long id) {
        return service.porId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Cliente cliente) {
        if (service.existePorEmail(cliente.getEmail())) {
            return ResponseEntity.badRequest().body("Ya existe un cliente con ese email.");
        }
        return ResponseEntity.ok(service.guardar(cliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Cliente cliente) {
        return service.porId(id).map(c -> {
            c.setNombre(cliente.getNombre());
            c.setEmail(cliente.getEmail());
            c.setTelefono(cliente.getTelefono());
            return ResponseEntity.ok(service.guardar(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!service.porId(id).isPresent()) return ResponseEntity.notFound().build();
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
