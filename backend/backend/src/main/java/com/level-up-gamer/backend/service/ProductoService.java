package com.level-up-gamer.backend.service;



import com.level-up-gamer.backend.model.Producto;
import com.level-up-gamer.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

 */
@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public Producto findById(String id) {
        return productoRepository.findById(id).orElse(null);
    }

    public Producto save(Producto p) {
        return productoRepository.save(p);
    }

    public Producto update(String id, Producto p) {
        p.setId(id);
        return productoRepository.save(p);
    }

    public void delete(String id) {
        productoRepository.deleteById(id);
    }
}

