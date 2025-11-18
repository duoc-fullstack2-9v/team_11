package com.level-up-gamer.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Producto {

    @Id
    private String id;
    private String titulo;
    private String imagen;
    private int precio;

    public Producto() {}

    public Producto(String id, String titulo, String imagen, int precio) {
        this.id = id;
        this.titulo = titulo;
        this.imagen = imagen;
        this.precio = precio;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public int getPrecio() { return precio; }
    public void setPrecio(int precio) { this.precio = precio; }
}
