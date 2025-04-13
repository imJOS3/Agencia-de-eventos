package com.agencia.msvc_eventos.service;

import com.agencia.msvc_eventos.entity.Evento;
import com.agencia.msvc_eventos.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    private final EventoRepository repository;

    public EventoService(EventoRepository repository) {
        this.repository = repository;
    }

    public List<Evento> listar() {
        return repository.findAll();
    }

    public Optional<Evento> porId(Long id) {
        return repository.findById(id);
    }

    public Evento guardar(Evento evento) {
        return repository.save(evento);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}