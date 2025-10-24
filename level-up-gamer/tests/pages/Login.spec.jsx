import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// 1) MOCKS ANTES DE IMPORTAR EL COMPONENTE Y EL MÓDULO
vi.mock('../../src/utils/auth', () => ({
  findUser: vi.fn(),
  saveUser: vi.fn(),
  startSession: vi.fn()
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// 2) IMPORTAMOS EL COMPONENTE REAL (InicioSesion)
import { BrowserRouter } from 'react-router-dom'
import InicioSesion from '../../src/pages/Login'
import * as auth from '../../src/utils/auth'

// Helper para envolver con Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('Componente InicioSesion (autenticación local)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renderiza el formulario de inicio de sesión por defecto', () => {
    renderWithRouter(<InicioSesion />)

    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument()
  })

  test('al hacer click en el switch cambia a la vista de registro', () => {
    renderWithRouter(<InicioSesion />)
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }))

    expect(screen.getByRole('heading', { name: 'Registrarse' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre de usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Correo')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Crear cuenta' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument()
  })

  test('inicio de sesión exitoso', () => {
    const mockUser = { usuario: 'testuser', contrasena: 'password123' }
    auth.findUser.mockReturnValue(mockUser)

    renderWithRouter(<InicioSesion />)

    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(auth.findUser).toHaveBeenCalledWith('testuser')
    expect(auth.startSession).toHaveBeenCalledWith(mockUser)
    expect(mockNavigate).toHaveBeenCalledWith('/perfil')
  })

  test('inicio de sesión fallido muestra error y no navega', () => {
    // findUser devuelve null => error esperado
    auth.findUser.mockReturnValue(null)
    renderWithRouter(<InicioSesion />)

    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'wronguser' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'wrongpass' } })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    // ahora el mensaje existe porque el componente setea error
    expect(screen.getByText('Usuario o contraseña incorrectos')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('registro exitoso', () => {
    auth.findUser.mockReturnValue(null)
    renderWithRouter(<InicioSesion />)

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }))

    fireEvent.change(screen.getByLabelText('Nombre de usuario'), { target: { value: 'newuser' } })
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'newpass123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(auth.saveUser).toHaveBeenCalledWith({
      usuario: 'newuser',
      correo: 'test@test.com',
      contrasena: 'newpass123'
    })
    expect(auth.startSession).toHaveBeenCalledWith({
      usuario: 'newuser',
      correo: 'test@test.com',
      contrasena: 'newpass123'
    })
    expect(mockNavigate).toHaveBeenCalledWith('/perfil')
  })

  test('registro con usuario existente muestra error y no navega', () => {
    auth.findUser.mockReturnValue({ usuario: 'existinguser' })
    renderWithRouter(<InicioSesion />)

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }))
    fireEvent.change(screen.getByLabelText('Nombre de usuario'), { target: { value: 'existinguser' } })
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'pass123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(screen.getByText('Ese usuario ya existe')).toBeInTheDocument()
    expect(auth.saveUser).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('al cambiar de vista se limpia el error', () => {
    auth.findUser.mockReturnValue(null)
    renderWithRouter(<InicioSesion />)

    // Provocamos error de forma más realista
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'fake' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('Usuario o contraseña incorrectos')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }))
    expect(screen.queryByText('Usuario o contraseña incorrectos')).toBeNull()
  })
})