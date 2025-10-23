import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/Footer'

describe('Footer Component', () => {
  test('renders footer with copyright text', () => {
    render(<Footer />)
    
    // Verificar que el texto del copyright está presente
    const copyrightText = screen.getByText('© 2025 Level Up Gamer')
    expect(copyrightText).toBeDefined()
  })

  test('footer has correct CSS class', () => {
    render(<Footer />)
    
    // Verificar que el texto tiene la clase CSS correcta
    const footerText = screen.getByText('© 2025 Level Up Gamer')
    expect(footerText).toHaveClass('texto-footer')
  })

  test('footer is present in document', () => {
    const { container } = render(<Footer />)
    
    // Verificar que el elemento footer existe
    const footerElement = container.querySelector('footer')
    expect(footerElement).toBeDefined()
  })
})
