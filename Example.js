//import weakEnemy from 'weakEnemy.js'
/** @type {import("../type/phaser")} */
let player;
let fox;
let platforms;
let cursors;

let line1;
let line2;
let line3;
let line4;

let spawnTime;  // frequency of the enemies spawn in seconds 


class Example extends Phaser.Scene{
    constructor(){
        super({key:"Example"});
    }
   
    preload(){
        this.load.image('fox', 'assets/fox.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      
    }

    create(){
        spawnTime= 3; // 3s
        line1 = this.add.group();
        

        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        

        fox =this.physics.add.image(200, 0, 'fox');
        
        fox.displayHeight=100;
        fox.displayWidth=100;
        //***Player 
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        fox.setCollideWorldBounds(true);

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

        //Player END*** 

        this.physics.add.collider(player, platforms);
        cursors = this.input.keyboard.createCursorKeys();



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
    }


    

    update(time,delta){
    
        

        //level=how often the spawen time decreses
        if (time>=secCount*1000){
            secCount+=5;// the dificuly will increase every 5 seconds
            spawnTime-=100;
            
        }

        count++;
        if (count>=spawnTime*1000){
            //this.add.existing(new weakEnemy(this, 264, 250));
        }

        if (fox.x < 500 ){
            fox.x++;
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


        




        /*
        if(this.key_A.isDown){
            this.image.x--;
        }*/

    }

 


}



