// tests/context/CarritoContext.spec.jsx
import { renderHook, act } from '@testing-library/react'
import { CarritoProvider, useCarrito } from '../../src/context/CarritoContext'

describe('CarritoContext', () => {
  test('agrega y elimina productos correctamente', () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>

    const { result } = renderHook(() => useCarrito(), { wrapper })

    act(() => {
      result.current.agregarAlCarrito({ id: 1, titulo: 'Zelda', precio: 1000 })
    })

    expect(result.current.carrito).toHaveLength(1)
    expect(result.current.carrito[0].titulo).toBe('Zelda')

    act(() => {
      result.current.eliminarDelCarrito(1)
    })

    expect(result.current.carrito).toHaveLength(0)
  })
})