/* =========================
TELAS
========================= */

function openScreen(screenId){

document.querySelectorAll('.screen')
.forEach(screen=>{
screen.classList.remove('active');
});

document.getElementById(screenId)
.classList.add('active');

}

/* =========================
AULAS
========================= */

function openLesson(title,big,subtitle){

openScreen('lesson');

document.getElementById('lessonTitle')
.innerText = title;

document.getElementById('lessonSubtitle')
.innerText = subtitle;

document.getElementById('lessonText')
.innerText = subtitle;

document.getElementById('lessonBig')
.innerText = big;

speakLesson();

}

/* =========================
VOZ
========================= */

function speakLesson(){

const text =
document.getElementById('lessonText')
.innerText;

const speech =
new SpeechSynthesisUtterance(text);

speech.lang = 'pt-BR';

window.speechSynthesis.speak(speech);

}

/* =========================
QUIZ
========================= */

const questions = [

{
question:
"Quanto é 5 + 5?",

options:["10","8","6","12"],

correct:"10"
},

{
question:
"Qual palavra está correta?",

options:[
"Casa",
"Kaza",
"Kassa",
"Caza"
],

correct:"Casa"
},

{
question:
"Quem descobriu o Brasil?",

options:[
"Pedro Álvares Cabral",
"Dom Pedro",
"Tiradentes",
"Getúlio Vargas"
],

correct:"Pedro Álvares Cabral"
}

];

let currentQuestion = 0;

function loadQuestion(){

const q = questions[currentQuestion];

document.getElementById('questionText')
.innerText = q.question;

const container =
document.getElementById('quizOptions');

container.innerHTML = "";

document.getElementById('correctBox')
.style.display = "none";

document.getElementById('wrongBox')
.style.display = "none";

q.options.forEach(option=>{

const div =
document.createElement('div');

div.classList.add('option');

div.innerText = option;

div.onclick = ()=>checkAnswer(div,option);

container.appendChild(div);

});

}

function checkAnswer(element,answer){

const q = questions[currentQuestion];

document.querySelectorAll('.option')
.forEach(option=>{
option.style.pointerEvents = "none";
});

if(answer === q.correct){

element.classList.add('correct');

document.getElementById('correctBox')
.style.display = 'block';

savePoints();

}
else{

element.classList.add('wrong');

document.getElementById('wrongBox')
.style.display = 'block';

document.getElementById('wrongBox')
.innerHTML =
"❌ Resposta errada!<br><br>✅ Correta: <b>"
+ q.correct + "</b>";

document.querySelectorAll('.option')
.forEach(option=>{

if(option.innerText === q.correct){

option.classList.add('correct');

}

});

}

}

function nextQuestion(){

currentQuestion++;

if(currentQuestion >= questions.length){

currentQuestion = 0;

alert("🎉 Avaliação concluída!");

openScreen('progress');

}

loadQuestion();

}

/* =========================
PONTOS
========================= */

let points =
localStorage.getItem('points') || 0;

function savePoints(){

points++;

localStorage.setItem('points',points);

}

/* =========================
FONTE
========================= */

function increaseFont(){

document.body.style.fontSize = "18px";

}

/* =========================
DARK MODE
========================= */

document
.getElementById('darkMode')

.addEventListener('change',function(){

document.body.classList.toggle('dark');

});

/* =========================
INICIAR
========================= *Agradecemos por utilizar nossos serviços! Esperamos trabalhar com você novamente em breve.