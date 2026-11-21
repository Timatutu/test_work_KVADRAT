const currencyFormatter = new Intl.NumberFormat('ru-RU')

export function formatNumber(value: number): string {
  return currencyFormatter.format(value)
}

export function escapeHtml(value: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }
  return value.replace(/[&<>"']/g, character => htmlEntities[character])
}
