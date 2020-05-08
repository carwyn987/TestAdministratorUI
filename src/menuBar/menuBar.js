import './menuBar.css'
import { getBaseUIURL, getBaseServerURL } from '../util/urlHelper'


document.getElementById('downloadTemplate').href = `${getBaseServerURL()}/sampleQuestionTemplate`

document.getElementById('about').addEventListener('click', () => {
  document.getElementById('mainFrame').src = 'http://carwyncollinsworth.com/index.html'
})

document.getElementById('appName').addEventListener('click', () => {
  document.getElementById('mainFrame').src = 'http://carwyncollinsworth.com/index.html'
})

document.getElementById('qTable').addEventListener('click', () => {
  document.getElementById('mainFrame').src = `${getBaseUIURL()}/questionAdmin.html`
})

document.getElementById('startTest').addEventListener('click', () => {
  document.getElementById('mainFrame').src = `${getBaseUIURL()}/studentTest.html`
})
