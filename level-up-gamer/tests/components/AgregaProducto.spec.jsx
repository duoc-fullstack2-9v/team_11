// tests/components/ProductoAgregar.spec.jsx
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductoAgregar from '../../src/ProductoAgregar'

// 💡 Mock del contexto del carrito (antes del import del componente si usas otro path)
vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: () => ({
    agregarAlCarrito: vi.fn()
  })
}))

describe('ProductoAgregar Component', () => {
  test('renderiza el botón correctamente', () => {
    render(<ProductoAgregar producto={{ id: 1, titulo: 'Elden Ring' }} />)
    const button = screen.getByRole('button', { name: /agregar/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('producto-agregar-home')
  })

  test('llama a agregarAlCarrito y muestra alert al hacer click', () => {
    // Mock manual para alert y el hook
    const mockAgregar = vi.fn()
    window.alert = vi.fn()

    vi.mocked(require('../../src/context/CarritoContext.jsx')).useCarrito.mockReturnValue({
      agregarAlCarrito: mockAgregar
    })

    render(<ProductoAgregar producto={{ id: 10, titulo: 'Silent Hill F' }} />)

    const button = screen.getByRole('button', { name: /agregar/i })
    fireEvent.click(button)

    expect(mockAgregar).toHaveBeenCalledWith({ id: 10, titulo: 'Silent Hill F' })
    expect(window.alert).toHaveBeenCalledWith('¡Silent Hill F agregado al carrito!')
  })
})