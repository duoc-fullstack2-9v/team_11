import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

// Mock de ProductoAgregar para no depender del contexto aquí
vi.mock('../../src/components/AgregaProducto.jsx', () => ({
  default: () => <button>Agregar mock</button>
}))

import Home from '../../src/pages/Home.jsx'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Home Component', () => {
  it('renderiza el carrusel con imágenes y controles', () => {
    renderWithRouter(<Home />)

    const imgs = screen.getAllByRole('img')
    expect(imgs.length).toBeGreaterThanOrEqual(3)

    // una de las imágenes del carrusel
    expect(
      screen.getByAltText(/resident evil 4/i)
    ).toBeInTheDocument()
  })

  it('renderiza el buscador', () => {
    renderWithRouter(<Home />)

    const input = screen.getByPlaceholderText(/buscar en la tienda/i)
    expect(input).toBeInTheDocument()
  })

  it('muestra la sección de ofertas semanales', () => {
    renderWithRouter(<Home />)

    const titulo = screen.getByRole('heading', { name: /ofertas semanales/i })
    expect(titulo).toBeInTheDocument()
    expect(titulo).toHaveClass('titulo-ofertas')
  })

  it('renderiza tarjetas de producto con información básica', () => {
    renderWithRouter(<Home />)

    const cards = document.querySelectorAll('.producto-home')
    expect(cards.length).toBeGreaterThanOrEqual(1)

    expect(
      screen.getByText(/street fighter vs tekken/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/bayonetta/i)).toBeInTheDocument()
    expect(
      screen.getByText(/devil may cry 5/i)
    ).toBeInTheDocument()
  })
})