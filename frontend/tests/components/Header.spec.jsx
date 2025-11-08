// 💡 Mock del contexto del carrito (debe ir antes del import del componente)
import { vi } from 'vitest'

vi.mock('../../src/context/CarritoContext', () => ({
  useCarrito: () => ({
    carrito: [{ id: 1, cantidad: 5 }], // valor simulado para que no sea undefined
    agregarAlCarrito: vi.fn(),
    eliminarDelCarrito: vi.fn(),
    vaciarCarrito: vi.fn()
  })
}))

import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../../src/components/Header'

// Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

// 🔧 puedes ajustar el mock dentro de un beforeEach si quieres cambiar cantidades
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
    const navigationLinks = ['Iniciar sesion', 'Home', 'Catalogo', 'Carrito', 'Soporte']
    navigationLinks.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  test('displays correct cart quantity', () => {
    renderWithRouter(<Header />)
    const cartNumber = screen.getByText('5') // usa el 5 del mock
    expect(cartNumber).toBeInTheDocument()
    expect(cartNumber).toHaveClass('numerito')
  })

  test('navigation links have correct classes', () => {
    renderWithRouter(<Header />)
    expect(screen.getByText('Iniciar sesion').closest('a'))
      .toHaveClass('boton-menu', 'boton', 'login')

    expect(screen.getByText('Home').closest('a'))
      .toHaveClass('boton-menu', 'boton', 'home')

    expect(screen.getByText('Catalogo').closest('a'))
      .toHaveClass('boton-menu', 'boton', 'categoria')

    expect(screen.getByText('Carrito').closest('a'))
      .toHaveClass('boton-menu', 'boton-carrito')
  })

  test('renders correct footer text', () => {
    renderWithRouter(<Header />)
    const footerText = screen.getByText('© 2025')
    expect(footerText).toBeInTheDocument()
    expect(footerText).toHaveClass('texto-footer')
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