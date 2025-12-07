import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { Administracion } from '../../src/pages/Administracion'

// --- MOCKS NECESARIOS ---

// 1. Mock de navigate para evitar redirecciones reales
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// 2. Mock de getSession → simular usuario ADMIN autenticado
vi.mock('../../src/utils/auth', () => ({
  getSession: () => ({ correo: 'admin@levelupgamer.com' }) // ADMIN_EMAILS coincide
}))

// 3. Mock de servicios del CRUD
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

    // Nombre del producto
    expect(screen.getByLabelText(/Nombre del Producto/i)).toBeInTheDocument()

    // Precio del producto
    expect(screen.getByLabelText(/Precio del Producto/i)).toBeInTheDocument()

    // URL de imagen
    expect(screen.getByLabelText(/URL de Imagen/i)).toBeInTheDocument()

    // Botón principal: Agregar Producto (cuando no hay edición)
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

    expect(screen.getByText(/imagen/i)).toBeInTheDocument()
    expect(screen.getByText(/título/i)).toBeInTheDocument()
    expect(screen.getByText(/precio/i)).toBeInTheDocument()
    expect(screen.getByText(/acciones/i)).toBeInTheDocument()
  })

  it('cuando no hay productos, muestra "No hay productos registrados."', () => {
    renderAdmin()
    expect(screen.getByText(/no hay productos registrados/i)).toBeInTheDocument()
  })
})