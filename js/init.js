function createSound() {

	pistolsound = game.add.audio('pistol'); // Creation Code
	rpgsound = game.add.audio('rpg');
	shotgunsound = game.add.audio('shotgun');
	machinegunsound = game.add.audio('machinegun');
	riflesound = game.add.audio('rifle');
	minigunsound = game.add.audio('minigun');
	mgturretsound  = game.add.audio('machinegunturret');
	helicoptersound = game.add.audio('helicopter');
	explosionsound = game.add.audio('explosion');
	flamethrowerstartsound = game.add.audio('flamethrowerstart');
	flamethrowerendsound = game.add.audio('flamethrowerend');
	fireballfiresound = game.add.audio('fireballfire');
	fireballhitsound = game.add.audio('fireballhit');
	burningsound = game.add.audio('burning');
	pickupsound = game.add.audio('pickup');
	iceballfiresound = game.add.audio('iceballfire');
	iceballhitsound = game.add.audio('iceballhit');
	lightningfiresound = game.add.audio('lightningfire');
	kidshootsound = game.add.audio('kidshoot');
	telestartsound = game.add.audio('telestart');
	teleendsound = game.add.audio('teleend');
	tanksound = game.add.audio('tank');
	
	moosound = game.add.audio('moo');
	zombieattack1 = game.add.audio('zombie1');
	zombieattack2 = game.add.audio('zombie2');
	zombiespawn1 = game.add.audio('zombiespawn1');
	zombiespawn2 = game.add.audio('zombiespawn2');
	zombiespawn3 = game.add.audio('zombiespawn3');
	zombiespawn4 = game.add.audio('zombiespawn4');
	zombiespawn5 = game.add.audio('zombiespawn5');
	zombiespawn6 = game.add.audio('zombiespawn6');
	zombiespawn7 = game.add.audio('zombiespawn7');
	vomit1 = game.add.audio('vomit1');
	vomit2 = game.add.audio('vomit2');
	vomit3 = game.add.audio('vomit3');
	dogspawnsound = game.add.audio('dogspawn');
	dogattacksound = game.add.audio('dogattack');
	crowsound = game.add.audio('crow');
	bullethitsound = game.add.audio('bullethit');
	spsdArr = [zombiespawn1,zombiespawn2,zombiespawn3,zombiespawn4,zombiespawn5,zombiespawn6,zombiespawn7];
	
}

