//import weakEnemy from 'weakEnemy.js'
/** @type {import("../type/phaser")} */

//game.world.centerX         //game.config.height;

let platform;
let bulletTime = 0.3; // attackSpeed less is faster
let bulletTmeCount= bulletTime;
let gun ;
let life=100;
let lifeText;
let lifebar;

let gameWidth; 
let gameHeight;
let playableHeight;
let uiHeight; 

let enemies ;
let strongEnemies;
let bullets ;

let dificulty=1; //1 - 10 it increases over time
let points = 0;
let pointsText;
let secCount=5 ;  
let nextSpawn=0;
let bulletSpeed=300;  
let spawnTime=3;  // frequenca

//sounds
let hitEnemySnd;

class Example extends Phaser.Scene{
    
    constructor(){
        super({key:"Example"});
    }
   
    preload(){


        this.load.audio('HitEnemySound','assets/Pickup_Coin5.wav');  // urls: an array of file url

        this.load.image('buttonImg', 'assets/blue-square.png');
        this.load.image('barrel', 'assets/barrel.png');
        this.load.image('lifebar', 'assets/emptyLifeBar.png');
        this.load.image('life', 'assets/life.png');
        this.load.image('fox', 'assets/fox.png');
        this.load.image('fish', 'assets/jellyfish.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('lava', 'assets/lava.png');
        this.load.image('floor', 'assets/floor.png');
        
        this.load.image('bullet', 'assets/star.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      
    }

    create(){
        // game size 
     
        gameWidth= game.config.width;

        gameHeight =game.config.height ;
        
        
        playableHeight=(game.config.width>game.config.height) ? this.game.config.height*0.85    : this.game.config.width;
        uiHeight      =(game.config.width>game.config.height) ? this.game.config.height*0.15    : this.game.config.width*0.15;

         //alternative keys
         this.key_A=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
         this.key_D=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //background
        let sky =this.add.image(gameWidth/2, gameHeight/2, 'sky');
        sky.setDisplaySize(gameWidth,gameHeight);
        let flor =this.add.image(gameWidth/2, playableHeight/2, 'floor');
        flor.setDisplaySize(gameWidth,playableHeight);
    
        hitEnemySnd = this.sound.add('HitEnemySound');
       
        gun =this.add.image(0,0, 'barrel');
        gun.setSize(gameWidth*0.16,playableHeight*0.15);
        gun.setDisplaySize(gameWidth*0.16,playableHeight*0.15);
        gun.setPosition( gun.width/2,playableHeight/2);
        
        platform =this.physics.add.image(0,0, 'lava');
        platform.setPosition(gun.x+gun.displayWidth*0.8,playableHeight/2);
        platform.setDisplaySize(gun.displayWidth/2,playableHeight);

        
        //* ---GAME HUD---
        pointsText=this.add.text(0, 0, 'POINTS: '+points, { fontFamily: '"Roboto Condensed"' });
        pointsText.setPosition(gameWidth*0.85,playableHeight+uiHeight/2);
        pointsText.setColor("000");
        
        let lifeFrame = this.add.image(0,0, 'lifebar');
        lifeFrame.setDisplaySize(gameWidth/4,uiHeight*0.7)
        lifeFrame.setPosition(lifeFrame.displayWidth*0.6,playableHeight+uiHeight/2);
        
        lifebar =this.add.existing(new lifeBar(this,lifeFrame.x, playableHeight+uiHeight/2,lifeFrame.displayWidth,lifeFrame.displayHeight));
        lifeText= this.add.text(lifeFrame.x/4, playableHeight+uiHeight/2, '100/'+life, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
        
        let button1=this.add.image(400, 500,'buttonImg');
        button1.setInteractive();
        button1.setDisplaySize(50,50);
        button1.setSize(50,50);
        button1.on('pointerdown',this.actionOnClick ); //pointerout ,pointerdown ,pointerover, pointerup 
        //button1.on('pointerdown',() =>  ); //pointerout ,pointerdown ,pointerover, pointerup 

          //* ---GAME UI---


        //groups
        enemies =       this.physics.add.group(this);
        strongEnemies = this.physics.add.group(this);
        bullets =       this.add.group(this);
        
        //coliders 
        this.physics.add.overlap(enemies, bullets, hitEnemy);
        this.physics.add.overlap(strongEnemies, bullets,hitEnemy2);
        this.physics.add.overlap(enemies,platform,hitPlatfrom1)
        this.physics.add.overlap(strongEnemies,platform,hitPlatfrom2);


    }

    update(time,delta){
        pointsText.setText('POINTS: '+points);
        lifeText.setText('100/'+life);
        //shot bullets cicle
        if (time>=bulletTmeCount*1000 & life >0){
            
            bulletTmeCount+=bulletTime; 
            let bullet =this.physics.add.image(0, 0, 'bullet');
            bullet.displayHeight=playableHeight/17;
            bullet.displayWidth=playableHeight/17;
            
            //bullet.body.setSize(25,50);
            let bulletYSpeed = ((gun.angle*bulletSpeed)/90);     
            let bulletXPos= Math.cos(gun.angle *(Math.PI / 180.0))*gun.displayWidth/2 + gun.x   ;
            let bulletYPos= Math.sin(gun.angle *(Math.PI / 180.0))*gun.displayWidth/2  +gun.y  ; 
            bullet.setPosition(bulletXPos,bulletYPos);
            bullet.setVelocityY(bulletYSpeed);
            bullet.setVelocityX(bulletSpeed-Math.abs(bulletYSpeed));
            bullets.add(bullet);
        }
        //level=how often the spawen time decreses
        if (time>=secCount*1000){
            secCount=secCount+5;// the dificulty will increase every 5 seconds
            if (spawnTime>=0.5){
                spawnTime-= 0.1;
            }

            if (dificulty<=9){
                dificulty+=0.25;
            }
            
        }
        // spawn enemies cicle
        if (time>=nextSpawn & life>0){
            console.log(dificulty);
            nextSpawn=time+spawnTime*1000;
            var i;
            for (i=0; i<5; i++){
                if (Math.floor(Math.random() * 10) > dificulty ){
                    enemies.add(this.add.existing(new weakEnemy         (this, gameWidth,(playableHeight/10)+i*playableHeight/5,gameWidth/15,playableHeight/7)));
                }else {
                    strongEnemies.add(this.add.existing(new strongEnemy (this, gameWidth,(playableHeight/10)+i*playableHeight/5,gameWidth/15,playableHeight/7)));
                }    
            }
        
            
        }


        if(this.key_D.isDown && gun.angle<=45){
            gun.setAngle(gun.angle +1);
        }

        if(this.key_A.isDown && gun.angle>=(-45)){
            gun.setAngle(gun.angle -1);
        }

        if (game.input.activePointer.isDown && game.input.activePointer.y<playableHeight ) {  
            let b = game.input.activePointer.x- gun.x;
            let a = -game.input.activePointer.y +gun.y;
            let angle1= Math.atan(a/b) *(180.0/Math.PI) ;
            gun.setAngle(-angle1);
        }
    }


     actionOnClick(){
        console.log('aja!');   
    }

}

function hitEnemy (osea, enemy1)
{
    points++;
    enemy1.destroy();
    hitEnemySnd.play();

    
    //console.log(points);
    
}

function hitEnemy2 (bullet, enemy2)
{
    enemy2.life--;
    if (enemy2.life===0){
        points+=2;
        enemy2.destroy();
        hitEnemySnd.play();
    }else {
        bullet.destroy();
    }
    
}


function hitPlatfrom1 (plat,enemy3)
{
    enemy3.destroy();
    if (life>0){
        life--;
    }
    
    lifebar.setLife(life);

}

function hitPlatfrom2 (plat, enemy4)
{
    enemy4.destroy();
    if (life>0){
        life--;
    }
    lifebar.setLife(life);

 
}

function actionOnClick(){
    console.log('aja!');   
}