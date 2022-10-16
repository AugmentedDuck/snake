let snakeHeadX = 35
let snakeHeadY = 5
let snakeLength = 3
let snakeDirection = "right"
let moveAmount = 15
let prevX = [5, 20, 35]
let prevY = [5, 5, 5]
let fruitX = 5
let fruitY = 5
let fruitGenerated = false
let score = 0
let highScore = 0
let snakeIsDead = false

function setup() {
  createCanvas(395, 395);
  frameRate(4)
}

function draw() {
  background(200);

  if(!snakeIsDead){
    generateFruit();

    moveSnake();

    fruitHit();

    snakeDeath();
  } else {
    textAlign(CENTER, CENTER)
    fill(0)
    textSize(24)
    text("YOU DIED\nYour score: " + score + "\nHighscore: " + highScore, width / 2, height / 2)
  }
}

function keyPressed(){
  if (keyCode == RIGHT_ARROW && snakeDirection != "left"){
    snakeDirection = "right"
  } else if (keyCode == LEFT_ARROW && snakeDirection != "right"){
    snakeDirection = "left"
  } else if (keyCode == UP_ARROW && snakeDirection != "down"){
    snakeDirection = "up"
  } else if (keyCode == DOWN_ARROW && snakeDirection != "up"){
    snakeDirection = "down"
  }
}

function moveSnake() {
  fill(255)
  
  square(snakeHeadX, snakeHeadY, 10)

  if(snakeDirection == "right"){
    snakeHeadX += moveAmount
  } else if(snakeDirection == "left"){
    snakeHeadX -= moveAmount
  } else if(snakeDirection == "up"){
    snakeHeadY -= moveAmount
  } else if(snakeDirection == "down"){
    snakeHeadY += moveAmount
  }

  append(prevX,snakeHeadX)
  append(prevY,snakeHeadY)

  if (prevX.length > snakeLength) {
    prevX.shift()
    prevY.shift()
  }

  for (let i = 0; i < prevX.length; i++){
    square(prevX[i],prevY[i], 10)
  }
}

function generateFruit() {
  if(!fruitGenerated){
    fruitX = int(random(1, 26)) * 15 + 5
    fruitY = int(random(1, 26)) * 15 + 5
    fruitGenerated = true
  }
  fill(230, 0, 0)

  square(fruitX, fruitY, 10)
}

function fruitHit(){
  if(fruitX == snakeHeadX && fruitY == snakeHeadY){
    score++
    snakeLength++
    fruitGenerated = false
  }
}

function snakeDeath(){
  if(snakeHeadX < 0 || snakeHeadX > width || snakeHeadY < 0 || snakeHeadY > height){
    snakeIsDead = true
    if(score > highScore){
      highScore = score
    }
  } else {
    for (let i = 0; i < prevX.length - 1; i++){
      if(prevX[i] == snakeHeadX && prevY[i] == snakeHeadY){
        snakeIsDead = true
        if(score > highScore){
          highScore = score
        }
      }
    }
  }
}