//For the curiosities,to be implemented later
curiosities = [
    'curio one',
    'curio two'
];

//the buttons that move the snake
let button = document.getElementsByTagName('button')
//The curiosities
let curio = document.getElementById('curio')
//The play div
let play = document.getElementById('play')
//The board
let board = document.getElementById('board')

//Functions

//this function loads trivia from the array
const loadTrivia = () =>{
    let pos = Math.floor(Math.random() * curiosities.length)
    curio.textContent = curiosities[pos]
}



//Listeners
document.addEventListener("DOMContentLoaded",loadTrivia)