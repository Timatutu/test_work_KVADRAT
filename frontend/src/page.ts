import { renderAgencyMascot } from './mascot'

export function renderPage(): void {
  const rootElement = document.querySelector<HTMLDivElement>('#app')!
  
  rootElement.innerHTML = `
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Квадрат — на главную"><span class="brand-mark">К</span><span>квадрат<span class="brand-dot">.</span></span></a>
      <a class="toplink" href="#catalog">Смотреть предложения <span aria-hidden="true">↗</span></a>
    </header>
    <main id="top">
      <section class="hero">
        <div class="hero-inner">
          <div class="eyebrow"><span class="eyebrow-line"></span> УМНЫЙ ПОДБОР НЕДВИЖИМОСТИ</div>
          <h1>Найдите место,<br>в котором вы будете<br><em>счастливы.</em></h1>
          <p class="hero-copy">Новостройки Москвы, Санкт-Петербурга и Сочи. Сравните цены и найдите жилой комплекс под ваши планы и бюджет.</p>
          <div class="hero-metrics"><div><strong id="total-complexes">—</strong><span>жилых комплексов</span></div><div><strong id="total-cities">—</strong><span>города</span></div><div><strong>1</strong><span>удобный поиск</span></div></div>
        </div>
        <div class="hero-art" aria-hidden="true"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-building building-back"></div><div class="art-building building-front"></div><div class="art-disc"></div><div class="art-label">НОВАЯ ТОЧКА ОПОРЫ / 2026</div></div>
        ${renderAgencyMascot()}
      </section>
      <section class="search-wrap" aria-labelledby="search-title">
        <div class="search-card">
          <div class="search-heading"><div><span class="section-kicker">ПОДБОР</span><h2 id="search-title">Что вы ищете?</h2></div><p>Укажите параметры — покажем подходящие ЖК.</p></div>
          <form id="filter-form">
            <div class="fields">
              <label class="field"><span>Город</span><span class="select-wrap"><select name="city" id="city"><option value="">Все города</option></select></span></label>
              <label class="field"><span>Площадь, м²</span><input name="area" id="area" type="number" min="1" max="10000" step="0.1" value="50" required inputmode="decimal"></label>
              <label class="field"><span>Цена за м² до, ₽</span><input name="max_price_per_sqm" id="max-price" type="number" min="1" step="1" placeholder="Не ограничена" inputmode="numeric"></label>
              <label class="field"><span>Бюджет до, ₽</span><input name="budget" id="budget" type="number" min="1" step="1" placeholder="Не ограничен" inputmode="numeric"></label>
            </div>
            <div class="optional-filters">
              <span class="optional-filters-title">Дополнительные условия <small>необязательно</small></span>
              <div class="optional-fields">
                <label class="field"><span>Состояние ЖК</span><span class="select-wrap"><select name="completion_status" id="completion-status"><option value="">Любой</option><option value="completed">Сдан</option><option value="building">Строится</option></select></span></label>
                <label class="field"><span>Класс жилья</span><span class="select-wrap"><select name="category" id="category"><option value="">Любой</option><option value="Бизнес">Бизнес</option><option value="Премиум">Премиум</option></select></span></label>
              </div>
            </div>
            <div class="form-bottom"><span>Можно указать цену за м², бюджет или оба ограничения.</span><button type="submit">Показать варианты <span aria-hidden="true">↗</span></button></div>
          </form>
        </div>
      </section>
      <section class="results-section" id="catalog" aria-live="polite">
        <div class="section-top"><div><span class="section-kicker">ВАШИ ВАРИАНТЫ</span><h2>Подходящие комплексы<span class="count" id="count">—</span></h2></div><div class="sort-note">По возрастанию цены за м²</div></div>
        <div class="results-grid" id="results"></div>
        <p class="disclaimer">Стоимость рассчитана по минимальной цене за м² в источнике и выбранной площади. Это ориентир, а не цена конкретной квартиры; наличие и итоговую стоимость уточняйте у застройщика.</p>
      </section>
      <section class="insight"><div><span class="section-kicker">СРАВНИТЕ ПРЕДЛОЖЕНИЯ</span><h2>Цены в перспективе</h2><p>Цена «от» за м² по каждому ЖК. Выберите город, чтобы сравнить комплексы.</p><div class="chart-tabs" id="chart-tabs"></div></div><div class="city-bars" id="city-bars"></div></section>
    </main>
    <footer><span class="brand footer-brand"><span class="brand-mark">К</span><span>квадрат<span class="brand-dot">.</span></span></span><span>Подбор новостроек · данные из Excel</span><a href="#top">Наверх ↑</a></footer>
  `
}
