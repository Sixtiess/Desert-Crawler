class Ship{
  constructor(x,y,w,h,k1,k2,k3,k4,k5,speed){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.k1 = k1;
    this.k2 = k2;
    this.k3 = k3;
    this.k4 = k4;
    this.k5 = k5;
    this.speed = speed;
    this.blasts = [];
    this.blastCooldown = 5;
    this.canBlast = true;
    this.health = 1
    this.isDead = false;
  }

  display(){



    //rect(this.x-(this.w/2),this.y-(this.h/2),5,5);
    image(shipImage,this.x-(this.w/2),this.y-(this.h/2),this.w,this.h);


    for(let i = 0; i < this.blasts.length; i++){
      this.blasts[i].display();
    }

    if(this.canBlast == false && frameCount % this.blastCooldown == 0) this.canBlast = true;


    for(let i = 0; i < this.blasts.length; i++){
      this.blasts[i].update();
    }
  }

  move(){
    if(keyIsDown(this.k1)){
      this.y -= this.speed;
    }
    //down
    if(keyIsDown(this.k2)){
      this.y += this.speed;
    }
    //left
    if(keyIsDown(this.k3)){
      this.x -= this.speed;

    }
    //right
    if(keyIsDown(this.k4)){
      this.x += this.speed;
    }

    this.x = constrain(this.x,this.w/2,width-this.w/2);
    this.y = constrain(this.y,this.h/2,height-this.h/2);
  }

  blast(){
    if(this.canBlast == true){
      this.blasts.push(new Blast(this.x-this.w/4,this.y-this.h/3,PI+HALF_PI,20));
      this.blasts.push(new Blast(this.x+this.w/4,this.y-this.h/3,PI+HALF_PI,20));
      this.canBlast = false;
    }

  }

  run(){

    if(this.health > 0){
      this.move();

      this.display();
      this.isDead = false;
      
    } else {
      this.isDead = true;
    }
  }
}

class Blast{
  constructor(x,y,a,speed){
    this.x = x;
    this.y = y;
    this.a = a;
    this.speed = speed;
    this.lifeTime = 3;
    this.time = 0;
    this.size = 25;
  }

  display(){

    //rect(this.x-(this.size/2),this.y-(this.size/2),this.size,this.size);
    image(blst,this.x-(this.size/2),this.y-(this.size/2),this.size,this.size);

  }

  update(){
    let nextX = this.x + (this.speed * cos(this.a));
    let nextY = this.y + (this.speed * sin(this.a));

    this.x = nextX;
    this.y = nextY;
    this.time++;

    //remove blast from list after lifetime is over
    if(this.time >= this.lifeTime*60){
      player.blasts.splice(player.blasts.indexOf(this),1);
    }


    for(let i = 0; i < enemies.length; i++){
      if(dist(this.x,this.y,enemies[i].x,enemies[i].y) <= enemies[i].size/3*2){
        enemies[i].health -= 1;
        score += 100;

        if(enemies[i].health == 0){
          score += 1000;
        }
        player.blasts.splice(player.blasts.indexOf(this),1);
      }
    }
  }


}