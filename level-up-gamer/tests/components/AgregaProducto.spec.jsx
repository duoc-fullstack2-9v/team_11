// tests/components/AgregaProducto.spec.jsx
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AgregaProducto from '../../src/AgregaProducto'

// 💡 Mock del contexto del carrito
vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: () => ({
    agregarAlCarrito: vi.fn()
  })
}))

describe('AgregaProducto Component', () => {
  test('renderiza el botón correctamente', () => {
    render(<AgregaProducto producto={{ id: 1, titulo: 'Elden Ring' }} />)
    const button = screen.getByRole('button', { name: /agregar/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('producto-agregar-home')
  })

  test('llama a agregarAlCarrito y muestra alert al hacer click', () => {
    const mockAgregar = vi.fn()
    window.alert = vi.fn()

    vi.mocked(require('../../src/context/CarritoContext.jsx')).useCarrito.mockReturnValue({
      agregarAlCarrito: mockAgregar
    })

    render(<AgregaProducto producto={{ id: 10, titulo: 'Silent Hill F' }} />)

    const button = screen.getByRole('button', { name: /agregar/i })
    fireEvent.click(button)

    expect(mockAgregar).toHaveBeenCalledWith({ id: 10, titulo: 'Silent Hill F' })
    expect(window.alert).toHaveBeenCalledWith('¡Silent Hill F agregado al carrito!')
  })
})