function createPlayer () {
	//game.add.image(0,0,'greenscreen');
	
	player = game.add.sprite(20,20,null);
	//player.notColliding = 0;
	player.legs = game.add.sprite(0,0,'soldier',"soldier_legs_0004.png");

	//player.legs.animations.add('forward',["soldier_legs_0003.png","soldier_legs_0002.png","soldier_legs_0001.png","soldier_legs_0004.png"],10,null,false);
	player.legs.animations.add('forward',["soldier_legs_0001.png","soldier_legs_0002.png","soldier_legs_0003.png","soldier_legs_0004.png"],10,null,false);
	player.addChild(player.legs);
	player.torso = game.add.sprite(0,0,'soldier',"soldier_torso_1h.png");
	player.addChild(player.torso);
	player.weapon = game.add.sprite(-20,-15,'soldier',"1h_pistol.png");
	player.addChild(player.weapon);
	player.legs.pivot.x = 30;
	player.legs.pivot.y = 30;
	player.torso.pivot.x = 30;
	player.torso.pivot.y = 30;
	player.weapon.pivot.x = 30;
	player.weapon.pivot.y = 30;
	player.lastDamageTaken = 0;
	
	player.muzzleflash1 = game.add.sprite(0,0,'muzzleflash',null);
	player.muzzleflash1.anchor.setTo(0.5,0.5);
	player.muzzleflash1.animations.add('flash',[0,1,2,3,5,6],60);
	
	player.pistol = Object.assign({},pistol);
	player.dualpistol = Object.assign({},dualpistol);
	player.smg = Object.assign({},smg);
	player.dualsmg = Object.assign({},dualsmg);
	player.shotgun = Object.assign({},shotgun);
	player.machinegun = Object.assign({},machinegun);
	player.rifle = Object.assign({},rifle);
	player.rocketlauncher = Object.assign({},rocketlauncher);
	player.fireballgun = Object.assign({},fireballgun);
	player.iceballgun = Object.assign({},iceballgun);
	player.lightninggun = Object.assign({},lightninggun);
	player.minigun = Object.assign({},minigun);
	player.flamethrower = Object.assign({},flamethrower);

	
	player.pistoltype = player.pistol;
	//player.blendMode = Phaser.blendModes.;
	//game.math.wrapAngle(player.rotation,true);

	player.flame = game.add.sprite(0,0,'flame',28); // Flame sprite for flamethrower
	player.flame.anchor.setTo(0,0.51);
	
	
	player.blood1 = game.add.sprite(0,0,'partners','blank');
	player.blood1.anchor.setTo(0.5,0.5);
	//player.blood1.scale.setTo(0.5,0.5);
	player.blood1.animations.add('spurt',[0,1,2,3,4,5,26],15);
	
	player.blood2 = game.add.sprite(0,0,'partners','blank');
	player.blood2.anchor.setTo(0.5,0.5);
	//player.blood2.scale.setTo(0.5,0.5);
	player.blood2.animations.add('spurt',[6,7,8,9,10,11,26],15);
	
	player.lr = 1;
	
	player.lightning = game.add.sprite(0,0,'lightning',"bolt_strike_0001.png");
	player.lightning.anchor.setTo(0.445,0.93);
	
	//player.lightning.blendMode = Phaser.blendModes.SCREEN;
	player.lightning.alpha = 0;
	player.lightning.scaleTweenX = game.add.tween(player.lightning.scale).to({x:1},700,Phaser.Easing.Cubic.In);
	player.lightning.scaleTweenY = game.add.tween(player.lightning.scale).to({y:1},700,Phaser.Easing.Cubic.In);
	player.lightning.scaleTweenX2 = game.add.tween(player.lightning.scale).to({x:1},200,Phaser.Easing.Quartic.In);
	player.lightning.scaleTweenY2 = game.add.tween(player.lightning.scale).to({y:1},200,Phaser.Easing.Quartic.In);
	player.lightning.alphaTween = game.add.tween(player.lightning).to({alpha:1},1000,Phaser.Easing.Linear.None);
	player.lightning.animations.add('fire',[1,1,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,20],60);
	player.lightning.alphaTween.onComplete.add(function (stuff) {
		player.lightning.frameName = "bolt_strike_0002.png";
		player.lightning.scale.x = 0.1;
		player.lightning.scale.y = 0.1;
		player.lightning.scaleTweenX2.start();
		player.lightning.scaleTweenY2.start();
	},this);
	player.lightning.scaleTweenY2.onComplete.add(function (stuff) {
		player.lightning.animations.play('fire')
	},this);
	
	var flamestart = player.flame.animations.add('start',[0,1,2,3,4,5,6,7],20);
	flamestart.onComplete.add(function () {
		if (player.flameOn) {
			player.flame.animations.play('mid')
		}
		else  {
			player.flame.animations.play('end')
		}
	});
	var flamemid = player.flame.animations.add('mid',[8,9,10,11],20);
	flamemid.onComplete.add(function () {
		if (player.flameOn) {
			player.flame.animations.play('mid')
		}
		else  {
			player.flame.animations.play('end')
		}
	});

	var flameend = player.flame.animations.add('end',[12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],20);
	flameend.onComplete.add(function () {
		player.flame.alpha = 0;
	});

	player.circle = new Phaser.Circle(player.x,player.y,52); //Helps with gun
	player.beamCircle = new Phaser.Circle(player.x,player.y,200);
	player.beamCircle2 = new Phaser.Circle(player.x,player.y,1000);
	player.beamCircle3 = new Phaser.Circle(player.x,player.y,1200);

	player.speed = 200; //More setup
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.body.setSize(42,42,-21,-21);
	//player.body.drag.setTo(500,500);
	player.body.mass = 10; //How well can the player push zombies
	//player.immovable = true;
	player.currentWeapon = player.pistol;
	player.reloaded = true;
	game.camera.follow(player);

	marker = game.add.sprite(player.x,player.y,'soldier',"tracer.png");
	console.log(player.torso.world.y);
	//player.body.immovable = true;

	player.body.tilePadding.setTo(0,0);

	player.maxHealth = 100;
	player.maxHealPoint = player.maxHealth;
	player.health = player.maxHealth;

	player.events.onKilled.add(playerDeath);

	player.turret = null;

	if (debug) {
		keyboard.addKey(73).onDown.add(function () {//key i
			console.log(enemies.countLiving());
			enemies.forEachAlive(function (thisenemy) {thisenemy.kill()}); // debug
			//round.killedThisRound = round.totalPoints;
			roundEnd();
		});
	}



	timer.loop(40,regenHealth);

	player.cash = 1000000000;
	player.score = 0;
	player.lastScoreSave = 0;
 	player.rotorRotation = game.add.tween(player.torso).to({rotation:2*Math.PI},500,"Linear",false,0,-1);

}

