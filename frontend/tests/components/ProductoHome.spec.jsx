import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import ProductoHome from '././src/components/ProductoHome.jsx'

describe('ProductoHome Component', () => {
  const mockProducto = {
    id: 1,
    titulo: 'Street Fighter vs Tekken',
    imagen: 'https://ejemplo.com/sfvt.jpg',
    precioAntiguo: 29990,
    oferta: 4990
  }

  test('renderiza la info del producto correctamente', () => {
    const onAgregarClick = vi.fn()
    render(<ProductoHome producto={mockProducto} onAgregarClick={onAgregarClick} />)

    const titulo = screen.getByText('Street Fighter vs Tekken')
    expect(titulo).toBeInTheDocument()
    expect(titulo).toHaveClass('producto-titulo-home')

    // Precio antiguo: usamos regex flexible para $ 29.990
    expect(
      screen.getByText((content) =>
        /\$/.test(content) && /29.?990/.test(content.replace(/\s/g, ''))
      )
    ).toBeInTheDocument()

    // Texto "Oferta 4.990"
    expect(screen.getByText(/oferta/i)).toBeInTheDocument()
  })

  test('llama onAgregarClick con el producto al hacer click', () => {
    const onAgregarClick = vi.fn()
    render(<ProductoHome producto={mockProducto} onAgregarClick={onAgregarClick} />)

    const boton = screen.getByRole('button', { name: /agregar/i })
    fireEvent.click(boton)

    expect(onAgregarClick).toHaveBeenCalledWith(mockProducto)
  })

  test('aplica las clases CSS esperadas en el botón', () => {
    const onAgregarClick = vi.fn()
    render(<ProductoHome producto={mockProducto} onAgregarClick={onAgregarClick} />)

    const boton = screen.getByRole('button', { name: /agregar/i })
    expect(boton).toHaveClass('producto-agregar-home')
  })
})