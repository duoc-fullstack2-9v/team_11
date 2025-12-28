import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// 1) MOCKS ANTES DE IMPORTAR EL COMPONENTE Y EL MÓDULO

// Mock de authService (API)
vi.mock('../../src/services/authService', () => ({
  loginUsuario: vi.fn(),
  registrarUsuario: vi.fn()
}))

// Mock de utils/auth (solo startSession ahora)
vi.mock('../../src/utils/auth', () => ({
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
import * as authService from '../../src/services/authService'
import * as auth from '../../src/utils/auth'

// Helper para envolver con Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('Componente InicioSesion (login con API)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renderiza el formulario de inicio de sesión por defecto', () => {
    renderWithRouter(<InicioSesion />)

    expect(
      screen.getByRole('heading', { name: /iniciar sesión/i })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Correo')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ingresar' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Registrarse' })
    ).toBeInTheDocument()
  })

  test('al hacer click en el switch cambia a la vista de registro', () => {
    renderWithRouter(<InicioSesion />)
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }))

    expect(
      screen.getByRole('heading', { name: 'Registrarse' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Correo')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirmar contraseña')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Crear cuenta' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    ).toBeInTheDocument()
  })

  // 👇 TEST NUEVO (campos vacíos)
  test('no llama a loginUsuario si se intenta iniciar sesión con campos vacíos', () => {
    renderWithRouter(<InicioSesion />)

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    // No debería llamar a la API si faltan datos
    expect(authService.loginUsuario).not.toHaveBeenCalled()
  })

  test('inicio de sesión exitoso llama a loginUsuario, startSession y navega a /perfil', async () => {
    // authService.loginUsuario.mockResolvedValue('Login exitoso')
    authService.loginUsuario.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      token: 'fake-token-123'
    })

    renderWithRouter(<InicioSesion />)

    fireEvent.change(screen.getByLabelText('Correo'), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => {
      expect(authService.loginUsuario).toHaveBeenCalledWith(
        'test@test.com',
        'password123'
      )
    })

    expect(auth.startSession).toHaveBeenCalledWith({
      id: 1,
      email: 'test@test.com',
      token: 'fake-token-123'
    })

    expect(mockNavigate).toHaveBeenCalledWith('/perfil')
  })

  test('login fallido muestra mensaje de error y no navega', async () => {
    authService.loginUsuario.mockRejectedValue(new Error('401'))

    renderWithRouter(<InicioSesion />)

    fireEvent.change(screen.getByLabelText('Correo'), {
      target: { value: 'wrong@test.com' }
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'wrongpass' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => {
      expect(
        screen.getByText('Usuario o contraseña incorrectos')
      ).toBeInTheDocument()
    })

    expect(auth.startSession).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('registro exitoso llama a registrarUsuario, startSession y navega a /perfil', async () => {

    authService.registrarUsuario.mockResolvedValue({
      id: 1,
      email: 'nuevo@test.com',
      password: 'newpass123'
    })

    renderWithRouter(<InicioSesion />)

    // Cambiamos a vista registro
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }))

    fireEvent.change(screen.getByLabelText('Correo'), {
      target: { value: 'nuevo@test.com' }
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'newpass123' }
    })
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'newpass123' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))


    await waitFor(() => {
      expect(authService.registrarUsuario).toHaveBeenCalledWith(
        'nuevo@test.com',
        'newpass123'
      )
    })

    expect(auth.startSession).toHaveBeenCalledWith({
      id: 1,
      email: 'nuevo@test.com',
      password: 'newpass123'
    })

    expect(mockNavigate).toHaveBeenCalledWith('/perfil')
  })

  test('registro fallido muestra mensaje de error y no navega', async () => {
    authService.registrarUsuario.mockRejectedValue(new Error('500'))

    renderWithRouter(<InicioSesion />)

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }))

    fireEvent.change(screen.getByLabelText('Correo'), {
      target: { value: 'nuevo@test.com' }
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'newpass123' }
    })
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'newpass123' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    await waitFor(() => {
      expect(
        screen.getByText('No se pudo registrar el usuario.')
      ).toBeInTheDocument()
    })

    expect(auth.startSession).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})