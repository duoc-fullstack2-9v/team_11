import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Carrito from '../../src/pages/Carrito'

// Helper para render con Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

// Limpieza de storage entre tests (por si acaso)
beforeEach(() => {
  localStorage.clear?.()
})

// Utilidades suaves para consultar DOM con clases/typos
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

describe('Carrito (versión original estática tal cual)', () => {
  test('muestra el título y el link de "Seguir comprando"', () => {
    renderWithRouter(<Carrito />)

    const title = screen.getByRole('heading', { name: /todos los productos/i })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('titulo-principal')

    const backLink = screen.getByRole('link', { name: /seguir comprando/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveClass('boton-volver')
    expect(backLink).toHaveAttribute('href', '/productos')
  })

  test('renderiza estructura de carrito vacio + lista deshabilitada (como en tu HTML)', () => {
    renderWithRouter(<Carrito />)

    const emptyMsg = screen.getByText(/tu carrito esta vacio/i)
    expect(emptyMsg).toBeInTheDocument()
    expect(emptyMsg).toHaveClass('carrito-vacio')

    // La lista de productos viene con "disabled" en el HTML original
    const productosCont = $('.carrito-productos')
    expect(productosCont).toBeInTheDocument()
    expect(productosCont?.classList.contains('disabled')).toBe(true)

    // Acciones también marcadas como disabled
    const acciones = $('.carrito-acciones')
    expect(acciones).toBeInTheDocument()
    expect(acciones?.classList.contains('disabled')).toBe(true)
  })

  test('renderiza exactamente los dos productos estáticos con sus datos', () => {
    renderWithRouter(<Carrito />)

    const cards = $$('.carrito-producto')
    expect(cards).toHaveLength(2)

    // Producto 1: Skyrim
    {
      const card = cards[0]
      const c = within(card)

      // Título
      expect(c.getByText('Skyrim')).toBeInTheDocument()
      // Etiqueta de sección "Titulo"
      expect(c.getByText('Titulo').tagName.toLowerCase()).toBe('small')

      // Cantidad: el contenedor tiene typo "clss" en vez de className.
      // Lo localizamos vía selector de atributo:
      const cantBox = card.querySelector('[clss="carrito-producto-cantidad"], .carrito-producto-cantidad')
      expect(cantBox).toBeTruthy()
      // Etiqueta y valor
      expect(within(cantBox).getByText(/cantidad$/i)).toBeInTheDocument()
      const qty = within(cantBox).getAllByText(/^1$/).find(n => n.tagName.toLowerCase() === 'p')
      expect(qty).toBeTruthy()

      // Precio y Subtotal
      expect(c.getByText('$29.990')).toBeInTheDocument()
      // Subtotal exacto "$29.990" como en tu HTML
      const sub = within(card).getByText('$29.990')
      expect(sub).toBeInTheDocument()

      // Imagen
      const img = card.querySelector('img.carrito-producto-imagen')
      expect(img).toBeTruthy()
      expect(img).toHaveAttribute('src', '/imgs/skyrim.webp')
    }

    // Producto 2: Resident evil 4
    {
      const card = cards[1]
      const c = within(card)

      expect(c.getByText(/resident evil 4/i)).toBeInTheDocument()
      expect(c.getByText('Titulo').tagName.toLowerCase()).toBe('small')

      // Cantidad: aquí el <small> dice "Cantidad 1" (literal)
      const cantBox = card.querySelector('[clss="carrito-producto-cantidad"], .carrito-producto-cantidad')
      expect(cantBox).toBeTruthy()
      // El small debe contener "Cantidad 1"
      expect(within(cantBox).getByText(/cantidad\s*1/i)).toBeInTheDocument()
      // El <p> con 1
      const qty = within(cantBox).getAllByText(/^1$/).find(n => n.tagName.toLowerCase() === 'p')
      expect(qty).toBeTruthy()

      // Precio: "$39.990" y Subtotal: "$24.000" (tal cual tu HTML, aunque no coincidan)
      expect(c.getByText('$39.990')).toBeInTheDocument()
      expect(c.getByText('$24.000')).toBeInTheDocument()

      const img = card.querySelector('img.carrito-producto-imagen')
      expect(img).toBeTruthy()
      expect(img).toHaveAttribute('src', '/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg')
    }

    // Botones eliminar en ambos
    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i })
    expect(deleteButtons).toHaveLength(2)
    deleteButtons.forEach(btn => {
      expect(btn).toHaveClass('carrito-producto-eliminar')
    })
  })

  test('muestra la zona de acciones con sus clases y total EXACTO como en tu HTML', () => {
    renderWithRouter(<Carrito />)

    const acciones = $('.carrito-acciones')
    expect(acciones).toBeInTheDocument()
    expect(acciones?.classList.contains('disabled')).toBe(true)

    // Izquierda: boton "Vaciar carrito"
    const vaciar = screen.getByRole('button', { name: /vaciar carrito/i })
    expect(vaciar).toBeInTheDocument()
    expect(vaciar).toHaveClass('carrito-acciones-vaciar')

    // Derecha: el contenedor tiene un typo en la clase en el HTML original
    // "carrito-aciciones-derecha" (sin la segunda 't')
    const derecha = $('.carrito-acciones-derecha') || $('.carrito-aciciones-derecha')
    expect(derecha).toBeInTheDocument()

    // Total exacto "3.000" y con id="total"
    const totalNode = $('#total')
    expect(totalNode).toBeInTheDocument()
    expect(totalNode?.textContent?.trim()).toBe('3.000')

    // Botón comprar
    const comprar = screen.getByRole('button', { name: /comprar/i })
    expect(comprar).toBeInTheDocument()
    expect(comprar).toHaveClass('carrito-acciones-comprar')

    // Mensaje de compra deshabilitado
    const gracias = screen.getByText(/gracias por tu compra/i)
    expect(gracias).toBeInTheDocument()
    expect(gracias?.classList.contains('disabled')).toBe(true)
  })
})