/** @type {import("../type/phaser")} */

class LoseScreen extends Phaser.Scene{
    constructor(){
        super({key:"Example"});
    }

    preload(){
        this.load.image('mario','assets/mario.jpg')
      
    }

    create(){
        this.image = this.add.image (500,300,'mario');
    }



    update(delta){
        if(this.key_A.isDown){
            this.image.x--;
        }

    }

}