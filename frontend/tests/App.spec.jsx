import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import App from '../src/App'
import { CarritoProvider } from '../src/context/CarritoContext'

// Prueba simple para verificar que App se renderiza sin errores
describe('App', () => {
  it('se renderiza sin errores', () => {
    render(
      <BrowserRouter>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </BrowserRouter>
    )
    expect(true).toBe(true)
  })
})