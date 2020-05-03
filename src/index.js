import axios from 'axios'

document.getElementById('loadQuestionTable').addEventListener('click', loadQuestionTableFromDB)
document.getElementById('deleteSelectedQuestions').addEventListener('click', deleteSelectedRows)

async function loadQuestionTableFromDB() {
  const { data } = await axios.get('http://localhost:8080/questions')
  // console.log(data, Array.isArray(data))
  const qTBody = document.getElementById('questionsTableBody')
  document.getElementById('qTable').style.visibility = 'visible'

  while (qTBody.childElementCount !== 0) {
    qTBody.removeChild(qTBody.children[0])
  }

  data.forEach((e) => {
    const rowTemplate = document.querySelector('#qRowTemplate')
    const rowClone = rowTemplate.content.cloneNode(true)

    rowClone.querySelector('tr').id = e.id

    switch (e.questionType) {
      case 'multichoice':
        rowClone.querySelector('.qType .multi').selected = true
        break
      case 'freeform':
        rowClone.querySelector('.qType .free').selected = true
        break
      case 'boolean':
        rowClone.querySelector('.qType .bool').selected = true
        break
      default:
        throw new Error(`Unrecognised Question Type ${e.questionType}`)
    }

    rowClone.querySelector('.qText textarea').value = e.questionText

    rowClone.querySelector('.qChoice1 textarea').value = e.multiChoices.length > 0 ? e.multiChoices[0] : ''
    rowClone.querySelector('.qChoice2 textarea').value = e.questionText.length > 1 ? e.multiChoices[1] : ''
    rowClone.querySelector('.qChoice3 textarea').value = e.questionText.length > 2 ? e.multiChoices[2] : ''
    rowClone.querySelector('.qChoice4 textarea').value = e.questionText.length > 3 ? e.multiChoices[3] : ''
    rowClone.querySelector('.qChoice5 textarea').value = e.questionText.length > 4 ? e.multiChoices[4] : ''

    const choices = rowClone.querySelectorAll('.qChoice')
    choices[e.multiChoiceAnswer].className = 'correctAnswer'

    qTBody.appendChild(rowClone)
  })
}

async function deleteSelectedRows() {
  const qRows = document.querySelectorAll('#questionsTableBody tr')
  qRows.forEach(async (e) => {
    if (e.querySelector('.qSelector input').checked) {
      await axios.delete(`http://localhost:8080/question/${e.id}`)
      e.parentNode.removeChild(e)
    }
  })
}
