 class weakEnemy extends Phaser.GameObjects.Image {
  constructor (scene, x, y)
    {
        super(scene, x, y,'fox');
        //this.setTexture('fox');
        //scene.add.existing(this);
        this.displayHeight=50;
        this.displayWidth=50;
        this.setSize(50,50);
        this.life=1;
        this.speed=1;


    }

 
    preUpdate (time, delta)
    {
      //  super.preUpdate(time, delta);
        this.setX(this.x-this.speed);
             
    }



}
