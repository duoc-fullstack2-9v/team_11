import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../../src/components/Header'

// Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('Header Component', () => {
  test('renders logo and title', () => {
    renderWithRouter(<Header />)

    // Verificar logo por alt text
    const logoImage = screen.getByAltText('Logo de mi tienda')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveClass('logo-imagen')

    // Verificar título
    const title = screen.getByText('Level Up Gamer')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('logo')
  })

  test('renders all navigation links text', () => {
    renderWithRouter(<Header />)

    const navigationLinks = [
      'Iniciar sesion',
      'Home',
      'Catalogo',
      'Carrito',
      'Soporte'
    ]

    navigationLinks.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  test('displays correct cart quantity', () => {
    renderWithRouter(<Header cantidadCarrito={5} />)

    const cartNumber = screen.getByText('5')
    expect(cartNumber).toBeInTheDocument()
    expect(cartNumber).toHaveClass('numerito')
  })

  test('displays zero as default cart quantity', () => {
    renderWithRouter(<Header />)

    const cartNumber = screen.getByText('0')
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

    // Solo detecta <a href="...">, el de "Soporte" no cuenta por no tener href
    const links = screen.getAllByRole('link')
    const hasClassInSomeLink = (cls) =>
      links.some(a => a.querySelector(`.${cls}`))

    expect(hasClassInSomeLink('bi-person-raised-hand')).toBe(true)
    expect(hasClassInSomeLink('bi-hand-index-thumb-fill')).toBe(true)
    expect(hasClassInSomeLink('bi-cart-fill')).toBe(true)
  })
})