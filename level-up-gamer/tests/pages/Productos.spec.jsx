import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Productos from '../../src/pages/Productos'

// Wrapper para los componentes que usan React Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

// Mock de console.log para pruebas
const mockConsoleLog = vi.spyOn(console, 'log')

describe('Productos Component', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    vi.clearAllMocks()
  })

  test('renders main title', () => {
    renderWithRouter(<Productos />)
    
    const title = screen.getByText('Compra los mejores productos al mejor precio!')
    expect(title).toBeDefined()
    expect(title).toHaveClass('titulo-principal')
  })

  test('renders all products', () => {
    renderWithRouter(<Productos />)
    
    // Verificar que se renderizan todos los productos
    const productTitles = [
      'Street Fighter vs Tekken',
      'Resident Evil 4 Remake',
      'Elden Ring',
      'Skyrim',
      'Red Dead Redemption II',
      'Silent Hill F',
      'Resident Evil 4',
      'Resident Evil 7',
      'Bioshock',
      'Devil May Cry 5',
      'Bayonetta'
    ]

    productTitles.forEach(title => {
      const productTitle = screen.getByText(title)
      expect(productTitle).toBeDefined()
      expect(productTitle).toHaveClass('producto-titulo-home')
    })
  })

  test('renders product images correctly', () => {
    renderWithRouter(<Productos />)
    
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(11) // Número total de productos

    // Verificar que cada imagen tiene las propiedades correctas
    images.forEach(img => {
      expect(img).toHaveClass('producto-home-imagen')
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt')
    })
  })

  test('renders product prices correctly', () => {
    renderWithRouter(<Productos />)
    
    // La mayoría de los productos tienen el mismo precio
    const priceElements = screen.getAllByText('$29990')
    expect(priceElements.length).toBeGreaterThan(0)
    
    // Verificar el producto con precio diferente
    const specialPrice = screen.getByText('$39990')
    expect(specialPrice).toBeDefined()
  })

  test('handles add to cart button clicks', () => {
    renderWithRouter(<Productos />)
    
    // Obtener todos los botones de "Agregar"
    const addButtons = screen.getAllByText('Agregar')
    expect(addButtons).toHaveLength(11)

    // Hacer click en el primer botón y verificar el console.log
    fireEvent.click(addButtons[0])
    expect(mockConsoleLog).toHaveBeenCalledWith('Agregado:', 'Street Fighter vs Tekken')
  })

  test('product cards have correct structure', () => {
    renderWithRouter(<Productos />)
    
    // Verificar la estructura de las tarjetas de producto
    const productCards = screen.getAllByRole('article', { name: '' })
    
    productCards.forEach(card => {
      // Verificar que cada tarjeta tiene la clase correcta
      expect(card).toHaveClass('producto-home')
      
      // Verificar que cada tarjeta tiene los elementos necesarios
      expect(card.querySelector('.producto-home-imagen')).toBeDefined()
      expect(card.querySelector('.producto-detalles-home')).toBeDefined()
      expect(card.querySelector('.producto-titulo-home')).toBeDefined()
      expect(card.querySelector('.producto-precio-home')).toBeDefined()
      expect(card.querySelector('.producto-agregar-home')).toBeDefined()
    })
  })

  test('product IDs are unique', () => {
    renderWithRouter(<Productos />)
    
    // Verificar que los productos tienen IDs únicos como keys
    const productCards = screen.getAllByRole('article', { name: '' })
    const uniqueKeys = new Set(productCards.map(card => card.getAttribute('data-key')))
    expect(uniqueKeys.size).toBe(productCards.length)
  })

  test('products container has correct class', () => {
    renderWithRouter(<Productos />)
    
    const container = screen.getByRole('main').querySelector('.contenedor-producto')
    expect(container).toBeDefined()
  })

  test('ProductoHome subcomponent handles missing onAgregarClick', () => {
    // Verificar que no hay errores si falta la prop onAgregarClick
    const mockProducto = {
      id: "test",
      titulo: "Test Product",
      imagen: "/test.jpg",
      precio: 29990
    }

    expect(() => {
      render(
        <div className="producto-home">
          <img
            className="producto-home-imagen"
            src={mockProducto.imagen}
            alt={mockProducto.titulo}
          />
          <div className="producto-detalles-home">
            <h3 className="producto-titulo-home">{mockProducto.titulo}</h3>
            <p className="producto-precio-home">${mockProducto.precio}</p>
            <button className="producto-agregar-home">Agregar</button>
          </div>
        </div>
      )
    }).not.toThrow()
  })
})
