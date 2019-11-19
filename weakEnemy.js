 class weakEnemy extends Phaser.GameObjects.Image {
    constructor (scene, x, y, eshta)
    {
        super(scene, x, y);
        eshta=1000;
        this.setTexture('fox');
        //scene.add.existing(this);
        this.setX(600);
        this.displayHeight=50;
        this.displayWidth=50;
        //this.setAngle(this.angle+10);
        //this.setPosition(x, y);
        Math.random

    }

 
    preUpdate (time, delta)
    {
      //  super.preUpdate(time, delta);
        let man= Math.round(time/1000);
        this.setX(this.x-1);     
    }

}
