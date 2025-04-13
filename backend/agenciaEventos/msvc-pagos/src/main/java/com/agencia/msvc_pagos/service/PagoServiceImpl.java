package com.agencia.msvc_pagos.service.impl;

import com.agencia.msvc_pagos.entity.Pago;
import com.agencia.msvc_pagos.repository.PagoRepository;
import com.agencia.msvc_pagos.service.PagoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagoServiceImpl implements PagoService {

    private final PagoRepository repository;

    public PagoServiceImpl(PagoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Pago> listar() {
        return repository.findAll();
    }

    @Override
    public Optional<Pago> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    public Pago guardar(Pago pago) {
        return repository.save(pago);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
