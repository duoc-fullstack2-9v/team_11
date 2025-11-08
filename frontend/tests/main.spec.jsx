import { describe, it, expect, vi, afterEach } from 'vitest'

// Mock de react-dom/client para interceptar createRoot/render
const renderMock = vi.fn()
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: renderMock }))
}))

afterEach(() => {
  // Limpia el DOM y el caché de módulos para no “reusar” el import entre tests
  document.body.innerHTML = ''
  vi.resetModules()
})

describe('bootstrap (src/main.jsx)', () => {
  it('crea el root y llama a render sin explotar', async () => {
    // Prepara el div#root como haría index.html
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)

    // Import dinámico para ejecutar el archivo con el mock activo
    await import('../src/main.jsx')

    const { createRoot } = await import('react-dom/client')
    expect(createRoot).toHaveBeenCalledTimes(1)
    expect(createRoot).toHaveBeenCalledWith(root)
    expect(renderMock).toHaveBeenCalledTimes(1)
  })
})