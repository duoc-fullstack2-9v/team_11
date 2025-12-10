// tests/pages/Productos.spec.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

// ✅ Mock de axios
import axios from 'axios'
vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}))
const mockedAxios = axios

// ✅ Mock de toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn()
  }
}))
import { toast } from 'react-toastify'

// ✅ Mock del contexto del carrito
vi.mock('../../src/context/CarritoContext.jsx', () => ({
  useCarrito: vi.fn()
}))
import { useCarrito } from '../../src/context/CarritoContext.jsx'

// Componente real
import Productos from '../../src/pages/Productos.jsx'

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

const fakeProductos = [
  {
    id: 1,
    titulo: 'Street Fighter vs Tekken',
    imagen: 'https://ejemplo.com/sfvt.jpg',
    precio: 29990
  },
  {
    id: 2,
    titulo: 'Silent Hill F',
    imagen: 'https://ejemplo.com/shf.jpg',
    precio: 39990
  }
]

describe('Productos page', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // cada test simula que la API devuelve estos productos
    mockedAxios.get.mockResolvedValue({ data: fakeProductos })

    // carrito vacío pero con función para agregar
    useCarrito.mockReturnValue({
      agregarAlCarrito: vi.fn(),
      carrito: []
    })
  })

  it('muestra el título principal con su clase', async () => {
    renderWithRouter(<Productos />)

    const title = await screen.findByRole('heading', {
      name: /compra los mejores productos al mejor precio/i
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('titulo-principal')
  })

  it('renderiza las tarjetas de productos que vienen desde la API', async () => {
    renderWithRouter(<Productos />)

    // esperamos a que aparezca uno de los títulos
    const cardTitle = await screen.findByText('Street Fighter vs Tekken')
    expect(cardTitle).toBeInTheDocument()

    const cards = document.querySelectorAll('.producto-home')
    expect(cards.length).toBeGreaterThanOrEqual(2)
  })

  it('muestra las imágenes con alt y src', async () => {
    renderWithRouter(<Productos />)

    const images = await screen.findAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(2)
    images.forEach(img => {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt')
    })
  })

  it('permite agregar un producto al carrito y muestra toast', async () => {
    const mockAgregar = vi.fn()
    useCarrito.mockReturnValue({
      agregarAlCarrito: mockAgregar,
      carrito: []
    })

    renderWithRouter(<Productos />)

    // esperamos a que se rendericen los botones "Agregar"
    const botones = await screen.findAllByRole('button', {
      name: /agregar/i
    })
    expect(botones.length).toBeGreaterThanOrEqual(1)

    fireEvent.click(botones[0])

    expect(mockAgregar).toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalled()
  })
})