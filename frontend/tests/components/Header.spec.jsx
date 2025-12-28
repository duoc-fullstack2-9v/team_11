// 💡 Mock del contexto del carrito (debe ir antes del import del componente)
import { vi, describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: () => ({
    carrito: [{ id: 1, cantidad: 5 }],
    agregarAlCarrito: vi.fn(),
    eliminarDelCarrito: vi.fn(),
    vaciarCarrito: vi.fn()
  })
}))

import Header from '../../src/components/Header'

// Helper
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('Header Component', () => {
  test('renders logo and title', () => {
    renderWithRouter(<Header />)
    const logoImage = screen.getByAltText('Logo de mi tienda')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveClass('logo-imagen')

    const title = screen.getByText('Level Up Gamer')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('logo')
  })

  test('renders all navigation links text', () => {
    renderWithRouter(<Header />)
    // Usamos regex para ignorar tildes/sensibilidad exacta
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument()
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/catálogo/i)).toBeInTheDocument()
    expect(screen.getByText(/carrito/i)).toBeInTheDocument()
    expect(screen.getByText(/soporte/i)).toBeInTheDocument()
  })

  test('displays correct cart quantity', () => {
    renderWithRouter(<Header />)
    const cartNumber = screen.getByText('5')
    expect(cartNumber).toBeInTheDocument()
    expect(cartNumber).toHaveClass('numerito')
  })

  test('navigation links have correct classes', () => {
    renderWithRouter(<Header />)

    expect(screen.getByText(/iniciar sesión/i).closest('a'))
      .toHaveClass('boton-menu', 'boton', 'login')

    expect(screen.getByText(/home/i).closest('a'))
      .toHaveClass('boton-menu', 'boton', 'home')

    expect(screen.getByText(/catálogo/i).closest('a'))
      .toHaveClass('boton-menu', 'boton', 'categoria')

    expect(screen.getByText(/carrito/i).closest('a'))
      .toHaveClass('boton-menu', 'boton-carrito')
  })

  test('renders all required icons inside links', () => {
    renderWithRouter(<Header />)
    const links = screen.getAllByRole('link')
    const hasClassInSomeLink = (cls) =>
      links.some(a => a.querySelector(`.${cls}`))
    expect(hasClassInSomeLink('bi-person-raised-hand')).toBe(true)
    expect(hasClassInSomeLink('bi-hand-index-thumb-fill')).toBe(true)
    expect(hasClassInSomeLink('bi-cart-fill')).toBe(true)
  })
})