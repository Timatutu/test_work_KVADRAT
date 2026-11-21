import { fetchCities, fetchComplexes } from './api'
import { escapeHtml, formatNumber } from './format'
import type { ResidentialComplex } from './types'

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector)
  if (!element) throw new Error(`Не найден элемент интерфейса: ${selector}`)
  return element
}

function fillCitySelect(select: HTMLSelectElement, cities: string[]): void {
  select.insertAdjacentHTML('beforeend', cities.map(city =>
    `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`
  ).join(''))
}

function searchParameters(form: HTMLFormElement): URLSearchParams {
  const parameters = new URLSearchParams()
  for (const [name, value] of new FormData(form).entries()) {
    if (name !== 'tool' && typeof value === 'string' && value.trim()) {
      parameters.set(name, value.trim())
    }
  }
  return parameters
}

function renderAgentResult(complexes: ResidentialComplex[]): string {
  if (complexes.length === 0) {
    return '<div class="demo-reply"><span class="reply-avatar">К</span><p>По заданным условиям вариантов пока нет. Попробуйте увеличить бюджет или выбрать другой город.</p></div>'
  }
  const shortlist = complexes.slice(0, 3)
  const cards = shortlist.map(complex => `
    <div class="demo-result-card">
      <div><strong>${escapeHtml(complex.name)}</strong><span>${escapeHtml(complex.city)} · ${escapeHtml(complex.district)}</span>${complex.source_url ? `<a href="${escapeHtml(complex.source_url)}" target="_blank" rel="noopener noreferrer">Источник цены ↗</a>` : ''}</div>
      <div class="demo-result-price"><strong>${formatNumber(complex.estimated_total)} ₽</strong><span>${formatNumber(complex.price_per_sqm)} ₽/м²</span></div>
    </div>
  `).join('')
  return `
    <div class="demo-reply"><span class="reply-avatar">К</span><p>Нашёл ${complexes.length} подходящих ЖК. Для первого ответа клиенту можно предложить эти варианты и уточнить наличие конкретных квартир у застройщика.</p></div>
    <div class="demo-result-list">${cards}</div>
    <p class="demo-fineprint">Расчёт основан на цене «от» за м², поэтому итоговая цена квартиры может отличаться.</p>
  `
}

export function initializeAgencyDemos(): void {
  const agentDialog = getElement<HTMLDialogElement>('#agent-demo')
  const mcpDialog = getElement<HTMLDialogElement>('#mcp-demo')
  const agentForm = getElement<HTMLFormElement>('#agent-demo-form')
  const mcpForm = getElement<HTMLFormElement>('#mcp-demo-form')
  const agentOutput = getElement<HTMLDivElement>('#agent-output')
  const mcpOutput = getElement<HTMLElement>('#mcp-output')
  const mcpSummary = getElement<HTMLDivElement>('#mcp-summary')
  const toolSelect = getElement<HTMLSelectElement>('#mcp-tool')
  const searchFields = getElement<HTMLDivElement>('#mcp-search-fields')

  document.querySelectorAll<HTMLButtonElement>('[data-open-demo]').forEach(button => {
    button.addEventListener('click', () => {
      const dialog = button.dataset.openDemo === 'agent-demo' ? agentDialog : mcpDialog
      dialog.showModal()
    })
  })
  document.querySelectorAll<HTMLButtonElement>('[data-close-demo]').forEach(button => {
    button.addEventListener('click', () => button.closest('dialog')?.close())
  })
  for (const dialog of [agentDialog, mcpDialog]) {
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close()
    })
  }

  fetchCities().then(cities => {
    fillCitySelect(getElement<HTMLSelectElement>('#agent-city'), cities)
    fillCitySelect(getElement<HTMLSelectElement>('#mcp-city'), cities)
  }).catch(() => {
    agentOutput.textContent = 'Не удалось загрузить города. Проверьте соединение.'
    mcpSummary.textContent = 'Не удалось загрузить города. Проверьте соединение.'
  })

  toolSelect.addEventListener('change', () => {
    searchFields.hidden = toolSelect.value !== 'search_complexes'
    mcpSummary.textContent = 'Нажмите «Показать результат», чтобы выполнить новую задачу.'
    mcpOutput.textContent = 'Выполните запрос, чтобы увидеть данные.'
  })

  agentForm.addEventListener('submit', async event => {
    event.preventDefault()
    if (!agentForm.reportValidity()) return
    agentOutput.textContent = 'Подбираем варианты…'
    try {
      const complexes = await fetchComplexes(searchParameters(agentForm))
      agentOutput.innerHTML = renderAgentResult(complexes)
    } catch {
      agentOutput.textContent = 'Не удалось выполнить подбор. Попробуйте ещё раз.'
    }
  })

  mcpForm.addEventListener('submit', async event => {
    event.preventDefault()
    if (!mcpForm.reportValidity()) return
    mcpSummary.textContent = 'Ищем данные…'
    mcpOutput.textContent = 'Выполняем запрос…'
    try {
      if (toolSelect.value === 'list_cities') {
        const cities = await fetchCities()
        mcpSummary.innerHTML = `<p>Сейчас в каталоге есть предложения в ${cities.length} городах:</p><div class="mcp-city-list">${cities.map(city => `<span>${escapeHtml(city)}</span>`).join('')}</div>`
        mcpOutput.textContent = JSON.stringify({ tool: 'list_cities', arguments: {}, result: cities }, null, 2)
      } else {
        const parameters = searchParameters(mcpForm)
        const complexes = await fetchComplexes(parameters)
        mcpSummary.innerHTML = complexes.length === 0
          ? '<p>По этим условиям ЖК не найдены. Измените город или увеличьте бюджет.</p>'
          : `<p>Найдено ${complexes.length} ЖК. Ваша программа сможет получить их цены, районы, сроки сдачи и ссылки на источники.</p><ul class="mcp-preview-list">${complexes.slice(0, 4).map(complex => `<li><strong>${escapeHtml(complex.name)}</strong><span>${escapeHtml(complex.city)} · от ${formatNumber(complex.price_per_sqm)} ₽/м²</span></li>`).join('')}</ul>`
        const result = complexes.map(({
          id, city, name, developer, district, category,
          price_per_sqm, estimated_total, completion, source_url,
        }) =>
          ({ id, city, name, developer, district, category, price_per_sqm, estimated_total, completion, source_url })
        )
        mcpOutput.textContent = JSON.stringify({
          tool: 'search_complexes',
          arguments: Object.fromEntries(parameters.entries()),
          result,
        }, null, 2)
      }
    } catch {
      mcpSummary.textContent = 'Не удалось выполнить запрос. Проверьте соединение и попробуйте ещё раз.'
      mcpOutput.textContent = 'Ответ недоступен.'
    }
  })
}
