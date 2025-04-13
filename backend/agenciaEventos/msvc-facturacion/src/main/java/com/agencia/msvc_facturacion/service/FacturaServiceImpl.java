package com.agencia.msvc_facturacion.service;

import com.agencia.msvc_facturacion.entity.Factura;
import com.agencia.msvc_facturacion.repository.FacturaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacturaServiceImpl implements FacturaService {

    private final FacturaRepository repository;

    public FacturaServiceImpl(FacturaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Factura> listar() {
        return repository.findAll();
    }

    @Override
    public Optional<Factura> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    public Factura guardar(Factura factura) {
        return repository.save(factura);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
