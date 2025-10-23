import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductoHome from '../../src/components/ProductoHome'

describe('ProductoHome Component', () => {
  const mockProducto = {
    id: 1,
    titulo: 'Street Fighter 6',
    imagen: '/imgs/street-fighter-6.jpg',
    precioAntiguo: 29990,
    oferta: 4990
  }

  test('renderiza la info del producto correctamente', () => {
    const { container } = render(
      <ProductoHome producto={mockProducto} onAgregarClick={() => {}} />
    )

    // Título
    const titulo = screen.getByText(/street fighter 6/i)
    expect(titulo).toBeInTheDocument()
    expect(titulo).toHaveClass('producto-titulo-home')

    // Imagen
    const imagen = screen.getByRole('img', { name: /street fighter 6/i })
    expect(imagen).toBeInTheDocument()
    expect(imagen).toHaveClass('producto-home-imagen')
    expect(imagen).toHaveAttribute('src', '/imgs/street-fighter-6.jpg')

    // Precios (evitar acoplar al formateo exacto; tolerar puntos de miles)
    const precioAntiguo = screen.getByText(/\$? *29\.?990/)
    const precioOferta = screen.getByText(/oferta *\$? *4\.?990/i)
    expect(precioAntiguo).toBeInTheDocument()
    expect(precioOferta).toBeInTheDocument()
    expect(precioAntiguo).toHaveClass('producto-precio-home')
    expect(precioOferta).toHaveClass('producto-precio-home-oferta')

    // Contenedor principal por clase (más fiable que role+name vacío)
    const contenedor = container.querySelector('.producto-home')
    expect(contenedor).toBeInTheDocument()

    // Contenedor de detalles
    const detalles = container.querySelector('.producto-detalles-home')
    expect(detalles).toBeInTheDocument()
  })

  test('llama onAgregarClick con el id correcto al hacer click', async () => {
    const user = userEvent.setup()
    const onAgregarClick = vi.fn()

    render(<ProductoHome producto={mockProducto} onAgregarClick={onAgregarClick} />)

    // Botón por rol y nombre accesible
    const boton = screen.getByRole('button', { name: /agregar/i })
    await user.click(boton)

    expect(onAgregarClick).toHaveBeenCalledTimes(1)
    expect(onAgregarClick).toHaveBeenCalledWith(mockProducto.id)
  })

  test('aplica las clases CSS esperadas en el botón', () => {
    render(<ProductoHome producto={mockProducto} onAgregarClick={() => {}} />)
    const boton = screen.getByRole('button', { name: /agregar/i })
    expect(boton).toHaveClass('producto-agregar-home')
  })

  test('formatea precios con distintos valores sin depender del locale exacto', () => {
    const productoConPrecios = {
      ...mockProducto,
      precioAntiguo: 15990,
      oferta: 9990
    }

    render(<ProductoHome producto={productoConPrecios} onAgregarClick={() => {}} />)

    // Solo validamos las cifras con miles usando regex flexible.
    expect(screen.getByText(/\$? *15\.?990/)).toBeInTheDocument()
    expect(screen.getByText(/oferta *\$? *9\.?990/i)).toBeInTheDocument()
  })

  test('si falta onAgregarClick, el componente renderiza sin lanzar error', () => {
    // Render sin prop y sin hacer click, para que no explote si el componente no hace guardas internas
    expect(() => {
      render(<ProductoHome producto={mockProducto} />)
    }).not.toThrow()

    // Y el botón existe igual
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument()
  })
})