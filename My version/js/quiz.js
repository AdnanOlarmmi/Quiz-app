// import Question from "./question.js";

export default function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.currentQuestion = function(){
    return this.questions[this.questionIndex];
}
Quiz.prototype.nextQuestion = function(){
     this.questionIndex++
}
Quiz.prototype.quizEnd = function(){
   return this.questionIndex === this.questions.length;
}
Quiz.prototype.checkGuess = function(guess){
    
    if(this.currentQuestion().Correct(guess)){
        this.score++;
    }
    this.questionIndex++
}






