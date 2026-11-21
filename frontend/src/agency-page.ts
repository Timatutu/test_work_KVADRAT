export function renderAgencyPage(): void {
  const rootElement = document.querySelector<HTMLDivElement>('#app')!
  rootElement.innerHTML = `
    <header class="agency-topbar">
      <a class="brand" href="/" aria-label="Квадрат — на главную"><span class="brand-mark">К</span><span>квадрат<span class="brand-dot">.</span></span></a>
      <a class="agency-back" href="/">Вернуться к подбору <span aria-hidden="true">↗</span></a>
    </header>
    <main class="agency-main">
      <section class="agency-hero">
        <div class="agency-hero-content">
          <span class="agency-eyebrow"><span class="agency-eyebrow-dot"></span> КВАДРАТ ДЛЯ АГЕНТСТВ</span>
          <h1>Ваш новый помощник<br>в подборе <em>недвижимости.</em></h1>
          <p>Подберите варианты для клиента за несколько шагов. А если у агентства есть своя программа или ИИ-помощник, данные каталога можно будет передавать и туда.</p>
        </div>
        <div class="agency-hero-graphic" aria-hidden="true"><span class="graphic-orbit graphic-orbit-one"></span><span class="graphic-orbit graphic-orbit-two"></span><span class="graphic-core">К</span><span class="graphic-node node-one"></span><span class="graphic-node node-two"></span><span class="graphic-node node-three"></span></div>
      </section>

      <section class="agency-tools" aria-labelledby="tools-title">
        <div class="agency-section-head"><span class="agency-kicker">ДЛЯ ЕЖЕДНЕВНОЙ РАБОТЫ</span><h2 id="tools-title">Что поможет вашему агентству</h2><p>Ниже — понятные задачи, которые смогут решать инструменты. Отдельно отмечено, что уже работает в демо, а что мы планируем добавить.</p></div>
        <div class="agency-tool-grid">
          <article class="agency-tool-card agent-card">
            <div class="tool-card-top"><span class="tool-icon agent-icon" aria-hidden="true">✳</span><span class="tool-status">ДЕМО СЦЕНАРИЯ</span></div>
            <span class="tool-index">01 / ПОМОЩНИК РИЕЛТОРА</span>
            <h3>ИИ-агент для подбора</h3>
            <p class="tool-description">Помощник берёт пожелания покупателя и собирает основу подборки. Риелтор проверяет варианты и решает, что предложить клиенту.</p>
            <div class="feature-group"><h4>Уже можно попробовать</h4>
              <ul class="tool-features">
                <li><strong>Найти ЖК под запрос</strong><span>Укажите город, площадь, бюджет, класс жилья и готовность дома — получите подходящие комплексы.</span></li>
                <li><strong>Оценить стоимость</strong><span>Помощник посчитает ориентир для выбранной площади по цене «от» за м².</span></li>
                <li><strong>Проверить источник</strong><span>Откройте ссылку на цену и уточните актуальные условия у застройщика.</span></li>
              </ul>
            </div>
            <div class="feature-group feature-group-future"><h4>Следующие функции</h4>
              <ul class="tool-features">
                <li><strong>Сравнить несколько ЖК</strong><span>Показать рядом цены, районы и сроки сдачи, чтобы увидеть отличия.</span></li>
                <li><strong>Подготовить ответ клиенту</strong><span>Составить короткое сообщение с вариантами и объяснением выбора.</span></li>
                <li><strong>Следить за изменениями</strong><span>Подсказать, когда цена или информация о ЖК обновилась в таблице.</span></li>
              </ul>
            </div>
            <div class="tool-card-bottom"><span>Соберите первую подборку</span><button type="button" class="tool-button" data-open-demo="agent-demo">Попробовать агента</button></div>
          </article>
          <article class="agency-tool-card mcp-card">
            <div class="tool-card-top"><span class="tool-icon mcp-icon" aria-hidden="true">⌘</span><span class="tool-status">ПРОТОТИП ИНСТРУМЕНТОВ</span></div>
            <span class="tool-index">02 / СВЯЗЬ С ДРУГИМИ ПРОГРАММАМИ</span>
            <h3>Каталог ЖК через MCP</h3>
            <p class="tool-description">MCP — способ дать программе для работы с клиентами, чат-боту или ИИ-помощнику доступ к каталогу. Простыми словами, это мост между каталогом и программой агентства.</p>
            <div class="feature-group"><h4>Уже можно попробовать в демо</h4>
              <ul class="tool-features">
                <li><strong>Показать доступные города</strong><span>Программа узнает, в каких городах сейчас есть предложения.</span></li>
                <li><strong>Найти ЖК по условиям</strong><span>Передайте город, площадь, бюджет, класс и готовность дома — получите подходящий список.</span></li>
                <li><strong>Получить сведения о вариантах</strong><span>Название, застройщик, район, цена, срок сдачи и ссылка на источник приходят в одном формате.</span></li>
              </ul>
            </div>
            <div class="feature-group feature-group-future"><h4>Следующие функции</h4>
              <ul class="tool-features">
                <li><strong>Сравнить предложения</strong><span>Передать несколько ЖК в вашу систему для удобной таблицы сравнения.</span></li>
                <li><strong>Передавать обновления</strong><span>Сообщать программе агентства о новых ценах после загрузки Excel.</span></li>
                <li><strong>Сохранять подборки в карточке клиента</strong><span>Передавать выбранные ЖК в программу агентства без ручного копирования.</span></li>
              </ul>
            </div>
            <div class="tool-card-bottom"><span>Посмотрите ответ на запрос</span><button type="button" class="tool-button" data-open-demo="mcp-demo">Попробовать MCP</button></div>
          </article>
        </div>
        <p class="agency-demo-note">Сейчас демо работает с текущим каталогом ЖК. ИИ-модель и настоящий MCP-сервер пока не подключены: вы проверяете подбор и видите, как будут выглядеть ответы инструментов.</p>
      </section>
    </main>
    <footer class="agency-footer"><span class="brand footer-brand"><span class="brand-mark">К</span><span>квадрат<span class="brand-dot">.</span></span></span><a href="/">К подбору ЖК</a></footer>

    <dialog class="agency-dialog" id="agent-demo" aria-labelledby="agent-demo-title">
      <div class="dialog-head"><div><span class="agency-kicker">ДЕМО ПОМОЩНИКА</span><h2 id="agent-demo-title">Подбор для клиента</h2></div><button type="button" class="dialog-close" data-close-demo aria-label="Закрыть">×</button></div>
      <p class="dialog-intro">Задайте запрос — покажем подборку и черновик ответа на основе цен из каталога.</p>
      <form id="agent-demo-form" class="demo-form">
        <label>Город<select name="city" id="agent-city"><option value="">Все города</option></select></label>
        <label>Площадь, м²<input name="area" type="number" value="50" min="1" max="10000" step="0.1" required></label>
        <label>Бюджет до, ₽<input name="budget" type="number" value="17000000" min="1" step="1" required></label>
        <label>Готовность дома<select name="completion_status"><option value="">Любая</option><option value="completed">Сдан</option><option value="building">Строится</option></select></label>
        <label>Класс жилья<select name="category"><option value="">Любой</option><option value="Бизнес">Бизнес</option><option value="Премиум">Премиум</option></select></label>
        <button type="submit" class="demo-run">Собрать подборку</button>
      </form>
      <div class="demo-output" id="agent-output" aria-live="polite"><p class="demo-placeholder">Результат появится здесь после запуска.</p></div>
    </dialog>

    <dialog class="agency-dialog" id="mcp-demo" aria-labelledby="mcp-demo-title">
      <div class="dialog-head"><div><span class="agency-kicker">ДЕМО ИНСТРУМЕНТОВ</span><h2 id="mcp-demo-title">Запрос к каталогу</h2></div><button type="button" class="dialog-close" data-close-demo aria-label="Закрыть">×</button></div>
      <p class="dialog-intro">Выберите задачу. Сначала покажем результат обычными словами, а технический формат можно раскрыть ниже.</p>
      <form id="mcp-demo-form" class="demo-form">
        <label>Что сделать?<select name="tool" id="mcp-tool"><option value="list_cities">Показать доступные города</option><option value="search_complexes">Найти подходящие ЖК</option></select></label>
        <div class="mcp-search-fields" id="mcp-search-fields" hidden>
          <label>Город<select name="city" id="mcp-city"><option value="">Все города</option></select></label>
          <label>Площадь, м²<input name="area" type="number" value="50" min="1" max="10000" step="0.1"></label>
          <label>Бюджет до, ₽<input name="budget" type="number" min="1" step="1" placeholder="Без ограничения"></label>
          <label>Готовность дома<select name="completion_status"><option value="">Любая</option><option value="completed">Сдан</option><option value="building">Строится</option></select></label>
          <label>Класс жилья<select name="category"><option value="">Любой</option><option value="Бизнес">Бизнес</option><option value="Премиум">Премиум</option></select></label>
        </div>
        <button type="submit" class="demo-run">Показать результат</button>
      </form>
      <div class="mcp-summary" id="mcp-summary" aria-live="polite">Результат появится здесь после запуска.</div>
      <details class="technical-result"><summary>Показать технический ответ</summary><pre class="mcp-output" id="mcp-output">Выполните запрос, чтобы увидеть данные.</pre></details>
    </dialog>
  `
}
