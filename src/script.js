function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.displayScore')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = window.innerWidth
const boardHeight = window.innerHeight * 0.8
let xDirection = -4
let yDirection = 4

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [window.innerWidth/2, window.innerHeight/8]
let ballCurrentPosition = ballStart

let timerId
let score = 0

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight]
  }
}

const blocks = [
  new Block(350, 520),
  new Block(550, 520),
  new Block(750, 520),
  new Block(950, 520),
  new Block(1150, 520),
  new Block(350, 420),
  new Block(550, 420),
  new Block(750, 420),
  new Block(950, 420),
  new Block(1150, 420),
  new Block(350, 320),
  new Block(550, 320),
  new Block(750, 320),
  new Block(950, 320),
  new Block(1150,320),
]

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'  
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
    grid.appendChild(block)
  }
}
addBlocks()

const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 20
        drawUser()   
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - blockWidth)) {
        currentPosition[0] += 20
        drawUser()   
      }
      break
  }
}
document.addEventListener('keydown', moveUser)

function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = `Score : ${score}/15`
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'You Win!'
        console.log("You Win")
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      }
    }
  }
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection()
  }

  if
  (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
  )
  {
    changeDirection()
  }

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    console.log('You lose!')
    document.removeEventListener('keydown', moveUser)
  }
}


function changeDirection() {
  if (xDirection === 4 && yDirection === 4) {
    yDirection = -4
    return
  }
  if (xDirection === 4 && yDirection === -4) {
    xDirection = -4
    return
  }
  if (xDirection === -4 && yDirection === -4) {
    yDirection = 4
    return
  }
  if (xDirection === -4 && yDirection === 4) {
    xDirection = 4
    return
  }
}