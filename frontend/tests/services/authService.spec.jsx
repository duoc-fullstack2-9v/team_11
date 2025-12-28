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
    const fakeLoginResponse = { id: 1, email: 'test@test.com', token: 'fake-token' }
    mockedAxios.post.mockResolvedValue({ data: fakeLoginResponse })

    const result = await loginUsuario('test@test.com', 'pass123')

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://ec2-3-212-50-160.compute-1.amazonaws.com/auth/login',
      { email: 'test@test.com', password: 'pass123' }
    )
    expect(result).toEqual(fakeLoginResponse)
  })

  it('registrarUsuario llama a POST /auth/registro con body correcto y devuelve data', async () => {
    const fakeUser = { id: 1, email: 'test@test.com', password: 'pass123' }
    mockedAxios.post.mockResolvedValue({ data: fakeUser })

    const result = await registrarUsuario('test@test.com', 'pass123')

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://ec2-3-212-50-160.compute-1.amazonaws.com/auth/registro',
      { email: 'test@test.com', password: 'pass123' }
    )

    expect(result).toEqual(fakeUser)
  })
})