function createGroups () {
	//walls = game.add.group();
	//walls.enableBody = true;
	enemies = game.add.group();
	partners = game.add.group();
	partners.enableBody = true;
	partners.collideWorldBounds = true;
	enemies.enableBody = true;
	enemies.collideWorldBounds = true;
	splatter = game.add.group();
	torches = game.add.group();
	torches.enableBody = true;
	turrets = game.add.group();
	turrets.enableBody = true;
}

function createShop () {
	shopsprite = game.add.sprite(1040,0,'store');
	game.physics.arcade.enable(shopsprite);
	shopsprite.body.setSize(180,76,0,0);
}

function createEmitter() {
	zombieemitter = game.add.emitter(0,0,200);
	zombieemitter.gravity = 0;
	zombieemitter.particleDrag.x = 50;
	zombieemitter.particleDrag.y = 50;
	zombieemitter.angularDrag = 60;
	zombieemitter.setXSpeed(-100,100);
	zombieemitter.setXSpeed(-100,100);
	//zombieemitter.parArray = [8,9,10];
	zombieemitter.makeParticles('zombie',[8,9,10]);
	zombieemitter.setScale(0.75,1.25,0.75,1.25);
	zombieemitter.k = 0;

	dogemitter = game.add.emitter(0,0,200);
	dogemitter.gravity = 0;
	dogemitter.particleDrag.x = 50;
	dogemitter.particleDrag.y = 50;
	dogemitter.angularDrag = 60;
	dogemitter.setXSpeed(-100,100);
	dogemitter.setXSpeed(-100,100);
	//dogemitter.parArray = [2,3,4];
	dogemitter.makeParticles('dog',[2,3,4]);
	dogemitter.setScale(0.75,1.25,0.75,1.25);
	dogemitter.k = 0;

	fatsoemitter = game.add.emitter(0,0,200);
	fatsoemitter.gravity = 0;
	fatsoemitter.particleDrag.x = 50;
	fatsoemitter.particleDrag.y = 50;
	fatsoemitter.angularDrag = 60;
	fatsoemitter.setXSpeed(-100,100);
	fatsoemitter.setXSpeed(-100,100);
	//fatsoemitter.parArray = [6,7,8];
	fatsoemitter.makeParticles('fatso',[6,7,8]);
	fatsoemitter.setScale(0.75,1.25,0.75,1.25);
	fatsoemitter.k = 0;

	vomitemitter = game.add.emitter(0,0,200);
	vomitemitter.gravity = 0;
	vomitemitter.particleDrag.x = 50;
	vomitemitter.particleDrag.y = 50;
	vomitemitter.angularDrag = 60;
	vomitemitter.setXSpeed(-100,100);
	vomitemitter.setXSpeed(-100,100);
	//vomitemitter.parArray = [17,18,19];
	vomitemitter.makeParticles('vomit',[17,18,19]);
	vomitemitter.setScale(0.75,1.25,0.75,1.25);
	vomitemitter.k = 0;

	mooseemitter = game.add.emitter(0,0,200);
	mooseemitter.gravity = 0;
	mooseemitter.particleDrag.x = 50;
	mooseemitter.particleDrag.y = 50;
	mooseemitter.angularDrag = 60;
	mooseemitter.setXSpeed(-100,100);
	mooseemitter.setXSpeed(-100,100);
	//mooseemitter.parArray = [0,1];
	mooseemitter.makeParticles('moose',[0,1]);
	mooseemitter.setScale(0.75,1.25,0.75,1.25);
	mooseemitter.k = 0;

	crowemitter = game.add.emitter(0,0,200);
	crowemitter.gravity = 0;
	crowemitter.particleDrag.x = 50;
	crowemitter.particleDrag.y = 50;
	crowemitter.angularDrag = 60;
	crowemitter.setXSpeed(-100,100);
	crowemitter.setXSpeed(-100,100);
	//crowemitter.parArray = [2,3];
	crowemitter.makeParticles('crow',[2,3]);
	crowemitter.setScale(0.75,1.25,0.75,1.25);
	crowemitter.k = 0;

	doctoremitter = game.add.emitter(0,0,200);
	doctoremitter.gravity = 0;
	doctoremitter.particleDrag.x = 50;
	doctoremitter.particleDrag.y = 50;
	doctoremitter.angularDrag = 60;
	doctoremitter.setXSpeed(-100,100);
	doctoremitter.setXSpeed(-100,100);
	//doctoremitter.parArray = [2,3,4];
	doctoremitter.makeParticles('boss',[2,3,4]);
	doctoremitter.setScale(0.75,1.25,0.75,1.25);
	doctoremitter.k = 0;
		
	kidemitter = game.add.emitter(0,0,200);
	kidemitter.gravity = 0;
	kidemitter.particleDrag.x = 50;
	kidemitter.particleDrag.y = 50;
	kidemitter.angularDrag = 60;
	kidemitter.setXSpeed(-100,100);
	kidemitter.setXSpeed(-100,100);
	//kidemitter.parArray = [2,3,4]
	kidemitter.makeParticles('kid',[2,3,4]);
	kidemitter.setScale(0.75,1.25,0.75,1.25);
	kidemitter.k = 0;
	
	pyroemitter = game.add.emitter(0,0,200);
	pyroemitter.gravity = 0;
	pyroemitter.particleDrag.x = 50;
	pyroemitter.particleDrag.y = 50;
	pyroemitter.angularDrag = 60;
	pyroemitter.setXSpeed(-100,100);
	pyroemitter.setXSpeed(-100,100);
	//pyroemitter.parArray = [2,3,4];
	pyroemitter.makeParticles('pyro',[2,3,4]);
	pyroemitter.setScale(0.75,1.25,0.75,1.25);
	pyroemitter.k = 0;
	
	witchemitter = game.add.emitter(0,0,200);
	witchemitter.gravity = 0;
	witchemitter.particleDrag.x = 50;
	witchemitter.particleDrag.y = 50;
	witchemitter.angularDrag = 60;
	witchemitter.setXSpeed(-100,100);
	witchemitter.setXSpeed(-100,100);
	//witchemitter.parArray = [2,3,4];
	witchemitter.makeParticles('witch',[2,3,4]);
	witchemitter.setScale(0.75,1.25,0.75,1.25);
	witchemitter.k = 0;
}

