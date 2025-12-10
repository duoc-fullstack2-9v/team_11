import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { Administracion } from '../../src/pages/Administracion'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock sesión de admin
vi.mock('../../src/utils/auth', () => ({
  getSession: () => ({ correo: 'admin@levelupgamer.com' })
}))

// Mock servicios CRUD
vi.mock('../../src/services/productoService', () => ({
  listarProductos: vi.fn().mockResolvedValue([]),
  crearProducto: vi.fn().mockResolvedValue({}),
  actualizarProducto: vi.fn().mockResolvedValue({}),
  eliminarProducto: vi.fn().mockResolvedValue({})
}))

const renderAdmin = () =>
  render(
    <BrowserRouter>
      <Administracion />
    </BrowserRouter>
  )

describe('Página de Administración', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('se renderiza y muestra el título "Administración"', () => {
    renderAdmin()

    const titulo = screen.getByRole('heading', { name: /administración/i })
    expect(titulo).toBeInTheDocument()
  })

  it('muestra el formulario con los campos correctos', () => {
    renderAdmin()

    expect(
      screen.getByLabelText(/Nombre del Producto/i)
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/Precio del Producto/i)
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/URL de Imagen/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /agregar producto/i })
    ).toBeInTheDocument()
  })

  it('muestra el título de productos registrados', () => {
    renderAdmin()

    const h2 = screen.getByRole('heading', { name: /productos registrados/i })
    expect(h2).toBeInTheDocument()
  })

  it('muestra la tabla con las columnas requeridas', () => {
    renderAdmin()

    const tabla = screen.getByRole('table')
    expect(tabla).toBeInTheDocument()

    const imagenTexts = screen.getAllByText(/imagen/i)
    expect(imagenTexts.length).toBeGreaterThanOrEqual(1)

    expect(screen.getByText(/título/i)).toBeInTheDocument()
    expect(screen.getByText(/precio/i)).toBeInTheDocument()
    expect(screen.getByText(/acciones/i)).toBeInTheDocument()
  })

  it('cuando no hay productos, muestra "No hay productos registrados."', () => {
    renderAdmin()
    expect(
      screen.getByText(/no hay productos registrados/i)
    ).toBeInTheDocument()
  })
})