class lifeBar extends Phaser.GameObjects.Image {
  constructor (scene, x, y,w,h)
    {
        super(scene, x, y,'life');
        this.displayHeight=h;
        this.displayWidth=w;
        this.fullx=this.x;
        this.fullwidth=this.displayWidth;
 

    }
 
    setLife(percent){
      
      if(percent>=0){
        this.x= this.fullx- (100-percent)* this.fullwidth/100 /2; //set the position of the life bar so it wont shirk to the center
        this.displayWidth=(percent*this.fullwidth)/100; 
      }
    }



}
