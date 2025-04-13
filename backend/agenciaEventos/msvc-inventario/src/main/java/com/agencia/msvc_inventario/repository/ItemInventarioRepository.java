package com.agencia.msvc_inventario.repository;

import com.agencia.msvc_inventario.entity.ItemInventario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemInventarioRepository extends JpaRepository<ItemInventario, Long> {
}
