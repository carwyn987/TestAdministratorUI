import './studentTest.css'
import axios from 'axios'

startTest()
let testQuestions
let questionPointer = 0

async function startTest() {
    const { data } = await axios.get('http://localhost:8080/questions')
    testQuestions = data
    console.log(data)
    testQuestions = shuffle(testQuestions)
    //console.log(data)
    displayNextQuestion()
}

function displayNextQuestion() {
    const questionTemplate = document.getElementById('testQuestionTemplate')
    console.log(questionTemplate)
    const questionTemplateClone = questionTemplate.content.cloneNode(true)
    //create an instance of template and populate it
    document.querySelector('body').appendChild(questionTemplateClone)

    updateQuestion(questionPointer);

    document.getElementById('submit').addEventListener('click', nextQuestionListener)
    //show template
    //on next call this function and move to the next question
    
    //when done do something
}

function updateQuestion(questionPointer) {
    document.getElementById('questionText').textContent = testQuestions[questionPointer].questionText
    if(testQuestions[questionPointer].questionType == 'multichoice'){
        let i = 0
        for(; i<testQuestions[questionPointer].multiChoices.length; i++){
            document.getElementById('answer' + (i+1)).textContent = testQuestions[questionPointer].multiChoices[i]
        }
        for(; i<5; i++){
            //document.getElementById('answer' + (i+1)) //set this hidden
        }
        testQuestions[questionPointer].multiChoices
    }else if(testQuestions[questionPointer].questionType === 'boolean'){
        
    }else if(testQuestions[questionPointer].questionType === 'freeform'){
        
    }
}

function nextQuestionListener() {
    document.getElementById('submit').removeEventListener('click', nextQuestionListener)
    const curTestQuestion = document.getElementById('testQuestion')
    if(curTestQuestion != null) curTestQuestion.parentNode.removeChild(curTestQuestion)
    ++questionPointer
    if(questionPointer<testQuestions.length){
        displayNextQuestion()
    }else{
        alert('you finished')
    }
}

function shuffle(data) { //not shuffling
    return data.sort(() => Math.random() - 0.5)
}