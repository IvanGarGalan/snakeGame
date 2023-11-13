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
//The initial Snake
let snake = [2,1,0]
// The width of the snake
let width = 10
// The score
let points = 0
//The direction the snake moves
let direction = 1
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
    points = 0
    score.textContent = points
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
    //we get the snakes tail
    let tailSnake = snake.pop()
    //remove the class from the last div and add it into the first div
    boardSquares[tailSnake].classList.remove("snake")
    snake.unshift(snake[0])
    // movement ends here
    //the snake eats the apple
    eatApple(boardSquares,tailSnake)
    boardSquares[snake[0]].classList.add("snake")
}

const getHit = (boardSquares) =>{
    // if the snake gets hit with one of the walls or itself, returns true
    if (
        (snake[0] + width >= width * width && direction === width) ||
        (snake[0] % width === width - 1 && direction === 1) ||
        (snake[0] % width === 0 && direction === -1) ||
        (snake[0] - width <= 0 && direction === -width) ||
        boardSquares[currentSnake[0] + direction].classList.contains("snake")
      ) {
        return true;
      } else {
        return false;
      }

}


const eatApple = (boardSquares,tailSnake) =>{
    //
    if (boardSquares[snake[0]].classList.contains("apple")) {
        boardSquares[snake[0]].classList.remove("apple");
        boardSquares[tailSnake].classList.add("snake");
        snake.push(tailSnake);
        applePosition(boardSquares)
        points++;
        scoreDisplay.textContent = points;
        //
        
    }
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