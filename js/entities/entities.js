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

	  		this.renderable.addAnimation("idle", [78]);
	  		this.renderable.addAnimation("walk",[117, 118, 119, 120, 121, 122, 
	  			123, 124, 125], 80);
	  		//this is my attack animation
	  		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
	  		this.renderable.setCurrentAnimation("walk");


	},
		// update function works with my PlayerEntity above
		// update function constently updates my PlayerEntity
	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my X by adding the volocity above in 
			//setVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
			//this else is statement is creating my left key movement
		}// else if (me.input.isKeyPressed("left")){
		// 	this.body.vel.x -=this.body.accel.x * me.timer.tick;
		// 	this.flipX(false);
		// }else{
			this.body.vel.x = 0;

			    	 //these if statements are checking the animation of the character
 		if(this.body.vel.x !== 0){
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
			if(!this.renderable.isCurrentAnimation("walk")){

				this.renderable.setCurrentAnimation("walk");
			}
		}else{
			console.log("idle");
			this.renderable.setCurrentAnimation("idle");
 		}
	}else{
		this.renderable.setCurrentAnimation("idle");
	}

		//this if statement is creating my jump key
		// if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
		// 	this.jumping = true;
		// 	this.body.vel.y -= this.accel.y * me.timer.tick;
		// }
		 
		 	if(me.input.isKeyPressed("attack")){ 

		if(!this.renderable.isCurrentAnimation("attack")){
					//Sets the current animation ATTACK to IDLE
				    this.renderable.setCurrentAnimation("attack");
				    //Makes it that the next time we start sequence we begin
				    //from 	the first animation
				    this.renderable.setAnimationFrame();

				}
	        }
		}

		this.body.update(delta);
		//this._super updates my characters animation
		this._super(me.Entity, "update", [delta]);
		return true;
});

//this is a Base Tower entity
game.PlayerBaseEntity = me.Entity.extend	({
	//init: function is creating my 
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: 'tower',
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}

		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "PlayerBase";
	},

	update:function(delta){
		if(this.health<=0){
			this.broken = true;
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}
});

//this is the enemy Base
game.EnemyBaseEntity = me.Entity.extend	({
	//init: function is creating my 
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: 'tower',
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}

		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "EnemyBase";
	},

	update:function(delta){
		if(this.health<=0){
			this.broken = true;
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	}
});