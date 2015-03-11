game.spendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	

		me.audio.playTrack("TillIt'sGone");

		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
	
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font('Arial', 26, 'black');
				
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), 'Awesomenauts', 400, 130);
				this.font.draw(renderer.getContext(), 'Press F1-F4 TO BUY, F5 TO SKIP', this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), 'CURRENT EXP:' + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
				this.font.draw(renderer.getContext(), 'F1: INCREASE GOLD CURRENT LEVEL' + game.data.exp1.toString() + "COST: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
				this.font.draw(renderer.getContext(), 'F2: POWER UPS' , this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), 'F3: INCREASE DAMAGE' , this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), 'F4: INCREASE HEALTH' , this.pos.x, this.pos.y + 250);
			},

		
		})));


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.audio.stopTrack();
	}
});
