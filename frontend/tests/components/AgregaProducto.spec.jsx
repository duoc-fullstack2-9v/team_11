// tests/components/AgregaProducto.spec.jsx
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// ✅ Mock del contexto del carrito
vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: vi.fn()
}))

// ✅ Mock de react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn()
  }
}))

import { useCarrito } from '../../src/context/CarritoContext.jsx'
import { toast } from 'react-toastify'

// Componente real
import ProductoAgregar from '../../src/components/AgregaProducto.jsx'

describe('AgregaProducto Component', () => {
  test('renderiza el botón correctamente', () => {
    // Para este test no importa el carrito
    useCarrito.mockReturnValue({
      agregarAlCarrito: vi.fn()
    })

    const producto = { id: 10, titulo: 'Silent Hill F' }

    render(<ProductoAgregar producto={producto} />)

    const boton = screen.getByRole('button', { name: /agregar/i })
    expect(boton).toBeInTheDocument()
    expect(boton).toHaveClass('producto-agregar-home')
  })

  test('llama a agregarAlCarrito y muestra toast al hacer click', () => {
    const mockAgregar = vi.fn()
    useCarrito.mockReturnValue({
      agregarAlCarrito: mockAgregar
    })

    const producto = { id: 10, titulo: 'Silent Hill F' }

    render(<ProductoAgregar producto={producto} />)

    const boton = screen.getByRole('button', { name: /agregar/i })
    fireEvent.click(boton)

    // ✅ Se agrega al carrito
    expect(mockAgregar).toHaveBeenCalledWith(producto)

    // ✅ Se muestra el toast correcto
    expect(toast.success).toHaveBeenCalledWith(
      '¡Silent Hill F agregado al carrito!',
      expect.any(Object)
    )
  })
})