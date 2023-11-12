//For the curiosities,to be implemented later
curiosities = [
    'Snakes cant eat fruit in real life',
    'Apples can help you clean your teeth',
    'Apples originate from Asia',
    'Apples can be perseved for months',
    'Scientists believe there are between 5000 and 20000 varieties of apples'
];

//the buttons that move the snake
let button = document.getElementsByTagName('button')
//The curiosities
let curio = document.getElementById('curio')
//The play div
let play = document.getElementById('play')
//The board
let board = document.getElementById('board')
//The score
let score = document.getElementById('score')

//Functions

//this function loads trivia from the array
const loadTrivia = () =>{
    let pos = Math.floor(Math.random() * curiosities.length)
    curio.textContent = curiosities[pos]
}

//the divs load into the board
const makeBoard = () =>{
    for (let index = 0; index < 90; index++) {
        let div = document.createElement("div")
        div.className ="board div"
        board.append(div)
        
    }
}

const applePosition = (boardSquares) =>{
    //the apple gets added into the board
    appleAdd = Math.floor(Math.random() * boardSquares.length)

    boardSquares[appleAdd].classList.add('apple')
}

const playBoard = () =>{
    //all the squares get selected
    let boardSquares = document.querySelectorAll(".board div")
    //the apple gets made with the squares
    applePosition(boardSquares)
    //score
    score.textContent = 0
    //the snake appears
    snake = [2 , 1 , 0]
    //the snale gets added into the board
    snake.forEach(index => {
        boardSquares[index].classList.add("snake")
    }); 
    //the snake moves in the board
    intervalSnake = setInterval(checkSnake)
}
//this function moves the snake 
const checkSnake = () =>{
    let boardSquares = document.querySelectorAll(".board div")
    //this checks if the snake hits the board or itself
    if (getHit(boardSquares)) {
        play.style.display = "flex"
    } else {
        moveSnake(boardSquares)
    }
}

const moveSnake = (boardSquares) =>{
    
}

//the button is pressed and it loads the game
const startGame = () =>{
    play.style.display = "none"
    makeBoard()
    playBoard()
}


//Listeners
document.addEventListener("DOMContentLoaded",loadTrivia)
play.addEventListener("click",startGame)