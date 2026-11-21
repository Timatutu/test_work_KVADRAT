import './style.css'
import './mascot.css'
import './agency-page.css'
import { renderAgencyPage } from './agency-page'
import { initializeAgencyDemos } from './agency-demo'
import { initializeCatalogPage } from './catalog-page'

if (window.location.pathname === '/agency') {
  document.title = 'Для агентств — Квадрат'
  renderAgencyPage()
  initializeAgencyDemos()
} else {
  initializeCatalogPage()
}
