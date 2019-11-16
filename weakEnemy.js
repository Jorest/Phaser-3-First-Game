 class weakEnemy extends Phaser.GameObjects.Image {

    constructor (scene, x, y)
    {
        super(scene, x, y);
        
        this.setTexture('fox');
        //scene.add.existing(this);
        
        this.displayHeight=100;
        this.displayWidth=100;
        //this.setPosition(x, y);
    }

 

}
