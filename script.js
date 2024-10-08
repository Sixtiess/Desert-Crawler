let gameTime = 0;
let enemies = [];
let enemyBlasts = [];
let score = 0;
let stage = 1;
let backgrounds = [];
let scrollSpeed = 5;

function preload(){
  shipImage = loadImage( "images/ship.png")
  
  heli = loadImage("images/heli.png")

  blst = loadImage("images/playerBlast.png")

  enemyBlst = loadImage("images/enemyBlast.png")
  backgrnd = loadImage('images/desertBackgroundLowRes.png')
}


function setup() {
  cnv = createCanvas(800, 900);
  cnv.position(windowWidth/2-width/2,0)
  player = new Ship(100,100,100,100,87,83,65,68,32,10);
  backgrounds.push(new movingBackgrd(0,-2125,800,3125))
  backgrounds.push(new movingBackgrd(0,-5250,800,3125))
}


function draw() {
  //background(200);
  //pixelDensity(0.5);
  //movingBackground();

  for(let i = 0; i < backgrounds.length; i++){
    backgrounds[i].display();
  }
  player.run();

  displayAllEnemies();
  gameTimeLine();
  scoreboard();
  ifDead();
}


function keyPressed(){
  if(keyCode == 32){
    player.blast();
  }

  if(keyCode == 82){
    spawnEnemy('heli');
  }
}


function displayAllEnemies(){
  
  for(let i = 0; i < enemyBlasts.length; i++){
    enemyBlasts[i].display();
    enemyBlasts[i].update();
  }

  for(let i = 0; i < enemies.length; i++){
    enemies[i].display();
  }
}


function gameTimeLine(){
  //XOR :O
  //Spawns enemy every 200 frames, doesn't spawn on frame 0
  if(gameTime % (800 * stage) == 0 ^ gameTime == 0){
    if(stage < 6){
      stage++;
    }
  }


if(!player.isDead){
  //Spawns enemy helicopters at different intervals depending on stage #
  
  if((gameTime % 100 == 0 ^ gameTime == 0) && stage == 1){
    spawnEnemy('heli');

  } else if((gameTime % 60 == 0 ^ gameTime == 0) && stage == 2){
    spawnEnemy('heli');

  } else if((gameTime % 40 == 0 ^ gameTime == 0) && stage == 3){
    spawnEnemy('heli');

  } else if((gameTime % 30 == 0 ^ gameTime == 0) && (stage == 4 || stage == 5)){
    spawnEnemy('heli');

  } else if(stage >= 6){

    textSize(20)
    text('You win',width/2,height/2)
    textSize(10)
  }

  gameTime++;
  
  } else {
    textSize(20)
    text('You lose',width/2,height/2)
    textSize(10)
  }

}


function scoreboard(){
  textSize(15)
  text('Score: ' + score,10,10)
  text('Game Time: ' + gameTime,10,30)
  text('Stage: ' + stage,10,50)
}


function spawnEnemy(type){
  if(type == 'heli'){
    enemies.push(new enemyHeli(random(0,width)));
  }
}


function ifDead(){
  if(player.isDead){
    enemies = [];
    enemyBlasts = [];

    if(keyIsDown(80)){
      player.health = 1;
      player.x = 100;
      player.y = 100;
      gameTime = 0;
      stage = 1;
      score = 0;
    }
  }
}






class movingBackgrd{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display(){
    image(backgrnd, this.x, this.y, this.w, this.h);

    this.y += scrollSpeed;

    if(this.y >= this.h){
      this.y -= this.h*2;
    }

    // if(this.y >= 0){
    //   backgrounds.push(new movingBackgrd(0,-3125,800,3125));
    // }
  }
}
