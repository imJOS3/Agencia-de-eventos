package com.agencia.msvc_eventos.repository;


import com.agencia.msvc_eventos.entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}