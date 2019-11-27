class statusBar extends Phaser.GameObjects.Image {
  constructor (scene, x, y)
    {
        super(scene, x, y,'lifebar');
        //this.setTexture('fox');
        //scene.add.existing(this);
        this.setX(600);
        this.displayHeight=200;
        this.displayWidth=200;
        this.setSize(200,200);
        this.life=2;
        this.speed=1.2;

    }

 
    preUpdate (time, delta)
    {
      //  super.preUpdate(time, delta);
       this.setX(600);
             
    }


}
