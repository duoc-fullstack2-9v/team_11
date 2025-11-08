import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Perfil from '../../src/pages/Perfil'
import * as auth from '../../src/utils/auth'

// Mock de las funciones de autenticación
vi.mock('../../src/utils/auth', () => ({
  getSession: vi.fn(),
  endSession: vi.fn(),
}))

// Mock del hook useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Helper para renderizar con Router
const renderWithRouter = (ui) =>
  render(<BrowserRouter>{ui}</BrowserRouter>)

describe('Perfil Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirige a /login cuando no existe sesión', () => {
    auth.getSession.mockReturnValue(null)

    renderWithRouter(<Perfil />)

    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('muestra la información del perfil cuando existe sesión', () => {
    const mockSession = { usuario: 'testuser', correo: 'test@example.com' }
    auth.getSession.mockReturnValue(mockSession)

    renderWithRouter(<Perfil />)

    // Título
    expect(
      screen.getByRole('heading', { name: /mi perfil/i })
    ).toBeInTheDocument()

    // Datos
    expect(screen.getByText('Usuario:')).toBeInTheDocument()
    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('Correo:')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('cierra sesión correctamente', () => {
    const mockSession = { usuario: 'testuser', correo: 'test@example.com' }
    auth.getSession.mockReturnValue(mockSession)

    renderWithRouter(<Perfil />)

    const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i })
    fireEvent.click(logoutButton)

    expect(auth.endSession).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('muestra la foto de perfil con clases y src correctos', () => {
    const mockSession = { usuario: 'testuser', correo: 'test@example.com' }
    auth.getSession.mockReturnValue(mockSession)

    renderWithRouter(<Perfil />)

    const img = screen.getByAltText('Foto de perfil')
    expect(img).toBeInTheDocument()
    expect(img).toHaveClass('perfil-foto')
    expect(img).toHaveAttribute('src', '/imgs/default-profile.png')
  })

  it('oculta la imagen si ocurre un error de carga', () => {
    const mockSession = { usuario: 'testuser', correo: 'test@example.com' }
    auth.getSession.mockReturnValue(mockSession)

    renderWithRouter(<Perfil />)

    const img = screen.getByAltText('Foto de perfil')
    fireEvent.error(img)

    expect(img.style.display).toBe('none')
  })

  it('contiene el enlace al catálogo', () => {
    const mockSession = { usuario: 'testuser', correo: 'test@example.com' }
    auth.getSession.mockReturnValue(mockSession)

    renderWithRouter(<Perfil />)

    const link = screen.getByRole('link', { name: /ir al catálogo/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('boton-primario')
    expect(link).toHaveAttribute('href', '/productos')
  })

  it('renderiza con las clases CSS principales', () => {
    const mockSession = { usuario: 'testuser', correo: 'test@example.com' }
    auth.getSession.mockReturnValue(mockSession)

    const { container } = renderWithRouter(<Perfil />)

    const main = screen.getByRole('main')
    expect(main).toHaveClass('perfil-main', 'auth-page')

    const heading = screen.getByRole('heading', { name: /mi perfil/i })
    const section = heading.closest('section')
    expect(section).not.toBeNull()
    expect(section).toHaveClass('perfil-card')

    expect(section.querySelector('.perfil-datos')).not.toBeNull()
    expect(section.querySelector('.perfil-acciones')).not.toBeNull()
  })

  it('no renderiza nada cuando no hay sesión (estado inicial)', () => {
    auth.getSession.mockReturnValue(null)

    const { container } = renderWithRouter(<Perfil />)

    expect(container.firstChild).toBeNull()
  })
})