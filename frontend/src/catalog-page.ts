import { fetchCities, fetchComplexes } from './api'
import { renderCards } from './cards'
import { initializePriceChart } from './chart'
import { escapeHtml } from './format'
import { renderPage } from './page'

export function initializeCatalogPage(): void {
  renderPage()

  const filterForm = document.querySelector<HTMLFormElement>('#filter-form')!
  const resultsContainer = document.querySelector<HTMLDivElement>('#results')!
  const resultCount = document.querySelector<HTMLSpanElement>('#count')!
  const citySelect = document.querySelector<HTMLSelectElement>('#city')!
  const chartTabs = document.querySelector<HTMLDivElement>('#chart-tabs')!
  const chartBars = document.querySelector<HTMLDivElement>('#city-bars')!
  const totalComplexes = document.querySelector<HTMLElement>('#total-complexes')!
  const totalCities = document.querySelector<HTMLElement>('#total-cities')!

  function formParameters(form: HTMLFormElement): URLSearchParams {
    const parameters = new URLSearchParams()
    for (const [fieldName, fieldValue] of new FormData(form).entries()) {
      if (typeof fieldValue === 'string' && fieldValue.trim()) {
        parameters.set(fieldName, fieldValue.trim())
      }
    }
    return parameters
  }

  async function loadResults(scrollToResults = false): Promise<void> {
    if (!filterForm.reportValidity()) return
    resultsContainer.innerHTML = '<div class="loading">Ищем подходящие комплексы…</div>'
    try {
      const complexes = await fetchComplexes(formParameters(filterForm))
      renderCards(resultsContainer, resultCount, complexes)
      if (scrollToResults) document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })
    } catch {
      resultCount.textContent = '0'
      resultsContainer.innerHTML = '<div class="empty"><h3>Не удалось загрузить предложения</h3><p>Проверьте соединение и попробуйте ещё раз.</p><button id="retry" type="button">Повторить</button></div>'
      document.querySelector('#retry')?.addEventListener('click', () => loadResults())
    }
  }

  async function initializePage(): Promise<void> {
    try {
      const initialParameters = new URLSearchParams({ area: '50' })
      const [cities, complexes] = await Promise.all([
        fetchCities(), fetchComplexes(initialParameters),
      ])
      citySelect.insertAdjacentHTML('beforeend', cities.map(city =>
        `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`
      ).join(''))
      totalComplexes.textContent = String(complexes.length)
      totalCities.textContent = String(cities.length)
      renderCards(resultsContainer, resultCount, complexes)
      initializePriceChart(chartTabs, chartBars, cities, complexes)
    } catch {
      loadResults()
    }
  }

  filterForm.addEventListener('submit', event => {
    event.preventDefault()
    loadResults(true)
  })
  initializePage()
}
