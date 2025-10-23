import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Productos from '../../src/pages/Productos'

// Helper para Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

// Espía del console.log
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

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

    // Contamos por estructura real, no por roles inventados
    const cards = container.querySelectorAll('.producto-home')
    expect(cards.length).toBe(11)

    // Cada tarjeta debe tener su imagen, detalles, título, precio y botón
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

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(11)
    images.forEach(img => {
      expect(img).toHaveClass('producto-home-imagen')
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt')
    })
  })

  it('muestra precios, incluyendo el precio distinto', () => {
    renderWithRouter(<Productos />)

    // La mayoría valen 29990
    const commonPrices = screen.getAllByText('$29990')
    expect(commonPrices.length).toBeGreaterThan(0)

    // Uno vale 39990
    expect(screen.getByText('$39990')).toBeInTheDocument()
  })

  it('hace console.log al agregar un producto', () => {
    renderWithRouter(<Productos />)

    const addButtons = screen.getAllByRole('button', { name: /agregar/i })
    expect(addButtons).toHaveLength(11)

    fireEvent.click(addButtons[0])
    expect(mockConsoleLog).toHaveBeenCalledWith('Agregado:', 'Street Fighter vs Tekken')
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
      const node = screen.getByText(t)
      expect(node).toBeInTheDocument()
      expect(node).toHaveClass('producto-titulo-home')
    })
  })
})