function createOtherGroups() {
	crows = game.add.group();
	crows.enableBody = true;
	
	powerups = game.add.group();
	powerups.enableBody = true;
	
	lavabubbles = game.add.group();
	lavabubbles.enableBody = true;
	bullets = game.add.group();
	bullets.enableBody = true;
	//bullets.enableBodyDebug = true;
	rockets = game.add.group();
	rockets.enableBody = true;
	vomitballs = game.add.group();
	vomitballs.enableBody = true;
	enemyBullets = game.add.group();
	enemyBullets.enableBody = true;
	fireballs = game.add.group();
	fireballs.enableBody = true;
	iceballs = game.add.group();
	iceballs.enableBody = true;
	smokes = game.add.group();
	
	torchflames = game.add.group();
	explosions = game.add.group();

}

 function createText () {
	overheatBar = game.add.graphics(750,30);
	overheatBar.fixedToCamera = true;
	//healthBar = game.add.graphics(1850,200);
	healthBar = game.add.graphics(res.width-50,res.height*0.5-260);
	healthBar.fixedToCamera = true;
	text = game.add.group();
	text.fixedToCamera = true;
	scoreText = game.add.bitmapText(10,5,'Skranji','Score: 0',24,text);
	cashText = game.add.bitmapText(270,5,'Skranji','Cash: 0',24,text);
	round.roundText = game.add.bitmapText(520,5,'Skranji','Round: 1',24,text);
	round.enemiesLeftText = game.add.bitmapText(720,5,'Skranji','Enemies Left: 20',24,text);
	ammoCounter = game.add.bitmapText(res.width - 240,res.height - 60,'Skranji',player.currentWeapon.magazineSize + '|' + player.currentWeapon.ammoReserveLeft,40,text);
	round.timeText = game.add.bitmapText(10,30,'Skranji',1,21,text);
	round.timeText.tint = 0xFF0000;
	var style = {font:'24px Arial',fill:'#ff0000'};

	/*scoreText = game.add.text(50,25,'Score: 0',style,text);
	cashText = game.add.text(300,25,'Cash: 0',style,text);
	round.roundText = game.add.text(500,25,'Round: 1',style,text);
	round.enemiesLeftText = game.add.text(675,25,'Enemies Left: 20',style,text);
	ammoCounter = game.add.text(1000,25, player.currentWeapon.magazineSize + '|' + player.currentWeapon.ammoReserveLeft,style,text);*/

	if (debug) {
		speedometer = game.add.bitmapText(600,100,'Skranji','speed',null,text);
		fpscounter = game.add.text(16, 16,'',style,text);
		anglecounter = game.add.bitmapText(16,32,'Skranji','speed',null,text);
	}

	countDownText = game.add.bitmapText(640,300,'Skranji','5',60,text);
	countDownText.tint = 0xFF0000;
	countDownText.visible = false;

	healthText = game.add.text(res.width - 18, res.height*0.5-60,'lol' ,null, text);
	healthText.angle = 90;
	updateHealthBar();
	

}

function resetGame() {// restarting the game
	ammoCounter = null;
	scoreText = null;
	//player.currentWeapon.ammoReserveLeft = player.currentWeapon.ammoReserve;
	timer.destroy();
	player = null;
	bullets = null;
	timer = null;
	nextFire = 0;
	/*enemies.forEachAlive(function (thisenemy) {
		thisenemy.events.onKilled.removeAll();
		thisenemy.kill()
	});*/

	enemies = null;
	nextSpawn = 1000;
	score = 0;
	round = {
		totalPoints: 20,
		usedPoints: 0,
		roundNumber: 1,
		killedThisRound: 0,
		healthBonus: 0,
		specialWeapon: false
	};

	EZGUI.components.upgradepistolButton.text = 'Upgrade Pistol - $2000';
	EZGUI.components.buyshotgunButton.text = 'Buy Shotgun - $4000';
	EZGUI.components.buyMGButton.text = 'Buy MG - $8000';
	EZGUI.components.buyrifleButton.text = 'Buy Rifle - $12000';
	EZGUI.components.buyrocketButton.text = 'Buy Rocket - $24000';
	EZGUI.components.buyMGTurretButton.text = 'MG Turret - Locked';
	EZGUI.components.buyFlameTurretButton.text = 'Flame Turret - Locked';
}

function createGUI () {
	keyboard.addKey(controls.pauseKey[0]).onDown.add(function () {
		if (paused) {
			pauseScreen.visible = false;
			pauseButton.visible = true;
			shopMenu.visible = false;
			settingsMenu.visible = false;
			pauseScreen.alpha = 0.8;
			resumeGame();
		}
		else {
			pauseScreen.visible = true;
			pauseButton.visible = false;
			shopMenu.visible = false;
			pauseGame();
		}

	});
	pauseButton = EZGUI.create(pausebutton, 'metalworks');
	EZGUI.components.pauseButton.on('click', function (event) {
		pauseScreen.visible = true;
		pauseButton.visible = false;
		pauseScreen.alpha = 0.8;
		shopMenu.visible = false;
		pauseGame();
	});
	EZGUI.components.resumeButton.on('click',function (event) {
		pauseScreen.visible = false;
		pauseButton.visible = true;
		resumeGame();
	});
	EZGUI.components.restartButton.on('click',function (event) {
		pauseScreen.visible = false;
		resetGame();
		game.state.start('play');
		pauseGame();
		resumeGame();

	});

	/*EZGUI.components.shopButton.on('click',function (event) {
		pauseScreen.visible = false;
		shopMenu.visible = true;
		shopMenu.alpha = 0.8;
	});*/

	EZGUI.components.settingsFromPauseButton.on('click',function (event) {
		pauseScreen.visible = false;
		settingsMenu.visible = true;
		settingsMenu.alpha = 0.8;
	});

	EZGUI.components.upgradepistolButton.on('click',function (event) {
		/*var refill = upgradePistol();
		if (refill) {
			EZGUI.components.upgradepistolButton.text = 'Refill Pistol Ammo';
		}*/
		upgradePistol();
	});

	EZGUI.components.buyrocketButton.on('click',function (event) {
		buyRocket();
	});
	EZGUI.components.buyshotgunButton.on('click',function (event) {
		buyShotgun();
	});
	EZGUI.components.buyMGButton.on('click',function (event) {
		buyMG();
	});
	EZGUI.components.buyrifleButton.on('click',function (event) {
		buyRifle();
	});
	EZGUI.components.buyfireballgunButton.on('click',function (event) {
		buyFireballGun();
	});
	EZGUI.components.buyiceballgunButton.on('click',function (event) {
		buyIceballGun();
	});
	EZGUI.components.buylightninggunButton.on('click',function (event) {
		buyLightningGun();
	});
	EZGUI.components.buyHealthButton.on('click',function (event) {
		buyHealth();
	});
/*	EZGUI.components.buyPartnerButton.on('click',function (event) {
		buyPartner();
	});*/
	EZGUI.components.buyMGTurretButton.on('click',function (event) {
		buyTurret(mgturret);
	});
	EZGUI.components.buyFlameTurretButton.on('click',function (event) {
		buyTurret(flameturret);
	});
	EZGUI.components.buyRocketTurretButton.on('click',function (event) {
		buyTurret(rocketturret);
	});
	EZGUI.components.buyIceTurretButton.on('click',function (event) {
		buyTurret(iceturret);
	});
	EZGUI.components.buyLightningTurretButton.on('click',function (event) {
		buyTurret(lightningturret);
	});


	/*EZGUI.components.exitbutton.on('click',function (event) {
		pauseScreen.visible = true;
		shopMenu.visible = false;
	});*/
	EZGUI.components.quitButton.on('click',function (event) {
		pauseScreen.visible = false;
		resetGame();
		game.state.start('boot');
		//mainMenu.visible = true;
	});
	EZGUI.components.restartButton2.on('click',function (event) {
		gameOverScreen.visible = false;
		resetGame();
		game.state.start('play');
		pauseGame();
		resumeGame();

	});
	EZGUI.components.quitButton2.on('click',function (event) {
		gameOverScreen.visible = false;
		resetGame();
		game.state.start('boot');
		//mainMenu.visible = true;
	});

}




