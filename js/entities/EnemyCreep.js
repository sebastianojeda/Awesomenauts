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
		this.health = game.data.enemyCreepHealth;
		this.alwaysUpdate = true;
		//this.attacking lets us know that our enemy is 
		//attack
		this.attacking = false;
		//keeps track of creeps last attack
		this.lastAttacking = new Date().getTime();
		//keeps track of creeps last hit.
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");

	},

	losehealth: function(damage){
		this.health = this.health - damage;

	},

	update: function(delta){

		if(this.health <=0){
			me.game.world.removeChild(this);
		}

		this.now = new Date().getTime();

		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		//this._super updates my characters animation
		this._super(me.Entity, "update", [delta]);

		return true;
	},

	collideHandler: function(response){
		//these two if statments are for my creep to be able to 
		//attack my player entity		
		if(response.b.type==='PlayerBase'){
			
			this.attacking= true;
			//this.lastAttacking = this.now;
			this.body.vel.x = 0;
			//keeps moving the creep to the right
			// this.pos.x = this.pos.x + 1;
			if((this.now-this.lastHit >= 1000)){
				//updates the lasthit timer
				this.lastHit = this.now;
				//makes the player base call the losehealth function
				//to lose 1
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}else if(response.b.type==='PlayerEntity'){	
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking= true;
			//this.lastAttacking = this.now;
			
			if(xdif>0){
				// this.pos.x = this.pos.x + 1;
				this.body.vel.x = 0;
			}

			//keeps moving the creep to the right
			// this.pos.x = this.pos.x + 1;

			if((this.now-this.lastHit >= 1000) && xdif>0){
				//updates the lasthit timer
				this.lastHit = this.now;
				//makes the player base call the losehealth function
				//to lose 1
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}

	}


});

