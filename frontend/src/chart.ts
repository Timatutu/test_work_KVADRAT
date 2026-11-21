import { escapeHtml, formatNumber } from './format'
import type { ResidentialComplex } from './types'

export function initializePriceChart(
  tabsContainer: HTMLDivElement,
  barsContainer: HTMLDivElement,
  cities: string[],
  complexes: ResidentialComplex[],
): void {
  function renderCity(selectedCity: string): void {
    tabsContainer.innerHTML = cities.map(city => `
      <button type="button" class="chart-tab ${city === selectedCity ? 'active' : ''}"
        data-city="${escapeHtml(city)}" aria-pressed="${city === selectedCity}">${escapeHtml(city)}</button>
    `).join('')

    const cityComplexes = complexes.filter(complex => complex.city === selectedCity)
    const highestPrice = Math.max(...cityComplexes.map(complex => complex.price_per_sqm))
    barsContainer.innerHTML = cityComplexes.map(complex => `
      <div class="bar-row"><div class="bar-label"><span>${escapeHtml(complex.name)}</span><strong>${formatNumber(complex.price_per_sqm)} ₽/м²</strong></div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.round(complex.price_per_sqm / highestPrice * 100)}%"></div></div></div>
    `).join('')
  }

  tabsContainer.addEventListener('click', event => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-city]')
    if (button?.dataset.city) renderCity(button.dataset.city)
  })
  if (cities.length > 0) renderCity(cities[0])
}
