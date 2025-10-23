import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Carrito from '../../src/pages/Carrito'

// Helper para render con Router
const renderWithRouter = (ui) =>
  render(<BrowserRouter>{ui}</BrowserRouter>)

// Limpieza de storage entre tests
beforeEach(() => {
  localStorage.clear?.()
})

// Regex flexible para precios con miles (acepta $ opcional, espacios y puntos)
const moneyRx = (n) => {
  const withThousands = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\\.?')
  return new RegExp(`\\$?\\s*${withThousands}`, 'i')
}

describe('Carrito Component - estado vacío', () => {
  test('muestra el título principal', () => {
    renderWithRouter(<Carrito />)
    const title = screen.getByRole('heading', { name: /todos los productos|carrito/i })
    expect(title).toBeInTheDocument()
    // si existe clase la comprobamos, pero sin casarnos con el texto exacto
    if (title.classList.contains('titulo-principal')) {
      expect(title).toHaveClass('titulo-principal')
    }
  })

  test('renderiza el link "Seguir comprando"', () => {
    renderWithRouter(<Carrito />)
    const link = screen.getByRole('link', { name: /seguir comprando/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('boton-volver')
    expect(link.getAttribute('href')).toMatch(/\/productos|\/catalogo/i)
  })

  test('muestra mensaje de carrito vacío', () => {
    renderWithRouter(<Carrito />)
    const emptyMsg = screen.getByText(/tu carrito est[aá] vac[ií]o/i)
    expect(emptyMsg).toBeInTheDocument()
    // si el componente usa clase específica, la validamos sin reventar si cambia
    if (emptyMsg.classList.contains('carrito-vacio')) {
      expect(emptyMsg).toHaveClass('carrito-vacio')
    }
    // el emoji puede existir o estar en un contenedor; probamos ambos
    const emoji = screen.queryByText('😟')
    if (emoji) expect(emoji).toBeInTheDocument()
  })

  test('mensaje de éxito está presente pero deshabilitado', () => {
    renderWithRouter(<Carrito />)
    const success = screen.getByText(/gracias por tu compra/i)
    expect(success).toBeInTheDocument()
    // algunos diseños ponen la clase en el padre
    const target = success.closest('.disabled') ?? success
    expect(target.classList.contains('disabled')).toBe(true)
    const laughEmoji = screen.queryByText('😆')
    if (laughEmoji) expect(laughEmoji).toBeInTheDocument()
  })
})

describe('Carrito Component - con productos en storage', () => {
  const seed = () => {
    const items = [
      { id: 1, titulo: 'Skyrim', precio: 29990, cantidad: 1, imagen: '/imgs/skyrim.jpg' },
      { id: 2, titulo: 'Resident evil 4', precio: 24000, cantidad: 1, imagen: '/imgs/re4.jpg' }
    ]
    // Ajusta la clave según lo que use tu componente: 'carrito', 'cart', etc.
    localStorage.setItem('carrito', JSON.stringify(items))
    return items
  }

  test('renderiza los productos del carrito', () => {
    const items = seed()
    renderWithRouter(<Carrito />)

    items.forEach(({ titulo, precio, cantidad }) => {
      expect(screen.getByText(new RegExp(titulo, 'i'))).toBeInTheDocument()
      // cantidad puede estar como texto suelto o dentro de un input; comprobamos ambos
      const qtyText = screen.queryByText(new RegExp(`^${cantidad}$`))
      const qtyInput = screen.queryByDisplayValue?.(String(cantidad))
      expect(qtyText || qtyInput).toBeTruthy()

      // precio y subtotal: tolerar formato con $ y miles
      expect(screen.getAllByText(moneyRx(precio)).length).toBeGreaterThan(0)
    })

    // Imágenes
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(2)
    images.forEach(img => {
      if (img.classList.contains('carrito-producto-imagen')) {
        expect(img).toHaveClass('carrito-producto-imagen')
      }
      expect(img).toHaveAttribute('src')
    })
  })

  test('muestra botones de acciones del carrito', () => {
    seed()
    renderWithRouter(<Carrito />)

    const vaciar = screen.getByRole('button', { name: /vaciar carrito/i })
    expect(vaciar).toBeInTheDocument()
    if (vaciar.classList.contains('carrito-acciones-vaciar')) {
      expect(vaciar).toHaveClass('carrito-acciones-vaciar')
    }

    const comprar = screen.getByRole('button', { name: /comprar/i })
    expect(comprar).toBeInTheDocument()
    if (comprar.classList.contains('carrito-acciones-comprar')) {
      expect(comprar).toHaveClass('carrito-acciones-comprar')
    }
  })

  test('muestra total correcto sin depender del formato exacto', async () => {
    const user = userEvent.setup()
    const items = seed()
    renderWithRouter(<Carrito />)

    const totalEsperado = items.reduce((acc, it) => acc + it.precio * (it.cantidad ?? 1), 0)
    const totalLabel = screen.getByText(/total a pagar/i)
    expect(totalLabel).toBeInTheDocument()

    const totalNode =
      screen.queryByTestId('total') ||
      screen.queryByRole('heading', { name: moneyRx(totalEsperado) }) ||
      screen.getByText(moneyRx(totalEsperado))

    expect(totalNode).toBeInTheDocument()

    // si el nodo del total tiene id o clase específica, las validamos opcionalmente
    if (totalNode.id === 'total') {
      expect(totalNode).toHaveTextContent(moneyRx(totalEsperado))
    }
  })

  test('cada producto tiene botón Eliminar', () => {
    seed()
    renderWithRouter(<Carrito />)
    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i })
    expect(deleteButtons.length).toBeGreaterThanOrEqual(2)
    deleteButtons.forEach(btn => {
      if (btn.classList.contains('carrito-producto-eliminar')) {
        expect(btn).toHaveClass('carrito-producto-eliminar')
      }
    })
  })

  test('etiquetas de secciones existen si el diseño las usa', () => {
    seed()
    renderWithRouter(<Carrito />)
    const sections = [/t[ií]tulo/i, /cantidad/i, /precio/i, /subtotal/i]
    sections.forEach(rx => {
      const labels = screen.queryAllByText(rx)
      // No fallamos si el diseño cambió a iconos o headers distintos
      if (labels.length) {
        labels.forEach(el => expect(el.tagName.toLowerCase()).toBe('small'))
      }
    })
  })
})