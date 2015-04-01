/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		enemyBaseHealth: 1,
		playerBaseHealth: 1,
		enemyCreepHealth: 4,
		playerHealth: 10,
		enemyCreepAttack: 1,
		// orcBaseDamage: ,
		// orcBaseHealth: ,
		// orcBaseSpeed: ,
		// orcBaseDefense: ,
		playerAttack: 1,
		playerAttackTimer: 1000,
		creepAttackTimer: 1000,
		GametimerManager: "",
		HeroDeathManager: "",
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameManager: "",
		player: "",
		exp: 0,
		gold: 0,
		ability1: 0,
		ability2: 0,
		ability3: 0,
		skill1: 0,
		skill2: 0,
		skill3: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win:"",
		pausePos:"",
		buyscreen:"",
		buytext:""

	},
		
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	me.save.add({exp: 0,exp1: 0,exp2: 0,exp3: 0,exp4: 0});

	me.state.SPENDEXP = 112;
	me.state.LOAD = 113;
	me.state.NEW = 114;

	console.log(game.data.exp);
	console.log(game.data.exp2);

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		/*registers the player*/
		me.pool.register("player", game.PlayerEntity, true);
		/*registers both the player base and enemy base*/
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		/*registers the creep*/
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		/*registers the GameManager*/
		me.pool.register("GametimerManager", game.GametimerManager);
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		me.pool.register("ExpManager", game.ExpManager);
		me.pool.register("spendGold", game.spendGold);

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.SPENDEXP, new game.spendExp());
		me.state.set(me.state.LOAD, new game.LoadProfile());
		me.state.set(me.state.NEW, new game.NewProfile());

		// Start the game.
		me.state.change(me.state.MENU);
	}
};
