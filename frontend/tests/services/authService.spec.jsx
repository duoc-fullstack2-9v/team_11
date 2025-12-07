// frontend/tests/services/authService.spec.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import axios from 'axios'
import { loginUsuario, registrarUsuario } from '../../src/services/authService'

// Mock de axios: el default tiene un post mockeado
vi.mock('axios', () => ({
  default: {
    post: vi.fn()
  }
}))

// axios ya es el mock
const mockedAxios = axios

describe('authService', () => {
  beforeEach(() => {
    mockedAxios.post.mockReset()
  })

  it('loginUsuario llama a POST /auth/login con body correcto y devuelve data', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'Login exitoso' })

    const result = await loginUsuario('test@test.com', 'pass123')

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/auth/login',
      { email: 'test@test.com', password: 'pass123' }
    )
    expect(result).toBe('Login exitoso')
  })

  it('registrarUsuario llama a POST /auth/registro con body correcto y devuelve data', async () => {
    const fakeUser = { id: 1, email: 'test@test.com' }
    mockedAxios.post.mockResolvedValue({ data: fakeUser })

    const result = await registrarUsuario('test@test.com', 'pass123')

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/auth/registro',
      { email: 'test@test.com', password: 'pass123' }
    )
    expect(result).toEqual(fakeUser)
  })
})