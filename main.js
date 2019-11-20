var config = {
    
    type: Phaser.AUTO,
    width: 800,
    height: 500,


    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Example]
};

let game=new Phaser.Game(config);