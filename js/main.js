window.addEventListener('load', init);

// Nivo
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}
//Promena Nivoa
const currentLevel = levels.easy;

// Globalne
let scores = [];
let time = currentLevel;
let score = 0;
let isPlaying;


// DOM 

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#highscore');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'sesir', 'tastatura', 'kompjuter', 'mis', 'monitor', 'programiranje', 'zdravo', 'tacka', 'maticna', 'pistolj',
    'fotelja', 'dinar', 'elektronika', 'vreme', 'sunce', 'mesec', 'youtube', 'facebook', 'instagram', 'kosaraka', 'fudbal',
    'odbojka', 'tenis', 'Djokovic', 'prejako'
];

function init(){
    // Prikazi na kom si nivou, ispisi koliko sek imas za reci
    seconds.innerHTML = currentLevel;
    // Ucitaj rec iz niza
    showWord(words);
    //Trazi prilikom Upisivanja u polje
    wordInput.addEventListener('input', startMatch);
    // Odbrojavanje
    setInterval(countdown, 1000);
    // Provera
    setInterval(checkStatus, 50);


}


// Trazenje reci
function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
        scores.push(score);
    }

    var highScore = 0;
    for(var i = 0; i < scores.length; i++){
        if(scores[i] > highScore){
            highScore = scores[i];
        }
    }
    highScoreDisplay.innerHTML = highScore;

    if(score === -1){
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }


}


// currentWord = wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Tacno!';
        return true;
    } else{
        message.innerHTML = '';
        return false;
    }

}

// Izaberi i Prikazi nasumicnu rec
function showWord(words){
    // Nasumicni index
    const randIndex = Math.floor(Math.random()* words.length);
    // Nasumicna rec
    currentWord.innerHTML = words[randIndex];
}

// Timer
function countdown(){
    //Ispitaj da li je vreme isteklo
    if(time > 0){
        time--
    }else if(time === 0){
        isPlaying = false;
    }
    //Prikazi Vreme
    timeDisplay.innerHTML = time;
}
// Provera
function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = "<span style='color: red;'>Kraj Igre!!</span>";
        document.getElementById("word-input").style.border = "3px solid red";
        score = -1;
    }else{
        document.getElementById("word-input").style.border = "3px solid white";
    }
}





