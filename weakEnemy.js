 class weakEnemy extends Phaser.GameObjects.Image {
  constructor (scene, x, y,nwidth,nheight)
    {
        super(scene, x, y,'fox');
        //this.setTexture('fox');
        //scene.add.existing(this);
        this.displayHeight=nheight;
        this.displayWidth=nwidth;
        this.setSize(nwidth,nheight);
        this.life=1;
        this.speed=nwidth/50;


    }

 
    preUpdate (time, delta)
    {
      //  super.preUpdate(time, delta);
        this.setX(this.x-this.speed);
             
    }



}
