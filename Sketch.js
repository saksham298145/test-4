const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
let engine;
let world;
var sky
var attacker
var gun
var score
var fires=[]
var enemies=[]

function preload()
{
  bg_img = loadImage('bg.png.png');
skyI=loadImage("sky.jpg")
 destroyer=loadImage("destroyer.png")
}
function setup() {
  
    createCanvas(1200,600); 
    angleMode(DEGREES)
    angle=PI/4
   
   
    engine = Engine.create();
    world = engine.world;
   
    sky=Bodies.rectangle(-60, -45, 5000, 6000, { isStatic: true });
    World.add(world,sky);
    attacker=Bodies.rectangle(10, 200, 200, 500, { isStatic: true });
    World.add(world,attacker);
  gun=new Gun(400,350,100,100)
  }
  function draw() 
{

  background(51);
  image(bg_img,0,0,width,height)
  push()
  translate(sky.position.x,sky.position.y)
  image(skyI,50,50,1850,250)
pop()
  push()
  translate(attacker.position.x,attacker.position.y)
  image(destroyer,0,0,450,350)
pop()
gun.display()
  Engine.update(engine)
}
function Collision(index){
  for (var i = 0; i < enemies.length; i++) {
    if (fires[index] !== undefined && enemies[i] !== undefined) {
      var collision = Matter.SAT.collides(fires[index].body,enemies[i].body);

      if (collision.collided) {
          enemies[i].remove(i);
        

        Matter.World.remove(world, fires[index].body);
        delete fires[index];
        score=score+5


      }
    }
  }
}


function showenemies() {
  if(enemies.length>0) {
    if(enemies[enemies.length-1] === undefined || enemies[enemies.length-1].body.position.x < width - 300) {
      var positions = [-60, -80, -90, -50];
     var position = random(positions);
      var enemy = new Enemy(width, height-100, 170,170,position);
      enemies.push(enemy);
    }
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i]) {
        Matter.Body.setVelocity(enemies[i].body,{x:-0.9 ,y:-0.3});
        enemies[i].display();
        var collision2 = Matter.SAT.collides(attacker,enemies[i].body);

        if (collision2.collided) {
          gameOver()

        }          
      } else {
        enemies[i];
      }
    }
  }
  else {
    var enemy = new Enemy(width ,height -60, 170, 170, -60);
    enemies.push(enemy);
  }
}  
function showFires(fire,index){
  if(fire){
    fire.display()
  }
} 
function keyReleased() {
  if (keyCode === 32) {
    if (fires.length) {
      fires[fires.length - 1].shoot();
    }
  }
}
function keyPressed() {
  if (keyCode === 32) {
      var fire = new Fire(gun.x,gun.y);
      fires.push(fire); 
    }
  }
  function gameOver() {
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }