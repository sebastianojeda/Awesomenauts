game.FireArrow = me.Entity.extend({
	init:function(x, y, settings, facing){
		this._super(me.Entity, 'init', [x, y, {
			image: 'arrow',
			width: 24,
			height: 24,
			spritewidth: "24",
			spriteheight: "24",
			getShape: function(){
				return (new me.Rect(0, 0, 24, 24)).toPolygon();
			}

		}]);
		
		this.alwaysUpdate = true;	
		this.body.setVelocity(9, 0);
		this.attack = game.data.ability3*5;
		this.type = "arrow";
		this.facing = facing;

		

	},

	update: function(delta){
		if(this.facing === "left"){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}else{
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
	
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);
		//this._super updates my characters animation
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	collideHandler: function(response){
		//these two if statments are for my creep to be able to 
		//attack my player entity		
		if(response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep'){			
			response.b.loseHealth(this.attack);	
			me.game.world.removeChild(this);		
		}
	}

});