/* =========================
TELAS
========================= */

function openScreen(screenId){

document.querySelectorAll('.screen')
.forEach(screen=>{

screen.classList.remove('active');

});

document
.getElementById(screenId)
.classList.add('active');

}

/* =========================
AULAS
========================= */

function openLesson(
title,
big,
subtitle
){

openScreen('lesson');

document
.getElementById('lessonTitle')
.innerText = title;

document
.getElementById('lessonSubtitle')
.innerText = subtitle;

document
.getElementById('lessonText')
.innerText = subtitle;

document
.getElementById('lessonBig')
.innerText = big;

/* áudio automático */
speakLesson(
title + ". " + subtitle
);

}

/* =========================
ÁUDIO MELHORADO
========================= */

function speakLesson(customText = null){

/* limpa áudio anterior */
window.speechSynthesis.cancel();

const text =
customText ||
document
.getElementById('lessonText')
?.innerText ||
"";

if(!text) return;

const speech =
new SpeechSynthesisUtterance(text);

/* idioma */
speech.lang = 'pt-BR';

/* velocidade */
speech.rate = 0.9;

/* voz suave */
speech.pitch = 1;

speech.volume = 1;

/* tenta usar voz PT */
const voices =
window.speechSynthesis.getVoices();

const ptVoice =
voices.find(voice =>
voice.lang.includes('pt')
);

if(ptVoice){

speech.voice = ptVoice;

}

window
.speechSynthesis
.speak(speech);

}

/* =========================
QUESTÕES
========================= */

const questions = [

{
question:
"Quanto é cinco mais cinco?",

options:[
"10",
"8",
"6",
"12"
],

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

correct:
"Pedro Álvares Cabral"
},

{
question:
"Quanto é dois mais três?",

options:[
"5",
"7",
"9",
"4"
],

correct:"5"
},

{
question:
"Qual número vem depois do nove?",

options:[
"10",
"11",
"12",
"8"
],

correct:"10"
}

];

let currentQuestion = 0;

/* =========================
CARREGAR QUESTÃO
========================= */

function loadQuestion(){

const q =
questions[currentQuestion];

document
.getElementById('questionText')
.innerText = q.question;

const container =
document
.getElementById('quizOptions');

container.innerHTML = "";

document
.getElementById('correctBox')
.style.display = "none";

document
.getElementById('wrongBox')
.style.display = "none";

q.options.forEach(option=>{

const div =
document.createElement('div');

div.classList.add('option');

div.innerText = option;

div.onclick =
()=>checkAnswer(div,option);

container.appendChild(div);

});

/* leitura automática */
speakLesson(q.question);

}

/* =========================
VERIFICAR RESPOSTA
========================= */

function checkAnswer(
element,
answer
){

const q =
questions[currentQuestion];

document
.querySelectorAll('.option')
.forEach(option=>{

option.style.pointerEvents =
"none";

});

if(answer === q.correct){

element.classList.add('correct');

document
.getElementById('correctBox')
.style.display = 'block';

document
.getElementById('correctBox')
.innerHTML =
"✅ Muito bem Lindalva!";

speakLesson(
"Parabéns Lindalva! Você acertou!"
);

savePoints();

}
else{

element.classList.add('wrong');

document
.getElementById('wrongBox')
.style.display = 'block';

document
.getElementById('wrongBox')
.innerHTML =
"❌ Resposta errada!<br><br>✅ Correta: <b>"
+ q.correct +
"</b>";

speakLesson(
"Não foi dessa vez Lindalva. A resposta correta é "
+ q.correct
);

document
.querySelectorAll('.option')
.forEach(option=>{

if(option.innerText === q.correct){

option.classList.add('correct');

}

});

}

}

/* =========================
PRÓXIMA QUESTÃO
========================= */

function nextQuestion(){

currentQuestion++;

if(
currentQuestion >=
questions.length
){
    localStorage.setItem(
'certificado',
'true'
);

currentQuestion = 0;

alert(
"🎉 Parabéns Lindalva! Você concluiu a avaliação!"
);

speakLesson(
"Parabéns Lindalva! Você concluiu a avaliação."
);

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

localStorage
.setItem('points',points);

}

/* =========================
FONTE GRANDE
========================= */

function increaseFont(){
    function toggleFocusMode(){

document.body.classList.toggle(
'focus-mode'
);

if(
document.body.classList.contains(
'focus-mode'
)
){

speakLesson(
"Modo foco ativado."
);

}
else{

speakLesson(
"Modo foco desativado."
);

}

}

document.body.style.fontSize =
"18px";

speakLesson(
"Fonte aumentada."
);

}

/* =========================
INICIAR APP
========================= */

window.onload = function(){

/* inicia quiz */
loadQuestion();

/* dark mode */

const darkMode =
document.getElementById('darkMode');

if(darkMode){

darkMode.addEventListener(
'change',
function(){

document.body
.classList.toggle('dark');

if(
document.body.classList.contains('dark')
){

speakLesson(
"Modo escuro ativado."
);

}
else{

speakLesson(
"Modo claro ativado."
);

}

});

}

/* boas-vindas */

window.speechSynthesis.cancel();

setTimeout(()=>{

speakLesson(
"Olá Lindalva! Seja bem-vinda ao aplicativo Ensina Fácil."
);

},1200);
window.addEventListener('load', ()=>{

if(
localStorage.getItem('certificado')
=== 'true'
){

const badge =
document.getElementById(
'certificateBadge'
);

if(badge){

badge.style.display = 'block';

}

}

});
};
function toggleContrast(){

document.body.classList.toggle(
'high-contrast'
);

}
function setAccessibility(type){

if(type === 'vision'){

increaseFont();

alert(
'Modo Baixa Visão ativado!'
);

}

if(type === 'reading'){

document.body.classList.toggle(
'reading-mode'
);

alert(
'Leitura Facilitada ativada!'
);

}

if(type === 'audio'){

speakLesson(
'Modo de áudio preferencial ativado.'
);

alert(
'Modo Áudio ativado!'
);

}

}
