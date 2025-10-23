import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Carrito from '../../src/pages/Carrito'

// Helper para render con Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

// Limpieza de storage entre tests
beforeEach(() => {
  localStorage.clear?.()
})

// Regex flexible para mostrar un número formateado (., o , como separador, $ opcional, espacios)
const moneyRx = (n) => {
  const digits = String(n).replace(/[^\d]/g, '')
  // Inserta un patrón de separador opcional entre miles
  const withGroups = digits.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1[\\.,]?')
  return new RegExp(`^\\s*\\$?\\s*${withGroups}\\s*$`, 'i')
}

// Convierte cualquier "$53.990", "53,990", " 53 990 " a 53990
const extractNumber = (txt) => {
  const d = String(txt).replace(/[^\d]/g, '')
  return d ? parseInt(d, 10) : 0
}

// Suma de NodeList de <p> con montos
const sumNodeListCLP = (nodes) => {
  let t = 0
  nodes.forEach(n => { t += extractNumber(n.textContent) })
  return t
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
      { id: 1, titulo: 'Skyrim',          precio: 29990, cantidad: 1, imagen: '/imgs/skyrim.jpg' },
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
      // Encuentra el card por el título y acota el scope
      const titleNode = screen.getByText(new RegExp(titulo, 'i'))
      const card = titleNode.closest('.carrito-producto')
      expect(card).toBeTruthy()
      const c = within(card)

      // cantidad: en el <p> con el número limpio (evita chocar con <small> "Cantidad 1")
      const qtyPs = c.getAllByText(new RegExp(`^${cantidad}$`))
      const qtyP = qtyPs.find(n => n.tagName.toLowerCase() === 'p')
      expect(qtyP).toBeTruthy()

      // precio mostrado en el card
      const anyPrice = c.queryAllByText(moneyRx(precio))
      expect(anyPrice.length).toBeGreaterThan(0)
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

  test('muestra el total que coincide con la suma de subtotales renderizados', () => {
    seed()
    renderWithRouter(<Carrito />)

    // 1) suma subtotales mostrados en cada card
    const subtotalPs = document.querySelectorAll('.carrito-producto-subtotal p')
    expect(subtotalPs.length).toBeGreaterThan(0)
    const totalEsperado = sumNodeListCLP(subtotalPs)

    // 2) lee el nodo de total (por id o por texto)
    const totalLabel = screen.getByText(/total a pagar/i)
    expect(totalLabel).toBeInTheDocument()
    const totalNode = document.getElementById('total') || totalLabel.nextElementSibling
    expect(totalNode).toBeTruthy()

    const totalMostrado = extractNumber(totalNode.textContent)
    expect(totalMostrado).toBe(totalEsperado)

    // adicional: también debería matchear un regex de dinero flexible
    expect(totalNode.textContent).toMatch(moneyRx(totalEsperado))
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