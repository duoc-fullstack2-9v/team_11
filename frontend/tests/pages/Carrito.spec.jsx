import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: vi.fn()
}))

import { useCarrito } from '../../src/context/CarritoContext.jsx'
import Carrito from '../../src/pages/Carrito.jsx'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Carrito Component (con contexto simulado)', () => {
  it('muestra mensaje de carrito vacío cuando no hay productos', () => {
    vi.mocked(useCarrito).mockReturnValue({
      carrito: [],
      eliminarDelCarrito: vi.fn()
    })

    renderWithRouter(<Carrito />)

    expect(
      screen.getByText(/el carrito está vacío/i)
    ).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /ir a comprar/i })
    expect(link).toHaveAttribute('href', '/productos')
  })

  it('renderiza los productos del carrito con sus datos', () => {
    vi.mocked(useCarrito).mockReturnValue({
      eliminarDelCarrito: vi.fn(),
      carrito: [
        {
          id: 1,
          titulo: 'Juego X',
          precio: 10000,
          cantidad: 2,
          imagen: 'https://ejemplo.com/juego.png'
        }
      ]
    })

    renderWithRouter(<Carrito />)

    expect(
      screen.getByRole('heading', { name: /tu carrito de compras/i })
    ).toBeInTheDocument()

    expect(screen.getByText('Juego X')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('$10.000')).toBeInTheDocument()
    
    const subtotales = screen.getAllByText(/\$[\s]*20\.000/)
    expect(subtotales.length).toBeGreaterThanOrEqual(1)
  })

  it('al hacer click en eliminar llama eliminarDelCarrito con el id correcto', () => {
    const mockEliminar = vi.fn()
    vi.mocked(useCarrito).mockReturnValue({
      eliminarDelCarrito: mockEliminar,
      carrito: [
        {
          id: 1,
          titulo: 'Juego X',
          precio: 10000,
          cantidad: 1,
          imagen: 'https://ejemplo.com/juego.png'
        }
      ]
    })

    renderWithRouter(<Carrito />)

    const btnEliminar = screen.getByRole('button', {
      name: /eliminar del carrito/i
    })
    btnEliminar.click()

    expect(mockEliminar).toHaveBeenCalledWith(1)
  })
})