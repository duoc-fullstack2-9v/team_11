import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import '@testing-library/jest-dom'

import {
  listarProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../../src/services/productoService'

// Mock de axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

const mockedAxios = axios

describe('productoService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('listarProductos hace GET a /productos y devuelve los datos', async () => {
    const fakeData = [{ id: 1, titulo: 'Juego', precio: 20000 }]
    mockedAxios.get.mockResolvedValue({ data: fakeData })

    const result = await listarProductos()

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:8080/productos'
    )
    expect(result).toEqual(fakeData)
  })

  it('obtenerProductoPorId hace GET a /productos/:id', async () => {
    const fakeData = { id: 2, titulo: 'Zelda', precio: 40000 }
    mockedAxios.get.mockResolvedValue({ data: fakeData })

    const result = await obtenerProductoPorId(2)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:8080/productos/2'
    )
    expect(result).toEqual(fakeData)
  })

  it('crearProducto hace POST a /productos con el body correcto', async () => {
    const body = { titulo: 'Nuevo', precio: 9990, imagen: 'url' }
    mockedAxios.post.mockResolvedValue({ data: body })

    const result = await crearProducto(body)

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/productos',
      body
    )
    expect(result).toEqual(body)
  })

  it('actualizarProducto hace PUT a /productos/:id con el body enviado', async () => {
    const body = { titulo: 'Editado', precio: 15000 }
    mockedAxios.put.mockResolvedValue({ data: body })

    const result = await actualizarProducto(5, body)

    expect(mockedAxios.put).toHaveBeenCalledWith(
      'http://localhost:8080/productos/5',
      body
    )
    expect(result).toEqual(body)
  })

  it('eliminarProducto hace DELETE a /productos/:id', async () => {
    mockedAxios.delete.mockResolvedValue({ data: null })

    const result = await eliminarProducto(10)

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      'http://localhost:8080/productos/10'
    )
    expect(result).toBeNull() 
  })
})