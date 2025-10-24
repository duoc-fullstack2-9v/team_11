import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

// 👉 Mock reutilizable para verificar llamadas
const eliminarDelCarritoMock = vi.fn()

// 💡 Mock del contexto del carrito (debe ir ANTES del import del componente)
vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: () => ({
    carrito: [
      { id: 1, titulo: 'Skyrim', imagen: '/imgs/skyrim.webp', precio: 29990, cantidad: 1 },
      { id: 2, titulo: 'Resident Evil 4', imagen: '/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg', precio: 39990, cantidad: 1 }
    ],
    // ✅ ahora sí: el MISMO mock que verificamos más abajo
    eliminarDelCarrito: eliminarDelCarritoMock
  })
}))

import Carrito from '../../src/pages/Carrito'

// Helper para render con Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('Carrito Component (con contexto simulado)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('muestra el título principal correcto', () => {
    renderWithRouter(<Carrito />)
    const title = screen.getByRole('heading', { name: /tu carrito de compras/i })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('titulo-principal')
  })

  test('renderiza los productos del carrito con sus datos', () => {
    renderWithRouter(<Carrito />)
    const cards = screen.getAllByRole('heading', { level: 3 })
    expect(cards).toHaveLength(2)

    // Primer producto
    expect(screen.getByText('Skyrim')).toBeInTheDocument()
    const img1 = screen.getByAltText('Skyrim')
    expect(img1).toHaveAttribute('src', '/imgs/skyrim.webp')

    // Segundo producto
    expect(screen.getByText(/resident evil 4/i)).toBeInTheDocument()
    const img2 = screen.getByAltText(/resident evil 4/i)
    expect(img2).toHaveAttribute('src', '/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg')

    // Botones de eliminar (al menos 2 en la vista)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  test('muestra la sección de acciones y calcula el total correctamente', () => {
    renderWithRouter(<Carrito />)

    const totalText = screen.getByText(/total a pagar/i)
    expect(totalText).toBeInTheDocument()

    const totalValue = document.querySelector('#total')
    // 29990 + 39990 = 69980
    expect(totalValue.textContent).toContain('69.980')

    const comprarBtn = screen.getByRole('button', { name: /paga de forma segura/i })
    expect(comprarBtn).toBeInTheDocument()

    const gracias = screen.getByText(/gracias por tu compra/i)
    expect(gracias).toBeInTheDocument()
    expect(gracias).toHaveClass('disabled')
  })

  // 🔥 Test de eliminar
  test('al hacer click en eliminar llama eliminarDelCarrito con el id correcto', () => {
    renderWithRouter(<Carrito />)

    // Buscar un control de eliminar robustamente:
    const eliminarBtn =
      screen.queryByRole('button', { name: /eliminar/i }) ||
      screen.queryByLabelText?.(/eliminar/i) ||
      document.querySelector('.bi-trash, .fa-trash, .fa-solid.fa-trash, [data-icon="trash"], .carrito-producto-eliminar')

    expect(eliminarBtn).toBeTruthy()

    // Click
    eliminarBtn.click()

    // Debe invocarse con id=1 (primer item del mock)
    expect(eliminarDelCarritoMock).toHaveBeenCalledWith(1)
  })
})