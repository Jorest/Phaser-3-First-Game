class StatusBar extends Phaser.Group 
{
    constructor()
    {
        super(game);
        this.bar=this.create(0,0,"esta");
    }
    setPerecent(percent){
        percent=percent/100;
        this.bar.width=300*percent;
    }
}