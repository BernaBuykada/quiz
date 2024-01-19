var answers = [];
var currentQuestion = 0;
let defTimer = 10;
let defDuration = 30;

let letters= ["A", "B", "C", "D"];

function startQuiz(){
    document.getElementById("start_btn").classList.add("hide");
    document.getElementById("quiz_box").classList.remove("hide");
    showQuestion(0);
}

function showQuestion(index){
    let q = questions[index]
    let title = q.title
    let body = q.body
    let options = body.split("\n"); //body'yi kelimelerine ayırıyorum
   
    document.getElementById("title").innerHTML=(index+1)+") "+ title;
    document.getElementById("options").classList.add("disabled");
   
    var opt = "<span>";
    for (var i = 0; i < letters.length; i++){
        opt+="<button onclick=\"saveAnswer("+ index + ", '" + letters[i] + "')\" class=\"option\">"+letters[i] +") " + options[i] +  "</button>";
    }
    opt+="</span>";
    document.getElementById("options").innerHTML=opt;
    var timer= defDuration;
    var intervalId = setInterval(function () {
        
        if (timer > 0){
            document.getElementById("timer_sec").innerHTML=timer;
        }

        timer--;

        if(timer < defDuration-defTimer){
            document.getElementById("options").classList.remove("disabled");
        }
    
        if (timer < 0) {
          clearInterval(intervalId);
          nextQuestion();
        
        }
      }, 1000);
}

function nextQuestion(){
    if(currentQuestion == questions.length -1){
        showResult();
    }
    else{
        currentQuestion ++;
        showQuestion(currentQuestion);
    }
}

function saveAnswer(index, letter){
    answers[index]=letter;
    console.log(answers);
}

function showResult(){
    var result = "<table><tr><td>#</td><td>Answer</td></tr>"; 
    for (var i = 0; i < questions.length; i++){
        result += "<tr><td>" + (i+1) + "</td><td>" + (answers[i] ?? " " ) + "</td></tr>";
    }
    result += "</table>";
    document.getElementById("result").innerHTML=result;
    document.getElementById("result").classList.remove("hide");
    document.getElementById("title").classList.add("hide");
    document.getElementById("options").classList.add("hide");
}
