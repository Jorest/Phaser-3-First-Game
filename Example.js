//import weakEnemy from 'weakEnemy.js'
/** @type {import("../type/phaser")} */
let player;
let fish ;
let platforms;
let cursors;
let bulletTime = 1;
let bulletTmeCount= bulletTime;
let gun ;
let secCount=5 ;  
let nextSpawn=0;
let bulletSpeed=100;  


let spawnTime=3;  // frequency of the enemies spawn in seconds 

class Example extends Phaser.Scene{
    
    constructor(){
        super({key:"Example"});
    }
   
    preload(){
        this.load.image('gun', 'assets/gun.png');
        this.load.image('fox', 'assets/fox.png');
        this.load.image('fish', 'assets/jellyfish.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('bullet', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      
    }

    create(){
        //line1 = this.add.group();
        this.key_A=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        this.add.image(400, 300, 'sky');
        fish =this.add.image(200, 100, 'fish');
        
        gun =this.add.image(80, 300, 'gun');
        gun.displayHeight=90;
        gun.displayWidth=120;
        


        fish.displayHeight=50;
        fish.displayWidth=50;
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

    update(time,delta){
        if (time>=bulletTmeCount*1000){
            bulletTmeCount+=bulletTime; 
            let bullet =this.physics.add.image(100, 280, 'bullet');
            bullet.setGravity(0,-200);
            let bulletYSpeed = ((gun.angle*bulletSpeed)/90);
           
            let bulletXPos= Math.cos(gun.angle  *(Math.PI / 180))*gun.displayWidth +10;
            let bulletYPos= Math.sin(gun.angle * (Math.PI / 180))*10 + 280;
            bullet.setPosition(bulletXPos,bulletYPos);
            
            bullet.setVelocityY(bulletYSpeed);
            bullet.setVelocityX(bulletSpeed-bulletYSpeed);
            console.log(gun.angle,Math.cos(gun.angle  *(Math.PI / 180)));

        }
        //level=how often the spawen time decreses
        if (time>=secCount*1000){
            secCount=secCount+5;// the dificuly will increase every 5 seconds
            spawnTime-= 0.1;
            
        }
        if (time>=nextSpawn){
            nextSpawn=time+spawnTime*1000;
            this.add.existing(new weakEnemy(this, 600, 150,0));
            this.add.existing(new weakEnemy(this, 600, 250,0));
            this.add.existing(new weakEnemy(this, 600, 350,0));
            this.add.existing(new weakEnemy(this, 600, 450,0));
        }

        if (fish.x < 500 ){
            fish.x++;
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


        if(this.key_A.isDown && gun.angle<=45){
            gun.setAngle(gun.angle +1);
        }

        if(this.key_D.isDown && gun.angle>=(-45)){
            gun.setAngle(gun.angle -1);
        }
    }

 


}



