import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Perfil from '../../src/pages/Perfil'
import * as auth from '../../src/utils/auth'

// Mock de las funciones de autenticación
vi.mock('../../src/utils/auth', () => ({
  getSession: vi.fn(),
  endSession: vi.fn()
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

describe('Perfil Component', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    vi.clearAllMocks()
  })

  test('redirects to login when no session exists', () => {
    // Mock de sesión vacía
    auth.getSession.mockReturnValue(null)
    
    renderWithRouter(<Perfil />)
    
    // Verificar que se redirige a login
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  test('renders profile information when session exists', () => {
    // Mock de una sesión activa
    const mockSession = {
      usuario: 'testuser',
      correo: 'test@example.com'
    }
    auth.getSession.mockReturnValue(mockSession)
    
    renderWithRouter(<Perfil />)
    
    // Verificar que se muestra el título
    expect(screen.getByText('Mi perfil')).toBeDefined()
    
    // Verificar que se muestran los datos del usuario
    expect(screen.getByText('Usuario:')).toBeDefined()
    expect(screen.getByText('testuser')).toBeDefined()
    expect(screen.getByText('Correo:')).toBeDefined()
    expect(screen.getByText('test@example.com')).toBeDefined()
  })

  test('handles logout correctly', () => {
    // Mock de una sesión activa
    const mockSession = {
      usuario: 'testuser',
      correo: 'test@example.com'
    }
    auth.getSession.mockReturnValue(mockSession)
    
    renderWithRouter(<Perfil />)
    
    // Click en el botón de cerrar sesión
    const logoutButton = screen.getByText('Cerrar sesión')
    fireEvent.click(logoutButton)
    
    // Verificar que se llamaron las funciones correctas
    expect(auth.endSession).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  test('displays profile picture', () => {
    // Mock de una sesión activa
    const mockSession = {
      usuario: 'testuser',
      correo: 'test@example.com'
    }
    auth.getSession.mockReturnValue(mockSession)
    
    renderWithRouter(<Perfil />)
    
    // Verificar que la imagen de perfil está presente
    const profileImage = screen.getByAlt('Foto de perfil')
    expect(profileImage).toBeDefined()
    expect(profileImage).toHaveClass('perfil-foto')
    expect(profileImage).toHaveAttribute('src', '/imgs/default-profile.png')
  })

  test('handles profile picture load error', () => {
    // Mock de una sesión activa
    const mockSession = {
      usuario: 'testuser',
      correo: 'test@example.com'
    }
    auth.getSession.mockReturnValue(mockSession)
    
    renderWithRouter(<Perfil />)
    
    // Simular error de carga de imagen
    const profileImage = screen.getByAlt('Foto de perfil')
    fireEvent.error(profileImage)
    
    // Verificar que la imagen se oculta
    expect(profileImage.style.display).toBe('none')
  })

  test('contains link to catalog', () => {
    // Mock de una sesión activa
    const mockSession = {
      usuario: 'testuser',
      correo: 'test@example.com'
    }
    auth.getSession.mockReturnValue(mockSession)
    
    renderWithRouter(<Perfil />)
    
    // Verificar que el enlace al catálogo está presente
    const catalogLink = screen.getByText('Ir al catálogo')
    expect(catalogLink).toBeDefined()
    expect(catalogLink).toHaveClass('boton-primario')
    expect(catalogLink.getAttribute('href')).toBe('/productos')
  })

  test('renders with correct CSS classes', () => {
    // Mock de una sesión activa
    const mockSession = {
      usuario: 'testuser',
      correo: 'test@example.com'
    }
    auth.getSession.mockReturnValue(mockSession)
    
    renderWithRouter(<Perfil />)
    
    // Verificar las clases CSS principales
    expect(screen.getByRole('main')).toHaveClass('perfil-main', 'auth-page')
    expect(screen.getByRole('region')).toHaveClass('perfil-card')
    expect(screen.getByRole('region').querySelector('.perfil-datos')).toBeDefined()
    expect(screen.getByRole('region').querySelector('.perfil-acciones')).toBeDefined()
  })

  test('renders nothing when session is loading', () => {
    // Mock de una sesión que aún no se ha cargado
    auth.getSession.mockReturnValue(null)
    
    const { container } = renderWithRouter(<Perfil />)
    
    // Verificar que el componente no renderiza nada mientras carga
    expect(container.firstChild).toBeNull()
  })
})
