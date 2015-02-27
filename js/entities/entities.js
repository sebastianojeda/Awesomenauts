game.PlayerEntity = me.Entity.extend({
	// init function is creating my character and holding 
	//all of his properties
	init: function(x, y, settings){
		this.setSuper();
		this.setPlayerTimer();
		this.setAttributes();
		this.type = 'PlayerEntity';	
		this.setFlags();
		this.addAnimation();	  		

	  	me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
	  	
	  	this.renderable.setCurrentAnimation("idle");
	},

		setSuper: function() {
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
		},

		setPlayerTimer: function() {
			this.now = new Date().getTime();
	  		this.lastHit = this.now;
	  		this.lastAttack = new Date().getTime(); //haven't used this yet
		},
		setAttributes: function() {
			this.health = game.data.playerHealth;
             // this.body.setVelocity allows us to set were 
			//our player standes
	  		this.body.setVelocity(game.data.playerMoveSpeed, 20);
	  		this.attack = game.data.playerAttack;
		},
		setFlags: function(){
			//keeps track 
	  		this.facing = "right";	  		
	  		this.dead = false;
	  		this.attacking = false;
		},
		addAnimation: function(){
			this.renderable.addAnimation("idle", [78]);
	  		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 
	  			123, 124, 125], 80);
	  		//this is my attack animation
	  		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		},

		// update function works with my PlayerEntity above
		// update function constently updates my PlayerEntity
	update: function(delta){
		this.now = new Date().getTime();
		this.dead = checkingIfDead();
		this.checkKeyPresses();
		this.setAnimation();
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);
		//this._super updates my characters animation
		this._super(me.Entity, "update", [delta]);
		return true;
		},
		checkingIfDead: function(){

			if(this.health <=0){
				return = true;
			}
			return = false;
		},
		checkKeyPresses: function(){
			if(me.input.isKeyPressed("right")){
				this.moveRight();

			//this else is statement is creating my left key movement
			}else if(me.input.isKeyPressed("left")){
				this.moveLeft();
			}else{
				this.body.vel.x = 0;
		}

			if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
				this.jump();
		}
		 this.attacking = me.input.isKeyPressed("attack");

		},
		moveRight: function(){
			//sets the position of my X by adding the volocity above in 
			//setVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
		},
		moveLeft: function(){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.flipX(false);
		},
		jump: function(){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		},
		setAnimation: function(){
				//this is my if statement for my attack animation
		if(this.attacking){
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

		},
			//allows my player to lose health
		loseHealth: function(damage){
			this.health = this.health - damage;		
		},

		//collideHandler is responsable for make my player 
		//collide with the bases
	collideHandler: function(response){
		if(response.b.type==="EnemyBase"){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

				
		    if(ydif<-40 && xdif< 70 && xdif>-35){
				this.body.falling = false;
				// this.body.vel.y = -1;
			}
			else if(xdif>-35 && this.facing=== "right" && (xdif<0) && ydif>-50){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}else if(xdif<70 && this.facing=== "left" && (xdif>0)){
				this.body.vel.x = 0;
				// this.pos.x = this.pos.x +1;	
			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
				     &&(Math.abs(ydif) <=40) && 
				    ( ( (xdif>0) && this.facing==='left') || ( (xdif<0) && this.facing==='right'))
				     ){
				
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
		}else if(response.b.type==='EnemyCreep'){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			if (xdif>0){
				// this.pos.x = this.pos.x + 1;
				if(this.facing==='left'){
					this.body.vel.x = 0;
				}
			}else{
				if(this.faceing==='right'){
					this.body.vel.x = 0;
				}
				// this.pos.x = this.pos.x -1;
			}

			//This if statement is created to make the
			//enemy creep lose health
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >=game.data.playerAttackTimer){
				this.lastHit = this.now;
					//if creeps health is less than our attack, execute if statement
				if(response.b.health <= game.data.playerAttack){
					//adds one gold for player
					game.data.gold += 1;
					
				}

				response.b.losehealth(game.data.playerAttack);
			}
		}
	}		
});