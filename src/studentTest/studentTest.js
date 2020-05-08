import './studentTest.css'
import axios from 'axios'
import { getBaseServerURL } from '../util/urlHelper'

startTest()
let testQuestions
let questionPointer = 0

async function startTest() {
  const { data } = await axios.get(`${getBaseServerURL()}/questions`)
  testQuestions = data
  testQuestions = shuffle(testQuestions)
  // console.log(data)
  displayNextQuestion()
}

function displayNextQuestion() {
  const questionTemplate = document.getElementById('testQuestionTemplate')
  const questionTemplateClone = questionTemplate.content.cloneNode(true)
  // create an instance of template and populate it
  document.querySelector('body').appendChild(questionTemplateClone)

  updateQuestion()

  document.getElementById('submit').addEventListener('click', nextQuestionListener)
  // show template
  // on next call this function and move to the next question

  // when done do something
}

function updateQuestion() {
  document.getElementById('questionText').textContent = testQuestions[questionPointer].questionText
  if (testQuestions[questionPointer].questionType === 'multichoice') {
    let i = 0
    for (; i < testQuestions[questionPointer].multiChoices.length; i++) {
      document.getElementById(`answer${i + 1}`).textContent = testQuestions[questionPointer].multiChoices[i]
    }
    for (; i < 5; i++) {
      document.getElementById(`answer${i + 1}`).hidden = true
    }
    // testQuestions[questionPointer].multiChoices
  } else if (testQuestions[questionPointer].questionType === 'boolean') {
    document.getElementById(`answer${1}`).textContent = 'True'
    document.getElementById(`answer${2}`).textContent = 'False'
    for (let i = 2; i < testQuestions[questionPointer].multiChoices.length; i++) {
      document.getElementById(`answer${i + 1}`).hidden = true
      // console.log(String.fromCharCode(97 + i))
      document.getElementById(String.fromCharCode(97 + i)).hidden = true
    }
  } else if (testQuestions[questionPointer].questionType === 'freeform') {
    for (let i = 0; i < testQuestions[questionPointer].multiChoices.length; i++) {
      document.getElementById(`answer${i + 1}`).hidden = true
      // console.log(String.fromCharCode(97 + i))
      document.getElementById(String.fromCharCode(97 + i)).hidden = true
    }
    document.getElementById('freeFormEntry').hidden = false
  }
}

function nextQuestionListener() {
  document.getElementById('submit').removeEventListener('click', nextQuestionListener)
  const curTestQuestion = document.getElementById('testQuestion')
  if (curTestQuestion != null) curTestQuestion.parentNode.removeChild(curTestQuestion)
  ++questionPointer
  if (questionPointer < testQuestions.length) {
    displayNextQuestion()
  } else {
    const congratsTemplate = document.getElementById('congratsTemplate')
    const congratsTemplateClone = congratsTemplate.content.cloneNode(true)
    // create an instance of template and populate it
    document.querySelector('body').appendChild(congratsTemplateClone)
  }
}

function shuffle(data) { // not shuffling
  return data.sort(() => Math.random() - 0.5)
}
