import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../../src/pages/Home'

// Helper para renderizar con Router (por si Home usa <Link> o <NavLink>)
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

// Regex flexible para precios con miles: acepta $ opcional, espacios y puntos
const moneyRx = (n) => {
  const withThousands = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\\.?')
  return new RegExp(`\\$?\\s*${withThousands}`, 'i')
}

describe('Home Component', () => {
  test('renderiza el carrusel con imágenes y controles', () => {
    renderWithRouter(<Home />)

    // 1) Carrusel: intentar por landmark; si no, buscar por testid o clase común
    const carouselRegion =
      screen.queryByRole('region', { name: /carousel|carrusel/i }) ||
      screen.queryByTestId?.('carousel') ||
      document.querySelector('.carousel, [data-carousel]')

    expect(carouselRegion).toBeTruthy()

    // 2) Imágenes del carrusel (y posiblemente 1 extra de “ofertas”)
    const images = screen.getAllByRole('img')
    // No acoplamos a "exactamente 4"; exigimos al menos 3
    expect(images.length).toBeGreaterThanOrEqual(3)

    // 3) Controles de navegación: tolerar texto o aria-label en español/inglés
    const prevBtn =
      screen.queryByRole('button', { name: /prev|anterior/i }) ||
      document.querySelector('[aria-label~="prev"],[aria-label~="anterior"]')
    const nextBtn =
      screen.queryByRole('button', { name: /next|siguiente/i }) ||
      document.querySelector('[aria-label~="next"],[aria-label~="siguiente"]')

    expect(prevBtn).toBeTruthy()
    expect(nextBtn).toBeTruthy()
  })

  test('renderiza el buscador', () => {
    renderWithRouter(<Home />)

    // Buscar por rol searchbox o textbox con placeholder aproximado
    const searchInput =
      screen.queryByRole('searchbox') ||
      screen.getByPlaceholderText(/buscar/i)

    expect(searchInput).toBeInTheDocument()
  })

  test('muestra la sección de ofertas semanales', () => {
    renderWithRouter(<Home />)
    const offersTitle = screen.getByText(/ofertas semanales/i)
    expect(offersTitle).toBeInTheDocument()
  })

  test('renderiza tarjetas de producto con información básica', () => {
    renderWithRouter(<Home />)

    const productTitles = [
      /street fighter vs tekken/i,
      /bayonetta/i,
      /devil\s*my\s*cry\s*5/i  // tolerar espacios raros
    ]

    productTitles.forEach(rx => {
      expect(screen.getByText(rx)).toBeInTheDocument()
    })

    // Botones "Agregar": al menos 3
    const addButtons =
      screen.getAllByRole('button', { name: /agregar/i })
    expect(addButtons.length).toBeGreaterThanOrEqual(3)

    // Precios: validar con regex flexible ($ y miles)
    const regularPriceRx = moneyRx(29990)
    const salePriceRx = /oferta\s*\$?\s*4\.?990/i

    // Exigir al menos 3 ocurrencias de cada uno
    const regularPrices = screen.getAllByText(regularPriceRx)
    expect(regularPrices.length).toBeGreaterThanOrEqual(3)

    const salePrices = screen.getAllByText(salePriceRx)
    expect(salePrices.length).toBeGreaterThanOrEqual(3)
  })
})