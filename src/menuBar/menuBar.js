import './menuBar.css'

document.getElementById('about').addEventListener('click', () => {
  document.getElementById('mainFrame').src = 'http://google.com/search?'
})

document.getElementById('qTable').addEventListener('click', () => {
  document.getElementById('mainFrame').src = 'http://localhost:9000/questionAdmin.html'
})

document.getElementById('startTest').addEventListener('click', () => {
  document.getElementById('mainFrame').src = 'http://localhost:9000/studentTest.html'
})
