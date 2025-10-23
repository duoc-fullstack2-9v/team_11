import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductoHome from '../../src/components/ProductoHome'

describe('ProductoHome Component', () => {
  // Mock de un producto de ejemplo para las pruebas
  const mockProducto = {
    id: 1,
    titulo: 'Street Fighter 6',
    imagen: '/imgs/street-fighter-6.jpg',
    precioAntiguo: 29990,
    oferta: 4990
  }

  test('renders product information correctly', () => {
    render(<ProductoHome producto={mockProducto} onAgregarClick={() => {}} />)
    
    // Verificar que el título del producto está presente
    const titulo = screen.getByText('Street Fighter 6')
    expect(titulo).toBeDefined()
    expect(titulo).toHaveClass('producto-titulo-home')

    // Verificar que la imagen está presente y tiene el alt correcto
    const imagen = screen.getByAlt('Street Fighter 6')
    expect(imagen).toBeDefined()
    expect(imagen).toHaveClass('producto-home-imagen')
    expect(imagen).toHaveAttribute('src', '/imgs/street-fighter-6.jpg')

    // Verificar que los precios están presentes y formateados correctamente
    const precioAntiguo = screen.getByText('$29.990')
    const precioOferta = screen.getByText('Oferta $4.990')
    expect(precioAntiguo).toBeDefined()
    expect(precioOferta).toBeDefined()
    expect(precioAntiguo).toHaveClass('producto-precio-home')
    expect(precioOferta).toHaveClass('producto-precio-home-oferta')
  })

  test('calls onAgregarClick with correct product id when button is clicked', () => {
    // Crear una función mock para verificar que se llama correctamente
    const mockOnAgregarClick = vi.fn()
    
    render(
      <ProductoHome 
        producto={mockProducto} 
        onAgregarClick={mockOnAgregarClick}
      />
    )
    
    // Buscar y hacer click en el botón de agregar
    const agregarButton = screen.getByText('Agregar')
    fireEvent.click(agregarButton)
    
    // Verificar que la función fue llamada con el ID correcto
    expect(mockOnAgregarClick).toHaveBeenCalledTimes(1)
    expect(mockOnAgregarClick).toHaveBeenCalledWith(mockProducto.id)
  })

  test('renders with correct CSS classes', () => {
    render(<ProductoHome producto={mockProducto} onAgregarClick={() => {}} />)
    
    // Verificar que el contenedor principal tiene la clase correcta
    const contenedor = screen.getByRole('article', { name: '' })
    expect(contenedor).toHaveClass('producto-home')

    // Verificar que el contenedor de detalles tiene la clase correcta
    const detalles = screen.getByRole('article', { name: '' }).querySelector('.producto-detalles-home')
    expect(detalles).toBeDefined()

    // Verificar que el botón tiene la clase correcta
    const button = screen.getByText('Agregar')
    expect(button).toHaveClass('producto-agregar-home')
  })

  test('formats prices correctly with different values', () => {
    const productoConPreciosDiferentes = {
      ...mockProducto,
      precioAntiguo: 15990,
      oferta: 9990
    }

    render(
      <ProductoHome 
        producto={productoConPreciosDiferentes} 
        onAgregarClick={() => {}}
      />
    )
    
    // Verificar que los precios se formatean correctamente con valores diferentes
    const precioAntiguo = screen.getByText('$15.990')
    const precioOferta = screen.getByText('Oferta $9.990')
    expect(precioAntiguo).toBeDefined()
    expect(precioOferta).toBeDefined()
  })

  test('handles missing onAgregarClick prop gracefully', () => {
    // No debería lanzar error si no se proporciona la función onAgregarClick
    expect(() => {
      render(<ProductoHome producto={mockProducto} />)
    }).not.toThrow()
  })
})
