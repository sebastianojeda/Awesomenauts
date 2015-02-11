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
	  		//keeps track 
	  		this.facing = "right";
	  		this.now = new Date().getTime();
	  		this.lastHit = this.now;
	  		this.lastAttack = new Date().getTime(); //haven't used this yet
	  		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

	  		this.renderable.addAnimation("idle", [78]);
	  		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 
	  			123, 124, 125], 80);
	  		//this is my attack animation
	  		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
	  		this.renderable.setCurrentAnimation("idle");


	},
		// update function works with my PlayerEntity above
		// update function constently updates my PlayerEntity
	update: function(delta){
		this.now = new Date().getTime();
		if(me.input.isKeyPressed("right")){
			//sets the position of my X by adding the volocity above in 
			//setVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
			//this else is statement is creating my left key movement
		}else if(me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.flipX(false);
		}else{
			this.body.vel.x = 0;
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}

				//this is my if statement for my attack animation
		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets current animation to attack and then back to idle
				this.renderable.setCurrentAnimation("attack", "idle");
				//setAnimationFrame is used to start our attack animtion
				//from the beginning
				this.renderable.setAnimationFrame();
			}
		}
		    //these if statements are checking the animation of the character
		else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}

		}else if(!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle");
		}

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		//this._super updates my characters animation
		this._super(me.Entity, "update", [delta]);
		return true;
		},

		//collideHandler is responsable for make my player 
		//collide with the bases
	collideHandler: function(response){
		if(response.b.type==="EnemyBase"){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

				
		    if(ydif<-40 && xdif< 70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			else if(xdif>-35 && this.facing=== "right" && (xdif<0) && ydif>-50){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}else if(xdif<70 && this.facing=== "left" && (xdif>0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x +1;	
			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
				console.log("tower hit");
				this.lastHit = this.now;
				response.b.loseHealth();
			}
		}
	}		
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
				return (new me.Rect(0, 0, 100, 75)).toPolygon();
			}

		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "PlayerBase";

		this.renderable.addAnimation("idle", [0]);

		this.renderable.addAnimation("broken", [1]);

		this.renderable.setCurrentAnimation("idle");
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

		this.renderable.addAnimation("idle", [0]);

		this.renderable.addAnimation("broken", [1]);

		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	},

	loseHealth: function(){
		
		this.health--;

	}

});


game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: 'creep',
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}

		}]);
		this.health = 10;
		this.alwaysUpdate = true;

		this.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
		
	},

	update: function(){

	}
});