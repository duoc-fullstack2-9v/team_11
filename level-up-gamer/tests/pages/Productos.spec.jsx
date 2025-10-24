import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

// 💡 MOCKS (van antes de importar el componente)
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn()
  }
}))

vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: () => ({
    agregarAlCarrito: vi.fn(),
    eliminarDelCarrito: vi.fn(),
    vaciarCarrito: vi.fn(),
    carrito: []
  })
}))

import Productos from '../../src/pages/Productos'

// Helper para Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('Productos page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra el título principal con su clase', () => {
    renderWithRouter(<Productos />)

    const title = screen.getByRole('heading', {
      name: /compra los mejores productos al mejor precio/i
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('titulo-principal')
  })

  it('renderiza todas las tarjetas de productos', () => {
    const { container } = renderWithRouter(<Productos />)

    const cards = container.querySelectorAll('.producto-home')
    expect(cards.length).toBe(11)

    cards.forEach(card => {
      expect(card.querySelector('.producto-home-imagen')).not.toBeNull()
      expect(card.querySelector('.producto-detalles-home')).not.toBeNull()
      expect(card.querySelector('.producto-titulo-home')).not.toBeNull()
      expect(card.querySelector('.producto-precio-home')).not.toBeNull()
      expect(card.querySelector('.producto-agregar-home')).not.toBeNull()
    })
  })

  it('muestra las imágenes con alt y src', () => {
    renderWithRouter(<Productos />)

    const main = screen.getByRole('main')
    const images = main.querySelectorAll('img.producto-home-imagen')
    expect(images.length).toBe(11)
    images.forEach(img => {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt')
    })
  })

  it('muestra precios, incluyendo el precio distinto', () => {
    renderWithRouter(<Productos />)

    const main = screen.getByRole('main')
    const commonPrices = main.querySelectorAll('.producto-precio-home')
    expect(
      Array.from(commonPrices).some(n => n.textContent?.includes('$29990'))
    ).toBe(true)

    expect(screen.getByText('$39990')).toBeInTheDocument()
  })

  it('dispara toast y agrega al carrito al hacer click', async () => {
    const mockAgregar = vi.fn()
    const mockToast = vi.fn()

    // Forzamos los mocks a ser activos para esta ejecución
    vi.mocked(require('../../src/context/CarritoContext.jsx')).useCarrito.mockReturnValue({
      agregarAlCarrito: mockAgregar,
      carrito: []
    })
    vi.mocked(require('react-toastify').toast).success = mockToast

    const { container } = renderWithRouter(<Productos />)
    const addButtons = container.querySelectorAll('button.producto-agregar-home')
    expect(addButtons.length).toBe(11)

    // Simulamos clic
    addButtons[0].click()

    expect(mockAgregar).toHaveBeenCalled()
    expect(mockToast).toHaveBeenCalled()
  })

  it('el contenedor de productos existe y cuelga de <main>', () => {
    renderWithRouter(<Productos />)

    const main = screen.getByRole('main')
    const container = main.querySelector('.contenedor-producto')
    expect(container).not.toBeNull()
  })

  it('renderiza todos los títulos esperados con su clase', () => {
    renderWithRouter(<Productos />)

    const expectedTitles = [
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

    expectedTitles.forEach(t => {
      const node = screen.getByText(new RegExp(`^${t}$`, 'i'))
      expect(node).toBeInTheDocument()
      expect(node).toHaveClass('producto-titulo-home')
    })
  })
})