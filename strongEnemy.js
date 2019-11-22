class strongEnemy extends Phaser.GameObjects.Image {
    constructor (scene, x, y)
      {
          super(scene, x, y,'fish');
          //this.setTexture('fox');
          //scene.add.existing(this);
          this.setX(600);
          this.displayHeight=50;
          this.displayWidth=50;
          this.setSize(50,50);
          this.life=2;
          this.speed=1.2;
  
      }
  
   
      preUpdate (time, delta)
      {
        //  super.preUpdate(time, delta);
          this.setX(this.x-this.speed);
               
      }
  
  
  }
  