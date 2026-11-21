import { escapeHtml, formatNumber } from './format'
import type { ResidentialComplex } from './types'

export function renderCards(
  container: HTMLDivElement,
  countElement: HTMLSpanElement,
  complexes: ResidentialComplex[],
): void {
  countElement.textContent = String(complexes.length)
  if (complexes.length === 0) {
    container.innerHTML = `<div class="empty"><div class="empty-icon">⌕</div><h3>Пока нет совпадений</h3><p>Попробуйте увеличить бюджет, цену за м² или выбрать другой город.</p></div>`
    return
  }

  container.innerHTML = complexes.map((complex, index) => `
    <article class="property-card">
      <div class="card-top"><span class="city-tag">${escapeHtml(complex.city)}</span><span class="card-index">${String(index + 1).padStart(2, '0')} / ${String(complexes.length).padStart(2, '0')}</span></div>
      <div class="card-symbol" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="card-body"><span class="category">${escapeHtml(complex.category)} класс</span><h3>${escapeHtml(complex.name)}</h3><p>${escapeHtml(complex.district)} · ${escapeHtml(complex.developer)}</p></div>
      <div class="card-prices"><div><span>Цена от / м²</span><strong>${formatNumber(complex.price_per_sqm)} ₽</strong></div><div><span>Расчётная стоимость</span><strong>${formatNumber(complex.estimated_total)} ₽</strong></div></div>
      <div class="card-bottom"><span>Сдача: ${escapeHtml(complex.completion)}</span>${complex.source_url ? `<a href="${escapeHtml(complex.source_url)}" target="_blank" rel="noopener noreferrer" aria-label="Источник цены: ${escapeHtml(complex.name)}">Источник ↗</a>` : ''}</div>
    </article>
  `).join('')
}
