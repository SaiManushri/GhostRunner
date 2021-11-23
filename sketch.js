var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,150)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
   
   invisibleBlockGroup = new Group()
  climbersGroup = new Group()
  doorsGroup = new Group()
}

function draw() {
  background(200);
  if(gameState==="play"){


  if(tower.y > 400){
      tower.y = 300
    }
  
    if(keyDown("right")){
      ghost.x=ghost.x+3
    }
    if(keyDown("left")){
      ghost.x=ghost.x-3
    }
    if(keyDown("space")){
      ghost.velocityY=-5
    }
    ghost.velocityY+=0.8

     if(climbersGroup.isTouching(ghost)){
       ghost.velocityY=0
     }
      if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
        ghost.destroy()
        gameState = "end" 

      }

spwnDoors()
drawSprites()
    }
      if (gameState==="end"){
      stroke("white")
      fill("red")
      textSize(50)
      text("Game Over",190,250)
      }
}

function spwnDoors(){
  if (frameCount % 250===0 ){
    door = createSprite(random(150,420),-50)
    door.addImage(doorImg)
    door.velocityY=1;
    
    climber = createSprite(door.x,10)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.lifetime=600

    ghost.depth=door.depth
    ghost.depth+=1 

    door.lifetime=600
    doorsGroup.add(door)

    climbersGroup.add(climber)
   
    invisibleBlock = createSprite(door.x,15,climber.widgth,2)
    invisibleBlock.velocityY=1
    invisibleBlock.lifetime=600
    
     invisibleBlock.visible=false

    invisibleBlockGroup.add(invisibleBlock)
    
     
    
  }

    

}