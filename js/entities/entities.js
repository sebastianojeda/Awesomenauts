game.PlayerEntity = me.Entity.extend({
	// init function is creating my character and holding 
	//all of his properties
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y,{
			image: "player",
			width: 64,
			height: 64,
			spritewidth:"64",
			spriteheight:"64",
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
             // this.body.setVelocity allows us to set were 
			//our player standes
	  		this.body.setVelocity(5, 20);

	  		this.renderable.addAnimation('idle', [78]);
	  		this.renderable.addAnimation('walk',[117, 118, 119, 120, 121, 122, 
	  			123, 124, 125], 80);
	  		this.renderable.setCurrentAnimation('idle');


	},
		// update function works with my PlayerEntity above
		// update function constently updates my PlayerEntity
	update: function(delta){
		if(me.input.isKeyPressed("left")){
			//sets the position of my X by adding the volocity above in 
			//setVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			
		}
		else{
			this.body.vel.x = 0;
		}

		 //these if statements are checking the animation of the character
		if(this.body.vel.x)
		if(!this.renderable.isCurrentAnimation('walk')){
			this.renderable.setCurrentAnimation("walk");
		}



		this.body.update(delta);
		//this._super updates my characters animation
		this._super(me.Entity, "update", [delta]);
		return true;
	}

// 	update: function(deltatime){
//         if(me.input.isKeyPressed("right")){
//          this.renderable.flipX(false);
//          this.vel.x += this.accel.x * me.timer.tick;
//  }
//         else if(me.input.isKeyPressed("left")){
//             this.renderable.flipX(true);
//             this.vel.x -= this.accel.x * me.timer.tick;
//  }
        
        
//          if(me.input.isKeyPressed("jump")){
//              this.jumping = true;
//            this.mutipleJump = (this.vel.y === 0)?1:this.mutipleJump;
// 	 if (this.mutipleJump<=2) {
// 				// easy 'math' for double jump
// 	   this.vel.y -= (this.maxVel.y * this.mutipleJump++) * me.timer.tick;
            
//   }   
//   }
// }

});