function createTorches (torch) {
	torch.animations.add('glow',["Torch_a_0001.png","Torch_a_0002.png","Torch_a_0003.png","Torch_a_0004.png","Torch_a_0005.png"],15,true,false);
	torch.animations.play('glow');
	torch.body.setSize(16,16);
	torch.anchor.setTo(0.5,0.5);
	torch.x += 32;
	torch.y += 32;
	torch.body.immovable = true;
	torch.body.moves = false;
	torch.glow = true;
}


function startTheGame () {
	game.stage.backgroundColor = '#58bf60';
	map = game.add.tilemap('tilemap');
	map.addTilesetImage('tileset2','tiles');
	bottomlayer = map.createLayer('bottomlayer');
	bottomlayer.resizeWorld();
	lavalayer = map.createLayer('lavalayer');
	lavalayer.debug = debug;
	timer = game.time.create(false);
	timer.start();
		
	createSound();
	initWeapons();
	createEmitter();
	createShop();
	createGroups();
	createPlayer();
	createOtherGroups();
	createText();

	map.createFromTiles([72],null,'torch','lavalayer',torches);
	torches.forEachExists(createTorches,this);
	
	map.createFromObjects("bubble-layer",46,'lavabubble',0,true,false,lavabubbles);
	lavabubbles.forEachExists(createBubbles,this);
	
	const walkabletiles = [-1,0,18,19,20,30,31,32,33,34,35,36,37,38,39,40,41,42,43,72,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72]; //walkable tiles
	// const normaltiles = [0,30,31,32,33,34,35,36,37,38,39,40,41,42,43,72];
	pathfinder.setGrid(map.layers[1].data,walkabletiles,100);
	//pathfinder.setAcceptableTiles(walkabletiles);
	
	const lava = [44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71];
	const lavaCenter = [44,45];
	map.setTileIndexCallback(lavaCenter,(sprite) => {sprite.lavaContact++},this,lavalayer); //adds collision
	map.setTileIndexCallback(lava,lavaBurn,this,lavalayer); //adds collision
	for (i=0; i<lava.length;i++) {
			pathfinder.setTileCost(lava[i],1000) // make lava hard to walk on
	}
	
	const nearlava = [18,19,20];
	for (i=0; i<lava.length;i++) {
			pathfinder.setTileCost(nearlava[i],10) // make lava hard to walk on
	}
	
	map.setCollision([2,3,4,5,6,7,8,9,10,11,21,22,23,24,25,26,27,28,29],true,lavalayer);
	
	
	createGUI();
	//equipFireballGun();
	pauseGame();
	resumeGame();
	//spawnPartner();
	setRoundTimer();
	//equipIceballGun();
	//equipFlame();
	//cheat();
	//equipMinigun();
	//equipIceballGun();
	//player.minigun.duration = Infinity;
	//equipTank();
	//player.y = 500;
	//player.x = 500;
	
	timer.loop(100,cleanUp);
	//player.energy = true;
	
	//player.turret = rocketturret;
	//equipMG();
	//equipRifle();
	//player.cash = Infinity;
	//equipLightningGun();
	//player.turret = lightningturret;
}
