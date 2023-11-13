//For the curiosities,to be implemented later
curiosities = [
    'Snakes cant eat fruit in real life',
    'Apples can help you with your teeth',
    'Apples originate from Asia',
    'Apples can be perseved for months',
    'Apples are very rich in minerals'
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
let width = 9
// The score
let points = 0
//The direction the snake moves
let direction = 1
//interval snake
let intervalSnake
//Functions

//this function loads trivia from the array
const loadTrivia = () =>{
    let pos = Math.floor(Math.random() * curiosities.length)
    curio.textContent = curiosities[pos]
}

//the divs load into the board
const makeBoard = () =>{
    for (let index = 0; index < 81; index++) {
        let div = document.createElement("div")
        div.className ="board div"
        board.appendChild(div)
        
    }
}

const applePosition = (boardSquares) =>{
    //the apple gets added into the board
    appleAdd = Math.floor(Math.random() * boardSquares.length)

    boardSquares[appleAdd].classList.add('apple')
}

const playBoard = () =>{
    //if the board already exists, it erases it and makes it again
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    makeBoard();
    //all the squares get selected
    let boardSquares = document.querySelectorAll(".board div")


    //the apple gets made with the squares
    applePosition(boardSquares)
    //the direction gets set
    direction = 1
    //score
    points = 0
    score.textContent = points
    //the snake appears,it apperas based on the board in the center
    const startPosition = Math.floor(Math.random() * (width * (width - 2)) + width);
    snake = [startPosition, startPosition - 1, startPosition - 2];
    //the snale gets added into the board
    snake.forEach(index => {
        boardSquares[index].classList.add("snake")
    }); 
    //the snake moves
  intervalSnake = setInterval(() => {
      checkSnake(boardSquares);
  }, 1000);
}

//this function moves the snake 
const checkSnake = () =>{
    let boardSquares = document.querySelectorAll(".board div")
    //this checks if the snake hits the board or itself
    if (getHit(boardSquares)) {
        play.style.display = "flex"
        clearInterval(intervalSnake);
    } else {
        moveSnake(boardSquares)
    }
}

const moveSnake = (boardSquares) =>{
    let tail = snake.pop();
    boardSquares[tail].classList.remove("snake");
    snake.unshift(snake[0] + direction);
    // movement ends here
    eatApple(boardSquares, tail);
    boardSquares[snake[0]].classList.add("snake");


}

const getHit = (boardSquares) =>{
    // if the snake gets hit with one of the walls or itself, returns true
    if (
        (snake[0] + width >= width * width && direction === width) ||
        (snake[0] % width === width - 1 && direction === 1) ||
        (snake[0] % width === 0 && direction === -1) ||
        (snake[0] - width < 0 && direction === -width) ||
        boardSquares[snake[0] + direction].classList.contains("snake")
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
        score.textContent = points;
        //
        
    }
}

const move = (event) =>{
    //this switch case looks which button has been pressed in order to move the snake
    switch (event.target.className) {
        // the if statements are here so the snke doesnt move diagonaly
        case "top":
            if (direction !== width) { 
                direction = -width;
            }
            break;
        case "bottom":
            if (direction !== -width) { 
                direction = +width;
            }
            break;
        case "left":
            if (direction !== 1) { 
                direction = -1;
            }
            break;
        case "right":
            if (direction !== -1) { 
                direction = 1;
            }
            break;
    }
}

//the button is pressed and it loads the game
const startGame = () =>{
    play.style.display = "none"
    makeBoard()
    playBoard()
}


//Listeners

//this for adds the move function to each of the buutons
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", move);
}


document.addEventListener("DOMContentLoaded",loadTrivia)
play.addEventListener("click",startGame)