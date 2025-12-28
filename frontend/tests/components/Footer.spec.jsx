import { describe, test, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Footer from '../../src/components/Footer'

describe('Footer Component', () => {
  // Si tu Footer está hardcodeado con 2025, déjalo así.
  // Si usa el año actual dinámico, cambia a: const year = new Date().getFullYear()
  const year = 2025

  test('renderiza el footer con el texto de copyright', () => {
    render(<Footer />)

    // Localizamos el <footer> por su rol semántico
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()

    // Buscamos el texto dentro del footer con una regex tolerante a espacios
    const copyright = within(footer).getByText(
      new RegExp(`©\\s*${year}\\s*Level\\s*Up\\s*Gamer`, 'i')
    )
    expect(copyright).toBeInTheDocument()
  })

  test('el texto del footer tiene la clase CSS esperada', () => {
    render(<Footer />)
    // No acoples al string exacto; basta con encontrar la marca
    const footerText = screen.getByText(/level up gamer/i)
    expect(footerText).toHaveClass('texto-footer')
  })

  test('existe un elemento <footer> en el documento', () => {
    const { container } = render(<Footer />)
    const footerElement = container.querySelector('footer')
    expect(footerElement).toBeInTheDocument()
  })
})