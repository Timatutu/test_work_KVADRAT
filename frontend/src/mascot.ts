/** A compact house character with simple, readable hands at small sizes. */
export function renderAgencyMascot(): string {
  return `
    <aside class="agency-promo" aria-label="Сообщение для агентств недвижимости">
      <a class="house-mascot-link" href="/agency" aria-label="Нажми на домик — открыть страницу для агентств">
      <svg class="house-mascot" viewBox="0 0 190 170" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="house-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffca59" />
            <stop offset="1" stop-color="#ff8735" />
          </linearGradient>
          <filter id="mascot-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#071125" flood-opacity=".32" />
          </filter>
        </defs>

        <g class="mascot-left-arm">
          <path d="M56 110 Q42 107 29 113" fill="none" stroke="#263b37" stroke-width="10" stroke-linecap="round" />
          <path d="M56 110 Q42 107 29 113" fill="none" stroke="#ffad47" stroke-width="6" stroke-linecap="round" />
          <ellipse cx="25" cy="115" rx="8" ry="10" transform="rotate(-20 25 115)" fill="#ffb653" stroke="#263b37" stroke-width="3" />
        </g>

        <g class="mascot-wave">
          <path d="M134 110 Q150 107 157 91" fill="none" stroke="#263b37" stroke-width="10" stroke-linecap="round" />
          <path d="M134 110 Q150 107 157 91" fill="none" stroke="#ffad47" stroke-width="6" stroke-linecap="round" />
          <path d="M156 92 Q151 89 152 85 Q153 81 158 82 Q157 76 161 74 Q165 72 168 77 Q172 77 173 82 Q174 88 169 93 Q163 99 156 92Z" fill="#ffb653" stroke="#263b37" stroke-width="3" stroke-linejoin="round" />
        </g>

        <g class="mascot-body" filter="url(#mascot-shadow)">
          <path d="M44 77 87 38q8-7 16 0l43 39" fill="none" stroke="#263b37" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M44 77 87 38q8-7 16 0l43 39" fill="none" stroke="#ff5d4a" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="48" y="69" width="94" height="83" rx="25" fill="url(#house-fill)" stroke="#263b37" stroke-width="5" />
          <path d="M78 149v10m34-10v10" stroke="#263b37" stroke-width="7" stroke-linecap="round" />
          <path d="M64 153h21m19 0h21" stroke="#263b37" stroke-width="7" stroke-linecap="round" />
          <circle cx="76" cy="107" r="4" fill="#263b37" />
          <circle cx="113" cy="107" r="4" fill="#263b37" />
          <circle cx="64" cy="119" r="6" fill="#ff5b75" opacity=".8" />
          <circle cx="125" cy="119" r="6" fill="#ff5b75" opacity=".8" />
          <path d="M82 124q13 14 26 0" fill="none" stroke="#263b37" stroke-width="4" stroke-linecap="round" />
        </g>
      </svg>
      </a>
      <div class="agency-message">
        <span class="agency-message-label">Для профессионалов рынка</span>
        <p>Если вы из <mark>агентства недвижимости</mark>, мы подготовили для вас <strong>кое-что интересное&nbsp;:)</strong></p>
        <span class="agency-message-hint">Нажми на меня <span aria-hidden="true">↑</span></span>
      </div>
    </aside>
  `
}
