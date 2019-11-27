//import weakEnemy from 'weakEnemy.js'
/** @type {import("../type/phaser")} */
let player;
let platform;
let cursors;
let bulletTime = 0.3;
let bulletTmeCount= bulletTime;
let gun ;
let life;
let lifebar;

let enemies ;
let strongEnemies;
let bullets ;

let dificuly=1; //1 - 10 it increases over time
let points = 0;
let secCount=5 ;  
let nextSpawn=0;
let bulletSpeed=200;  
let spawnTime=3;  // frequenca
class Example extends Phaser.Scene{
    
    constructor(){
        super({key:"Example"});
    }
   
    preload(){
        this.load.image('barrel', 'assets/barrel.png');
        this.load.image('lifebar', 'assets/life.png');
        this.load.image('fox', 'assets/fox.png');
        this.load.image('fish', 'assets/jellyfish.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('bullet', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      
    }

    create(){
        this.key_A=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        enemies = this.physics.add.group(this);
        strongEnemies = this.physics.add.group(this);
        bullets = this.add.group(this);
        
        this.add.image(400, 300, 'sky');
        gun =this.add.image(60, 200, 'barrel');
        gun.setDisplaySize(120,60);
        
        let plataform =this.physics.add.image(150, 200, 'ground');
        plataform.setAngle(90);
  
        
        this.physics.add.overlap(enemies, bullets, hitEnemy);
        this.physics.add.overlap(strongEnemies, bullets,hitEnemy2);
        this.physics.add.overlap(enemies,plataform,hitPlatfrom);
        this.physics.add.overlap(strongEnemies,plataform,hitPlatfrom2);


        //***Player 
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
    
        
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        cursors = this.input.keyboard.createCursorKeys();


        
/*
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        
*/
        /*
        this.input.keyboard.on('keyup_D',function(event) {
            this.image.x += 10;
        },this);


        this.key_A=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.on('pointerdown', function(event){
            this.image.x = event.x ;
            this.image.y = event.y ;
        },this);

        this.input.keyboard.on('keyup_P',function(event) {
            var physicsImage = this.physics.add.image (this.image.x,this.image.y,"mario");
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100,100),-300);
        },this);


        this.input.keyboard.on('keyup',function(e) {
            if (e.key=="2"){
                this.scene.start ("Example2");
            }
        },this);
*/

        //this.physics.add.collider(player, platforms);

    }
    /*

    */
    update(time,delta){
        
        if (time>=bulletTmeCount*1000){
            
            bulletTmeCount+=bulletTime; 
            let bullet =this.physics.add.image(0, 0, 'bullet');
            bullet.displayHeight=25;
            bullet.displayHeight=25;
            
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
            secCount=secCount+5;// the dificuly will increase every 5 seconds
            if (spawnTime>=0.5){
                spawnTime-= 0.1;
            }
            
        }
        if (time>=nextSpawn){
            nextSpawn=time+spawnTime*1000;
            var i;
            for (i=0; i<5; i++){
                if (Math.floor(Math.random() * 10) > dificuly ){
                    enemies.add(this.add.existing(new weakEnemy(this, 600, 50+i*75)));
                }else {
                    strongEnemies.add(this.add.existing(new strongEnemy(this, 600, 50+i*75)));
                }    
            }
        
            
        }

       

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
        
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
        
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
        
            player.anims.play('turn');
        }
        
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }


        if(this.key_D.isDown && gun.angle<=45){
            gun.setAngle(gun.angle +1);
        }

        if(this.key_A.isDown && gun.angle>=(-45)){
            gun.setAngle(gun.angle -1);
        }

        if (game.input.activePointer.isDown) {  
            let b = game.input.activePointer.x- gun.x;
            let a = -game.input.activePointer.y +gun.y;
            let angle1= Math.atan(a/b) *(180.0/Math.PI) ;
            gun.setAngle(-angle1);
        }

    }

 

}

function hitEnemy (osea, enemy1)
{
    points++;
    enemy1.destroy();
    //console.log(points);
    
}

function hitEnemy2 (bullet, enemy2)
{
    enemy2.life--;
    if (enemy2.life===0){
        enemy2.destroy();
    }else {
        bullet.destroy();
        points++;
    }
    
}


function hitPlatfrom (a, b)
{
   
    
}

function hitPlatfrom2 (a, b)
{
   
    
}