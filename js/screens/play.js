game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
		me.levelDirector.loadLevel("test");

		this.resetPlayer(0, 420);

		var GametimerManager = me.pool.pull("GametimerManager", 0, 0, {});
		me.game.world.addChild(GametimerManager, 0);


		var HeroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		me.game.world.addChild(HeroDeathManager, 0);

		var ExpManager = me.pool.pull("ExpManager", 0, 0, {});
		me.game.world.addChild(ExpManager, 0);

		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.UP, "jump");
		me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

		me.audio.playTrack("TillIt'sGone");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		me.audio.stopTrack();
	},

	resetPlayer: function(x, y){
		// var player = me.pool.pull 
		// //pulls the player from the register pool in
		// //game.js
	    game.data.player = me.pool.pull("player", x, y, {});
		// //game.world addes my player to the game world
		me.game.world.addChild(game.data.player, 5);

	}

});