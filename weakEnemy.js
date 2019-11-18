 class weakEnemy extends Phaser.GameObjects.Image {
    constructor (scene, x, y)
    {
        super(scene, x, y);
        
        this.setTexture('fox');
        //scene.add.existing(this);
        this.setX(600);
        this.displayHeight=50;
        this.displayWidth=50;
        this.setAngle(this.angle+10);
        //this.setPosition(x, y);
    }

 
    preUpdate (time, delta)
    {
      //  super.preUpdate(time, delta);
        let man= Math.round(time/1000);
        this.setX(this.x-1);
        if (man%2==0){
            if (this.angle>10){
                this.setAngle(this.angle-20)
            } else {
                this.setAngle(this.angle+20)
            }   
        }
      
        
    }

}
