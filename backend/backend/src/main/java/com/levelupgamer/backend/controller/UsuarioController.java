package com.levelupgamer.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.levelupgamer.backend.model.Usuario;
import com.levelupgamer.backend.service.UsuarioService;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        Usuario registrado = usuarioService.registrar(usuario);
        return ResponseEntity.ok(registrado);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        Optional<Usuario> encontrado = usuarioService.login(usuario.getEmail(), usuario.getPassword());
        if (encontrado.isPresent()) {
            return ResponseEntity.ok("Login exitoso");
        } else {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
        }
    }
}
