import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Carrito from '../../src/pages/Carrito'

// Wrapper para los componentes que usan React Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Carrito Component', () => {
  test('renders main title', () => {
    renderWithRouter(<Carrito />)
    
    const title = screen.getByText('Todos los productos')
    expect(title).toBeDefined()
    expect(title).toHaveClass('titulo-principal')
  })

  test('renders "Seguir comprando" link', () => {
    renderWithRouter(<Carrito />)
    
    const backLink = screen.getByText('Seguir comprando')
    expect(backLink).toBeDefined()
    expect(backLink.closest('a')).toHaveClass('boton-volver')
    expect(backLink.closest('a')).toHaveAttribute('href', '/productos')
  })

  test('renders empty cart message when cart is empty', () => {
    renderWithRouter(<Carrito />)
    
    const emptyMessage = screen.getByText('Tu carrito esta vacio.')
    expect(emptyMessage).toBeDefined()
    expect(emptyMessage).toHaveClass('carrito-vacio')
    
    // Verificar que el emoji de tristeza está presente
    const sadEmoji = screen.getByText('😟')
    expect(sadEmoji).toBeDefined()
  })

  test('renders cart products correctly', () => {
    renderWithRouter(<Carrito />)
    
    // Verificar los productos del carrito
    const productos = [
      {
        titulo: 'Skyrim',
        precio: '$29.990',
        cantidad: '1',
        subtotal: '$29.990'
      },
      {
        titulo: 'Resident evil 4',
        precio: '$39.990',
        cantidad: '1',
        subtotal: '$24.000'
      }
    ]

    productos.forEach(producto => {
      const titulo = screen.getByText(producto.titulo)
      expect(titulo).toBeDefined()

      const precio = screen.getByText(producto.precio)
      expect(precio).toBeDefined()

      const cantidad = screen.getByText(producto.cantidad)
      expect(cantidad).toBeDefined()

      const subtotal = screen.getByText(producto.subtotal)
      expect(subtotal).toBeDefined()
    })
  })

  test('renders cart action buttons', () => {
    renderWithRouter(<Carrito />)
    
    // Verificar botón de vaciar carrito
    const vaciarButton = screen.getByText('Vaciar carrito')
    expect(vaciarButton).toBeDefined()
    expect(vaciarButton).toHaveClass('carrito-acciones-vaciar')

    // Verificar botón de comprar
    const comprarButton = screen.getByText('Comprar')
    expect(comprarButton).toBeDefined()
    expect(comprarButton).toHaveClass('carrito-acciones-comprar')
  })

  test('renders delete buttons for each product', () => {
    renderWithRouter(<Carrito />)
    
    const deleteButtons = screen.getAllByText('Eliminar')
    expect(deleteButtons).toHaveLength(2)
    deleteButtons.forEach(button => {
      expect(button).toHaveClass('carrito-producto-eliminar')
    })
  })

  test('renders total amount', () => {
    renderWithRouter(<Carrito />)
    
    const totalLabel = screen.getByText('Total a pagar:')
    expect(totalLabel).toBeDefined()
    
    const totalAmount = screen.getByText('3.000')
    expect(totalAmount).toBeDefined()
    expect(totalAmount).toHaveAttribute('id', 'total')
  })

  test('renders success message (initially disabled)', () => {
    renderWithRouter(<Carrito />)
    
    const successMessage = screen.getByText('¡Gracias por tu compra!')
    expect(successMessage).toBeDefined()
    expect(successMessage.parentElement).toHaveClass('disabled')
    
    // Verificar que el emoji de risa está presente
    const laughEmoji = screen.getByText('😆')
    expect(laughEmoji).toBeDefined()
  })

  test('product images have correct attributes', () => {
    renderWithRouter(<Carrito />)
    
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)

    images.forEach(img => {
      expect(img).toHaveClass('carrito-producto-imagen')
      expect(img).toHaveAttribute('src')
    })
  })

  test('product sections have correct structure', () => {
    renderWithRouter(<Carrito />)
    
    // Verificar las secciones de los productos
    const sections = ['Titulo', 'Cantidad', 'Precio', 'Subtotal']
    sections.forEach(section => {
      const labels = screen.getAllByText(section)
      expect(labels).toBeDefined()
      labels.forEach(label => {
        expect(label.tagName.toLowerCase()).toBe('small')
      })
    })
  })
})
