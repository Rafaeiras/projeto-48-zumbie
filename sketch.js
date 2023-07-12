var bg,bgImg;
var player, shooterImg, shooter_shooting;
var coracao1, coracao2, coracao3;
var cor1img, cor2img, cor3img;
var zumbi;
var zumbiImg;
var zumbiGroup;
var bala;
var balaGroup;
var balas=70;
var gameState = "lutar";
var vida = 3;
var score = 0;

function preload(){
  shooterImg = loadImage('assets/shooter_2.png')
  shooter_shooting = loadImage ('assets/shooter_3.png')  
  bgImg = loadImage('assets/bg.jpeg')
  cor1img = loadImage("assets/heart_1.png")
  cor2img = loadImage("assets/heart_2.png")
  cor3img = loadImage("assets/heart_3.png")
  zumbiImg = loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage (bgImg)
  bg.scale = 1.1

  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage (shooterImg)
  player.scale = 0.3
  player.debug = false
  player.setCollider("rectangle",0,0,300,300)

  coracao1 = createSprite(displayWidth-150,40,20,20);
  coracao1.visible = false 
  coracao1.addImage("coracao1",cor1img)
  coracao1.scale = 0.4

  coracao2 = createSprite(displayWidth-100,40,20,20);
  coracao2.visible = false 
  coracao2.addImage("coracao2",cor2img)
  coracao2.scale = 0.4

  coracao3 = createSprite(displayWidth-150,40,20,20);
  coracao3.visible = true
  coracao3.addImage("coracao3",cor3img)
  coracao3.scale = 0.4

  zumbiGroup = new Group()
  balaGroup = new Group()
}

function draw() {
  background(0); 
  if(gameState==="lutar"){
 
            if(keyDown("UP_ARROW")||touches.length>0){
              player.y = player.y-30
            }
            if(keyDown("DOWN_ARROW")||touches.length>0){
              player.y = player.y+30
            }
            if(keyDown("LEFT_ARROW")||touches.length>0){
              player.x = player.x-30
            }
            if(keyDown("RIGHT_ARROW")||touches.length>0){
              player.x = player.x+30
            }
            if(vida===3){
              coracao3.visible = true
              coracao1.visible = false 
              coracao2.visible = false
            }
            if(vida===2){
              coracao3.visible = false
              coracao1.visible = false 
              coracao2.visible = true
            }
            if(vida===1){
              coracao3.visible = false
              coracao1.visible = true 
              coracao2.visible = false
            }
            if(vida===0){
              coracao3.visible = false
              coracao1.visible = false 
              coracao2.visible = false
              gameState = "perdeu"
            }

            
            if(keyWentDown("space")){
              player.addImage(shooter_shooting) 
              bala = createSprite(player.x +20, player.y-30,20,10)
              bala.velocityX = 20
              balaGroup.add(bala)
              player.depth = bala.depth
              player.depth = player.depth +2
              balas=balas-1
            }
            else if(keyWentUp("space")){
              player.addImage(shooterImg)
            }
            if (balas===0){
              gameState = "municao"
            }
            if(score===65){
              gameState = "venceu"
            }

            gerarzumbis();
            player.overlap(zumbiGroup, function(collector,collected){
              collected.remove();
              vida = vida -1
            })
          
            balaGroup.overlap(zumbiGroup, function(collector,collected){
              collected.remove();
              collector.remove();
              score = score +1
            })

           
            drawSprites();
            textSize(20)
            text ("Balas = " + balas,displayWidth-210,displayHeight/2-250)
            text("Pontuação = " + score,displayWidth-200,displayHeight/2-220)
          }

           if(gameState=="perdeu"){
            textSize(50)
            fill("yellow")
            text("você perdeu",470,410)
            zumbiGroup.destroyEach();
            player.destroy();
            balaGroup.destroyEach();
          }
          else if(gameState=="municao"){
            textSize(50)
            fill("yellow")
            text("você não tem mais balas",470,410)
            zumbiGroup.destroyEach();
            player.destroy();
            balaGroup.destroyEach();
          }
          else if(gameState=="venceu"){
            textSize(100)
            fill("purple")
            text("Parabens você venceu",250,410)
            zumbiGroup.destroyEach();
            player.destroy();
            balaGroup.destroyEach();
          }
  
}
function gerarzumbis(){
if(frameCount%50==0){
zumbi = createSprite(width,random(100,500),40,40)
zumbi.addImage(zumbiImg)
zumbi.scale = 0.15
zumbi.velocityX = -(6+score/10)
zumbi.lifetime = width/3
zumbiGroup.add(zumbi)
zumbi.debug = false
zumbi.setCollider("rectangle",0,0,400,550)
}

}
