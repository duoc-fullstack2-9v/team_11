import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/Home'

describe('Home Component', () => {
  test('renders carousel with images', () => {
    render(<Home />)
    
    // Verificar que el carrusel existe
    const carousel = screen.getByRole('region', { name: /carousel/i })
    expect(carousel).toBeDefined()

    // Verificar que las imágenes del carrusel están presentes
    const carouselImages = screen.getAllByRole('img')
    expect(carouselImages).toHaveLength(4) // 3 del carrusel + 1 de ofertas
    
    // Verificar que los botones de navegación están presentes
    const prevButton = screen.getByText('Previous')
    const nextButton = screen.getByText('Next')
    expect(prevButton).toBeDefined()
    expect(nextButton).toBeDefined()
  })

  test('renders search input', () => {
    render(<Home />)
    
    // Verificar que el buscador está presente
    const searchInput = screen.getByPlaceholderText('Buscar en la tienda')
    expect(searchInput).toBeDefined()
  })

  test('renders weekly offers section', () => {
    render(<Home />)
    
    // Verificar que el título de ofertas está presente
    const offersTitle = screen.getByText('Ofertas semanales')
    expect(offersTitle).toBeDefined()
  })

  test('renders product cards with correct information', () => {
    render(<Home />)
    
    // Verificar que los productos están presentes
    const productTitles = [
      'Street Fighter vs Tekken',
      'Bayonetta',
      'Devil my cry 5'
    ]

    // Verificar cada título de producto
    productTitles.forEach(title => {
      const productTitle = screen.getByText(title)
      expect(productTitle).toBeDefined()
    })

    // Verificar que hay 3 botones de "Agregar"
    const addButtons = screen.getAllByText('Agregar')
    expect(addButtons).toHaveLength(3)

    // Verificar que los precios están presentes
    const regularPrices = screen.getAllByText('$29.990')
    const salePrices = screen.getAllByText('Oferta $4.990')
    expect(regularPrices).toHaveLength(3)
    expect(salePrices).toHaveLength(3)
  })
})
