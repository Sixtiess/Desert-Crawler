class enemyBlast{
  constructor(x,y,a,speed){
    this.x = x;
    this.y = y;
    this.a = a;
    this.speed = speed;
    this.lifeTime = 2;
    this.time = 0;
    this.size = 25
  }

  display(){
    image(enemyBlst,this.x-(this.size/2),this.y-(this.size/2),this.size,this.size);


  }

  update(){
    let nextX = this.x + (this.speed * cos(this.a));
    let nextY = this.y + (this.speed * sin(this.a));

    this.x = nextX;
    this.y = nextY;
    this.time++;

    //remove blast from list after lifetime is over
    if(this.time >= this.lifeTime*60){
      enemyBlasts.splice(enemyBlasts.indexOf(this),1);
    }

    if(dist(this.x,this.y,player.x,player.y) <= player.w/3 || dist(this.x,this.y,player.x,player.y) <= player.h/3){
      player.health -= 1;
      enemyBlasts.splice(enemyBlasts.indexOf(this),1);
    }
  }
}




function keyPressed(){
  if(keyCode == 32){
    player.blast();
  }

  if(keyCode == 82){
    spawnEnemy('heli');
  }
}

class enemyHeli{
  constructor(xStart,cooldown=30,speed=10){
    this.blastCooldown = cooldown;
    this.speed = speed;
    this.x = xStart;
    this.y = 0;
    this.lifeTime = 3.5;
    this.time = 0;
    this.health = 1;
    this.size = 50
    this.angle = HALF_PI;
  }

  display(){

    if(this.health == 0){
      enemies.splice(enemies.indexOf(this),1);
    }

    this.move();

    push();
    translate(this.x,this.y);
    rotate(atan2(player.y-this.y+(this.size/2),player.x-this.x)-HALF_PI);
    //rect(-25,-25,this.size,this.size);
    image(heli,-50,-50,this.size*2,this.size*2);
    pop();

    this.shoot();

    if(this.time >= this.lifeTime*60){
      enemies.splice(enemies.indexOf(this),1);
    }
    this.time++;
  }

  move(){
    this.y += this.speed;
    this.speed -= 0.1;
  }

  shoot(){
    if(this.time % this.blastCooldown == 0){
      enemyBlasts.push(new enemyBlast(this.x,this.y,atan2(player.y-this.y+(this.size/4),player.x-this.x),10));
    }
  }


}

class enemyTank{
  constructor(xStart,yStart,xEnd,yEnd,startAngle,cooldown=10,speed=10){
    this.a = startAngle;
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.cooldown = cooldown;
    this.speed = speed;
    this.x = this.xStart;
    this.y = this.yStart;
    this.health = 2;
  }

  display(){
    rect(this.x-25,this.y-25,50,50)
  }
}