export default function Question(question, answers, correctAns){
    this.question = question;
    this.answers = answers;
    this.correctAns = correctAns;
}

Question.prototype.Correct = function(guess){
    return guess === this.correctAns;
}


