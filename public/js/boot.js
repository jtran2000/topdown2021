/**
 * Created by Julius on 6/4/2015.
 */
var bootState = {
	preload: function () {
		//Load as
		game.time.advancedTiming = true;
		game.add.text(100, 100,'Loading...');
		game.load.audio('pistol','assets/audio/pistol.mp3');
		game.load.audio('zombiespawn1','assets/audio/zombie-14.wav');
		game.load.audio('zombiespawn2','assets/audio/zombie-15.wav');
		game.load.audio('zombiespawn3','assets/audio/zombie-16.wav');
		game.load.audio('zombiespawn4','assets/audio/zombie-17.wav');
		game.load.audio('zombiespawn5','assets/audio/zombie-18.wav');
		game.load.audio('zombiespawn6','assets/audio/zombie-19.wav');
		game.load.audio('zombiespawn7','assets/audio/zombie-20.wav');
		game.load.audio('zombie1','assets/audio/zombie-22.wav');
		game.load.audio('zombie2','assets/audio/zombie-23.wav');
		game.load.audio('vomit1','assets/audio/zombie-8.wav');
		game.load.audio('vomit2','assets/audio/zombie-10.wav');
		game.load.audio('vomit3','assets/audio/zombie-12.wav');
		game.load.audio('dogattack','assets/audio/zombie-24.wav');
		game.load.audio('crow','assets/audio/vulture-1.wav');
		game.load.audio('shotgun','assets/audio/Winchester_1.mp3');
		game.load.audio('machinegun','assets/audio/M60_1.mp3');
		game.load.audio('rifle','assets/audio/DSR-1_1.mp3');
		game.load.audio('minigun','assets/audio/Gatling_1.mp3');
		game.load.audio('machinegunturret','assets/audio/RPK_1.mp3');
		game.load.audio('rpg','assets/audio/rpgfire.mp3');
		game.load.audio('moo','assets/audio/moo.mp3');
		game.load.audio('helicopter','assets/audio/helicopter.mp3');
		game.load.audio('explosion','assets/audio/explosion.mp3');
		//game.load.audio('flamethrower','assets/audio/flamethrower.mp3');
		game.load.audio('flamethrowerstart','assets/audio/flamethrowerstart.mp3');
		game.load.audio('flamethrowerend','assets/audio/flamethrowerend.mp3');
		game.load.audio('pickup','assets/audio/pickup.mp3');
		game.load.audio('fireballfire','assets/audio/fireballfire.mp3');
		game.load.audio('fireballhit','assets/audio/fireballhit.mp3');
		game.load.audio('fireballhit','assets/audio/fireballhit.mp3');
		game.load.audio('burning','assets/audio/burning.mp3');
		game.load.audio('dogspawn','assets/audio/dogspawn.mp3');
		game.load.audio('bullethit','assets/audio/bullethit.mp3');
		game.load.audio('iceballhit','assets/audio/iceballhit.mp3');
		game.load.audio('iceballfire','assets/audio/iceballfire.mp3');
		game.load.audio('lightningfire','assets/audio/lightningfire.mp3');
		game.load.audio('kidshoot','assets/audio/XM1014_1.mp3');
		game.load.audio('telestart','assets/audio/telestart.mp3');
		game.load.audio('teleend','assets/audio/teleend.mp3');
		game.load.audio('tank','assets/audio/tank.wav');
		
		game.load.image('store','assets/sprites/store.png');
		game.load.atlasJSONArray('soldier','assets/sprites/soldier.png','assets/sprites/soldier.json');
		game.load.atlasJSONArray('turrets','assets/sprites/turrets.png','assets/sprites/turrets.json');
		game.load.atlasJSONArray('powerups','assets/sprites/powerups.png','assets/sprites/powerups.json');
		game.load.atlasJSONArray('extrapowerups','assets/sprites/extrapowerups.png','assets/sprites/extrapowerups.json');
		game.load.atlasJSONArray('partners','assets/sprites/partners.png','assets/sprites/partners.json');

		game.load.atlasJSONArray('zombie','assets/sprites/enemies/zombie.png','assets/sprites/enemies/zombie.json');
		game.load.atlasJSONArray('dog','assets/sprites/enemies/dog.png','assets/sprites/enemies/dog.json');
		game.load.atlasJSONArray('fatso','assets/sprites/enemies/fatso.png','assets/sprites/enemies/fatso.json');
		game.load.atlasJSONArray('vomit','assets/sprites/enemies/vomit.png','assets/sprites/enemies/vomit.json');
		game.load.atlasJSONArray('moose','assets/sprites/enemies/moose.png','assets/sprites/enemies/moose.json');
		game.load.atlasJSONArray('crow','assets/sprites/enemies/crow.png','assets/sprites/enemies/crow.json');
		game.load.atlasJSONArray('boss','assets/sprites/enemies/boss.png','assets/sprites/enemies/boss.json');
		game.load.atlasJSONArray('kid','assets/sprites/enemies/kid.png','assets/sprites/enemies/kid.json');
		game.load.atlasJSONArray('pyro','assets/sprites/enemies/pyro.png','assets/sprites/enemies/pyro.json');
		game.load.atlasJSONArray('witch','assets/sprites/enemies/witch.png','assets/sprites/enemies/witch.json');
		game.load.atlasJSONArray('splatter','assets/sprites/enemies/splatter.png','assets/sprites/enemies/splatter.json');
		game.load.atlasJSONArray('smoke','assets/sprites/enemies/smoke.png','assets/sprites/enemies/smoke.json');
		game.load.atlasJSONArray('frozen','assets/sprites/enemies/frozen.png','assets/sprites/enemies/frozen.json');
		game.load.atlasJSONArray('fires','assets/sprites/enemies/fires.png','assets/sprites/enemies/fires.json');

		game.load.atlasJSONArray('fireballs','assets/sprites/fireballs2.png','assets/sprites/fireballs2.json');

		game.load.atlasJSONArray('flameend','assets/sprites/flameend.png','assets/sprites/flameend.json');
		game.load.atlasJSONArray('lavabubble','assets/sprites/lavabubble.png','assets/sprites/lavabubble.json');

		game.load.atlasJSONArray('torch','assets/sprites/torch.png','assets/sprites/torch.json');
		game.load.atlasJSONArray('torchflame','assets/sprites/torchflame.png','assets/sprites/torchflame.json');
		game.load.atlasJSONArray('flame','assets/sprites/flame.png','assets/sprites/flame.json');
		game.load.atlasJSONArray('flamestart','assets/sprites/flamestart.png','assets/sprites/flamestart.json');
		game.load.atlasJSONArray('flamemid','assets/sprites/flamemid.png','assets/sprites/flamemid.json');
		game.load.atlasJSONArray('flameend','assets/sprites/flameend.png','assets/sprites/flameend.json');
		game.load.atlasJSONArray('explosion','assets/sprites/explosion.png','assets/sprites/explosion.json');

		game.load.atlasJSONArray('lightning','assets/sprites/lightning.png','assets/sprites/lightning.json');
		game.load.atlasJSONArray('lightning','assets/sprites/lightning.png','assets/sprites/lightning.json');
		game.load.atlasJSONArray('muzzleflash','assets/sprites/muzzleflash.png','assets/sprites/muzzleflash.json');
		
		game.load.image('tiles','assets/sprites/tileset2.png');
		game.load.tilemap('tilemap','assets/sprites/topdownmap4.json',null, Phaser.Tilemap.TILED_JSON);
		
		game.load.bitmapFont('Skranji','assets/fonts/Skranji-Bold-40.png','assets/fonts/Skranji-Bold-40.fnt');
	},
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);//Set up Physics
		scale = game.scale;// Set up scaling
		scale.pageAlignHorizontally = true;
		scale.pageAlignVertically = true;
		scale.minWidth = game.width/4;
		scale.maxWidth = game.width*4;
		scale.minHeight = game.width/4;
		scale.maxHeight = game.width*4;
		scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		scale.setShowAll();
		scale.refresh();
		scale.pageAlignHorizontally = true;
		scale.pageAlignVertically = true;
		keyboard = game.input.keyboard;
		EZGUI.renderer = game.renderer;// Set up UI Library
		pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin); // Set up pathfinder plugn

		controls = Lockr.get('controls');
		if (controls == null) controls = defaultcontrols;

		statistics.highscore = Lockr.get('highscore');
		if (statistics.highscore == null) statistics.highscore = 0;

		statistics.totalscore = Lockr.get('totalscore');
		if (statistics.totalscore == null) statistics.totalscore = 0;

		statistics.highestround = Lockr.get('highestround');
		if (statistics.highestround == null) statistics.highestround = 0;

		statistics.totalrounds = Lockr.get('totalrounds');
		if (statistics.totalrounds == null) statistics.totalrounds = 0;

		statistics.totalpowerupspickedup = Lockr.get('totalpowerupspickedup');
		if (statistics.totalpowerupspickedup == null) statistics.totalpowerupspickedup = 0;

		statistics.gamesplayed = Lockr.get('gamesplayed');
		if (statistics.gamesplayed == null) statistics.gamesplayed = 0;

		statistics.deaths = Lockr.get('deaths');
		if (statistics.deaths == null) statistics.deaths = 0;

		statistics.zombiesKilled = Lockr.get('zombiesKilled');
		if (statistics.zombiesKilled == null) statistics.zombiesKilled = 0;

		statistics.fatsosKilled = Lockr.get('fatsosKilled');
		if (statistics.fatsosKilled == null) statistics.fatsosKilled = 0;

		statistics.vomitsKilled = Lockr.get('vomitsKilled');
		if (statistics.vomitsKilled == null) statistics.vomitsKilled = 0;

		statistics.dogsKilled = Lockr.get('dogsKilled');
		if (statistics.dogsKilled == null) statistics.dogsKilled = 0;

		statistics.crowsKilled = Lockr.get('crowsKilled');
		if (statistics.crowsKilled == null) statistics.crowsKilled = 0;

		statistics.mooseKilled = Lockr.get('mooseKilled');
		if (statistics.mooseKilled == null) statistics.mooseKilled = 0;

		statistics.doctorsKilled = Lockr.get('doctorsKilled');
		if (statistics.doctorsKilled == null) statistics.doctorsKilled = 0;


		playerName = Lockr.get('playerName');
		//if (playerName == null) playerName = '[Your Name Here]';

		game.state.start('menu')

	}
}
