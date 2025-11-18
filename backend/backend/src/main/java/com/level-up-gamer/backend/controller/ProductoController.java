package com.level-up-gamer.backend.controller;

package com.level-up-gamer.backend.controller;

import com.level-up-gamer.backend.model.Producto;
import com.level-up-gamer.backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*") 
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // GET - listar todo
    @GetMapping
    public List<Producto> getAll() {
        return productoService.findAll();
    }

    // GET - buscar 1 por id
    @GetMapping("/{id}")
    public Producto getOne(@PathVariable String id) {
        return productoService.findById(id);
    }

    // POST - crear algo nuevo
    @PostMapping
    public Producto create(@RequestBody Producto p) {
        return productoService.save(p);
    }

    // PUT - actualizar
    @PutMapping("/{id}")
    public Producto update(@PathVariable String id, @RequestBody Producto p) {
        return productoService.update(id, p);
    }

    // DELETE - eliminar
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        productoService.delete(id);
    }
}

