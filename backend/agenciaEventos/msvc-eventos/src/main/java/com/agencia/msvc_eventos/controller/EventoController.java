package com.agencia.msvc_eventos.controller;

import com.agencia.msvc_eventos.entity.Evento;
import com.agencia.msvc_eventos.service.EventoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoService service;

    public EventoController(EventoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Evento> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> detalle(@PathVariable Long id) {
        return service.porId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Evento> crear(@RequestBody Evento evento) {
        return ResponseEntity.ok(service.guardar(evento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Evento evento) {
        return service.porId(id).map(e -> {
            e.setNombre(evento.getNombre());
            e.setTipo(evento.getTipo());
            e.setFecha(evento.getFecha());
            e.setLugar(evento.getLugar());
            e.setDescripcion(evento.getDescripcion());
            return ResponseEntity.ok(service.guardar(e));
        }).orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (service.porId(id).isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }






}