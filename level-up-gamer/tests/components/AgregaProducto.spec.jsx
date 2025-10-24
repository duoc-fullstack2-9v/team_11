/// <reference types="vitest/globals" />
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// 💡 Primero definimos el mock del contexto ANTES de importar el componente
const mockAgregar = vi.fn()

vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: () => ({
    agregarAlCarrito: mockAgregar
  })
}))

// 💡 Ahora sí importamos el componente (después del mock)
import AgregaProducto from '../../src/components/AgregaProducto.jsx'

describe('AgregaProducto Component', () => {
  test('renderiza el botón correctamente', () => {
    render(<AgregaProducto producto={{ id: 1, titulo: 'Elden Ring' }} />)
    const button = screen.getByRole('button', { name: /agregar/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('producto-agregar-home')
  })

  test('llama a agregarAlCarrito y muestra alert al hacer click', () => {
    window.alert = vi.fn() // mockeamos alert
    render(<AgregaProducto producto={{ id: 10, titulo: 'Silent Hill F' }} />)

    const button = screen.getByRole('button', { name: /agregar/i })
    fireEvent.click(button)

    expect(mockAgregar).toHaveBeenCalledWith({ id: 10, titulo: 'Silent Hill F' })
    expect(window.alert).toHaveBeenCalledWith('¡Silent Hill F agregado al carrito!')
  })
})