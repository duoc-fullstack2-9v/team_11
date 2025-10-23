import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../../src/pages/Login'
import * as auth from '../../src/utils/auth'

// Mock de las funciones de autenticación
vi.mock('../../src/utils/auth', () => ({
  findUser: vi.fn(),
  saveUser: vi.fn(),
  startSession: vi.fn()
}))

// Mock del hook useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Wrapper para los componentes que usan React Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Login Component', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    vi.clearAllMocks()
  })

  test('renders login form by default', () => {
    renderWithRouter(<Login />)
    
    // Verificar que el formulario de inicio de sesión está presente
    expect(screen.getByText('Iniciar sesión')).toBeDefined()
    expect(screen.getByLabelText('Usuario')).toBeDefined()
    expect(screen.getByLabelText('Contraseña')).toBeDefined()
    expect(screen.getByText('Ingresar')).toBeDefined()
  })

  test('switches between login and register views', () => {
    renderWithRouter(<Login />)
    
    // Inicialmente muestra el formulario de login
    expect(screen.getByText('Iniciar sesión')).toBeDefined()
    
    // Click en el botón de cambio a registro
    const switchButton = screen.getByText('Registrarse')
    fireEvent.click(switchButton)
    
    // Ahora debe mostrar el formulario de registro
    expect(screen.getByText('Crear cuenta')).toBeDefined()
    expect(screen.getByLabelText('Nombre de usuario')).toBeDefined()
    expect(screen.getByLabelText('Correo')).toBeDefined()
    expect(screen.getByLabelText('Contraseña')).toBeDefined()
  })

  test('handles successful login', async () => {
    // Mock de un usuario existente
    const mockUser = {
      usuario: 'testuser',
      contrasena: 'password123'
    }
    auth.findUser.mockReturnValue(mockUser)
    
    renderWithRouter(<Login />)
    
    // Llenar el formulario
    const usuarioInput = screen.getByLabelText('Usuario')
    const contrasenaInput = screen.getByLabelText('Contraseña')
    fireEvent.change(usuarioInput, { target: { value: 'testuser' } })
    fireEvent.change(contrasenaInput, { target: { value: 'password123' } })
    
    // Enviar el formulario
    const form = screen.getByRole('button', { name: 'Ingresar' })
    fireEvent.click(form)
    
    // Verificar que se llamaron las funciones correctas
    expect(auth.findUser).toHaveBeenCalledWith('testuser')
    expect(auth.startSession).toHaveBeenCalledWith(mockUser)
    expect(mockNavigate).toHaveBeenCalledWith('/perfil')
  })

  test('handles failed login', () => {
    // Mock de usuario no encontrado
    auth.findUser.mockReturnValue(null)
    
    renderWithRouter(<Login />)
    
    // Llenar el formulario con credenciales incorrectas
    const usuarioInput = screen.getByLabelText('Usuario')
    const contrasenaInput = screen.getByLabelText('Contraseña')
    fireEvent.change(usuarioInput, { target: { value: 'wronguser' } })
    fireEvent.change(contrasenaInput, { target: { value: 'wrongpass' } })
    
    // Enviar el formulario
    const form = screen.getByRole('button', { name: 'Ingresar' })
    fireEvent.click(form)
    
    // Verificar que se muestra el mensaje de error
    expect(screen.getByText('Usuario o contraseña incorrectos')).toBeDefined()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('handles successful registration', () => {
    // Mock de usuario no existente (para registro exitoso)
    auth.findUser.mockReturnValue(null)
    
    renderWithRouter(<Login />)
    
    // Cambiar a vista de registro
    const switchButton = screen.getByText('Registrarse')
    fireEvent.click(switchButton)
    
    // Llenar el formulario de registro
    const usuarioInput = screen.getByLabelText('Nombre de usuario')
    const correoInput = screen.getByLabelText('Correo')
    const contrasenaInput = screen.getByLabelText('Contraseña')
    
    fireEvent.change(usuarioInput, { target: { value: 'newuser' } })
    fireEvent.change(correoInput, { target: { value: 'test@test.com' } })
    fireEvent.change(contrasenaInput, { target: { value: 'newpass123' } })
    
    // Enviar el formulario
    const form = screen.getByRole('button', { name: 'Crear cuenta' })
    fireEvent.click(form)
    
    // Verificar que se llamaron las funciones correctas
    expect(auth.saveUser).toHaveBeenCalledWith({
      usuario: 'newuser',
      correo: 'test@test.com',
      contrasena: 'newpass123'
    })
    expect(mockNavigate).toHaveBeenCalledWith('/perfil')
  })

  test('handles registration with existing username', () => {
    // Mock de usuario existente
    auth.findUser.mockReturnValue({ usuario: 'existinguser' })
    
    renderWithRouter(<Login />)
    
    // Cambiar a vista de registro
    const switchButton = screen.getByText('Registrarse')
    fireEvent.click(switchButton)
    
    // Llenar el formulario
    const usuarioInput = screen.getByLabelText('Nombre de usuario')
    const correoInput = screen.getByLabelText('Correo')
    const contrasenaInput = screen.getByLabelText('Contraseña')
    
    fireEvent.change(usuarioInput, { target: { value: 'existinguser' } })
    fireEvent.change(correoInput, { target: { value: 'test@test.com' } })
    fireEvent.change(contrasenaInput, { target: { value: 'pass123' } })
    
    // Enviar el formulario
    const form = screen.getByRole('button', { name: 'Crear cuenta' })
    fireEvent.click(form)
    
    // Verificar que se muestra el mensaje de error
    expect(screen.getByText('Ese usuario ya existe')).toBeDefined()
    expect(auth.saveUser).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('clears error message when switching views', () => {
    renderWithRouter(<Login />)
    
    // Provocar un error de login
    auth.findUser.mockReturnValue(null)
    const loginButton = screen.getByText('Ingresar')
    fireEvent.click(loginButton)
    
    // Verificar que el error está presente
    expect(screen.getByText('Usuario o contraseña incorrectos')).toBeDefined()
    
    // Cambiar de vista
    const switchButton = screen.getByText('Registrarse')
    fireEvent.click(switchButton)
    
    // Verificar que el error ya no está presente
    expect(screen.queryByText('Usuario o contraseña incorrectos')).toBeNull()
  })
})
