import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import * as a from './fileUpload'
import './questionAdmin.css'
import { getBaseServerURL } from '../util/urlHelper'

document.getElementById('loadQuestionTable').addEventListener('click', loadQuestionTableFromDB)
document.getElementById('deleteSelectedQuestions').addEventListener('click', deleteSelectedRows)

async function loadQuestionTableFromDB() {
  const { data } = await axios.get(`${getBaseServerURL()}/questions?admin=true`)
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
        e.multiChoices[0] = 'TRUE'
        e.multiChoices[1] = 'FALSE'
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
    if (e.questionType === 'multichoice') {
      choices[e.multiChoiceAnswer - 1].className = 'correctAnswer'
    }
    if (e.boolAnswer != null && e.questionType === 'boolean') {
      if (e.boolAnswer) {
        choices[0].className = 'correctAnswer'
      } else {
        choices[1].className = 'correctAnswer'
      }
    }

    qTBody.appendChild(rowClone)
  })
}

async function deleteSelectedRows() {
  const qRows = document.querySelectorAll('#questionsTableBody tr')
  qRows.forEach(async (e) => {
    if (e.querySelector('.qSelector input').checked) {
      await axios.delete(`${getBaseServerURL()}/question/${e.id}`)
      e.parentNode.removeChild(e)
    }
  })
}
