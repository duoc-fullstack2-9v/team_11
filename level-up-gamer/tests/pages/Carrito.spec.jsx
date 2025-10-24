import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Carrito from '../../src/pages/Carrito'

// Helper para renderizar con Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

beforeEach(() => {
  localStorage.clear?.()
})

const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

describe('Carrito (versión estática original)', () => {
  test('muestra el título principal correcto', () => {
    renderWithRouter(<Carrito />)

    const title = screen.getByRole('heading', { name: /tu carrito de compras/i })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('titulo-principal')
  })

  test('renderiza exactamente los dos productos estáticos con sus datos', () => {
    renderWithRouter(<Carrito />)

    const cards = $$('.carrito-producto')
    expect(cards).toHaveLength(2)

    // PRODUCTO 1: Skyrim
    {
      const card = cards[0]
      const c = within(card)

      expect(c.getByText('Skyrim')).toBeInTheDocument()
      expect(c.getByText('Titulo').tagName.toLowerCase()).toBe('small')

      const cantBox = card.querySelector('[clss="carrito-producto-cantidad"], .carrito-producto-cantidad')
      expect(cantBox).toBeTruthy()
      expect(within(cantBox).getByText(/cantidad/i)).toBeInTheDocument()
      const qty = within(cantBox).getAllByText(/^1$/).find(n => n.tagName.toLowerCase() === 'p')
      expect(qty).toBeTruthy()

      // Precio y Subtotal ($29.990 en ambos)
      const precios = c.getAllByText('$29.990')
      expect(precios.length).toBeGreaterThanOrEqual(2)

      const img = card.querySelector('img.carrito-producto-imagen')
      expect(img).toHaveAttribute('src', '/imgs/skyrim.webp')
    }

    // PRODUCTO 2: Resident Evil 4
    {
      const card = cards[1]
      const c = within(card)

      expect(c.getByText(/resident evil 4/i)).toBeInTheDocument()
      expect(c.getByText('Titulo').tagName.toLowerCase()).toBe('small')

      const cantBox = card.querySelector('[clss="carrito-producto-cantidad"], .carrito-producto-cantidad')
      expect(cantBox).toBeTruthy()
      expect(within(cantBox).getByText(/cantidad/i)).toBeInTheDocument()
      const qty = within(cantBox).getAllByText(/^1$/).find(n => n.tagName.toLowerCase() === 'p')
      expect(qty).toBeTruthy()

      expect(c.getByText('$39.990')).toBeInTheDocument()
      expect(c.getByText('$24.000')).toBeInTheDocument()

      const img = card.querySelector('img.carrito-producto-imagen')
      expect(img).toHaveAttribute('src', '/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg')
    }

    // Botones eliminar
    const deleteButtons = $$('.carrito-producto-eliminar')
    expect(deleteButtons).toHaveLength(2)
  })

  test('verifica la sección de acciones del carrito', () => {
    renderWithRouter(<Carrito />)

    const acciones = $('.carrito-acciones')
    expect(acciones).toBeInTheDocument()
    expect(acciones.classList.contains('disabled')).toBe(true)

    // Revisa el contenedor derecho con el typo incluido
    const derecha = $('.carrito-aciciones-derecha')
    expect(derecha).toBeInTheDocument()

    // Total a pagar
    const totalText = $('.total-pagar')
    expect(totalText).toBeInTheDocument()
    expect(totalText.textContent).toMatch(/total a pagar/i)

    const totalValue = $('#total')
    expect(totalValue).toBeInTheDocument()
    expect(totalValue.textContent.trim()).toBe('3.000')

    // Botón comprar
    const comprarBtn = $('.carrito-acciones-comprar')
    expect(comprarBtn).toBeInTheDocument()
    expect(comprarBtn.textContent.toLowerCase()).toMatch(/paga de forma segura/i)

    // Mensaje de compra deshabilitado
    const gracias = screen.getByText(/gracias por tu compra/i)
    expect(gracias).toBeInTheDocument()
    expect(gracias.classList.contains('disabled')).toBe(true)
  })
})