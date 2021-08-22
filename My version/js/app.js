import Question from "./question.js";
import Quiz from "./quiz.js"

const q1 = new Question("What does Nigeria mean",[
    "Niger Area", "I don't Know", "None of the above", "Niger arrow"
], 0);
const q2 = new Question("Who is the current president of Nigeria",[
    "Gen. Ibrahim Babangida", "Gen. Muhammadu Buhari", "Gen. Agunyi Ironsi", "Mr Fashola"
], 1);
const q3 = new Question("When did Nigeria receive independence",[
    "1960", "1954", "1963", "1945"
], 0);
const q4 = new Question("What did Nigeria become a republic",[
    "1890", "1960", "1989", "1963"
], 3);
const q5 = new Question("Who was the first president of Nigeria",[
    "Nnamdi Azikwe", "Kaduna Nzeagwu", "Alhaji Sheu Shagari", "Obafemi Awolowo"
], 0);

const myQuiz = new Quiz([q1, q2, q3, q4, q5]);
const App = (()=>{
    // cache the DOM
    const questionsEl = document.querySelector(".questions")
    const questionEl = document.querySelector(".question")
    const tracker = document.querySelector(".tracker");
    const progress = document.querySelector(".progress");
    const indicator = document.querySelector(".indicator");
    const choices = document.querySelector(".answers")
    const nextButton = document.querySelector(".next");
    const restartButton = document.querySelector(".restart")
    const noEntry = document.querySelector(".noEntry");

    const setDOM = function(element, text){
        element.innerHTML = text;
    }

    const renderQuestion = function() {
        const question = myQuiz.questions[myQuiz.questionIndex].question;
        setDOM(questionEl,question);
    }

    const renderAnswers = function(){
        let markUp = "";
        const answers = myQuiz.questions[myQuiz.questionIndex].answers;
        answers.forEach((elem, index) => {
            markUp += `<li class="answer">
            <input type="radio" name="Choice" data-order=${index} id="Choice${index}">
            <label for="Choice${index}">
                <span></span>
                <i>${elem}</i>
            </label>
        </li>`
    })
    
    setDOM(choices,markUp);
}

    const renderTracker = function(){
        
        const track = function(){
             return `${myQuiz.questionIndex+1} of ${myQuiz.questions.length}`
        }
        setDOM(tracker, track())

    }
    const progressPercentage = (a,b) => {
       return Math.round((a/b)*100);
    }
    
    
    const renderProgress= function(){
        
            const newWidth = progressPercentage(myQuiz.questionIndex, myQuiz.questions.length);
            progress.style.width = newWidth + "%";  
        
       
            
    
        
      
    }

    const clickButtons = () => {
        nextButton.addEventListener("click",
       () =>{
           
         
             const setAnswerIndex = document.querySelector("input[name=Choice]:checked");
            
             if(setAnswerIndex===null){
                noEntry.style.display = "inline-block";
                 setTimeout(() => {
                     noEntry.style.display = "none";
                 }, 1000);
                
             }
             else{
                const correctAnswerIndex = Number(setAnswerIndex.getAttribute("data-order"));
                myQuiz.checkGuess(correctAnswerIndex);
             renderAll();
             }
             
             
           
             
             
       } );
        restartButton.addEventListener("click", 
        ()=>{
            nextButton.style.opacity = 1;
            nextButton.style.cursor = "pointer"
            myQuiz.questionIndex = 0
            myQuiz.score = 0;
            setDOM(indicator, `Pick an option from below!`)
            renderAll();
        } );
    }
   const renderEndQuiz = ()=>{
       renderProgress()
       setDOM(questionEl, `Congratulations you just completed the quiz \n your score is`);
       const score = progressPercentage(myQuiz.score, myQuiz.questions.length)
       setDOM(tracker, `${score}%`);
       setDOM(indicator, `Done!`);
       nextButton.style.opacity = 0;
       nextButton.style.cursor = "auto"
   }

    const renderAll = ()=>{
        if(myQuiz.quizEnd()){
            renderEndQuiz();
        }
        else{
            renderQuestion();
            //render question
            renderAnswers();
            //render choices
            renderTracker();
            //render tracker
            renderProgress();
            //render progressBar
        }


    }
    return{
        renderAll,
        clickButtons
    }
})();


App.renderAll();
App.clickButtons();