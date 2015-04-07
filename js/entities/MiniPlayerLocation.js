//this function is going to allow me to track my player
game.MiniPlayerLocation = me.Entity.extend({
		init:function(x, y, settings){
			this.settings = settings;
			this.r = 5;
			//this.diameter is going to be a little circle 
			//on my map which moves when my plyer starts to move
			this.diameter = (this.r+2)*2;
			this.anchorPoint = new me.Vector2d(0, 0);
			this.loc = x, y;
			this.settings.width = this.diameter;	
			this.settings.height = this.diameter;
			this.settings.spritewidth = this.diameter;
			this.settings = this.diameter;
			this.floating = true;
			//this.image basically creates my minimap
			this.image = me.video.createCanvas(this.settings.width, this.settings.height);
			var ctx = me.video.renderer.getContext2d(this.image);
			//ctx.fillStyle just adds in color
			ctx.fillStyle = "rgba(0, 192, 32, 0.75)";
			ctx.strokeStyle = 'blue';
			ctx.lineWidth = 2;

			//ctx.arc adds in math to this canvas
			ctx.arc(this.r + 2, this.r +2, this.r, 0, Math.PI*2);
			ctx.fill();
			ctx.stroke();

			var my = this;
			this._super(me.Entity, 'init', [x, y, {
				image: 14,
				width: 14,
				height: 14,
				spritewidth: 14,
				spriteheight: 14,
				getShape: function(){
					return(new me.Rect(0, 0, 14, 14)).toPolygon();
			}
			}]);

    },

    draw: function(render){
    	this._super(me.Entity, 'draw', [render]);
    	this.floating =true;
    	renderer.drawImage(
    		this.image, 
    		0,0, this.width, this.height,
    		this.pos.x, this.pos.y, this.width, this.height

    		);

    },
    
	update: function(){
		this.pos.x = (10 + (game.data.player.pos.x *0.062));
		this.pos.y = (10 + (game.data.player.pos.y *  0.50));
		return true;
	}	
});