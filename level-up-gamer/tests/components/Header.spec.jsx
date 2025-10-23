import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../../src/components/Header'

// Wrapper necesario para los componentes que usan React Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  test('renders logo and title', () => {
    renderWithRouter(<Header />)
    
    // Verificar que el logo está presente
    const logoImage = screen.getByAlt('Logo de mi tienda')
    expect(logoImage).toBeDefined()
    expect(logoImage).toHaveClass('logo-imagen')

    // Verificar que el título está presente
    const title = screen.getByText('Level Up Gamer')
    expect(title).toBeDefined()
    expect(title).toHaveClass('logo')
  })

  test('renders all navigation links', () => {
    renderWithRouter(<Header />)
    
    // Verificar que todos los links de navegación están presentes
    const navigationLinks = [
      'Iniciar sesion',
      'Home',
      'Catalogo',
      'Carrito',
      'Soporte'
    ]

    navigationLinks.forEach(linkText => {
      const link = screen.getByText(linkText)
      expect(link).toBeDefined()
    })
  })

  test('displays correct cart quantity', () => {
    // Probar con diferentes cantidades del carrito
    const cartQuantity = 5
    renderWithRouter(<Header cantidadCarrito={cartQuantity} />)
    
    const cartNumber = screen.getByText('5')
    expect(cartNumber).toBeDefined()
    expect(cartNumber).toHaveClass('numerito')
  })

  test('displays zero as default cart quantity', () => {
    // Probar el valor por defecto del carrito (0)
    renderWithRouter(<Header />)
    
    const cartNumber = screen.getByText('0')
    expect(cartNumber).toBeDefined()
    expect(cartNumber).toHaveClass('numerito')
  })

  test('navigation links have correct classes', () => {
    renderWithRouter(<Header />)
    
    // Verificar las clases de los enlaces de navegación
    const loginLink = screen.getByText('Iniciar sesion').closest('a')
    expect(loginLink).toHaveClass('boton-menu', 'boton', 'login')

    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveClass('boton-menu', 'boton', 'home')

    const catalogLink = screen.getByText('Catalogo').closest('a')
    expect(catalogLink).toHaveClass('boton-menu', 'boton', 'categoria')

    const cartLink = screen.getByText('Carrito').closest('a')
    expect(cartLink).toHaveClass('boton-menu', 'boton-carrito')
  })

  test('renders correct footer text', () => {
    renderWithRouter(<Header />)
    
    // Verificar que el texto del footer está presente
    const footerText = screen.getByText('© 2025')
    expect(footerText).toBeDefined()
    expect(footerText).toHaveClass('texto-footer')
  })

  test('renders all icons', () => {
    renderWithRouter(<Header />)
    
    // Verificar que todos los iconos están presentes
    const icons = screen.getAllByRole('link')
    const iconClasses = [
      'bi-person-raised-hand',
      'bi-hand-index-thumb-fill',
      'bi-cart-fill'
    ]

    iconClasses.forEach(iconClass => {
      const hasIcon = icons.some(icon => 
        icon.querySelector(`.${iconClass}`)
      )
      expect(hasIcon).toBe(true)
    })
  })
})
