/**
 * Created by Julius on 6/4/2015.
 */
//Changes:
// Turrets added
// Fire on zombies added
// DOT added
// Vomit AI changed
// Missile AI changed
// Moose added
// Flamethrower changed significantly
// Minigun rebalanced
// Crows added
// Bosses added



function cleanChunk (c) {
	let i = 0;
	const arrLen = this.chunks[c].tiles[0].length;
	while (i < arrLen){
		if (this.chunks[c].tiles[2][i] !== 0){
			//the top most layer has tiles, everything under it is dead
			this.chunks[c].tiles[1][i] = 0;
			this.chunks[c].tiles[0][i] = 0
		}else if (this.chunks[c].tiles[1][i] !== 0){
			this.chunks[c].tiles[0][i] = 0
		}
		i++;
	}
}

function touchShop () {
	if (game.physics.arcade.overlap(player,shopsprite) && player.currentWeapon !== helicopter && player.currentWeapon !== tank) {
		shopMenu.visible = true;
		shopMenu.alpha = 0.8;
		return true;
		//player.kill();
	}
	else {
		shopMenu.visible = false;
		return false;
	}
}

function tintPlayer(tint) {
	if (tint) {
		player.torso.tint =	0xFF0000;
		player.weapon.tint = 0xFF0000;
		player.legs.tint = 0xFF0000;
	}
	else if (!tint) {
		player.torso.tint = 16777215;
		player.weapon.tint = 16777215;
		player.legs.tint = 16777215;
	}

}

function setPosition (sprite) {
	const x = game.rnd.integerInRange(0, game.world.width);
	const y = game.rnd.integerInRange(0, game.world.height);
	const tile = map.getTile(x, y, lavalayer);
	if (tile!= null && tile.index !== 46) {
		setPosition(sprite);
	}
	else {
		sprite.x = x;
		sprite.y = y;
	}
}


function playerDeath () { // when player dies
	updateHealthBar();
	healthBar.kill();
	healthText.kill();
	player.flameOn = false;
	turrets.forEachAlive(function (turret) {
		turret.animations.play('explode',15,false,true);
	},this);
	gameOverScreen.alpha = 0;
	timer.add(3000,function () {
		gameOverScreen.visible = true;
		game.add.tween(gameOverScreen).to( {alpha:0.8}, 500, Phaser.Easing.Exponential.In, true);
		game.add.tween(gameOverScreen.scale).from( {x:0,y:0}, 500, Phaser.Easing.Exponential.In, true);
	});
	text.visible = false;
	pauseButton.visible = false;
	youDied = game.add.bitmapText(0,-200,'Skranji','YOU DIED',32);
	youDied.visible = false;
	for(i=0;i<8;i++) {
		youDied.visible = true;
		const tweenthis = youDied.getChildAt(i);
		const tween = game.add.tween(tweenthis).to({y: res.height*0.5}, 2000, Phaser.Easing.Bounce.Out, true);

	}
	youDied.position.x = (res.width - youDied.textWidth) * 0.5;
	youDied.fixedToCamera = true;
	youDied.tint = 0xFF0000;
	game.camera.unfollow();
	timer.loop(2000,setPosition,this,player);
	game.camera.follow(spawnZombie(player.x,player.y,true));
	if (player.score>statistics.highscore) {
		statistics.highscore = player.score;
		Lockr.set('highscore',player.score);
	}

	if (round.roundNumber > statistics.highestround) {
		statistics.highestround = round.roundNumber;
		Lockr.set('highestround',round.roundNumber);
	}

	if (player.score>statistics.highscore) {
		statistics.highscore = player.score;
		Lockr.set('highscore',player.score);
	}

	statistics.totalscore += (player.score - player.lastScoreSave);
	player.lastScoreSave = player.score;
	Lockr.set('totalscore',statistics.totalscore);

	statistics.deaths++;
	Lockr.set('deaths',statistics.deaths);


	statistics.totalrounds += round.roundNumber;
	Lockr.set('totalrounds',statistics.totalrounds);


	EZGUI.components.scoreWindow.text = 'Your Score: ' + player.score + '\nHigh Score: ' + statistics.highscore;

}

function equipPistol () {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_1h.png";
	player.weapon.frameName = "1h_pistol.png";
	player.currentWeapon = player.pistol;
	player.weapon.x = -20;
	player.weapon.y = -15;
	player.circle.radius = 52;
	resetAmmoCounter();
}

function equipDualPistol () {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_DW.png";
	player.weapon.frameName = "dw_pistol.png";
	player.previousWeapon = player.currentWeapon;
	player.currentWeapon = player.dualpistol;
	player.weapon.x = 0;
	player.weapon.y = -30;
	player.circle.radius = 44;
	resetAmmoCounter();
}

function equipSMG() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_1h.png";
	player.weapon.frameName = "1h_smg.png";
	player.currentWeapon = player.smg;
	player.weapon.x = -20;
	player.weapon.y = -15;
	player.circle.radius = 52;
	resetAmmoCounter();
}

function equipDualSMG() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_DW.png";
	player.weapon.frameName = "dw_smg.png";
	player.currentWeapon = player.dualsmg;
	player.weapon.x = 0;
	player.weapon.y = -30;
	player.circle.radius = 52;
	resetAmmoCounter();
	
}

function equipRocket() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_rocket.png";
	player.currentWeapon = player.rocketlauncher;
	player.weapon.x = 10;
	player.weapon.y = -15;
	player.circle.radius = 55;
	resetAmmoCounter();
}

function equipShotgun() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_shotgun.png";
	player.currentWeapon = player.shotgun;
	player.weapon.x = 8;
	player.weapon.y = -15;
	player.circle.radius = 20;
	resetAmmoCounter();
}

function equipMG() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_machinegun.png";
	player.currentWeapon = player.machinegun;
	player.weapon.x = 8;
	player.weapon.y = -15;
	player.circle.radius = 38;
	resetAmmoCounter();
}

function equipRifle() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_sniper.png";
	player.currentWeapon = player.rifle;
	player.weapon.x = 8;
	player.weapon.y = -15;
	player.circle.radius = 40;
	resetAmmoCounter();
}

function equipFlame() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_flamethrower.png";
	player.flamethrower.heat = 0;
	player.flamethrower.duration = flamethrower.duration;
	player.currentWeapon = player.flamethrower;
	player.weapon.x = 8;
	player.weapon.y = -15;
	player.circle.radius = 5;
	resetAmmoCounter();

}

function equipFireballGun() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_fireballgun.png";
	player.currentWeapon = player.fireballgun;
	player.weapon.x = 8;
	player.weapon.y = -20;
	player.circle.radius = 40;
	resetAmmoCounter();
}

function equipIceballGun() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_icegun.png";
	player.currentWeapon = player.iceballgun;
	player.weapon.x = 8;
	player.weapon.y = -20;
	player.circle.radius = 40;
	resetAmmoCounter();
}

function equipLightningGun() {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_boltgun.png";
	player.currentWeapon = player.lightninggun;
	player.weapon.x = 8;
	player.weapon.y = -25;
	player.circle.radius = 40;
	resetAmmoCounter();
}

function equipMinigun () {
	player.previousWeapon = player.currentWeapon;
	player.torso.frameName = "soldier_torso_2h.png";
	player.weapon.frameName = "2h_minigun.png";
	player.minigun.duration = minigun.duration;
	player.minigun.heat = 0;
	player.currentWeapon = player.minigun;
	player.weapon.x = 10;
	player.weapon.y = -15;
	player.circle.radius = 50;
	resetAmmoCounter();
}

function equipHelicopter() {
	player.previousWeapon = player.currentWeapon;
	player.legs.frameName = "helicoptor.png";
	player.legs.x = -90;
	player.legs.y = -90;
	player.currentWeapon = helicopter;
	player.speed = 600;
	player.circle.radius = 80;
	//player.health = Infinity;
	player.torso.frameName = "helicoptor_rotor.png";
	player.torso.anchor.setTo(0.34,0.355);
	/*player.torso.pivot.x = 100;
	player.torso.pivot.y = 100;*/
	player.torso.x = -4;
	player.torso.y = 1;
	player.weapon.visible = false;
	player.rotorRotation.isPaused = false;
	player.rotorRotation.start();
	player.health = 1000;
	player.maxHealPoint = 1000;
	updateHealthBar();
	helicoptersound.play(null,0,1,true);
	resetAmmoCounter();

	const drain = timer.loop(500, function () {
		playerDamage(5);
		if (player.health <= 100) {
			unequipVehicle();
			player.pistoltype.equipfunction();
			timer.remove(drain);

		}
	});
}

function equipTank () {
	player.currentWeapon = tank;
	player.circle.radius = 200;
	//player.speed = 500;
	player.legs.frameName = "tank2_base.png";
	player.torso.frameName = "tank2_turret.png";
	player.legs.anchor.setTo(0.5,0.5);
	player.legs.x = 30;
	player.legs.y = 30;
	player.torso.anchor.setTo(0.05,0.7);
	player.torso.x = -1;
	player.torso.y = 10;
	player.body.maxVelocity.x = 500;
	player.body.maxVelocity.y = 500;
	player.body.setSize(120,120,-60,-60);
	player.body.mass = 100;
	player.weapon.visible = false;
	resetAmmoCounter();
	player.health = 1000;
	player.maxHealPoint = 1000;
	player.energy = true;
	const drain = timer.loop(500, function () {
		playerDamage(5);
		if (player.health <= 100) {
			unequipVehicle();
			player.pistoltype.equipfunction();
			timer.remove(drain);

		}
	});
}

function unequipVehicle () {
	player.speed = 200;
	player.health = 100;
	player.maxHealth = 100;
	player.maxHealPoint = 100;
	player.energy = false;
	player.weapon.visible = true;
	updateHealthBar();
	player.torso.x = 0;
	player.torso.y = 0;
	player.torso.pivot.x = 30;
	player.torso.pivot.y = 30;
	player.torso.rotation=0;
	player.torso.anchor.setTo(0,0);
	player.legs.x = 0;
	player.legs.y = 0;
	player.legs.pivot.x = 30;
	player.legs.pivot.y = 30;
	player.torso.anchor.setTo(0,0);
	player.legs.anchor.setTo(0,0);
	player.weapon.pivot.x = 30;
	player.weapon.pivot.y = 30;
	player.body.setSize(42,42,-21,-21);
	helicoptersound.stop();
	player.rotorRotation.isPaused = true;
	player.body.acceleration.setTo(0,0);
	player.body.mass = 10;
}

function upgradePistol () {
	if (player.cash >= upgradePrice) {
		if (player.pistoltype === player.pistol) {
			player.pistoltype = player.dualpistol;
			equipDualPistol();
			player.cash -= upgradePrice;
			upgradePrice += 2000;
			EZGUI.components.upgradepistolButton.text = 'Upgrade Pistol - $' + upgradePrice;
			cashText.text = 'Cash: ' + player.cash;
			return false;
		}
		else if (player.pistoltype === player.dualpistol) {
			player.pistoltype = player.smg;
			equipSMG();
			player.cash -= upgradePrice;
			upgradePrice += 2000;
			EZGUI.components.upgradepistolButton.text = 'Upgrade Pistol - $' + upgradePrice;
			cashText.text = 'Cash: ' + player.cash;
			return false;
		}
		else if (player.pistoltype === player.smg) {
			player.pistoltype = player.dualsmg;
			equipDualSMG();
			player.cash -= upgradePrice;
			upgradePrice *=2;
			EZGUI.components.upgradepistolButton.text = 'Upgrade Pistol - $' + upgradePrice;
			cashText.text = 'Cash: ' + player.cash;
			return true;
		}
		else if (player.pistoltype === player.dualsmg && player.dualsmg.damage===dualsmg.damage) {
			player.dualsmg.damage *= 2;
			player.dualsmg.rpm *= 2;
			player.dualsmg.magazineSize *=4;
			player.dualsmg.ammoReserve *=4;
			player.dualsmg.ammoReserveLeft = player.dualsmg.ammoReserve;
			player.dualsmg.bulletsUsedInMagazine = 0;
			equipDualSMG();
			player.cash -= upgradePrice;
			EZGUI.components.upgradepistolButton.text = 'Already Purchased';
			cashText.text = 'Cash: ' + player.cash;
		}
	}
}

function buyShotgun () {
	if (!player.shotgun.purchased &&player.cash>= shotgun.price) {
		player.shotgun.purchased = true;
		player.cash-= shotgun.price;
		cashText.text = 'Cash: ' + player.cash;
		equipShotgun();
		shotgun.price*=4;
		EZGUI.components.buyshotgunButton.text = 'Upgrade Shotgun - $' + shotgun.price;
	}
	else if (player.shotgun.purchased &&player.cash>= shotgun.price && player.shotgun.damage===shotgun.damage) {
		player.cash -= shotgun.price;
		player.shotgun.damage *= 2;
		player.shotgun.magazineSize *= 2;
		player.shotgun.ammoReserve *= 2;
		player.shotgun.ammoReserveLeft = player.shotgun.ammoReserve;
		player.shotgun.bulletsUsedInMagazine = 0;
		equipShotgun();
		EZGUI.components.buyshotgunButton.text = 'Already Purchased';
	}
}

function buyMG () {
	if (!player.machinegun.purchased &&player.cash>= machinegun.price) {
		player.machinegun.purchased = true;
		player.cash-= machinegun.price;
		cashText.text = 'Cash: ' + player.cash;
		machinegun.price *= 4;
		EZGUI.components.buyMGButton.text = 'Upgrade MG - $' + machinegun.price;
		equipMG();
	}
	else if (player.machinegun.purchased &&player.cash>= shotgun.price && player.machinegun.damage===machinegun.damage) {
		player.cash -= machinegun.price;
		player.machinegun.damage *= 2;
		player.machinegun.rpm *= 2;
		player.machinegun.magazineSize *= 4;
		player.machinegun.ammoReserve *= 4;
		player.machinegun.ammoReserveLeft = player.machinegun.ammoReserve;
		player.machinegun.bulletsUsedInMagazine = 0;
		EZGUI.components.buyMGButton.text = 'Already Purchased';
	}
}

function buyRifle () {
	if (!player.rifle.purchased &&player.cash>= rifle.price) {
		player.rifle.purchased = true;
		player.cash-= rifle.price;
		rifle.price *= 4;
		cashText.text = 'Cash: ' + player.cash;
		EZGUI.components.buyrifleButton.text = 'Upgrade Rifle - $' + rifle.price;
		equipRifle();
	}
	else if (player.rifle.purchased &&player.cash>= rifle.price && player.rifle.damage===rifle.damage) {
		player.cash -= rifle.price;
		player.rifle.damage *= 2;
		player.rifle.rpm *= 2;
		player.rifle.magazineSize *= 4;
		player.rifle.ammoReserve *= 4;
		player.rifle.ammoReserveLeft = player.rifle.ammoReserve;
		player.rifle.bulletsUsedInMagazine = 0;
		equipRifle();
		EZGUI.components.buyrifleButton.text = 'Already Purchased';
	}	
}

function buyRocket () {
	if (!player.rocketlauncher.purchased &&player.cash>= rocketlauncher.price) {
		player.rocketlauncher.purchased = true;
		player.cash-= rocketlauncher.price;
		cashText.text = 'Cash: ' + player.cash;
		equipRocket();
		EZGUI.components.buyrocketButton.text = 'Already Purchased';
	}
}

function buyFireballGun () {
	if (!player.fireballgun.purchased &&player.cash>= fireballgun.price) {
		player.fireballgun.purchased = true;
		player.cash-= player.fireballgun.price;
		cashText.text = 'Cash: ' + player.cash;
		equipFireballGun();
		EZGUI.components.buyfireballgunButton.text = 'Already Purchased';
	}
}

function buyIceballGun () {
	if (!player.iceballgun.purchased &&player.cash>= iceballgun.price) {
		player.iceballgun.purchased = true;
		player.cash-= player.iceballgun.price;
		cashText.text = 'Cash: ' + player.cash;
		equipIceballGun();
		EZGUI.components.buyiceballgunButton.text = 'Already Purchased';
	}
}

function buyLightningGun () {
	if (!player.lightninggun.purchased &&player.cash>= lightninggun.price) {
		player.lightninggun.purchased = true;
		player.cash-= player.lightninggun.price;
		cashText.text = 'Cash: ' + player.cash;
		equipLightningGun();
		EZGUI.components.buylightninggunButton.text = 'Already Purchased';
	}
}

function buyHealth () {
	if (player.health < player.maxHealth && player.cash >= 300000) {
		player.maxHealPoint = player.maxHealth;
		player.health = player.maxHealth;
		updateHealthBar();
		player.cash -= 300000;
	}
}

function buyPartner () {
	if (partners.countLiving() < 1 && player.cash >= 1000000) {
		spawnPartner();
		player.cash -= 1000000;
	}
}

function buyTurret (turret) {
	if (player.turret == null &&player.cash>= turret.cost && round.roundNumber > 10 && !turret.exists) {
		EZGUI.components.buyMGTurretButton.text = 'Press T to drop Turret';
		EZGUI.components.buyFlameTurretButton.text = 'Press T to drop Turret';
		EZGUI.components.buyRocketTurretButton.text = 'Press T to drop Turret';
		EZGUI.components.buyIceTurretButton.text = 'Press T to drop Turret';
		EZGUI.components.buyLightningTurretButton.text = 'Press T to drop Turret';
		player.cash -= turret.cost;
		player.turret = turret;
	}
}



function spawnPartner () {
	const partner = partners.create(200, 200, null);
	partner.legs = game.add.sprite(0,0,'partners',"officer_legs_0004.png");
	partner.legs.animations.add('walk',["officer_legs_0001.png","officer_legs_0002.png","officer_legs_0003.png","officer_legs_0004.png"],10,null,false);
	partner.addChild(partner.legs);
	partner.torso = game.add.sprite(0,0,'partners',"officer_torso_DW.png");
	partner.addChild(partner.torso);
	partner.weapon = game.add.sprite(0,-30,"soldier","dw_smg.png");
	partner.addChild(partner.weapon);
	partner.legs.pivot.x = 30;
	partner.legs.pivot.y = 30;
	partner.torso.pivot.x = 30;
	partner.torso.pivot.y = 30;
	partner.weapon.pivot.x = 30;
	partner.weapon.pivot.y = 30;
	partner.anchor.set(0.5,0.5);
	partner.body.setSize(42,42);
	partner.speed = 200;
	partner.body.drag.setTo(42,42);
	partner.body.collideWorldBounds = true;
	partner.collideWorldBounds = true;
	partner.body.bounce.setTo(0.5,0.5);
	partner.specialMove = true;
	partner.circle = new Phaser.Circle(partner.x,partner.y,52); //Helps with gun
	partner.beamCircle = new Phaser.Circle(partner.x,partner.y,1200);
	partner.beamCircle2 = new Phaser.Circle(partner.x,partner.y,200);
	partner.body.immovable = true;
	partner.health = 100;
	
	partner.blood1 = game.add.sprite(0,0,'partners','blank');
	partner.blood1.anchor.setTo(0.5,0.5);
	partner.blood1.animations.add('spurt',[0,1,2,3,4,5,26],15);
	
	partner.blood2 = game.add.sprite(0,0,'partners','blank');
	partner.blood2.anchor.setTo(0.5,0.5);
	partner.blood2.animations.add('spurt',[6,7,8,9,10,11,26],15);
	
	//partner.rotation = 5.4977871438;
	//partner.targetX=300;
	//partner.targetY = 300;
	
	
	partner.pistol = Object.assign({},pistol);
	partner.dualpistol = Object.assign({},dualpistol);
	partner.smg = Object.assign({},smg);
	partner.dualsmg = Object.assign({},dualsmg);
	partner.shotgun = Object.assign({},shotgun);
	partner.machinegun = Object.assign({},machinegun);
	partner.rifle = Object.assign({},rifle);
	//partner.rocketlauncher = Object.assign({},rocketlauncher)
	

	partner.dualsmg.magazineSize *= 4;
	partner.dualsmg.ammoReserve *= 4;
	partner.dualsmg.ammoReserveLeft = partner.dualsmg.ammoReserve;
	

	partner.shotgun.magazineSize *= 2;
	partner.shotgun.ammoReserve *= 2;
	partner.shotgun.ammoReserveLeft = partner.shotgun.ammoReserve;
	

	partner.machinegun.magazineSize *= 4;
	partner.machinegun.ammoReserve *= 4;
	partner.machinegun.ammoReserveLeft = partner.machinegun.ammoReserve;
	
	partner.rifle.magazineSize *= 4;
	partner.rifle.ammoReserve *= 4;
	partner.rifle.ammoReserveLeft = partner.rifle.ammoReserve;
	
	partner.currentWeapon = partner.dualsmg;
	partner.nextFire = game.time.now;
	partner.reloaded = true;
	
	partner.mightSwap = true;
	partner.weaponChoices = [partnerEquipDualSMG,partnerEquipShotgun,partnerEquipMG,partnerEquipRifle];
	
	
	partner.events.onKilled.add(function () {
		spawnZombie(partner.x,partner.y,true);
		partner.blood1.kill();
		partner.blood1.destroy();
		partner.blood2.kill();
		partner.blood1.destroy();
		partner.destroy();
	})
}

function partnerEquipDualSMG (partner) {
	partner.currentWeapon = partner.dualsmg;
	partner.weapon.x = 0;
	partner.weapon.y = -30;
	partner.torso.frameName = "officer_torso_DW.png";
	partner.weapon.frameName = "dw_smg.png";
	partner.circle.radius = 52;
}

function partnerEquipShotgun(partner) {
	partner.torso.frameName = "officer_torso_2h.png";
	partner.weapon.frameName = "2h_shotgun.png";
	partner.currentWeapon = partner.shotgun;
	partner.weapon.x = 8;
	partner.weapon.y = -15;
	partner.circle.radius = 30;
}

function partnerEquipMG (partner) {
	partner.torso.frameName = "officer_torso_2h.png";
	partner.weapon.frameName = "2h_machinegun.png";
	partner.currentWeapon = partner.machinegun;
	partner.weapon.x = 8;
	partner.weapon.y = -15;
	partner.circle.radius = 38;
}

function partnerEquipRifle (partner) {
	partner.previousWeapon = partner.currentWeapon;
	partner.torso.frameName = "officer_torso_2h.png";
	partner.weapon.frameName = "2h_sniper.png";
	partner.currentWeapon = partner.rifle;
	partner.weapon.x = 8;
	partner.weapon.y = -15;
	partner.circle.radius = 40;
} 

/*function partnerEquipRocket (partner) {
	partner.previousWeapon = partner.currentWeapon;
	partner.torso.frameName = "officer_torso_2h.png";
	partner.weapon.frameName = "2h_rocket.png";
	partner.currentWeapon = partner.rocketlauncher;
	partner.weapon.x = 10;
	partner.weapon.y = -15;
	partner.circle.radius = 55;
}*/

function createBubbles (bubble) {
	const frameRate = game.rnd.integerInRange(10, 15);
	bubble.animations.add('burst',["lava_bubble_0001.png","lava_bubble_0001.png","lava_bubble_0001.png","lava_bubble_0002.png","lava_bubble_0003.png","lava_bubble_0004.png","lava_bubble_0005.png","lava_bubble_0006.png","lava_bubble_0007.png","lava_bubble_0008.png","lava_bubble_0009.png","lava_bubble_0010.png","lava_bubble_0011.png","lava_bubble_0012.png","lava_bubble_0013.png","lava_bubble_0014.png","lava_bubble_0001.png","lava_bubble_0001.png","lava_bubble_0001.png","lava_bubble_0001.png"],frameRate,true,false);
	bubble.anchor.setTo(0.5,0.5);
	bubble.x += 32;
	bubble.y += 32;

	timer.add(game.rnd.integerInRange(10,20000),
		function () {
			bubble.animations.play('burst')
		},this);
}



function createMGTurret (x,y) {
	const turret = turrets.create(x, y, 'turrets', "machinegun_still.png");
	mgturret.exists = true;
	turret.turretType = 'MG';
	turret.anchor.setTo(0.5,0.5);
	turret.body.immovable = true;
	turret.body.moves = false;
	turret.animations.add('shoot',["machinegun_fire_0001.png","machinegun_fire_0002.png","machinegun_still.png"],15);
	turret.animations.add('explode',["turret_explode_0001.png","turret_explode_0002.png","turret_explode_0003.png","turret_explode_0004.png","turret_explode_0005.png","turret_explode_0006.png"]);
	turret.events.onKilled.add(function () {
		mgturret.exists = false;
		EZGUI.components.buyMGTurretButton.text = 'Buy MG Turret - $' + mgturret.cost;
		turret.destroy();
	});
	turret.circle = new Phaser.Circle(x,y,40);
	turret.nextFire = 0;
	turret.duration = mgturret.duration;
}

function createRocketTurret (x,y) {
	const turret = turrets.create(x, y, 'turrets', "rocketlauncher0001.png");
	rocketturret.exists = true;
	turret.turretType = 'Rocket';
	turret.anchor.setTo(0.5,0.5);
	turret.body.immovable = true;
	turret.body.moves = false;
	turret.animations.add('explode',["turret_explode_0001.png","turret_explode_0002.png","turret_explode_0003.png","turret_explode_0004.png","turret_explode_0005.png","turret_explode_0006.png"]);
	turret.events.onKilled.add(function () {
		rocketturret.exists = false;
		EZGUI.components.buyRocketTurretButton.text = 'Buy Rocket Turret-$' + rocketturret.cost;
		turret.destroy();
	});
	turret.circle = new Phaser.Circle(x,y,40);
	turret.nextFire = 0;
	turret.duration = rocketturret.duration;

}

function createFlameTurret (x,y) {
	const turret = turrets.create(x, y, 'turrets', "turret_flame_0002.png");
	flameturret.exists = true;
	turret.turretType = 'Flame';
	turret.anchor.setTo(0.5,0.5);
	turret.body.immovable = true;
	turret.body.moves = false;
	turret.animations.add('explode',["turret_explode_0001.png","turret_explode_0002.png","turret_explode_0003.png","turret_explode_0004.png","turret_explode_0005.png","turret_explode_0006.png"]);
	turret.circle = new Phaser.Circle(x,y,40);
	turret.flame = game.add.sprite(0,0,'flame',28); // Flame sprite for flamethrower
	turret.flame.anchor.setTo(0,0.51);
	const flamestart = turret.flame.animations.add('start', [0, 1, 2, 3, 4, 5, 6, 7], 20);
	flamestart.onComplete.add(function () {
		if (turret.flameOn) {
			turret.flame.animations.play('mid')
		}
		else  {
			turret.flame.animations.play('end')
		}
	});
	const flamemid = turret.flame.animations.add('mid', [8, 9, 10, 11], 20);
	flamemid.onComplete.add(function () {
		if (turret.flameOn) {
			turret.flame.animations.play('mid')
		}
		else  {
			turret.flame.animations.play('end')
		}
	});

	const flameend = turret.flame.animations.add('end', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], 20);
	flameend.onComplete.add(function () {
		turret.flame.alpha = 0;
	});


	turret.nextFire = 0;
	turret.duration = flameturret.duration;
		/*turret.checkWorldBounds = true;
		 turret.outOfBoundsKill();*/
	turret.events.onKilled.add(function (stuff) {
		turret.flame.kill();
		turret.flame.destroy();
		flameturret.exists = false;
		turret.destroy();
		EZGUI.components.buyFlameTurretButton.text = 'Buy Flame Turret - $' + flameturret.cost;
	},this);

}

function createIceTurret (x,y) {
	const turret = turrets.create(x, y, 'turrets', "freeze_turret_still.png");
	iceturret.exists = true;
	turret.turretType = 'Ice';
	turret.anchor.setTo(0.5,0.5);
	turret.body.immovable = true;
	turret.body.moves = false;
	turret.animations.add('shoot',["freeze_turret_0001.png","freeze_turret_0002.png","freeze_turret_still.png"],15);
	turret.animations.add('explode',["turret_explode_0001.png","turret_explode_0002.png","turret_explode_0003.png","turret_explode_0004.png","turret_explode_0005.png","turret_explode_0006.png"]);
	turret.events.onKilled.add(function () {
		iceturret.exists = false;
		EZGUI.components.buyIceTurretButton.text = 'Buy Ice Turret-$' + iceturret.cost;
	});
	turret.circle = new Phaser.Circle(x,y,40);
	turret.nextFire = 0;
	turret.duration = iceturret.duration;
	/*turret.checkWorldBounds = true;
	turret.outOfBoundsKill();*/
}

function createLightningTurret (x,y) {
	const turret = turrets.create(x, y, 'turrets', "bolt0001.png");
	turret.turretType = 'Lightning';
	turret.anchor.setTo(0.5,0.5);
	turret.body.immovable = true;
	turret.body.moves = false;
	lightningturret.exists = true;
	turret.animations.add('explode',["turret_explode_0001.png","turret_explode_0002.png","turret_explode_0003.png","turret_explode_0004.png","turret_explode_0005.png","turret_explode_0006.png"]);
	turret.animations.add('crackle',["bolt0001.png","bolt0002.png","bolt0003.png"]);
	turret.animations.play('crackle',15,true);
	turret.lightning = game.add.sprite(0,0,'lightning',"bolt_strike_0001.png");
	turret.lightning.anchor.setTo(0.445,0.93);
	//player.lightning.blendMode = Phaser.blendModes.SCREEN;
	turret.lightning.alpha = 0;
	turret.lightning.scaleTweenX = game.add.tween(turret.lightning.scale).to({x:1},700,Phaser.Easing.Cubic.In);
	turret.lightning.scaleTweenY = game.add.tween(turret.lightning.scale).to({y:1},700,Phaser.Easing.Cubic.In);
	turret.lightning.scaleTweenX2 = game.add.tween(turret.lightning.scale).to({x:1},200,Phaser.Easing.Quartic.In);
	turret.lightning.scaleTweenY2 = game.add.tween(turret.lightning.scale).to({y:1},200,Phaser.Easing.Quartic.In);
	turret.lightning.alphaTween = game.add.tween(turret.lightning).to({alpha:1},1000,Phaser.Easing.Linear.None);
	turret.lightning.animations.add('fire',[1,1,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,20],60);
	turret.lightning.alphaTween.onComplete.add(function (stuff) {
		turret.lightning.frameName = "bolt_strike_0002.png";
		turret.lightning.scale.x = 0.1;
		turret.lightning.scale.y = 0.1;
		turret.lightning.scaleTweenX2.start();
		turret.lightning.scaleTweenY2.start();
	},this);
	turret.lightning.scaleTweenY2.onComplete.add(function (stuff) {
		turret.lightning.animations.play('fire')
	},this);
	turret.circle = new Phaser.Circle(x,y,50);
	turret.nextFire = 0;
	turret.duration = lightningturret.duration;
	
	turret.events.onKilled.add(function (stuff) {
		turret.lightning.kill();
		turret.lightning.destroy();
		lightningturret.exists = false;
		turret.destroy();
		EZGUI.components.buyLightningTurretButton.text = 'Buy Lightning Turret-$' + lightningturret.cost;
	},this);
}


function playerInput() {
	//if (!norotate) {player.rotation = game.physics.arcade.angleToPointer(player) + 1.8}
	if (player.currentWeapon!==tank) player.rotation = game.physics.arcade.angleToPointer(player) + player.currentWeapon.rotateOffset;
	else player.torso.rotation = game.physics.arcade.angleToPointer(player) - player.rotation + 1.57;

	
	
	player.circle.x = player.x;
	player.circle.y = player.y;
	player.beamCircle.x = player.x;
	player.beamCircle.y = player.y;
	player.beamCircle2.x = player.x;
	player.beamCircle2.y = player.y;
	player.beamCircle3.x = player.x;
	player.beamCircle3.y = player.y;
		
	mouseOverPause = false;
	if (game.input.activePointer.position.x>1170 && game.input.activePointer.position.y < 50) mouseOverPause = true;
	else if (game.math.distance(game.input.activePointer.worldX,game.input.activePointer.worldY,player.x,player.y)<60+player.circle.radius) mouseOverPause = true;
	//console.log(game.math.distance(game.input.activePointer.worldX,game.input.activePointer.worldY,player.x,player.y)<50)	;
	
	//player.body.velocity.y = 0;
	//player.body.velocity.x = 0;
	
	
	if (player.currentWeapon===tank) {
		
		if (keyboard.isDown(controls.upKey[0]) && keyboard.isDown(controls.leftKey[0]) || keyboard.isDown(38)  && keyboard.isDown(37)) {
			player.rotation -= 0.02;
			player.body.velocity.multiply(0.99, 0.99);
			game.physics.arcade.accelerationFromRotation(player.rotation-1.57,300,player.body.acceleration);
		}
		else if (keyboard.isDown(controls.upKey[0]) && keyboard.isDown(controls.rightKey[0]) || keyboard.isDown(38) && keyboard.isDown(39)) {
			player.rotation += 0.02;
			player.body.velocity.multiply(0.99, 0.99);
			game.physics.arcade.accelerationFromRotation(player.rotation-1.57,300,player.body.acceleration);

		}
		else if (keyboard.isDown(controls.downKey[0]) && keyboard.isDown(controls.leftKey[0]) || keyboard.isDown(40) && keyboard.isDown(37)) {
			player.rotation -= 0.02;
			player.body.velocity.multiply(0.99, 0.99);
			game.physics.arcade.accelerationFromRotation(player.rotation-1.57,-250,player.body.acceleration);	
		}
		else if (keyboard.isDown(controls.downKey[0]) && keyboard.isDown(controls.rightKey[0]) || keyboard.isDown(40) && keyboard.isDown(39)) {
			player.rotation += 0.02;
			player.body.velocity.multiply(0.99, 0.99);
			game.physics.arcade.accelerationFromRotation(player.rotation-1.57,-250,player.body.acceleration);

		}
		else if (keyboard.isDown(controls.upKey[0]) || keyboard.isDown(38)) {
			game.physics.arcade.accelerationFromRotation(player.rotation-1.57,500,player.body.acceleration);
			if (player.body.velocity.x>499 && game.math.difference(player.rotation,1.57)<0.1) player.body.velocity.setTo(500,0);
			else if (player.body.velocity.x<-499 && game.math.difference(player.rotation,-1.57)<0.1) player.body.velocity.setTo(-500,0);
			else if (player.body.velocity.y>499 && game.math.difference(Math.abs(player.rotation),3.14159)<0.1) player.body.velocity.setTo(0,500);
			else if (player.body.velocity.y<-499 && Math.abs(player.rotation)<0.1) player.body.velocity.setTo(0,-500);
			else if (game.math.difference(player.body.velocity.x,353.55339)<9 && game.math.difference(player.body.velocity.y,353.55339)<9) player.body.velocity.setTo(353.55339,353.55339);
			else if (game.math.difference(player.body.velocity.x,-353.55339)<9 && game.math.difference(player.body.velocity.y,353.55339)<9) player.body.velocity.setTo(-353.55339,353.55339);
			else if (game.math.difference(player.body.velocity.x,353.55339)<9 && game.math.difference(player.body.velocity.y,-353.55339)<9) player.body.velocity.setTo(353.55339,-353.55339);
			else if (game.math.difference(player.body.velocity.x,-353.55339)<9 && game.math.difference(player.body.velocity.y,-353.55339)<9) player.body.velocity.setTo(-353.55339,-353.55339);
			//tanksound.play();
		} 
		else if (keyboard.isDown(controls.downKey[0]) || keyboard.isDown(40)) {
			game.physics.arcade.accelerationFromRotation(player.rotation-1.57,-400,player.body.acceleration);
			//tanksound.play();
		}
		else if (keyboard.isDown(controls.leftKey[0]) || keyboard.isDown(37)) {
			player.rotation -= 0.05;
			player.body.acceleration.setTo(0,0);
			player.body.velocity.multiply(0.99, 0.99);
			if (Math.abs(player.body.velocity.x)<10)player.body.velocity.x = 0;
			if (Math.abs(player.body.velocity.y)<10) player.body.velocity.y = 0;
		}
		else if (keyboard.isDown(controls.rightKey[0]) || keyboard.isDown(39)) {
			player.rotation += 0.05;
			player.body.acceleration.setTo(0,0);
			player.body.velocity.multiply(0.99, 0.99);
			if (Math.abs(player.body.velocity.x)<10)player.body.velocity.x = 0;
			if (Math.abs(player.body.velocity.y)<10) player.body.velocity.y = 0;
			
		}
		else {
			player.body.acceleration.setTo(0,0);
			player.body.velocity.multiply(0.99, 0.99);
			if (Math.abs(player.body.velocity.x)<10)player.body.velocity.x = 0;
			if (Math.abs(player.body.velocity.y)<10) player.body.velocity.y = 0;
			//tanksound.pause();
		}
		
		player.body.velocity.setMagnitude(Math.min(500, player.body.velocity.getMagnitude()));
		


	}
	else if (keyboard.isDown(controls.upKey[0]) && keyboard.isDown(controls.leftKey[0]) || keyboard.isDown(38)  && keyboard.isDown(37)) {
		player.body.velocity.x = - player.speed * 0.707; 
		player.body.velocity.y = - player.speed * 0.707;
		walk();

	}
	else if (keyboard.isDown(controls.upKey[0]) && keyboard.isDown(controls.rightKey[0]) || keyboard.isDown(38) && keyboard.isDown(39)) {
		player.body.velocity.x = player.speed * 0.707;
		player.body.velocity.y = - player.speed * 0.707;
		walk();
	}
	else if (keyboard.isDown(controls.downKey[0]) && keyboard.isDown(controls.leftKey[0]) || keyboard.isDown(40) && keyboard.isDown(37)) {
		player.body.velocity.x = -player.speed * 0.707;
		player.body.velocity.y =  player.speed * 0.707;
		walk();
	}

	else if (keyboard.isDown(controls.downKey[0]) && keyboard.isDown(controls.rightKey[0]) || keyboard.isDown(40) && keyboard.isDown(39)) {
		player.body.velocity.x = player.speed * 0.707;
		player.body.velocity.y =  player.speed * 0.707;
		walk();
	}

	else if (keyboard.isDown(controls.upKey[0]) || keyboard.isDown(38)) {
		player.body.velocity.y = - player.speed;
		player.body.velocity.x = 0;
		walk();

	}

	else if (keyboard.isDown(controls.downKey[0]) || keyboard.isDown(40)) {
		player.body.velocity.y = player.speed;
		player.body.velocity.x = 0;
		walk();

	}

	else if (keyboard.isDown(controls.leftKey[0]) || keyboard.isDown(37)) {
		player.body.velocity.x = -player.speed;
		player.body.velocity.y = 0;
		walk();
	}

	else if (keyboard.isDown(controls.rightKey[0]) || keyboard.isDown(39)) {
		player.body.velocity.x = player.speed;
		player.body.velocity.y = 0;
		walk();
	}
	else {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
	}

	if (player.reloaded && !touchShop() && game.time.now > nextFire) {
		//console.log(keyboard.isDown(49));
		
		if (keyboard.isDown(49) || keyboard.isDown(96)) {
			if (player.currentWeapon === helicopter || player.currentWeapon === tank) unequipVehicle();
			player.pistoltype.equipfunction();
		}
		if (keyboard.isDown(50) && player.shotgun.purchased || keyboard.isDown(98) && player.shotgun.purchased) {
			if (player.currentWeapon === helicopter || player.currentWeapon === tank) unequipVehicle();
			equipShotgun();
		}
		if (keyboard.isDown(51) && player.machinegun.purchased || keyboard.isDown(99) && player.machinegun.purchased) {
			if (player.currentWeapon === helicopter || player.currentWeapon === tank) unequipVehicle();
			equipMG();
		}
		if (keyboard.isDown(52) && player.rifle.purchased || keyboard.isDown(100) && player.rifle.purchased) {
			if (player.currentWeapon === helicopter || player.currentWeapon === tank) unequipVehicle();
			equipRifle();
		}
		if (keyboard.isDown(53) && player.rocketlauncher.purchased || keyboard.isDown(101) && player.rocketlauncher.purchased) {
			if (player.currentWeapon === helicopter || player.currentWeapon === tank) unequipVehicle();
			equipRocket();
		}
		if (keyboard.isDown(54) && player.fireballgun.purchased || keyboard.isDown(102) && player.fireballgun.purchased) {
			if (player.currentWeapon === helicopter || player.currentWeapon === tank) unequipVehicle();
			equipFireballGun();
		}
		if (keyboard.isDown(55) && player.iceballgun.purchased || keyboard.isDown(103) && player.iceballgun.purchased) {
			if (player.currentWeapon === helicopter || player.currentWeapon === tank) unequipVehicle();
			equipIceballGun();
		}
		if (keyboard.isDown(56) && player.lightninggun.purchased || keyboard.isDown(104) && player.lightninggun.purchased) {
			if (player.currentWeapon === helicopter || player.currentWeapon === tank) unequipVehicle();
			equipLightningGun();
		}
		
		if (game.input.activePointer.isDown) {
			player.noRegen = true;
			timer.remove(timeUntilRegen);
			timeUntilRegen = timer.add(2000+(3*player.lastDamageTaken), function () {
					player.noRegen = false;
					player.lastDamageTaken = 0;
			});
			if (!mouseOverPause) {
				//console.log(Phaser.Circle.contains(player.circle,game.input.activePointer.positionDown.x,game.input.activePointer.position.y));
				player.currentWeapon.firefunction();
			}
		}
		else  {
			if (player.currentWeapon === player.flamethrower || player.currentWeapon === player.minigun) notFiring();
		}
		reload();	
	}


	if (keyboard.isDown(controls.dropTurretKey[0]) && player.turret != null && player.y > 100 && player.x > 50 && player.x < game.world.width - 50) {
		player.turret.dropfunction(player.x,player.y-50);
		//console.log('Turret Dropped')
		player.turret = null;
		if (!mgturret.exists) EZGUI.components.buyMGTurretButton.text = 'Buy MG Turret - $' + mgturret.cost;
		else EZGUI.components.buyMGTurretButton.text = "Already Purchased";
		if (!flameturret.exists) EZGUI.components.buyFlameTurretButton.text = 'Buy Flame Turret - $' + flameturret.cost;
		else EZGUI.components.buyFlameTurretButton.text = "Already Purchased";
		if (!rocketturret.exists) EZGUI.components.buyRocketTurretButton.text = 'Buy Rocket Turret-$' + rocketturret.cost;
		else EZGUI.components.buyRocketTurretButton.text = "Already Purchased";
		if (!iceturret.exists) EZGUI.components.buyIceTurretButton.text = 'Buy Ice Turret-$' + iceturret.cost;
		else EZGUI.components.buyIceTurretButton.text = "Already Purchased";
		if (!lightningturret.exists) EZGUI.components.buyLightningTurretButton.text = 'Buy Lightning Turret-$' + lightningturret.cost;
		else EZGUI.components.buyLightningTurretButton.text = "Already Purchased";
	}
	/*if (keyboard.isDown(49)) {
		upgradePistol();
	}*/
	if (game.time.now%100===0) player.lr *= -1;
	player.lightning.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-lightninggun.rotateOffset);
	player.lightning.rotation = player.rotation - (0.2*player.lr) + ((game.time.now % 100)*0.004*player.lr)
	
}

function walk (d) {
	player.noRegen = true;
	timer.remove(timeUntilRegen);
	timeUntilRegen = timer.add(2000+(3*player.lastDamageTaken), function () {
		player.noRegen = false;
		player.lastDamageTaken = 0;
	});
	
	if (!player.legs.animations.currentAnim.isPlaying && player.currentWeapon !== helicopter && player.currentWeapon !== tank) {
		//if (d=='forward' && Math.abs(player.angle)<90 || d=='forward' && Math.abs(player.angle)>90 ) {console.log('forward')}
		player.legs.animations.play('forward');
	}
	else if (player.currentWeapon===helicopter) {
		player.legs.frameName = "helicoptor.png";
		playerDamage(0.001);
	}
}
function resetAmmoCounter () {
	if (player.currentWeapon === player.flamethrower || player.currentWeapon === player.minigun) {
		//ammoCounter.text = player.currentWeapon.heat + '|' + player.currentWeapon.heatCapacity
		updateoverheatBar();
		ammoCounter.visible = false;
	}
	else
	{
		ammoCounter.visible = true;
		overheatBar.clear();
		const ammoinmag = player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine;
		if (player.currentWeapon === player.dualpistol  || player.currentWeapon === player.dualsmg) {

			ammoCounter.text = ammoinmag + '|' + ammoinmag + '|' + player.currentWeapon.ammoReserveLeft;
		}
		else {
			ammoCounter.text = ammoinmag + '|' + player.currentWeapon.ammoReserveLeft;
		}

	}

}
function firePistol () {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		const bullet = bullets.create(player.x - 20, player.y - 15, 'soldier', "tracer.png");
		bullet.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-2.21);
			bullet.rotation = player.rotation -0.1;
			spawnBullet(bullet);
		player.currentWeapon.bulletsUsedInMagazine++;
		resetAmmoCounter()
	}
}

function fireDual() {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		const bullet1 = bullets.create(player.x - 20, player.y - 15, 'soldier', "tracer.png");
		bullet1.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.8);
		bullet1.rotation = player.rotation;
		const bullet2 = bullets.create(player.x - 20, player.y - 15, 'soldier', "tracer.png");
		bullet2.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.38);
		bullet2.rotation = player.rotation;
		spawnBullet(bullet1);
		spawnBullet(bullet2);
		
		player.currentWeapon.bulletsUsedInMagazine++;
		resetAmmoCounter()
	}
}

function fireRocket() {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		const rocket = rockets.create(player.x, player.y, 'powerups', "shell_0001.png");
		rocket.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.4);
		rocket.rotation = player.rotation;
		rocket.body.setSize(16,16,0,0);
		rocket.anchor.set(0.5,0.5);
		game.physics.arcade.moveToPointer(rocket,800);
		rocket.lifespan = 2000;
		rocket.attackPower = rocketlauncher.damage + 10*round.healthBonus;
		player.currentWeapon.bulletsUsedInMagazine++;
		resetAmmoCounter();
		rocket.events.onKilled.add(rocketDeath,this);
		//rocket.wobble = 20;
		/*rocket.game.add.tween(rocket)
			.to(
			{ wobble: -20 },
			250, Phaser.Easing.Sinusoidal.InOut, true, 0,
			Number.POSITIVE_INFINITY, true
		);*/
		rpgsound.play();
	}
}

function fireShotgun () {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		shotgunsound.play();
		for (i=0;i<12*player.shotgun.damage;i++) {
			const pellet = bullets.create(player.x - 20, player.y - 15, 'soldier', "tracer.png");
			pellet.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.38);
			//pellet.rotation = player.rotation;
			pellet.body.setSize(16,16,0,0);
			pellet.anchor.set(0.5,0.5);
			pellet.rotation = game.physics.arcade.angleToPointer(pellet) + 1.5;
			game.physics.arcade.velocityFromRotation(game.physics.arcade.angleToPointer(pellet)+game.math.degToRad(i*0.66-4),game.rnd.integerInRange(shotgun.bulletVelocity*0.9,shotgun.bulletVelocity*1.1),pellet.body.velocity);
			pellet.lifespan = 900;
			pellet.attackPower = player.shotgun.damage;
			pellet.bulletType = 'pellet';
			if (pellet.attackPower>shotgun.damage) pellet.tint = rgbToHex(255,0,0);
		}
		player.currentWeapon.bulletsUsedInMagazine++;
		resetAmmoCounter()
	}
}

function fireMG () {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		machinegunsound.play();
		player.muzzleflash1.rotation = player.rotation;
		player.muzzleflash1.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.36);
		player.muzzleflash1.animations.play('flash');
		const bullet = bullets.create(player.x - 20, player.y - 15, 'soldier', "tracer.png");
		bullet.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.36);
		bullet.rotation = player.rotation;
		bullet.body.setSize(16,16,0,0);
		bullet.anchor.set(0.5,0.5);
		bullet.attackPower = player.currentWeapon.damage;
		game.physics.arcade.moveToPointer(bullet,machinegun.bulletVelocity);
		bullet.lifespan = 1200;
		player.currentWeapon.bulletsUsedInMagazine++;
		resetAmmoCounter();
		if (player.machinegun.damage>machinegun.damage) bullet.tint = rgbToHex(255,0,0);
	}
}

function fireFireballGun () {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		fireballfiresound.play();
		let fireball;
		if (fireballs.countDead()>0) {
			fireball = fireballs.getFirstDead();
			fireball.revive();
			fireball.animations.stop();
		}
		else {
			fireball = fireballs.create(player.x-20,player.y-15,'fireballs',"fireball_0001.png");
			fireball.animations.add('fly',[ "fireball_0001.png", "fireball_0002.png", "fireball_0003.png", "fireball_0004.png", "fireball_0005.png", "fireball_0006.png"],20,true);
			fireball.animations.add('explode',["fireball_hit_0001.png","fireball_hit_0002.png","fireball_hit_0003.png","fireball_hit_0004.png","fireball_hit_0005.png","fireball_hit_0006.png","fireball_hit_0007.png","fireball_hit_0008.png","fireball_hit_0009.png"],15);
			fireball.body.setSize(16,16,0,0);
			fireball.anchor.set(0.5,0.5);
		}
		
		fireball.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.4);
		fireball.rotation = player.rotation-1.5;
		fireball.attackPower = player.currentWeapon.damage;
		game.physics.arcade.moveToPointer(fireball,fireballgun.bulletVelocity);
		fireball.lifespan = 1200;
		player.currentWeapon.bulletsUsedInMagazine++;

		fireball.animations.play('fly');
		//fireball.events.onKilled.add(function (stuff) {fireball.destroy()},this)
		resetAmmoCounter()
	}
}

function fireIceballGun () {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		iceballfiresound.play();
		let iceball;
		if (iceballs.countDead()>0) {
			iceball = iceballs.getFirstDead();
			iceball.revive();
			iceball.animations.stop();
		}
		else {
			iceball = iceballs.create(player.x-20,player.y-15,'fireballs',"iceball_0001.png");
			iceball.body.setSize(64,64,0,0);
			iceball.anchor.set(0.5,0.5);
			iceball.animations.add('fly',[ "iceball_0001.png", "iceball_0002.png", "iceball_0003.png", "iceball_0004.png", "iceball_0005.png", "iceball_0006.png","iceball_0007.png","iceball_0008.png","iceball_0009.png","iceball_0010.png","iceball_0011.png","iceball_0012.png"]);
		}
		//iceball.lifespan = 1200;
		iceball.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.4);
		iceball.rotation = player.rotation-1.5;
		iceball.attackPower = player.currentWeapon.damage + round.healthBonus*2;
		game.physics.arcade.moveToPointer(iceball,iceballgun.bulletVelocity);
		iceball.lifespan = 1200;
		player.currentWeapon.bulletsUsedInMagazine++;
		iceball.animations.play('fly',10,false,true);
		//iceball.events.onKilled.add(function (stuff) {iceball.destroy()},this)
		resetAmmoCounter()
	}
}

function fireHelicopter () {

	nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
	machinegunsound.play();
	const bullet = bullets.create(player.x - 20, player.y - 15, 'soldier', "bullet.png");
	bullet.bulletType = 'helicopter';
	bullet.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.6);
	bullet.rotation = game.physics.arcade.angleToPointer(bullet)+game.math.degToRad(game.rnd.integerInRange(-10,10)) + 1.5;
	bullet.body.setSize(16,16,0,0);
	bullet.anchor.set(0.5,0.5);
	bullet.attackPower = player.currentWeapon.damage + round.healthBonus*2;
	//bullet.visible = false;
	//timer.add(2,function () {bullet.visible = true;});
	game.physics.arcade.velocityFromRotation(bullet.rotation-1.5,1500,bullet.body.velocity);
	bullet.lifespan = 1200;
	player.body.drag.x = 3200;
	player.body.drag.y = 3200;
	playerDamage(2);
	resetAmmoCounter()
}

function fireTank() {

		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		playerDamage(10);
	const rocket = rockets.create(player.x, player.y, 'soldier', "1.png");
	rocket.position = Phaser.Circle.circumferencePoint(player.circle,player.torso.rotation + player.rotation - 1.5);
		rocket.animations.add('fly',["1.png","2.png","3.png","4.png","3.png","2.png"]);
		rocket.rotation = player.torso.rotation + player.rotation;
		rocket.animations.play('fly',60,true);
		rocket.body.setSize(16,16,0,0);
		rocket.anchor.set(0.5,0.5);
		game.physics.arcade.moveToPointer(rocket,800);
		rocket.lifespan = 2000;
		resetAmmoCounter();
		rocket.attackPower = tank.damage + 10*round.healthBonus;
		rocket.events.onKilled.add(rocketDeath,this);
		//rocket.wobble = 20;
		/*rocket.game.add.tween(rocket)
			.to(
			{ wobble: -20 },
			250, Phaser.Easing.Sinusoidal.InOut, true, 0,
			Number.POSITIVE_INFINITY, true
	);*/
	rpgsound.play();

}


function fireRifle () {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		riflesound.play();
		player.muzzleflash1.rotation = player.rotation;
		player.muzzleflash1.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.36);
		player.muzzleflash1.animations.play('flash');
		const bullet = bullets.create(player.x - 20, player.y - 15, 'soldier', "tracer.png");
		bullet.bulletType = 'rifle';
		bullet.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.36);
		bullet.rotation = player.rotation;
		bullet.body.setSize(64,64,-16,-16);
		bullet.anchor.set(0.5,0.5);
		bullet.attackPower = player.currentWeapon.damage;
		game.physics.arcade.moveToPointer(bullet,rifle.bulletVelocity);
		bullet.lifespan = 1300;
		player.currentWeapon.bulletsUsedInMagazine++;
		if (bullet.attackPower>rifle.damage) bullet.tint = rgbToHex(255,0,0);
		resetAmmoCounter()
	}
}
//Add crow hit fireball and iceball functions

function fireLightningGun () {
	if (player.currentWeapon.magazineSize - player.currentWeapon.bulletsUsedInMagazine > 0) {
		nextFire = game.time.now + 60/player.currentWeapon.rpm * 1000;
		lightningfiresound.play();
		player.lightning.scale.setTo(0,0);
		player.lightning.alpha = 0;
		player.lightning.frameName = 'bolt_strike_0001.png';
		player.lightning.scaleTweenX.start();
		player.lightning.scaleTweenY.start();
		player.lightning.alphaTween.start();
		player.lightninggun.bulletsUsedInMagazine++;
		const strikes = [];
		for (i=0; i<20; i++) {
			strikes[i] = timer.add(1300+i*50,function () {
			enemies.forEachAlive(function (enemy) {
				let angleBetween = game.physics.arcade.angleBetween(player, enemy) - (player.rotation - lightninggun.rotateOffset);
				angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
				if (game.physics.arcade.distanceBetween(enemy,player)<512 && angleBetween<0.2 && enemy.state !== 'spawning' || game.physics.arcade.distanceBetween(enemy,player)<100 && angleBetween<0.6 && enemy.state !== 'spawning') {
					enemy.hit = true;
					let icemulti = 1;
					if (enemy.ice.alive && enemy.frozen>1) icemulti = 4;
					enemy.damage(player.lightninggun.damage*0.05*icemulti+round.healthBonus);
					player.score += player.lightninggun.damage*0.05;
					player.cash += player.lightninggun.damage*0.05;
			}},this);
			vomitballs.forEachAlive(function (vomitball) {
				let angleBetween = game.physics.arcade.angleBetween(player, vomitball) - (player.rotation - flamethrower.rotateOffset);
				angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true)) ;
				if (game.physics.arcade.distanceBetween(vomitball,player)<512 && angleBetween<0.6) {
					vomitball.kill();
				}
			},this);
			crows.forEachAlive(function (crow) {
				let angleBetween = game.physics.arcade.angleBetween(player, crow) - (player.rotation - flamethrower.rotateOffset);
				angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true)) ;
				if (game.physics.arcade.distanceBetween(crow,player)<512 && angleBetween<0.6) {
					crow.kill();
					player.cash += 5;
					player.score += 5;
					scoreText.text = 'Score: ' + player.score;
					cashText.text = 'Cash: ' + player.cash;
				}
			},this);
			timer.remove(strikes[i]);
			});
		}
		resetAmmoCounter()
	}	
}

function fireFlame () {
	player.flamethrower.duration -=  (player.flamethrower.heat * game.time.physicsElapsedMS) * 0.01;

	if (player.flamethrower.duration < 1) player.pistoltype.equipfunction();
	if (player.flamethrower.heatCapacity>player.flamethrower.heat) {
		flamethrowerstartsound.play(null,0,0.8,false,false);
		player.flameOn = true;
		player.flame.alpha = 1;
		player.flamethrower.heat += player.flamethrower.heatRate;
		if (player.flamethrower.heat>player.flamethrower.heatCapacity) player.flamethrower.heat = player.flamethrower.heatCapacity;
		player.flame.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.38);
		player.flame.rotation = player.rotation - 1.5;
		if (!player.flame.animations.getAnimation('start').isPlaying && !player.flame.animations.getAnimation('mid').isPlaying) {
			player.flame.animations.play('start');
		}
		else if (player.flame.animations.getAnimation('mid').isPlaying && game.time.now % 2 === 0) {
			enemies.forEachAlive(function (enemy) {
				let angleBetween = game.physics.arcade.angleBetween(player, enemy) - (player.rotation - flamethrower.rotateOffset);
				angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
				if (game.physics.arcade.distanceBetween(enemy,player)<512 && angleBetween<0.2 && enemy.state!=='spawning' || game.physics.arcade.distanceBetween(enemy,player)<180 && angleBetween<1 && enemy.state !== 'spawning') {
					//thisenemy.tint = 0xFF0000;
					enemy.hit = true;
					player.cash += 1;
					player.score += 1;
					enemy.damage(1);
					enemy.onfire = true;
					enemy.fireDegree = 0;
					scoreText.text = 'Score: ' + player.score;
					cashText.text = 'Cash: ' + player.cash;
				}
			},this);
			vomitballs.forEachAlive(function (vomitball) {
				let angleBetween = (game.physics.arcade.angleBetween(player, vomitball)) - ((player.rotation - flamethrower.rotateOffset));
				angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true)) ;
				if (game.physics.arcade.distanceBetween(vomitball,player)<512 && angleBetween<0.6) {
					vomitball.kill();
				}
			},this);
			crows.forEachAlive(function (crow) {
				let angleBetween = game.physics.arcade.angleBetween(player, crow) - (player.rotation - flamethrower.rotateOffset);
				angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true)) ;
				if (game.physics.arcade.distanceBetween(crow,player)<512 && angleBetween<0.6) {
					crow.kill();
					player.cash += 5;
					player.score += 5;
					scoreText.text = 'Score: ' + player.score;
					cashText.text = 'Cash: ' + player.cash;
				}
			},this);
		}
	}
	else {
		player.flameOn = false;
		flamethrowerstartsound.stop();
		//flamethrowerendsound.play();
	}
	resetAmmoCounter();
}

function fireMinigun () {
	player.minigun.duration -=  (player.minigun.heat * game.time.physicsElapsedMS) * 0.02;
	if (player.minigun.duration < 1) player.pistoltype.equipfunction();
		if (game.time.now > nextFire && player.currentWeapon.heatCapacity>player.currentWeapon.heat) {
			let hR = 0;
			player.muzzleflash1.rotation = player.rotation;
			player.muzzleflash1.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.35);
			player.muzzleflash1.animations.play('flash');
			player.minigun.heat += player.minigun.heatRate;
			if (player.minigun.heat>player.minigun.heatCapacity) player.minigun.heat = player.minigun.heatCapacity;
			if (player.minigun.heat>player.minigun.heatCapacity*0.25) hR = player.minigun.heat - (player.minigun.heatCapacity*0.25);
			const pelletCount = Math.floor(12 - hR / 50);
			nextFire = game.time.now + 60/(player.currentWeapon.rpm-hR*1.6);
			minigunsound.play();
		for (i=0;i<pelletCount;i++) {
			const pellet = bullets.create(player.x - 20, player.y - 15, 'soldier', "tracer.png");
			pellet.position = Phaser.Circle.circumferencePoint(player.circle,player.rotation-1.35);
			//pellet.rotation = player.rotation;
			pellet.body.setSize(16,16,0,0);
			pellet.anchor.set(0.5,0.5);
			pellet.rotation = game.physics.arcade.angleToPointer(pellet) + 1.5;
			game.physics.arcade.velocityFromRotation(game.physics.arcade.angleToPointer(pellet)+game.math.degToRad(i*0.33-2),game.rnd.integerInRange(1500,1600),pellet.body.velocity);
			pellet.lifespan = 1000;
			pellet.attackPower = 1+round.healthBonus;
			pellet.bulletType = 'pellet'
		}
	}
	resetAmmoCounter();
}


function notFiring () {
	player.flameOn = false;
	player.currentWeapon.duration -= game.time.physicsElapsedMS;
	flamethrowerstartsound.stop();
	//if (flamethrower.heat>200) flamethrower.duration -= game.time.physicsElapsedMS;
	if (player.currentWeapon.heat>0) {
		player.currentWeapon.heat -= player.currentWeapon.cooldown;
	}
	resetAmmoCounter();
}

function spawnBullet (bullet) {
	pistolsound.play(null,0.3);
	bullet.body.setSize(16,16,0,0);
	bullet.anchor.set(0.5,0.5);
	bullet.attackPower = player.currentWeapon.damage;
	if (player.currentWeapon.damage>dualsmg.damage) bullet.tint =  rgbToHex(255,0,0);
//	bullet.blendMode = Phaser.blendMode;
	game.physics.arcade.moveToPointer(bullet,player.currentWeapon.bulletVelocity);
	//game.physics.arcade.velocityFromRotation(bullet.rotation-1.5,1000,bullet.body.velocity);
	bullet.lifespan = 1000;
}
function reload () {
	if (player.currentWeapon.bulletsUsedInMagazine === player.currentWeapon.magazineSize && player.currentWeapon.ammoReserveLeft > 0 || keyboard.isDown(controls.reloadKey[0]) && player.currentWeapon.bulletsUsedInMagazine > 0 && player.currentWeapon.ammoReserveLeft > 0 && !player.energy) {
		player.reloaded = false;
		ammoCounter.text = 'Reloading...';
		let x;
		if (player.currentWeapon === player.dualpistol || player.currentWeapon === player.dualsmg) {
			x = 2;
		}
		else {
			x = 1;
		}
		if (player.currentWeapon.ammoReserveLeft >= player.currentWeapon.bulletsUsedInMagazine * x) {
			player.currentWeapon.ammoReserveLeft -= player.currentWeapon.bulletsUsedInMagazine * x;
			player.currentWeapon.bulletsUsedInMagazine = 0;
		}
		else {
			player.currentWeapon.bulletsUsedInMagazine  -= Math.floor(player.currentWeapon.ammoReserveLeft/x);
			if (player.currentWeapon.ammoReserveLeft % x === 1) {
				player.currentWeapon.ammoReserveLeft = 1
			}
			else {
				player.currentWeapon.ammoReserveLeft = 0;
			}
		}
		timer.add(player.currentWeapon.reloadTime, function () {
			player.reloaded = true;
			resetAmmoCounter()
		}, this)
	}
}

function damageOverTime (enemy) {
	enemy.firedAt = Math.floor(enemy.firedAt*0.8);
	enemy.hitbyIceball = false;
	enemy.firedAt -= 1;
	
	if (enemy.state === 'spawning' || enemy.enemyType === 'pyro') {
		enemy.onfire = false;
		enemy.frozen = 0;
		enemy.ice.kill();
	}
	if (enemy.onfire) {
		if (!enemy.fire2.alive) {
			//enemy.fire.revive();
			enemy.fire2.revive();
			burningsound.play(null,0,1,false,false);
		}
		enemy.frozen = 0;
		enemy.ice.kill();
		enemy.damage(Math.round(enemy.health*0.2)+1+round.healthBonus);
		//if (enemy.enemyType == 'doctor') enemy.damage(1);
		player.score++;
		player.cash++;
	}
	else if (enemy.fire2.alive) {
		//enemy.fire.kill();
		enemy.fire2.kill();
	}
	if (enemy.frozen>0) {
		enemy.frozen = Math.floor(enemy.frozen*0.8);
		enemy.frozen--;
		if (enemy.frozen<=0 && enemy.ice.alive) {
			enemy.ice.animations.play('icebreak',30,false,true);
			enemy.body.immovable = false;
			enemy.body.moves = true;
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			enemy.frozen = 0;
			//enemy.tint = rgbToHex(255,255,255);
		}
	}

}


function spawn () {
	const x = [
		spawnZombie,
		spawnFatso,
		spawnVomit,
		spawnZFV,
		spawnDog,
		spawnCrow,
		spawnMoose,
		spawnAnimals,
		spawnAll,
		spawnDoctor
	];
	if (enemies.countLiving() + crows.countLiving() < 5 && round.usedPoints<round.totalPoints) {
			//x[(round.roundNumber-1)%10](game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height),false);
			//x[(round.roundNumber-1)%10](50,50,false);
			var spawnPosition = getSpawningPositions();
			x[(round.roundNumber-1)%10](spawnPosition.x,spawnPosition.y,false);
			round.usedPoints++;
	}
	else if (enemies.countLiving()+crows.countLiving()<maxEnemies && game.time.now > nextSpawn && round.usedPoints<round.totalPoints) { // Round Code
		nextSpawn = game.time.now + game.rnd.integerInRange(2000,3000);
		if (Math.random()>0.2) {
			//x[(round.roundNumber-1)%10](game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height),false);
			//x[(round.roundNumber-1)%10](50,50,false);
			var spawnPosition = getSpawningPositions();
			x[(round.roundNumber-1)%10](spawnPosition.x,spawnPosition.y,false);
			round.usedPoints++;
		}	
		//var random = Math.random();
	}
}

function bossRound (doctors,kids,pyros,witches) {
	for (i=0;i<doctors;i++) {
		spawnDoctor(game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height));
		
	}
	for (i=0;i<kids;i++) {
		spawnKid(game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height));
	}
	for (i=0;i<pyros;i++) {
		spawnPyro(game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height));
	}	
	for (i=0;i<witches;i++) {
		spawnWitch(game.rnd.integerInRange(0,game.world.width),game.rnd.integerInRange(0,game.world.height));
	}	
		

}

function spawnZFV (x,y) {
	const a = [
		spawnZombie,
		spawnFatso,
		spawnVomit,
		spawnVomit
	];
	game.rnd.weightedPick(a)(x,y);
}

function spawnAnimals (x,y) {
	const a = [
		spawnDog,
		spawnCrow,
		spawnMoose,
		spawnMoose
	];
	game.rnd.weightedPick(a)(x,y);
}

function spawnAll (x,y) { // Mixed Round Code
	const a = [
		spawnZombie,
		spawnFatso,
		spawnVomit,
		spawnDog,
		spawnCrow,
		spawnMoose,
		spawnMoose
	];
	game.rnd.weightedPick(a)(x,y);
}


function spawnZombie (x,y,specialSpawn) {
	if (x>=game.world.width) x = game.world.width - 5;
	else if (x<=0) x = 5;
	if (y>=game.world.height) y = game.world.height - 5;
	else if (y<=0) y = 5;
	const zombie = enemies.create(x, y, 'zombie', "spawn/zombie_spawn_0001.png");
	game.rnd.pick(spsdArr).play();
	//setPosition(zombie);
	zombie.anchor.set(0.5,0.5);
	zombie.body.setSize(42,42);
	zombie.specialSpawn = specialSpawn;
	

	/*//zombie.fire = zombiefires.create(00,0,'fires',0)
	zombie.fire = game.add.sprite(00,0,'fires',0)
	zombie.fire.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	zombie.fire.animations.play('fire',30,true);
	zombie.fire.anchor.setTo(0.5,0.5);
	//zombie.fire.alpha = 0.8;
	zombie.fire.scale.setTo(0.7,0.7);
	zombie.addChild(zombie.fire);
	zombie.fire.kill();*/

	/*zombie.torso = game.add.sprite(0,0,'zombie',"spawn/zombie_spawn_0001.png");
	zombie.torso.animations.add('walk',[,"move/zombie_move_0001.png","move/zombie_move_0004.png","move/zombie_move_0003.png","move/zombie_move_0002.png"],10);
	zombie.torso.anchor.setTo(0.5,0.5);
	zombie.torso.animations.add('attack',["attack/zombie_attack_0001.png","attack/zombie_attack_0002.png","attack/zombie_attack_0002.png","move/zombie_move_0002.png"],10);
	zombie.torso.animations.add('spawn',['spawn/zombie_spawn_0001.png','spawn/zombie_spawn_0001.png','spawn/zombie_spawn_0002.png','spawn/zombie_spawn_0002.png'],50);
	zombie.addChild(zombie.torso)
	zombie.torso.animations.play('spawn');*/

	zombie.animations.add('walk',[,"move/zombie_move_0001.png","move/zombie_move_0004.png","move/zombie_move_0003.png","move/zombie_move_0002.png"],10);
	zombie.anchor.setTo(0.5,0.5);
	zombie.animations.add('attack',["attack/zombie_attack_0001.png","attack/zombie_attack_0002.png","attack/zombie_attack_0002.png","move/zombie_move_0002.png"],10);
	zombie.animations.add('spawn',['spawn/zombie_spawn_0001.png','spawn/zombie_spawn_0001.png','spawn/zombie_spawn_0002.png','spawn/zombie_spawn_0002.png'],50);
	zombie.animations.play('spawn');
	

	//zombie.fire2 = zombiefires.create(00,0,'fires',0)
	zombie.fire2 = game.add.sprite(0,0,'fires',0);
	zombie.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	zombie.fire2.animations.play('fire',30,true);
	zombie.fire2.anchor.setTo(0.5,0.5);
	zombie.fire2.alpha = 0.8;
	zombie.fire2.scale.setTo(1,1);
	zombie.addChild(zombie.fire2);
	zombie.fire2.kill();

	zombie.ice = game.add.sprite(0,0,'frozen',0);
	//zombie.ice.tint = rgbToHex(255,255,255);
	zombie.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {zombie.tint=rgbToHex(255,255,255)},this);
	//zombie.ice.animations.play('fire',30,true);
	zombie.ice.anchor.setTo(0.5,0.5);
	zombie.ice.alpha = 0.8;
	//zombie.ice.scale.setTo(0.7,0.7);
	zombie.addChild(zombie.ice);
	zombie.ice.kill();

	zombie.nextFire = 0;
	zombie.speed = 150;
	
	if (Math.random()<(round.healthBonus)/(10+round.healthBonus*2)) {
		zombie.tint = rgbToHex(200,10,255);
		zombie.speed *= 2;
	}
	zombie.body.mass = 6;
	zombie.body.drag.setTo(100,100);
	zombie.body.collideWorldBounds = true;
	zombie.body.bounce.setTo(0.5,0.5);
	zombie.maxHealth = Math.ceil(8 * Math.pow(1.2,round.healthBonus));
	zombie.health = zombie.maxHealth;
	zombie.attackPower = 25;
	zombie.events.onKilled.add(enemyDeath,this);
	zombie.emitter = zombieemitter;
	zombie.collideWorldBounds = true;
	zombie.body.tilePadding.setTo(-32,-32);
	zombie.value = 30;
	zombie.age = 0;
	zombie.enemyType = 'zombie';

	zombie.pathfinder = timer.loop(100,findPath,this,zombie,player);
	zombie.dot = timer.loop(250,damageOverTime,this,zombie);
	zombie.firedAt = 0;
	
	zombie.fireDegree = 0;
	zombie.frozen = 0;
	return zombie;
	//zombie.text = game.add.bitmapText(zombie.x,zombie.y,'Skranji','',null,player);
	//zombie.kill();
}

function spawnDog (x,y,specialSpawn) {
	if (x>=game.world.width) x = game.world.width - 5;
	else if (x<=0) x = 5;
	if (y>=game.world.height) y = game.world.height - 5;
	else if (y<=0) y = 5;
	
	dogspawnsound.play();

	const dog = enemies.create(x, y, 'dog', 'rott_spawn_0001.png');
	//setPosition(dog);
	
	dog.specialSpawn = specialSpawn;

	/*dog.fire = zombiefires.create(00,0,'fires',0)
	dog.fire.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	dog.fire.animations.play('fire',30,true);
	dog.fire.anchor.setTo(0.5,0.5);
	//dog.fire.alpha = 0.8;
	dog.fire.scale.setTo(0.5,0.5);
	dog.addChild(dog.fire);
	dog.fire.kill();*/
	
	dog.animations.add('walk', ["rott_move_0001.png", "rott_move_0004.png", "rott_move_0003.png", "rott_move_0002.png"], 10);
	dog.animations.add('attack', ["rott_attack_0001.png", "rott_attack_0002.png", "rott_attack_0002.png", "rott_move_0002.png"], 10);
	dog.animations.add('spawn', ['rott_spawn_0001.png','rott_spawn_0001.png', 'rott_spawn_0002.png'], 5);



	dog.fire2 = game.add.sprite(0,0,'fires',0);
	dog.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	dog.fire2.animations.play('fire',30,true);
	dog.fire2.anchor.setTo(0.5,0.5);
	dog.fire2.alpha = 0.8;
	dog.fire2.scale.setTo(0.5,0.5);
	dog.addChild(dog.fire2);
	dog.fire2.kill();
	
	dog.ice = game.add.sprite(0,0,'frozen',0);
	//dog.ice.tint = rgbToHex(255,255,255);
	dog.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {dog.tint=rgbToHex(255,255,255)},this);
	//dog.ice.animations.play('fire',30,true);
	dog.ice.anchor.setTo(0.5,0.5);
	dog.ice.alpha = 0.8;
	dog.ice.scale.setTo(0.5,0.5);
	dog.addChild(dog.ice);
	dog.ice.kill();
	
	dog.body.setSize(32, 32);
	dog.anchor.set(0.5,0.5);
	dog.speed = 300;
	
	/*if (Math.random()<(1+round.healthBonus)/(10+round.healthBonus*2)) {
		dog.tint = rgbToHex(255,70,70)
		dog.speed *= 2;
	}*/
	
	dog.nextFire = 0;
	dog.animations.play('spawn');
	dog.body.mass = 4;
	dog.body.drag.setTo(100,100);
	dog.body.collideWorldBounds = true;
	dog.body.bounce.setTo(0.5,0.5);
	dog.maxHealth = Math.ceil(6 * Math.pow(1.2,round.healthBonus));
	dog.health = dog.maxHealth;
	dog.attackPower = 15;
	dog.events.onKilled.add(enemyDeath,this);
	dog.enemyType = 'dog';
	dog.emitter = dogemitter;
	dog.collideWorldBounds = true;
	dog.body.tilePadding.setTo(-50,-50);
	dog.value = 30;
	dog.age = 0;

	dog.pathfinder = timer.loop(100,findPath,this,dog,player);
	dog.dot = timer.loop(250,damageOverTime,this,dog);
	
	dog.firedAt = 0;
	
	dog.fireDegree = 0;
	dog.frozen = 0;
	//dog.kill();
}

function spawnFatso (x,y,specialSpawn) {
	if (x>=game.world.width) x = game.world.width - 5;
	else if (x<=0) x = 5;
	if (y>=game.world.height) y = game.world.height - 5;
	else if (y<=0) y = 5;

	const fatso = enemies.create(x, y, 'fatso', "fatso_spawn_0001.png");
	fatso.specialSpawn = specialSpawn;
	
	game.rnd.pick(spsdArr).play();
	
	//setPosition(fatso);

	/*fatso.fire = zombiefires.create(00,0,'fires',0)
	fatso.fire.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	fatso.fire.animations.play('fire',30,true);
	fatso.fire.anchor.setTo(0.5,0.5);
	//fatso.fire.alpha = 0.8;
	fatso.fire.scale.setTo(0.8,0.8);
	fatso.addChild(fatso.fire);
	fatso.fire.kill();*/


	fatso.animations.add('walk', ["fatso_move_0001.png", "fatso_move_0004.png", "fatso_move_0003.png", "fatso_move_0002.png"], 10);
	fatso.animations.add('attack', ["fatso_attack_0001.png", "fatso_attack_0002.png", "fatso_attack_0002.png", "fatso_move_0002.png"], 10);
	fatso.animations.add('spawn', ['fatso_spawn_0001.png','fatso_spawn_0001.png','fatso_spawn_0002.png'], 5);


	fatso.fire2 = game.add.sprite(0,0,'fires',0);
	fatso.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	fatso.fire2.animations.play('fire',30,true);
	fatso.fire2.anchor.setTo(0.5,0.5);
	fatso.fire2.alpha = 0.6;
	fatso.fire2.scale.setTo(0.8,0.8);
	fatso.addChild(fatso.fire2);
	fatso.fire2.kill();
	
	fatso.ice = game.add.sprite(0,0,'frozen',0);
	//fatso.ice.tint = rgbToHex(255,255,255);
	fatso.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {fatso.tint=rgbToHex(255,255,255)},this);
	//fatso.ice.animations.play('fire',30,true);
	fatso.ice.anchor.setTo(0.5,0.5);
	fatso.ice.alpha = 0.8;
	//fatso.ice.scale.setTo(1.2,1.2);
	fatso.addChild(fatso.ice);
	fatso.ice.kill();

	//console.log(fatso.torso.animations);
	fatso.body.setSize(52, 52, 0, 0);
	fatso.anchor.set(0.5,0.5);
	fatso.speed = 130;
	
	if (Math.random()<(round.healthBonus)/(10+round.healthBonus*2)) {
		fatso.tint = rgbToHex(180,70,255);
		fatso.speed *= 2;
	}
	
	fatso.nextFire = 0;
	fatso.animations.play('spawn');
	//fatso.torso.animations.play('walk',null,true);
	fatso.body.mass = 24;
	//fatso.body.drag.setTo(100,100)
	fatso.body.collideWorldBounds = true;
	fatso.body.bounce.setTo(0.5,0.5);
	fatso.maxHealth = Math.ceil(16 * Math.pow(1.2,round.healthBonus));
	fatso.health = fatso.maxHealth;
	fatso.attackPower = 40;
	fatso.events.onKilled.add(enemyDeath,this);
	fatso.emitter = fatsoemitter;
	fatso.collideWorldBounds = true;
	fatso.body.tilePadding.setTo(-50,-50);
	fatso.value = 50;
	fatso.age = 0;
	fatso.enemyType = 'fatso';

	fatso.pathfinder = timer.loop(100,findPath,this,fatso,player);
	fatso.dot = timer.loop(250,damageOverTime,this,fatso);
	
	fatso.firedAt = 0;
	fatso.frozen = 0;
	fatso.fireDegree = 0;
	//fatso.kill();
}

function spawnVomit (x,y,specialSpawn) {
	if (x>=game.world.width) x = game.world.width - 5;
	else if (x<=0) x = 5;
	if (y>=game.world.height) y = game.world.height - 5;
	else if (y<=0) y = 5;

	game.rnd.pick(spsdArr).play();

	const vomit = enemies.create(x, y, 'vomit', "vomit_spawn_0001.png");
	//setPosition(vomit);
	vomit.anchor.set(0.5,0.5);
	vomit.specialSpawn = specialSpawn;

	/*vomit.fire = zombiefires.create(00,0,'fires',0)
	vomit.fire.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	vomit.fire.animations.play('fire',30,true);
	vomit.fire.anchor.setTo(0.5,0.5);
	//vomit.fire.alpha = 0.8;
	vomit.fire.scale.setTo(0.7,0.7);
	vomit.addChild(vomit.fire);
	vomit.fire.kill();*/

	vomit.animations.add('walk',[,"vomit_move_0001.png","vomit_move_0004.png","vomit_move_0003.png","vomit_move_0002.png"],10);
	vomit.body.setSize(42,42);
	vomit.animations.add('attack',["vomit_attack_0001.png","vomit_attack_0002.png","vomit_attack_0002.png","vomit_move_0002.png"],10);
	vomit.animations.add('spawn',['vomit_spawn_0001.png','vomit_spawn_0001.png','vomit_spawn_0002.png'],5);
	vomit.animations.play('spawn');


	vomit.fire2 = game.add.sprite(0,0,'fires',0);
	vomit.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	vomit.fire2.animations.play('fire',30,true);
	vomit.fire2.anchor.setTo(0.5,0.5);
	vomit.fire2.alpha = 0.8;
	vomit.fire2.scale.setTo(0.75,0.75);
	vomit.addChild(vomit.fire2);
	vomit.fire2.kill();
	
	vomit.ice = game.add.sprite(0,0,'frozen',0);
	//vomit.ice.tint = rgbToHex(255,255,255);
	vomit.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {vomit.tint=rgbToHex(255,255,255)},this);
	//vomit.ice.animations.play('fire',30,true);
	vomit.ice.anchor.setTo(0.5,0.5);
	vomit.ice.alpha = 0.8;
	//vomit.ice.scale.setTo(0.7,0.7);
	vomit.addChild(vomit.ice);
	vomit.ice.kill();
	

	vomit.nextFire = 0;
	vomit.speed =  140;
	/*if (Math.random()<(round.healthBonus)/(10+round.healthBonus*2)) {
		vomit.tint = rgbToHex(255,70,70)
		vomit.speed *= 2;
	}*/	
	
	vomit.body.mass = 6;
	vomit.body.drag.setTo(100,100);
	vomit.body.collideWorldBounds = true;
	vomit.body.bounce.setTo(0.5,0.5);
	vomit.maxHealth = Math.ceil(8 * Math.pow(1.2,round.healthBonus));
	vomit.health = vomit.maxHealth;
	vomit.attackPower = 20;
	vomit.events.onKilled.add(enemyDeath,this);
	vomit.circle = new Phaser.Circle(vomit.x,vomit.y,52);
	vomit.enemyType = 'vomit';
	vomit.emitter = vomitemitter;
	vomit.collideWorldBounds = true;
	vomit.body.tilePadding.setTo(-50,-50);
	vomit.value = 40;
	vomit.age = 0;

	vomit.pathfinder = timer.loop(100,findPath,this,vomit,player);
	vomit.dot = timer.loop(250,damageOverTime,this,vomit);
	
	vomit.firedAt = 0;
	vomit.frozen = 0;
	vomit.fireDegree = 0;
	//vomit.kill();
}

function spawnMoose (x,y,specialSpawn) {
	if (x>=game.world.width) x = game.world.width - 5;
	else if (x<=0) x = 5;
	if (y>=game.world.height) y = game.world.height - 5;
	else if (y<=0) y = 5;

	const moose = enemies.create(x, y, 'moose', "moose_spawn_0001.png");
	//setPosition(moose);
	moose.anchor.set(0.5,0.5);
	moose.specialSpawn = specialSpawn;

	/*moose.fire = zombiefires.create(00,0,'fires',0)
	moose.fire.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	moose.fire.animations.play('fire',30,true);
	moose.fire.anchor.setTo(0.5,0.5);
	//moose.fire.alpha = 0.8;
	moose.fire.scale.setTo(0.9,0.9);
	moose.addChild(moose.fire);
	moose.fire.kill();*/

	moose.animations.add('walk',[5,6,7,8],10);
	moose.body.setSize(60,60);
	moose.animations.add('lick',[3,4],10);
	moose.animations.add('spawn',[9,9,10],5);
	moose.animations.play('spawn');


	moose.fire2 = game.add.sprite(0,0,'fires',0);
	moose.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	moose.fire2.animations.play('fire',30,true);
	moose.fire2.anchor.setTo(0.5,0.5);
	moose.fire2.alpha = 0.6;
	moose.fire2.scale.setTo(0.9,0.9);
	moose.addChild(moose.fire2);
	moose.fire2.kill();
	
	moose.ice = game.add.sprite(0,0,'frozen',0);
	//moose.ice.tint = rgbToHex(255,255,255);
	moose.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {moose.tint=rgbToHex(255,255,255)},this);
	//moose.ice.animations.play('fire',30,true);
	moose.ice.anchor.setTo(0.5,0.5);
	moose.ice.alpha = 0.8;
	//moose.ice.scale.setTo(0.7,0.7);
	moose.addChild(moose.ice);
	moose.ice.kill();

	moose.nextFire = 0;

	moose.speed =  350;
	moose.body.mass = 40;
	moose.body.drag.setTo(100,100);
	moose.body.collideWorldBounds = true;
	moose.body.bounce.setTo(0.5,0.5);

	moose.maxHealth = Math.ceil(20 * Math.pow(1.2,round.healthBonus));
	moose.health = moose.maxHealth;

	moose.attackPower = 1;
	moose.events.onKilled.add(enemyDeath,this);
	moose.emitter = mooseemitter;
	moose.enemyType = 'moose';
	moose.collideWorldBounds = true;
	moose.body.tilePadding.setTo(-50,-50);
	moose.value = 100;
	moose.age = 0;
	//console.log(moose.body)

	moose.pathfinder = timer.loop(100,findPath,this,moose,player);
	//moose.text = game.add.bitmapText(moose.x,moose.y,'Skranji','',null,player);
	moose.dot = timer.loop(250,damageOverTime,this,moose);
	
	moose.firedAt = 0;
	moose.frozen = 0;
	moose.fireDegree = 0;
	//moose.health = 0;
	//moose.kill();

}



function spawnCrow (x,y,specialSpawn) {
	if (!specialSpawn) {
		x = game.world.width + 20;
		y = game.rnd.integerInRange(0,game.world.height);	
	}
	let crow;
	if (crows.countDead()>0) {
		crow = crows.getFirstDead();
		crow.revive(crow);
		crow.x = x;
		crow.y = y;
	}
	else {
		crow = crows.create(x,y,'crow','crow_move_0001.png');
		crow.anchor.set(0.5,0.5);
		crow.body.setSize(36,36);
		crow.animations.add('fly',["crow_move_0001.png","crow_move_0002.png","crow_move_0003.png","crow_move_0004.png"],10);
		crow.animations.add('attack',["crow_attack_0001.png","crow_attack_0002.png","crow_attack_0001.png"],10);
		crow.attackPower = 10;
		crow.enemyType = 'crow';
		crow.value = 20;
		crow.speed =  400;
		crow.body.mass = 1;
		crow.emitter = crowemitter;
		crow.hit = true;
		crow.events.onKilled.add(enemyDeath,this);
	}
	
	crow.specialSpawn = specialSpawn;
	crow.nextFire = 0;
	crow.maxHealth = Math.ceil(4 * Math.pow(1.2,round.healthBonus));
	crow.health = crow.maxHealth;
	crow.firedAt = 0;
	crow.frozen = 0;
	crow.fireDegree = 0;
	
}

function spawnDoctor (x,y) {
	if (x>=game.world.width) x = game.world.width - 5;
	else if (x<=0) x = 5;
	if (y>=game.world.height) y = game.world.height - 5;
	else if (y<=0) y = 5;

	let doctor = enemies.create(x,y,'boss','doctor_move_0001.png');
	//setPosition(doctor);
	doctor.anchor.set(0.5,0.5);
	doctor.body.setSize(42,42);

	/*doctor.fire = zombiefires.create(00,0,'fires',0)
	doctor.fire.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	doctor.fire.animations.play('fire',30,true);
	doctor.fire.anchor.setTo(0.5,0.5);
	//doctor.fire.alpha = 0.8;
	doctor.fire.scale.setTo(0.7,0.7);
	doctor.addChild(doctor.fire);
	doctor.fire.kill();*/


	doctor.animations.add('walk',["doctor_move_0001.png","doctor_move_0002.png","doctor_move_0003.png","doctor_move_0004.png"],10);
	doctor.animations.add('attack',["doctor_attack_0001.png","doctor_attack_0002.png"],10);
	doctor.animations.add('stand',["doctor_stand_0001.png","doctor_stand_0002.png"]);
	//doctor.torso.animations.add('pain',["doctor_stand_0001.png","doctor_stand_0002.png"]);
	doctor.animations.add('summon',["doctor_summon_0001.png","doctor_summon_0002.png"],15);

	//doctor.torso.animations.play('spawn');


	doctor.fire2 = game.add.sprite(0,0,'fires',0);
	doctor.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	doctor.fire2.animations.play('fire',30,true);
	doctor.fire2.anchor.setTo(0.5,0.5);
	doctor.fire2.alpha = 0.8;
	doctor.fire2.scale.setTo(0.7,0.7);
	doctor.addChild(doctor.fire2);
	doctor.fire2.kill();

	doctor.ice = game.add.sprite(0,0,'frozen',0);
	//doctor.ice.tint = rgbToHex(255,255,255);
	doctor.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {doctor.tint=rgbToHex(255,255,255)},this);
	//doctor.ice.animations.play('fire',30,true);
	doctor.ice.anchor.setTo(0.5,0.5);
	doctor.ice.alpha = 0.8;
	doctor.ice.scale.setTo(0.7,0.7);
	doctor.addChild(doctor.ice);
	doctor.ice.kill();

	doctor.nextFire = 0;
	doctor.speed =  190 + 10*round.bossHealth;
	doctor.body.mass = 12;
	doctor.body.drag.setTo(200,200);
	doctor.body.collideWorldBounds = true;
	doctor.body.bounce.setTo(0.5,0.5);
	doctor.maxHealth = 500 + 250*round.bossHealth;
	doctor.health = doctor.maxHealth;
	doctor.attackPower = 50;
	doctor.events.onKilled.add(doctorDeath,this);
	doctor.emitter = doctoremitter;
	doctor.body.tilePadding.setTo(-42,-32);
	doctor.value = 300;
	doctor.lives = 2 + round.bossLives;
	doctor.state = 'berserk';
	doctor.enemyType = 'doctor';
	doctor.pathfinder = timer.loop(100,findPath,this,doctor,player);
	doctor.dot = timer.loop(250,damageOverTime,this,doctor);
	//zombie.text = game.add.bitmapText(zombie.x,zombie.y,'Skranji','',null,player);
	doctor.spawnCount = 0;
	doctor.maxSpawn = 8 + 2*round.bossSpecial;
	doctor.nextSpawn = 0;
	doctor.firedAt = 0;
	//console.log(doctor.state);
	doctor.fireDegree = 0;
	doctor.frozen = 0;
}

function spawnKid (x,y) {
	const kid = enemies.create(x, y, 'kid', 'kid_move_0001.png');
	kid.anchor.set(0.5,0.5);
	kid.body.setSize(42,42);
	kid.body.collideWorldBounds = true;
	kid.body.mass = 12;
	kid.body.drag.setTo(200,200);
	
	kid.animations.add('walk',["kid_move_0001.png","kid_move_0002.png","kid_move_0003.png","kid_move_0004.png"],10);
	kid.animations.add('attack',["kid_chainsaw_0001.png","kid_chainsaw_0002.png","kid_chainsaw_0001.png"],10);
	kid.pain = kid.animations.add('pain',["kid_pain_0001.png","kid_pain_0001.png","kid_pain_0001.png","kid_move_0001.png","kid_move_0002.png","kid_move_0003.png","kid_move_0004.png"],10);
	kid.pain.onComplete.add(function() {
		if (kid.state==='slash') kid.state='shoot';
		else if (kid.state==='shoot') kid.state='slash';
	},this);
	kid.animations.add('shoot',["kid_shoot_0001.png","kid_shoot_0002.png"],10);
	
	kid.fire2 = game.add.sprite(0,0,'fires',0);
	kid.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	kid.fire2.animations.play('fire',30,true);
	kid.fire2.anchor.setTo(0.5,0.5);
	kid.fire2.alpha = 0.8;
	kid.fire2.scale.setTo(0.7,0.7);
	kid.addChild(kid.fire2);
	kid.fire2.kill();
	kid.ice = game.add.sprite(0,0,'frozen',0);
	kid.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {kid.tint=rgbToHex(255,255,255)},this);
	kid.ice.anchor.setTo(0.5,0.5);
	kid.ice.alpha = 0.8;
	kid.ice.scale.setTo(0.7,0.7);
	kid.addChild(kid.ice);
	kid.ice.kill();
	
	kid.lives = 3+2*round.bossLives;
	kid.state = 'slash';
	kid.attackPower = 50;
	kid.maxHealth = 500 + 25*round.bossHealth;
	kid.health = kid.maxHealth;
	kid.enemyType = 'kid';
	kid.value = 300;
	kid.frozen = 0;
	kid.nextFire = 0;
	kid.speed = 190 + round.bossSpeed;
	kid.firedAt = 0;
	kid.fireDegree = 0;
	kid.pathfinder = timer.loop(100,findPath,this,kid,player);
	kid.dot = timer.loop(250,damageOverTime,this,kid);
	kid.events.onKilled.add(kidDeath,this);
	kid.circle = new Phaser.Circle(kid.x,kid.y,46);
	
}

function spawnPyro (x,y) {
	const pyro = enemies.create(x, y, 'pyro', 'pyro_move_0001.png');
	pyro.anchor.set(0.5,0.5);
	pyro.body.setSize(42,42);
	pyro.body.collideWorldBounds = true;
	pyro.body.mass = 12;
	pyro.body.drag.setTo(200,200);
	pyro.body.immovable = true;
	
	pyro.animations.add('walk',["pyro_move_0001.png","pyro_move_0002.png","pyro_move_0003.png","pyro_move_0004.png"],10);
	pyro.animations.add('fire',["pyro_attack_0001.png","pyro_attack_0002.png","pyro_attack_0001.png","pyro_attack_0002.png","pyro_stand_0001.png","pyro_stand_0002.png"],10);
	pyro.animations.add('summon',["pyro_summon_0001.png","pyro_summon_0001.png","pyro_summon_0002.png","pyro_summon_0002.png","pyro_summon_0002.png","pyro_stand_0001.png","pyro_stand_0002.png"],10);
	pyro.animations.add('pain',["pyro_pain_0001.png","pyro_pain_0001.png","pyro_pain_0001.png","pyro_pain_0001.png","pyro_stand_0001.png","pyro_stand_0002.png"],10);
	
	pyro.fire2 = game.add.sprite(0,0,'fires',0);
	pyro.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	pyro.fire2.animations.play('fire',30,true);
	pyro.fire2.anchor.setTo(0.5,0.5);
	pyro.fire2.alpha = 0.8;
	pyro.fire2.scale.setTo(0.7,0.7);
	pyro.addChild(pyro.fire2);
	pyro.fire2.kill();
	pyro.ice = game.add.sprite(0,0,'frozen',0);
	pyro.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {pyro.tint=rgbToHex(255,255,255)},this);
	pyro.ice.anchor.setTo(0.5,0.5);
	pyro.ice.alpha = 0.8;
	pyro.ice.scale.setTo(0.7,0.7);
	pyro.addChild(pyro.ice);
	pyro.ice.kill();
	
	pyro.lives = 2+round.bossLives;
	pyro.state = 'berserk';
	pyro.attackPower = 25;
	pyro.maxHealth = 500 + 250*round.bossHealth;
	pyro.health = pyro.maxHealth;
	pyro.enemyType = 'pyro';
	pyro.value = 300;
	pyro.frozen = 0;
	pyro.nextFire = 0;
	pyro.speed = 190 + round.bossSpeed;
	pyro.firedAt = 0;
	pyro.fireDegree = 0;
	pyro.pathfinder = timer.loop(100,findPath,this,pyro,player);
	pyro.dot = timer.loop(250,damageOverTime,this,pyro);
	pyro.events.onKilled.add(pyroDeath,this);
	pyro.circle = new Phaser.Circle(pyro.x,pyro.y,52);
	pyro.spawnCount = 0;
	pyro.maxSpawn = 6 + round.bossSpecial;
}

function spawnWitch (x,y) {
	const witch = enemies.create(x, y, 'witch', 'witch_stand_0001.png');
	witch.anchor.set(0.5,0.5);
	witch.body.setSize(42,42);
	//witch.body.collideWorldBounds = true;
	witch.body.mass = 12;
	witch.body.drag.setTo(200,200);
	witch.body.immovable = true;
	witch.enemyType = "witch";
	witch.nextFire = 0;
	witch.nextTeleport = 0;
	
	witch.animations.add('fire',[8,9,0,0,1,8,9,8,9,8,9],10);
	witch.animations.add('lightning',[8,9,8,9,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,8,9,8,9,8,9,8,9,8,9],10);
	witch.animations.add('pain',["witch_pain_0001.png","witch_stand_0001.png","witch_stand_0002.png"]);
	
	witch.lightning = game.add.sprite(0,0,'lightning',"bolt_strike_0001.png");
	witch.lightning.anchor.setTo(0.445,0.93);
	
	witch.lightning.alpha = 0;
	witch.lightning.scaleTweenX = game.add.tween(witch.lightning.scale).to({x:1},700,Phaser.Easing.Cubic.In);
	witch.lightning.scaleTweenY = game.add.tween(witch.lightning.scale).to({y:1},700,Phaser.Easing.Cubic.In);
	witch.lightning.scaleTweenX2 = game.add.tween(witch.lightning.scale).to({x:1},200,Phaser.Easing.Quartic.In);
	witch.lightning.scaleTweenY2 = game.add.tween(witch.lightning.scale).to({y:1},200,Phaser.Easing.Quartic.In);
	witch.lightning.alphaTween = game.add.tween(witch.lightning).to({alpha:1},1000,Phaser.Easing.Linear.None);
	witch.lightning.animations.add('fire',[1,1,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,10,11,12,13,14,15,16,17,18,19,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,20],60);
	witch.lightning.alphaTween.onComplete.add(function (stuff) {
		witch.lightning.frameName = "bolt_strike_0002.png";
		witch.lightning.scale.x = 0.1;
		witch.lightning.scale.y = 0.1;
		witch.lightning.scaleTweenX2.start();
		witch.lightning.scaleTweenY2.start();
	},this);
	witch.lightning.scaleTweenY2.onComplete.add(function (stuff) {
		witch.lightning.animations.play('fire')
	},this);
	
	
	witch.fire2 = game.add.sprite(0,0,'fires',0);
	witch.fire2.animations.add('fire',[0,1,2,3,4,5,6,7,8]);
	witch.fire2.animations.play('fire',30,true);
	witch.fire2.anchor.setTo(0.5,0.5);
	witch.fire2.alpha = 0.8;
	witch.fire2.scale.setTo(0.7,0.7);
	witch.addChild(witch.fire2);
	witch.fire2.kill();
	
	witch.ice = game.add.sprite(0,0,'frozen',0);
	witch.ice.animations.add('icebreak',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]).onComplete.add(function() {witch.tint=rgbToHex(255,255,255)},this);
	witch.ice.anchor.setTo(0.5,0.5);
	witch.ice.alpha = 0.8;
	witch.ice.scale.setTo(0.7,0.7);
	witch.addChild(witch.ice);
	witch.ice.kill();
	
	witch.smoke = game.add.sprite(witch.x,witch.y,'smoke',"smoke_plume_0001.png");
	witch.smoke.animations.add('plume2',[0,1,2,3,4,5,6,7,8,9],10);
	witch.smoke.alphaTween = game.add.tween(witch.smoke).to({alpha:0},960,Phaser.Easing.Linear.None);
	witch.smoke.animations.add('plume',[0,1,2,3,4,5,6,7,8,9],10).onComplete.add(function () {
		teleendsound.play();
		witch.x = player.x + game.rnd.integerInRange(-200,200);
		witch.y = player.y + game.rnd.integerInRange(-200,200);
		witch.smoke.x = witch.x;
		witch.smoke.y = witch.y;
		witch.smoke.alpha = 1;
		witch.smoke.alphaTween.start();
		witch.smoke.animations.play('plume2');
		witch.nextFire = game.time.now + 1000;
		//spawnCrow(witch.x,witch.y,true);
	},this);
	witch.smoke.anchor.setTo(0.5,0.5);
	witch.smoke.alpha = 0;

	
	witch.lives = 3 + 2*round.bossLives;
	witch.state = 'fire';
	witch.attackPower = 25;
	witch.maxHealth = 500 + 250*round.bossHealth;
	witch.health = witch.maxHealth;
	witch.value = 300;
	witch.frozen = 0;
	witch.firedAt = 0;
	witch.fireDegree = 0;
	witch.dot = timer.loop(250,damageOverTime,this,witch);
	witch.circle = new Phaser.Circle(witch.x,witch.y,48);
	witch.events.onKilled.add(witchDeath,this);
}

function getSpawningPositions() {
	/*var x1 = lavalayer.getTileX(player.x-1000);
	var y1 = lavalayer.getTileY(player.y-1000);
	var x2 = lavalayer.getTileX(player.x+1000);
	var y1 = lavalayer.getTileY(player.y+1000);*/
	const tileArray = lavalayer.getTiles(player.x - 1000, player.y - 1000, 2000, 2000);
	const spawningPositions = [];
	for (i=0;i<tileArray.length;i++) {
		if (tileArray[i].index>29 && tileArray[i].index<44) {	
			spawningPositions[spawningPositions.length] = new Object();
			spawningPositions[spawningPositions.length-1].x = tileArray[i].worldX + 32;
			spawningPositions[spawningPositions.length-1].y = tileArray[i].worldY + 32;
			
		} 
	}
	return game.rnd.pick(spawningPositions);
	
}
function findPath (sprite, target) {
	const spriteX = lavalayer.getTileX(sprite.x);
	const spriteY = lavalayer.getTileY(sprite.y);
	const targetX = lavalayer.getTileX(target.x);
	const targetY = lavalayer.getTileY(target.y);
	pathfinder.setCallbackFunction(function(path) {

		if (path === null) {
			//console.log('nope')
			sprite.direction = "NOPATH";
			return false;
		}

		/*if (game.physics.arcade.distanceBetween(sprite,player)<52) {
			//console.log('Already There')
			sprite.direction = 'ATDESTINATION'
			return false;
		}*/
		if (path) {
			//console.log(path)
			if (path[1]!== undefined) {
				var currentNextPointX = path[1].x;
				var currentNextPointY = path[1].y;
			}
			else {
				return false;
			}
		}

		if (currentNextPointX < spriteX && currentNextPointY < spriteY) {
			// left up
			//console.log("GO LEFT UP");
			sprite.direction = "NW";

		}
		else if (currentNextPointX === spriteX && currentNextPointY < spriteY) {
			// up
			//console.log("GO UP");
			sprite.direction = "N";
		}
		else if (currentNextPointX > spriteX && currentNextPointY < spriteY) {
			// right up

			//console.log("GO RIGHT UP");

			sprite.direction = "NE";

		}
		else if (currentNextPointX < spriteX && currentNextPointY === spriteY) {
			// left

			//console.log("GO LEFT");

			sprite.direction = "W";


		}
		else if (currentNextPointX > spriteX && currentNextPointY === spriteY) {
			// right

			//console.log("GO RIGHT");
			sprite.direction = "E";

		}
		else if (currentNextPointX > spriteX && currentNextPointY > spriteY) {
			// right down

			//console.log("GO RIGHT DOWN");

			sprite.direction = "SE";

		}
		else if (currentNextPointX === spriteX && currentNextPointY > spriteY) {
			// down

			//console.log("GO DOWN");

			sprite.direction = "S";

		}
		else if (currentNextPointX < spriteX && currentNextPointY > spriteY) {
			// left down

			//console.log("GO LEFT DOWN");

			sprite.direction = "SW";

		}
		else {
			sprite.direction = "STOP";
		}
	});
	if (!spriteX || !spriteY || !targetX || !targetY) {
		return;
	}
	pathfinder.preparePathCalculation([spriteX,spriteY], [targetX,targetY]);
	pathfinder.calculatePath();
}

function moveOnPath (enemy) {
	const speedFactor = 1 - (enemy.frozen * 2 / enemy.health);
	//if (enemy.ice.alive) return false;
	if (enemy.direction === "NW") {
		/* enemy.body.velocity.x = -100;
		 enemy.body.velocity.y = -100; */
		enemy.angle = 245-86;
		game.physics.arcade.velocityFromAngle(enemy.angle+86, enemy.speed*speedFactor, enemy.body.velocity);
		//enemy.torso.animations.play('walk');
		enemy.animations.play('walk');
	}
	else if (enemy.direction === "NE") {
		/* enemy.body.velocity.x = 100;
		 enemy.body.velocity.y = -100; */
		enemy.angle = 315-86;
		game.physics.arcade.velocityFromAngle(enemy.angle+86, enemy.speed*speedFactor, enemy.body.velocity);
		//enemy.torso.animations.play('walk');
		enemy.animations.play('walk');
	}

	else if (enemy.direction === "N") {
		/* 	enemy.body.velocity.x = 0;
		 enemy.body.velocity.y = -100; */
		enemy.angle = 270-86;
		game.physics.arcade.velocityFromAngle(enemy.angle+86, enemy.speed*speedFactor, enemy.body.velocity);
		//enemy.torso.animations.play('walk');
		enemy.animations.play('walk');
	}

	else if (enemy.direction === "SW") {
		//enemy.body.velocity.x = -100;
		//enemy.body.velocity.y = 100;
		enemy.angle = 135-86;
		game.physics.arcade.velocityFromAngle(enemy.angle+86, enemy.speed*speedFactor, enemy.body.velocity);
		//enemy.torso.animations.play('walk');
		enemy.animations.play('walk');
	}
	else if (enemy.direction === "SE") {
		/* enemy.body.velocity.x = 100;
		 enemy.body.velocity.y = 100; */
		enemy.angle = 45-86;
		game.physics.arcade.velocityFromAngle(enemy.angle+86, enemy.speed*speedFactor, enemy.body.velocity);
		//enemy.torso.animations.play('walk');
		enemy.animations.play('walk');
	}
	else if (enemy.direction === "S") {
		/* enemy.body.velocity.x = 0;
		 enemy.body.velocity.y = 100; */
		enemy.angle = 90-86;
		game.physics.arcade.velocityFromAngle(enemy.angle+86, enemy.speed*speedFactor, enemy.body.velocity);
		//enemy.torso.animations.play('walk');
		enemy.animations.play('walk');
	}
	else if (enemy.direction === "W") {
		//enemy.body.velocity.x = -100;
		//enemy.body.velocity.y = 0;
		enemy.angle = 180-86;
		game.physics.arcade.velocityFromAngle(enemy.angle+86, enemy.speed*speedFactor, enemy.body.velocity);
		//enemy.torso.animations.play('walk');
		enemy.animations.play('walk');
	}
	else if (enemy.direction === "E") {
		/* enemy.body.velocity.x = 100;
		 enemy.body.velocity.y = 0; */
		enemy.angle = 0-86;
		game.physics.arcade.velocityFromAngle(enemy.angle+86, enemy.speed*speedFactor, enemy.body.velocity);
		//enemy.torso.animations.play('walk');
		enemy.animations.play('walk');
	}
	else if (enemy.direction === 'STOP') {
		enemy.body.velocity.x = 0;
		enemy.body.velocity.y = 0;
	}
}

function enemyAttackPlayer (enemy) {
	if (!enemy.animations.currentAnim.isPlaying && game.time.now > enemy.nextFire && player.alive) {
		if (player.currentWeapon !== helicopter || enemy.enemyType === 'crow') {
			enemy.nextFire = game.time.now + 500;
			if (enemy.onFire) enemy.nextFire + 1000;
			//console.log('RARR')
			if (Math.random() > 0.2) {
				//enemy.torso.animations.play('attack');
				enemy.animations.play('attack');
				playerDamage(enemy.attackPower); // Calls player damage function
				const blood = game.rnd.pick([player.blood1, player.blood2]);
				blood.x = (player.x*3+enemy.x)*0.25;
				blood.y = (player.y*3+enemy.y)*0.25;
				blood.rotation = game.physics.arcade.angleBetween(player,enemy);
				blood.animations.play('spurt');
				
				if (enemy.enemyType === 'crow') {
					crowsound.play();
				}
				else if (enemy.enemyType === 'dog') {
					dogattacksound.play();
				}
				else {
					game.rnd.pick([zombieattack1,zombieattack2]).play();
				}
			}
		}
	}
}

function enemyAttackPartner (enemy,partner) {
	if (!enemy.animations.currentAnim.isPlaying && game.time.now > enemy.nextFire && player.alive) {
		enemy.nextFire = game.time.now + 500;
		if (enemy.onFire) enemy.nextFire + 1000;
		//console.log('RARR')
		if (Math.random() > 0.2) {
			//enemy.torso.animations.play('attack');
			enemy.animations.play('attack');
			partner.damage(enemy.attackPower);
			const blood = game.rnd.pick([partner.blood1, partner.blood2]);
			blood.x = (partner.x*3+enemy.x)*0.25;
			blood.y = (partner.y*3+enemy.y)*0.25;
			blood.rotation = game.physics.arcade.angleBetween(partner,enemy);
			blood.animations.play('spurt');
				
			if (enemy.enemyType === 'crow') {
				crowsound.play();
			}
			else if (enemy.enemyType === 'dog') {
				dogattacksound.play();
			}
			else {
				game.rnd.pick([zombieattack1,zombieattack2]).play();
			}
		}
	}
}

function zombieBehavior (enemy) {
	//enemy.age++;
	if (enemy.ice.alive) return false;
	enemy.lavaContact = 0;
	if (!enemy.shocked) {
		const inrange = Phaser.Circle.intersectsRectangle(player.circle, enemy.body);
		if (enemy.enemyType === 'vomit') {
			vomitBehavior(enemy);
		}
		else if (enemy.enemyType === 'moose') {
			mooseBehavior(enemy);
		}
		else if (enemy.enemyType === 'doctor') {
			doctorBehavior(enemy);
		}
		else if (enemy.enemyType === 'kid') {
			kidBehavior(enemy);
		}
		else if (enemy.enemyType === 'pyro') {
			pyroBehavior(enemy);
		}
		else if (enemy.enemyType === 'witch') {
			witchBehavior(enemy);
		}
		else {
			if (enemy.enemyType === 'dog' && game.physics.arcade.distanceBetween(enemy,player)<60 &&player.currentWeapon!==helicopter) {
				//player.body.velocity.x = 0;
				//player.body.velocity.y = 0;
				player.body.velocity.x *= 0.4;
				player.body.velocity.y *= 0.4;
			}
			const distance = [];
			let partnerDistance = 50000;
			let closestPartner;
			partners.forEachAlive(function (partner) {
				const distanceBetween = game.physics.arcade.distanceBetween(enemy, partner);
				if (distanceBetween < Math.min.apply(Math, distance)) {
				closestPartner = partner;
				partnerDistance = distanceBetween;
			}
			distance[distance.length] = distanceBetween;
			}, this);
			
			if (enemy.animations.getAnimation('spawn').isFinished && game.physics.arcade.distanceBetween(enemy,player)>52 && partnerDistance>52) {
				/*if (game.physics.arcade.distanceBetween(enemy,player)>48 && !inrange) {
				 game.physics.arcade.moveToXY(enemy, player.x, player.y, enemy.speed);
				 enemy.rotation = game.physics.arcade.angleToXY(enemy, player.x, player.y) - 1.5;
				 enemy.torso.animations.play('walk');
				 }*/
				//findPath(enemy);
				moveOnPath(enemy);
				

			}
			else if (partnerDistance<52) {
				enemy.body.velocity.x = 0;
				enemy.body.velocity.y = 0;
				enemyAttackPartner(enemy,closestPartner);
			}
			else  {
				enemy.body.velocity.x = 0;
				enemy.body.velocity.y = 0;
				enemyAttackPlayer(enemy);
			}
			
		}
	}
}

function vomitBehavior (vomit) { //Vomit Zombie Only

	const distance = [];
	let partnerDistance = 50000;
	const playerDistance = game.physics.arcade.distanceBetween(vomit, player);
	let closestPartner;
	partners.forEachAlive(function (partner) {
		const distanceBetween = game.physics.arcade.distanceBetween(vomit, partner);
		if (distanceBetween < Math.min.apply(Math, distance)) {
				closestPartner = partner;
				partnerDistance = distanceBetween;
		}
		distance[distance.length] = distanceBetween;
	}, this);
	if (playerDistance>250 && partnerDistance>250) {
		/*game.physics.arcade.moveToXY(vomit, player.x - 30, player.y - 30, vomit.speed);
		vomit.torso.animations.play('walk');*/
		moveOnPath(vomit);
		vomit.nextFire = game.time.now + 100;
	}
	else {
		vomit.body.velocity.x = 0;
		vomit.body.velocity.y = 0;
		if (partnerDistance<playerDistance) vomit.rotation = game.physics.arcade.angleToXY(vomit, closestPartner.x, closestPartner.y) - 1.5;
		else vomit.rotation = game.physics.arcade.angleToXY(vomit, player.x - 30, player.y - 30) - 1.5;
		if (!vomit.animations.currentAnim.isPlaying && game.time.now > vomit.nextFire && player.alive) {
			vomit.nextFire = game.time.now + 500;
			if (Math.random() > 0.5) {
				game.rnd.pick([vomit1,vomit2,vomit3]).play();
				vomit.animations.play('attack');
				const vomitball = vomitballs.create(1, 1, 'vomit', "fireball_0001.png"); // Spitting vomitball
				vomitball.health = 2;
				vomitball.position = Phaser.Circle.circumferencePoint(vomit.circle,vomit.rotation-1.5);
				vomitball.anchor.set(0.5,0.5);
				//vomitball.rotation = game.physics.arcade.angleBetween(vomit,player);
				vomitball.rotation = vomit.rotation + 1.5;
				vomitball.lifespan = 800;
				/*if (Math.random()>0.5) {
					var t = game.physics.arcade.distanceBetween(vomit,player)/600;
					game.physics.arcade.moveToXY(vomitball, player.x+player.body.velocity.x*t, player.y+player.body.velocity.y*t,600);
				}*/
				if (partnerDistance<playerDistance) game.physics.arcade.moveToXY(vomitball, closestPartner.x, closestPartner.y,600);
				else game.physics.arcade.moveToXY(vomitball, player.x+player.body.velocity.x*(playerDistance/600), player.y+player.body.velocity.y*(playerDistance/600),600);
				
				vomitball.body.setSize(16,16,0,0);
				vomitball.animations.add('fly',[ "fireball_0001.png", "fireball_0002.png", "fireball_0003.png", "fireball_0004.png", "fireball_0005.png", "fireball_0006.png"],20,true);
				vomitball.animations.add('explode',["fireball_hit_0001.png","fireball_hit_0002.png","fireball_hit_0003.png","fireball_hit_0004.png","fireball_hit_0005.png","fireball_hit_0006.png","fireball_hit_0007.png","fireball_hit_0008.png","fireball_hit_0009.png"],15);
				vomitball.animations.play('fly');
				vomitball.attackPower = vomit.attackPower;
				vomitball.events.onKilled.add(function (stuff) {vomitball.destroy()},this)

			}
		}

	}
}

function mooseBehavior (moose) {

	if (moose.animations.getAnimation('spawn').isFinished) {
		if (moose.enraged) {
			moveOnPath(moose);
			if (game.physics.arcade.distanceBetween(moose,player)<62 && player.currentWeapon !== helicopter) {
				playerDamage(moose.attackPower);
				moosound.play();
			}
			partners.forEachAlive(function (partner) {
				if (game.physics.arcade.distanceBetween(moose,partner)<62) {
					partner.damage(moose.attackPower);
					moosound.play();
				}
				
			}, this)
		}
		else {
			moose.animations.play('lick');
			if (game.physics.arcade.distanceBetween(moose,player)<500 || moose.health < moose.maxHealth || round.totalPoints - round.killedThisRound < 5 || game.math.distance(game.input.activePointer.worldX,game.input.activePointer.worldY,moose.x,moose.y)<100) {
				moose.enraged = true;
			}
		}
	}
}

function crowBehavior (crow) {
	const playerDistance = game.physics.arcade.distanceBetween(crow, player);
	const distance = [];
	let partnerDistance = 50000;
	let closestPartner;
	partners.forEachAlive(function (partner) {
		const distanceBetween = game.physics.arcade.distanceBetween(crow, partner);
		if (distanceBetween < Math.min.apply(Math, distance)) {
			closestPartner = partner;
			partnerDistance = distanceBetween;
		}
		distance[distance.length] = distanceBetween;
	}, this);
	if (partnerDistance<playerDistance) {
		if (partnerDistance>60) {
			crow.rotation = game.physics.arcade.angleToXY(crow, closestPartner.x,closestPartner.y) - 1.5;
			game.physics.arcade.moveToXY(crow, closestPartner.x,closestPartner.y, crow.speed);
			crow.animations.play('fly');
		}
		else {
			enemyAttackPartner(crow,closestPartner);
		}
	}
	else  {
		if (playerDistance>60) {
			crow.rotation = game.physics.arcade.angleToXY(crow, player.x, player.y) - 1.5;
			game.physics.arcade.moveToXY(crow, player.x, player.y, crow.speed);
			crow.animations.play('fly');
			

		}
		else if (player.energy) {
				player.cash += 20;
				player.score += 20;
				crow.kill();
		}	
		else {
			enemyAttackPlayer(crow);
			crow.body.setSize(48,48);
		}
	}

}
//To Do: Fix witch round end bug, fix helicopter mode picking powerups

function doctorBehavior (doctor) {
	//console.log('doctor.state=' + doctor.state);
	//console.log('doctor.moves=' + doctor.moves)
	//console.log('doctor.frozen=' + doctor.frozen)
	if (doctor.state === 'berserk') {
		if (game.physics.arcade.distanceBetween(doctor,player)>52) {
			moveOnPath(doctor);
		}
		else {
			enemyAttackPlayer(doctor);
		}
	}
	else {
		doctor.animations.play('stand',15,true);
		if (doctor.state === 'spawning') {
			//if (game.time.now % 10 == 0 && doctor.health < doctor.maxHealth) doctor.health++;
			if (enemies.iterate('state','spawning',1) === enemies.iterate('enemyType','doctor',1)) {
				
				if (doctor.spawnCount < doctor.maxSpawn && game.time.now > doctor.nextSpawn ) {
					doctor.nextSpawn = game.time.now + 1000;
					if (Math.random()>0.5) {
						doctor.animations.play('summon');
						doctor.spawnCount++;
						spawnFatso(doctor.x + game.rnd.integerInRange(-100,100),doctor.y + game.rnd.integerInRange(-100,100),true);
					}
				}
			}
			if (enemies.iterate('spawnCount',doctor.maxSpawn,1) === enemies.iterate('enemyType','doctor',1) && enemies.iterate('enemyType','fatso',1)===0 ) {
				doctor.state = 'berserk';
				doctor.tint = rgbToHex(255,255,255);
				doctor.body.immovable = false;
				doctor.body.moves = true;
				doctor.hitbyIceball = false;
			}
		}

	}
}

function kidBehavior (kid) {
	kid.circle.x = kid.x;
	kid.circle.y = kid.y;
	if (kid.pain.isPlaying) return false;
	const playerDistance = game.physics.arcade.distanceBetween(kid, player);
	const distance = [];
	let partnerDistance = 50000;
	let closestPartner;
	partners.forEachAlive(function (partner) {
		const distanceBetween = game.physics.arcade.distanceBetween(kid, partner);
		if (distanceBetween < Math.min.apply(Math, distance)) {
			closestPartner = partner;
			partnerDistance = distanceBetween;
		}
		distance[distance.length] = distanceBetween;
	}, this);
	
	if (kid.state==='slash') {
		if (partnerDistance<60) {
			enemyAttackPartner(kid,closestPartner);
			kid.body.velocity.x = 0;
			kid.body.velocity.y = 0;
		}
		else if (playerDistance<60) {
			enemyAttackPlayer(kid);
			kid.body.velocity.x = 0;
			kid.body.velocity.y = 0;
		}
		else {
			moveOnPath(kid);
		}	
	}
	else if (kid.state==='shoot') {
		if (partnerDistance>400 && playerDistance>400) {
			moveOnPath(kid);
			kid.nextFire = game.time.now + 200;

		}
		else {
			//moveOnPath(kid);

			if(playerDistance<partnerDistance) kid.rotation = game.physics.arcade.angleBetween(kid,player) - 1.57;
			else kid.rotation = game.physics.arcade.angleBetween(kid,closestPartner) - 1.57;
			if (!kid.animations.currentAnim.isPlaying && game.time.now > kid.nextFire && player.alive) {
				kid.nextFire = game.time.now + 500 - 5*round.bossSpecial;
				if (Math.random()>0.5) {
					kid.animations.play('shoot');
					kidshootsound.play();
					kid.body.velocity.x = 0;
					kid.body.velocity.y = 0;
					for (i=0;i<5;i++) {
						const bullet = enemyBullets.create(player.x - 20, player.y - 15, 'soldier', "tracer.png");
						bullet.position = Phaser.Circle.circumferencePoint(kid.circle,kid.rotation+1.62);
						bullet.rotation = kid.rotation - 0.5 + 0.25*i;
						bullet.body.setSize(16,16,0,0);
						bullet.anchor.set(0.5,0.5);
						bullet.attackPower = 5;
						game.physics.arcade.velocityFromRotation(bullet.rotation+1.57,850,bullet.body.velocity);
						bullet.lifespan = 900;
					}

				}
			}
		
		}
	}
}

function pyroBehavior (pyro) {
	pyro.circle.x = pyro.x;
	pyro.circle.y = pyro.y;
	//if (pyro.pain.isPlaying) return false;
	const playerDistance = game.physics.arcade.distanceBetween(pyro, player);
	const distance = [];
	let partnerDistance = 50000;
	let closestPartner;
	partners.forEachAlive(function (partner) {
		const distanceBetween = game.physics.arcade.distanceBetween(pyro, partner);
		if (distanceBetween < Math.min.apply(Math, distance)) {
			closestPartner = partner;
			partnerDistance = distanceBetween;
		}
		distance[distance.length] = distanceBetween;
	}, this);
	
	if (pyro.state==='berserk') {
		if (partnerDistance>400 && playerDistance > 400) moveOnPath(pyro);
			
		else {
			if (playerDistance<partnerDistance) pyro.rotation = game.physics.arcade.angleBetween(pyro,player) - 1.57;
			else pyro.rotation = game.physics.arcade.angleBetween(pyro,closestPartner) - 1.57;
			if (!pyro.animations.currentAnim.isPlaying && game.time.now > pyro.nextFire && player.alive) {
				pyro.nextFire = game.time.now + 600;
				if (Math.random()>0.6) {
					pyro.body.velocity.x = 0;
					pyro.body.velocity.y = 0;
					pyro.animations.play('fire');
					//console.log(pyro.animations);
					const fireball = [];
					for (i=0;i<4;i++) {
						fireball[i] = vomitballs.create(1,1,'fireballs', "fireball_0001.png"); 
						fireball[i].health = 2;
						fireball[i].anchor.set(0.5,0.5);
						fireball[i].lifespan = 800;
						fireball[i].body.setSize(16,16,0,0);
						fireball[i].animations.add('fly',[ "fireball_0001.png", "fireball_0002.png", "fireball_0003.png", "fireball_0004.png", "fireball_0005.png", "fireball_0006.png"],20,true);
						fireball[i].animations.add('explode',["fireball_hit_0001.png","fireball_hit_0002.png","fireball_hit_0003.png","fireball_hit_0004.png","fireball_hit_0005.png","fireball_hit_0006.png","fireball_hit_0007.png","fireball_hit_0008.png","fireball_hit_0009.png"],15);
						fireball[i].animations.play('fly');
						fireball[i].attackPower = pyro.attackPower;
						fireball[i].events.onKilled.add(function (ball) {ball.destroy()},this)	
					}
					
					fireball[0].position = Phaser.Circle.circumferencePoint(pyro.circle,pyro.rotation+1);
					fireball[1].position = Phaser.Circle.circumferencePoint(pyro.circle,pyro.rotation+2);
					fireball[2].position = Phaser.Circle.circumferencePoint(pyro.circle,pyro.rotation+1);
					fireball[3].position = Phaser.Circle.circumferencePoint(pyro.circle,pyro.rotation+2);
					
					fireball[0].rotation = pyro.rotation + 1.57;
					fireball[1].rotation = pyro.rotation + 1.57;
					fireball[2].rotation = game.physics.arcade.angleToXY(fireball[2], player.x+player.body.velocity.x*(playerDistance/600),player.y+player.body.velocity.y*(playerDistance/700));
					fireball[3].rotation = game.physics.arcade.angleToXY(fireball[3], player.x+player.body.velocity.x*(playerDistance/600),player.y+player.body.velocity.y*(playerDistance/700));
					
					

					
					for (i=0;i<4;i++) {
						game.physics.arcade.velocityFromRotation(fireball[i].rotation,600,fireball[i].body.velocity);
					}
					
					//vomitball.rotation = game.physics.arcade.angleBetween(vomit,player);
				}
			}
		}
	}
	if (enemies.iterate('state','spawning',1) === enemies.iterate('enemyType','pyro',1) && !pyro.animations.currentAnim.isPlaying) {
		//console.log('bothspawning')
			if (pyro.spawnCount < pyro.maxSpawn && game.time.now > pyro.nextSpawn ) {
				pyro.nextSpawn = game.time.now + 1000;
				if (Math.random()>0.2) {
					pyro.animations.play('summon');
					pyro.spawnCount++;
					spawnZombie(pyro.x + game.rnd.integerInRange(-100,100),pyro.y + game.rnd.integerInRange(-100,100),true);
				}
			}
	}
	if (enemies.iterate('spawnCount',pyro.maxSpawn,1) === enemies.iterate('enemyType','pyro',1) && enemies.iterate('enemyType','zombie',1)===0 ) {
		pyro.state = 'berserk';
		//pyro.body.immovable = false;
		pyro.body.moves = true;
		pyro.hitbyIceball = false;
	}
	
}

function witchBehavior (witch) {
	witch.circle.x = witch.x;
	witch.circle.y = witch.y;
	
	witch.lightning.position = Phaser.Circle.circumferencePoint(witch.circle, witch.rotation+1);
	witch.lightning.rotation = witch.rotation - (0.2*player.lr) + ((game.time.now % 100)*0.004*player.lr) + 3.14159;

	const playerDistance = game.physics.arcade.distanceBetween(witch, player);
	const distance = [];
	let partnerDistance = 50000;
	let closestPartner;
	partners.forEachAlive(function (partner) {
		const distanceBetween = game.physics.arcade.distanceBetween(witch, partner);
		if (distanceBetween < Math.min.apply(Math, distance)) {
			closestPartner = partner;
			partnerDistance = distanceBetween;
		}
		distance[distance.length] = distanceBetween;
	}, this);
	if (game.time.now>witch.nextTeleport && playerDistance > 400 && partnerDistance > 400) {
		//var smoke = smokes.create(witch.x,witch.y,'smoke',"smoke_plume_0001.png");
		if (Math.random()>0.8) spawnCrow(witch.x,witch.y,true);
		telestartsound.play();
		witch.smoke.alpha = 1;
		witch.smoke.x = witch.x;
		witch.smoke.y = witch.y;
		/*smoke.animations.add('plume',[0,1,2,3,4,5,6,7,8,9]).onComplete.add(function () {
			teleendsound.play();
			witch.x = player.x + game.rnd.integerInRange(-200,200)
			witch.y = player.y + game.rnd.integerInRange(-200,200)
			var smoke2 = smokes.create(witch.x,witch.y,'smoke',"smoke_plume_0001.png");
			smoke2.anchor.setTo(0.5,0.5);
			game.add.tween(smoke2).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
			smoke2.animations.add('plume',[0,1,2,3,4,5,6,7,8,9])
			smoke2.animations.play('plume',10,false,true);
		 },this);*/
		//game.add.tween(smoke).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
		witch.smoke.alphaTween.start();
		witch.smoke.animations.play('plume');
		
		witch.x = -400;
		witch.y = -400;
		
		witch.nextTeleport = game.time.now + 5000 - 5*round.bossSpeed;
		
		/*var teleTimer = timer.add(function () {
			
		})*/
	}
	else if (playerDistance<520 || partnerDistance<520) {
		if (playerDistance<partnerDistance) witch.rotation = game.physics.arcade.angleBetween(witch,player) - 1.57;
		else witch.rotation = game.physics.arcade.angleBetween(witch,closestPartner) - 1.57;
		if (game.time.now>witch.nextFire) {
			if (witch.state === 'fire') {
				witch.nextFire = game.time.now + 500 - 5*round.bossSpecial;
				if (Math.random()>0.5) {
					witch.animations.play('fire');
					var shootTime = timer.add(490, function() {
						const fireball = vomitballs.create(1, 1, 'fireballs', null);
						fireball.animations.add('fly',["fireball_0001_blue.png","fireball_0002_blue.png","fireball_0003_blue.png","fireball_0004_blue.png","fireball_0005_blue.png","fireball_0006_blue.png"],10);
						fireball.animations.add('explode',["fireball_hit_0001_blue.png","fireball_hit_0002_blue.png","fireball_hit_0003_blue.png","fireball_hit_0004_blue.png","fireball_hit_0005_blue.png","fireball_hit_0006_blue.png","fireball_hit_0007_blue.png","fireball_hit_0008_blue.png","fireball_hit_0009_blue.png"],15);
						fireball.attackPower = 35;
						fireball.lifespan = 800;
						fireball.animations.play('fly');
						fireball.events.onKilled.add(function (ball) {ball.destroy()},this);
						fireball.position =  Phaser.Circle.circumferencePoint(witch.circle,witch.rotation);
						fireball.rotation = witch.rotation + 1.57;
						game.physics.arcade.velocityFromRotation(fireball.rotation,700,fireball.body.velocity);
						timer.remove(shootTime);
					} ,this)	
				}
			}
			else if (witch.state === 'lightning') {
				witch.nextFire = game.time.now + 5000;
				witch.animations.play('lightning');
				var shootTime = timer.add(700,function () {
					lightningfiresound.play();
					witch.lightning.scale.setTo(0,0);
					witch.lightning.alpha = 0;
					witch.lightning.frameName = 'bolt_strike_0001.png';
					witch.lightning.scaleTweenX.start();
					witch.lightning.scaleTweenY.start();
					witch.lightning.alphaTween.start();
					timer.remove(shootTime);
				},this);
				const strikes = [];
				for (i=0; i<20; i++) {
					strikes[i] = timer.add(2000+i*50,function () {
						partners.forEachAlive(function (partner) {
							let angleBetween = game.physics.arcade.angleBetween(partner, witch) - witch.rotation + 1.57;
							angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
							if (game.physics.arcade.distanceBetween(witch,partner)<512 && angleBetween<0.2) {
								partner.damage(5);
							}
						},this);
						var angleBetween = game.physics.arcade.angleBetween(player,witch) - witch.rotation + 1.57;
						angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
						if (playerDistance < 512 && angleBetween<0.2) {
							playerDamage(5);
						}
					timer.remove(strikes[i]);
					});
				}

			}
		}
	}
}

function partnerFireDualSMG (partner,x,y,enemy) {
	if (game.time.now > partner.nextFire && partner.reloaded && partner.dualsmg.magazineSize - partner.dualsmg.bulletsUsedInMagazine>0) {
		//console.log(partner.currentWeapon);
		partner.nextFire = game.time.now + 60/(dualsmg.rpm * 2);
		const bullet1 = bullets.create(partner.x, partner.y, 'soldier', "tracer.png");
		bullet1.position = Phaser.Circle.circumferencePoint(partner.circle,partner.rotation-2.5);
		bullet1.rotation = game.physics.arcade.angleToXY(bullet1,x,y) + 1.5;
		bullet1.lifespan = 1000;
		const bullet2 = bullets.create(partner.x, partner.y, 'soldier', "tracer.png");
		bullet2.position = Phaser.Circle.circumferencePoint(partner.circle,partner.rotation-1.98);
		bullet2.rotation = game.physics.arcade.angleToXY(bullet2,x,y) + 1.5;
		bullet2.lifespan = 1000;
		bullet1.attackPower = dualsmg.damage*2;
		bullet2.attackPower = dualsmg.damage*2;
		bullet1.visible = false;
		bullet2.visible = false;
		game.physics.arcade.moveToXY(bullet1, x, y, dualsmg.bulletVelocity);
		game.physics.arcade.moveToXY(bullet2, x, y, dualsmg.bulletVelocity);
		pistolsound.play(null,0.3);
		timer.add(1,function (){
			bullet1.visible = true;
			bullet2.visible = true;
		});
		partner.currentWeapon.bulletsUsedInMagazine++;
		enemy.firedAt += dualsmg.damage*4;
		bullet1.tint = rgbToHex(255,0,0);
		bullet2.tint = rgbToHex(255,0,0);
	}
	else if (partner.dualsmg.magazineSize - partner.dualsmg.bulletsUsedInMagazine===0) partnerReload(partner);
}

function partnerFireShotgun (partner,x,y,enemy) {
	if (game.time.now > partner.nextFire && partner.reloaded&& partner.shotgun.magazineSize - partner.shotgun.bulletsUsedInMagazine > 0) {
		//console.log('firedshotgun');
		partner.nextFire = game.time.now + 60/shotgun.rpm;
		shotgunsound.play();
		for (i=0;i<12;i++) {
			const pellet = bullets.create(partner.x - 20, partner.y - 15, 'soldier', "tracer.png");
			pellet.position = Phaser.Circle.circumferencePoint(partner.circle,partner.rotation-1.38);
			//pellet.rotation = partner.rotation;
			pellet.body.setSize(16,16,0,0);
			pellet.anchor.set(0.5,0.5);
			pellet.rotation = partner.rotation; //+ 1.5;
			game.physics.arcade.velocityFromRotation(game.physics.arcade.angleToXY(pellet,x,y)+game.math.degToRad(i*0.66-4),game.rnd.integerInRange(shotgun.bulletVelocity*0.9,shotgun.bulletVelocity*1.1),pellet.body.velocity);
			pellet.lifespan = 900;
			pellet.attackPower = shotgun.damage*2;
			pellet.tint = rgbToHex(255,0,0);
		}
		partner.shotgun.bulletsUsedInMagazine++;
		enemy.firedAt += shotgun.damage*20
	}
	else if (partner.shotgun.magazineSize - partner.shotgun.bulletsUsedInMagazine===0) partnerReload(partner);
}

function partnerFireMG (partner,x,y,enemy) {
	if (game.time.now > partner.nextFire && partner.reloaded && partner.currentWeapon.magazineSize - partner.currentWeapon.bulletsUsedInMagazine > 0) {
		partner.nextFire = game.time.now + 60/(machinegun.rpm * 2);
		machinegunsound.play();
		const bullet = bullets.create(partner.x - 20, partner.y - 15, 'soldier', "tracer.png");
		bullet.position = Phaser.Circle.circumferencePoint(partner.circle,partner.rotation-1.5);
		bullet.rotation = partner.rotation;
		bullet.body.setSize(16,16,0,0);
		bullet.anchor.set(0.5,0.5);
		bullet.attackPower = machinegun.damage*2;
		game.physics.arcade.moveToXY(bullet,x,y,machinegun.bulletVelocity);
		bullet.lifespan = 1200;
		partner.currentWeapon.bulletsUsedInMagazine++;
		enemy.firedAt += machinegun.damage*2;
		bullet.tint = rgbToHex(255,0,0);
	}
	else if (partner.machinegun.magazineSize - partner.machinegun.bulletsUsedInMagazine===0) partnerReload(partner);
}

function partnerFireRifle (partner,x,y,enemy) {
	if (game.time.now > partner.nextFire && partner.reloaded && partner.currentWeapon.magazineSize - partner.currentWeapon.bulletsUsedInMagazine > 0) {
		partner.nextFire = game.time.now + 60/(partner.currentWeapon.rpm * 2);
		riflesound.play();
		const bullet = bullets.create(partner.x - 20, partner.y - 15, 'soldier', "tracer.png");
		bullet.bulletType = 'rifle';
		bullet.position = Phaser.Circle.circumferencePoint(partner.circle,partner.rotation-1.5);
		bullet.rotation = partner.rotation;
		bullet.body.setSize(64,64,-16,-16);
		bullet.anchor.set(0.5,0.5);
		bullet.attackPower = partner.currentWeapon.damage*2;
		game.physics.arcade.moveToXY(bullet,x,y,rifle.bulletVelocity);
		bullet.lifespan = 1300;
		partner.currentWeapon.bulletsUsedInMagazine++;
		enemy.firedAt += rifle.damage*2;
		bullet.tint = rgbToHex(255,0,0);
	}
	else if (partner.rifle.magazineSize - partner.rifle.bulletsUsedInMagazine===0) partnerReload(partner);
	
}

/*function partnerFireRocket (partner,x,y,enemy) {
	if (game.time.now > partner.nextFire && partner.reloaded && partner.currentWeapon.magazineSize - partner.currentWeapon.bulletsUsedInMagazine > 0) {
		partner.nextFire = game.time.now + 60/partner.currentWeapon.rpm * 1000;
		var rocket = rockets.create(partner.x,partner.y,'powerups','shell_0001.png');
		rocket.position = Phaser.Circle.circumferencePoint(partner.circle,partner.rotation-1.4);
		rocket.rotation = partner.rotation;
		rocket.body.setSize(16,16,0,0);
		rocket.anchor.set(0.5,0.5);
		game.physics.arcade.moveToXY(rocket,x,y,rocketlauncher.bulletVelocity);
		rocket.lifespan = 1000;
		partner.currentWeapon.bulletsUsedInMagazine++;
		rocket.events.onKilled.add(rocketDeath,this);
		enemy.firedAt += rocketlauncher.damage
		//rocket.wobble = 20;
		rocket.game.add.tween(rocket)
			.to(
			{ wobble: -20 },
			250, Phaser.Easing.Sinusoidal.InOut, true, 0,
			Number.POSITIVE_INFINITY, true
		);
		rpgsound.play();
	}
	else if (partner.rocketlauncher.magazineSize - partner.rocketlauncher.bulletsUsedInMagazine==0) partnerReload(partner);	
}*/
/*function partnerMove (partner) {
	var targetRotation;
	if (partner.direction == "NW") {
		targetRotation = 5.4977871438;
		if (partner.rotation==targetRotation) {
			console.log('moving')
			partner.body.velocity.x = -partner.speed * 0.707;
			partner.body.velocity.y = -partner.speed * 0.707;
			partner.legs.animations.play('walk');
		}
	}
	else if (partner.direction == "NE") {
		targetRotation = 0.7853981634;
		if (partner.rotation==targetRotation) {
			console.log('moving')
			partner.body.velocity.x = partner.speed * 0.707;
			partner.body.velocity.y = -partner.speed * 0.707;
			partner.legs.animations.play('walk');
		}
	}
	else if (partner.direction == "N") {
		targetRotation = 0;
		if (partner.rotation==targetRotation) {
			console.log('moving')
			partner.body.velocity.y = -partner.speed;
			partner.legs.animations.play('walk');	
		}
	}
	else if (partner.direction == "SW") {
		targetRotation = 3.9269908170;
		if (partner.rotation==targetRotation) {
			console.log('moving')
			partner.body.velocity.x = -partner.speed * 0.707;
			partner.body.velocity.y = partner.speed * 0.707;
			partner.legs.animations.play('walk');	
		}

	}
	else if (partner.direction == "SE") {
		targetRotation = 2.3561944902;
		if (partner.rotation==targetRotation) {
			console.log('moving')
			partner.body.velocity.x = partner.speed * 0.707;
			partner.body.velocity.y = partner.speed * 0.707;
			partner.legs.animations.play('walk');		
		}
	}
	else if (partner.direction == "S") {
		targetRotation = 3.1415926536;
		if (partner.rotation==targetRotation) {
			console.log('moving')
			partner.body.velocity.y = partner.speed
			partner.legs.animations.play('walk');		
		}
	}
	else if (partner.direction == "W") {
		targetRotation = 4.7123889804;
		if (partner.rotation==targetRotation) {
			console.log('moving')
			partner.body.velocity.x = -partner.speed
			partner.legs.animations.play('walk');	
		}

	}
	else if (partner.direction == "E") {
		targetRotation = 1.5707963268;
		if (partner.rotation==targetRotation) {
			console.log('moving')
			partner.body.velocity.x = partner.speed
			partner.legs.animations.play('walk');		
		}

	}
	else if (partner.direction == 'NOPATH') {
		//argetRotation = 666;
		console.log('nodirection')
		partner.body.velocity.x = 0;
		partner.body.velocity.y = 0;
	}
	partner.rotation = targetRotation;
	/*if (game.time.now-partner.nextFire>1000 || 1<2) partner.rotation = targetRotation;
	else {
		var delta = targetRotation - partner.rotation;
		if (delta > Math.PI) delta -= Math.PI * 2;
		else if (delta < -Math.PI) delta += Math.PI * 2;
		if (delta>0) partner.rotation += 0.2;
		else if (delta<0) partner.rotation -= 0.2;
		if (Math.abs(delta)<0.2) partner.rotation = targetRotation;
		console.log(delta);
	}
	
	if (partner.rotation != targetRotation) {
		partner.body.velocity.x = 0;
		partner.body.velocity.y = 0;
		console.log('wrongrotation');
	}
}*/

function partnerMove (partner) {
	if (partner.direction === "NW") {
				partner.rotation = 5.4977871438;
				partner.body.velocity.x = -partner.speed * 0.707;
				partner.body.velocity.y = -partner.speed * 0.707;
				partner.legs.animations.play('walk');
			}

			else if (partner.direction === "NE") {
				partner.rotation = 0.7853981634;
				partner.body.velocity.x = partner.speed * 0.707;
				partner.body.velocity.y = -partner.speed * 0.707;
				partner.legs.animations.play('walk');
			}

			else if (partner.direction === "N") {
				partner.rotation = 0;
				partner.body.velocity.y = -partner.speed;
				partner.legs.animations.play('walk');
			}

			else if (partner.direction === "SW") {
				partner.rotation = 3.9269908170;
				partner.body.velocity.x = -partner.speed * 0.707;
				partner.body.velocity.y = partner.speed * 0.707;
				partner.legs.animations.play('walk');
			}
			else if (partner.direction === "SE") {
				partner.rotation = 2.3561944902;
				partner.body.velocity.x = partner.speed * 0.707;
				partner.body.velocity.y = partner.speed * 0.707;
				partner.legs.animations.play('walk');
			}
			else if (partner.direction === "S") {
				partner.rotation = 3.1415926536;
				partner.body.velocity.y = partner.speed;
				partner.legs.animations.play('walk');
			}
			else if (partner.direction === "W") {
				partner.rotation = 4.7123889804;
				partner.body.velocity.x = -partner.speed;
				partner.legs.animations.play('walk');
			}
			else if (partner.direction === "E") {
				partner.rotation = 1.5707963268;
				partner.body.velocity.x = partner.speed;
				partner.legs.animations.play('walk');
			}

			else if (partner.direction === 'NOPATH') {
				partner.body.velocity.x = 0;
				partner.body.velocity.y = 0;
			}
}

function partnerReload (partner) {
	if (partner.currentWeapon.ammoReserveLeft > 0 && partner.reloaded) {
		partner.reloaded = false;
		ammoCounter.text = 'Reloading...';
		let x;
		if (partner.currentWeapon === partner.dualsmg) {
			x = 2;
		}
		else {
			x = 1;
		}
		if (partner.currentWeapon.ammoReserveLeft >= partner.currentWeapon.bulletsUsedInMagazine * x) {
			partner.currentWeapon.ammoReserveLeft -= partner.currentWeapon.bulletsUsedInMagazine * x;
			partner.currentWeapon.bulletsUsedInMagazine = 0;
		}
		else {
			partner.currentWeapon.bulletsUsedInMagazine  -= Math.floor(partner.currentWeapon.ammoReserveLeft/x);
			if (partner.currentWeapon.ammoReserveLeft % x === 1) {
				partner.currentWeapon.ammoReserveLeft = 1
			}
			else {
				partner.currentWeapon.ammoReserveLeft = 0;
			}
		}
		timer.add(partner.currentWeapon.reloadTime, function (partner) {
			partner.reloaded = true;
			if (partner.mightSwap) {
				
				/*if (Math.random()>0.5)*/ game.rnd.pick(partner.weaponChoices)(partner);
				partner.mightSwap = false;
			}
			//else partner.mightSwap = true;
		}, this,partner)
	}
	else if (partner.currentWeapon.ammoReserveLeft === 0) game.rnd.pick(partner.weaponChoices)(partner);
}




function partnerBehavior (partner) {
	partner.circle.x = partner.x;
	partner.circle.y = partner.y;
	partner.beamCircle.x = partner.x;
	partner.beamCircle.y = partner.y;
	partner.beamCircle2.x = partner.x;
	partner.beamCircle2.y = partner.y;
	let closestEnemy;
	let enemyDistance;
	let goMove = true;
	if (enemies.countLiving()>0) {
		var distance = [];
		enemies.forEachAlive(function (enemy) {
			const distanceBetween = game.physics.arcade.distanceBetween(enemy, partner);
			if (enemy.firedAt<enemy.health && enemy.state!=='spawning') {
				if (distanceBetween < Math.min.apply(Math, distance)) {
					closestEnemy = enemy;
					enemyDistance = distanceBetween;
				}
				distance[distance.length] = distanceBetween;
			}
		}, this);
		crows.forEachAlive(function (crow) {
			let distanceBetween = game.physics.arcade.distanceBetween(crow, turret);
			if (crow.firedAt>crow.health) distanceBetween *= 2;
			if (distanceBetween < Math.min.apply(Math, distance)) {
				closest = crow;
				enemyDistance = distanceBetween;
			}
			distance[distance.length] = distanceBetween;

		}, this);
		if (enemyDistance<500) {
			let sensitivity;
			if (partner.currentWeapon === partner.rocketlauncher) sensitivity = 0.2;
			else if (enemyDistance<200) sensitivity = 0.1;
			else sensitivity = 0.02;
			const timetoHit = enemyDistance / partner.currentWeapon.bulletVelocity;
			const deflectX = closestEnemy.x + closestEnemy.body.velocity.x * timetoHit;
			const deflectY = closestEnemy.y + closestEnemy.body.velocity.y * timetoHit;
			const targetAngle = game.physics.arcade.angleToXY(partner, deflectX, deflectY) + 1.5707963268;
			let delta = targetAngle - partner.rotation;
			if (delta > Math.PI) delta -= Math.PI * 2;
			
			else if (delta < -Math.PI) delta += Math.PI * 2;
			if (delta > 0.1) {
				partner.rotation += 0.1
			}
			else if (delta < -0.1){
				partner.rotation -= 0.1;
			}
			else if (delta>0 && delta<0.1) partner.rotation += 0.02;
			else if (delta<0 && delta>-0.1) partner.rotation -= 0.02;
			
			if (Math.abs(delta)<sensitivity) {
				partner.rotation = targetAngle;
				if(partner.currentWeapon===partner.dualsmg) {
					partnerFireDualSMG(partner,deflectX,deflectY,closestEnemy);
				}
				else if (partner.currentWeapon===partner.shotgun) {
					partnerFireShotgun(partner,deflectX,deflectY,closestEnemy);
				}
				else if (partner.currentWeapon===partner.machinegun) {
					partnerFireMG(partner,deflectX,deflectY,closestEnemy);
				}
				else if (partner.currentWeapon===partner.rifle) {
					partnerFireRifle(partner,deflectX,deflectY,closestEnemy);
				}
				/*else if (partner.currentWeapon==partner.rocketlauncher) {
					partnerFireRocket(partner,deflectX,deflectY,closestEnemy);
				}*/		
			}
			goMove = false;
			partner.body.velocity.x = 0;
			partner.body.velocity.y = 0;
		}
	}
	if (powerups.countLiving()>0 && goMove && player.currentWeapon!==helicopter) {
		//console.log('goforpowerups')
		var distance = [];
		let closestPowerup;
		powerups.forEachAlive(function (powerup) {
			const distanceBetween = game.physics.arcade.distanceBetween(powerup, partner);
			if (distanceBetween < Math.min.apply(Math, distance)) {
				closestPowerup = powerup;
			}
			distance[distance.length] = distanceBetween;

		}, this);
		if (closestPowerup && game.physics.arcade.distanceBetween(closestPowerup,partner)>150) {
			target = {x: closestPowerup.x, y: closestPowerup.y};
			findPath(partner,target);
			partnerMove(partner);
		}
		else {
			game.physics.arcade.moveToXY(partner, closestPowerup.x, closestPowerup.y, partner.speed);
			partner.rotation = game.physics.arcade.angleToXY(partner, closestPowerup.x, closestPowerup.y) + 1.5707963268;
			partner.legs.animations.play('walk');
		}
		goMove = false;
	}
	if (game.physics.arcade.distanceBetween(partner,player)>500 && goMove) {
		findPath(partner,player);
		partnerMove(partner);
		goMove = false;
	}
	if (goMove) {
		//console.log('donothing')
		partner.body.velocity.x = 0;
		partner.body.velocity.y = 0;
	}

}

function turretBehavior (turret) {
	turret.duration -= game.time.physicsElapsedMS;
	if (turret.duration<1) turret.animations.play('explode',15,false,true);
	const rotateSpeed = 0.1;
	if (enemies.countLiving()>0) {
		const distance = [];
		let closest;
		let enemyDistance;
		enemies.forEachAlive(function (enemy) {
			let distanceBetween = game.physics.arcade.distanceBetween(enemy, turret);
			if (enemy.onfire && enemy.enemyType !== 'vomit' && enemy.health < 10) distanceBetween *= 2;
			if (enemy.ice.alive && enemy.frozen>1) distanceBetween *= 2;
			if (enemy.firedAt>enemy.health) distanceBetween *= 2;
			if (distanceBetween < Math.min.apply(Math, distance) && enemy.state!=='spawning') {
				closest = enemy;
				enemyDistance = distanceBetween;
			}
			distance[distance.length] = distanceBetween;

		}, this);
		crows.forEachAlive(function (crow) {
			let distanceBetween = game.physics.arcade.distanceBetween(crow, turret);
			if (crow.firedAt>crow.health) distanceBetween *= 2;
			if (distanceBetween < Math.min.apply(Math, distance)) {
				closest = crow;
				enemyDistance = distanceBetween;
			}
			distance[distance.length] = distanceBetween;

		}, this);

		const targetAngle = game.physics.arcade.angleToXY(turret, closest.x, closest.y) + 1.5;
		//if (turret.rotation != targetAngle) {
		let delta = targetAngle - turret.rotation;
		if (delta > Math.PI) delta -= Math.PI * 2;
		else if (delta < -Math.PI) delta += Math.PI * 2;
		if (delta > 0) {
			turret.angle += 5
			//console.log('Counterclockwise')
		}
		else {
			turret.angle -= 5;
			//console.log(delta);
		}
		if (Math.abs(delta) < this.game.math.degToRad(5)) {
			turret.rotation = targetAngle;
			if (turret.turretType === 'MG') { // Machine Gun shooting
				if (game.time.now > turret.nextFire && enemyDistance < 750) {
					turret.animations.play('shoot');
					turret.nextFire = game.time.now + 60 / mgturret.rpm * 1000;
					mgturretsound.play();
					const bullet = bullets.create(player.x - 20, player.y - 15, 'soldier', 23);
					bullet.position = Phaser.Circle.circumferencePoint(turret.circle, turret.rotation - 1.6);
					bullet.rotation = turret.rotation;
					bullet.body.setSize(32,32,0,0);
					bullet.anchor.set(0.5, 0.5);
					bullet.attackPower = mgturret.damage+round.healthBonus*2;
					bullet.bulletType = 'rifle';
					game.physics.arcade.moveToXY(bullet, closest.x, closest.y, 3000);
					bullet.lifespan = 1200;
					turret.duration -= 50;
					closest.firedAt += mgturret.damage+round.healthBonus*2;
				}
			}
			else if (turret.turretType === 'Flame') {
				if (enemyDistance < 500) {
					turret.flameOn = true;
					turret.flame.alpha = 1; //Make it visible
					turret.duration -= game.time.physicsElapsedMS*1.5;
					turret.flame.position = Phaser.Circle.circumferencePoint(turret.circle, turret.rotation - 2.1);
					turret.flame.rotation = turret.rotation - 1.5;
					if (!turret.flame.animations.getAnimation('start').isPlaying && !turret.flame.animations.getAnimation('mid').isPlaying) {
						turret.flame.animations.play('start');
					}
					else if (turret.flame.animations.getAnimation('mid').isPlaying && game.time.now % 2 === 0) {
						enemies.forEachAlive(function (enemy) {
							let angleBetween = (game.physics.arcade.angleBetween(turret, enemy)) - ((turret.rotation - 1.5));
							angleBetween = Math.abs(game.math.wrapAngle(angleBetween, true));
							if (game.physics.arcade.distanceBetween(enemy, turret) < 512 && angleBetween < 0.2 || game.physics.arcade.distanceBetween(enemy, turret) < 180 && angleBetween < 1 && enemy.state !== 'spawning') {
								enemy.hit = true;
								player.cash += 1;
								player.score += 1;
								scoreText.text = 'Score: ' + player.score;
								cashText.text = 'Cash: ' + player.cash;
								enemy.damage(1);
								enemy.onfire = true;
								enemy.fireDegree = 0;
							}
						},this);
						vomitballs.forEachAlive(function (vomitball) {
							let angleBetween = game.physics.arcade.angleBetween(player, vomitball) - (player.rotation - flamethrower.rotateOffset);
							angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
							if (game.physics.arcade.distanceBetween(vomitball,player)<512 && angleBetween<0.6) {
								vomitball.kill();
							}
						},this);
						crows.forEachAlive(function (crow) {
							let angleBetween = game.physics.arcade.angleBetween(player, crow) - (player.rotation - flamethrower.rotateOffset);
							angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
							if (game.physics.arcade.distanceBetween(crow,player)<512 && angleBetween<0.6) {
								crow.kill();
								player.cash += 1;
								player.score += 1;
								scoreText.text = 'Score: ' + player.score;
								cashText.text = 'Cash: ' + player.cash;
							}
						},this);
					}
				}
			}
			else if (turret.turretType === 'Rocket') {
				if (game.time.now > turret.nextFire && enemyDistance < 600) {
					turret.nextFire = game.time.now + 60 / rocketturret.rpm * 1000;
					const rocket = rockets.create(player.x, player.y, 'powerups', 'shell_0001.png');
					rocket.position = Phaser.Circle.circumferencePoint(turret.circle,turret.rotation-1.4);
					rocket.rotation = turret.rotation;
					rocket.body.setSize(16,16,0,0);
					rocket.anchor.set(0.5,0.5);
					game.physics.arcade.moveToXY(rocket, closest.x, closest.y, 800);
					rocket.lifespan = 800;
					rocket.events.onKilled.add(rocketDeath,this);
					rpgsound.play();
					turret.duration -= 500;
				}
			}
			else if (turret.turretType==='Ice') {
				if (game.time.now > turret.nextFire && enemyDistance < 400) {
					turret.nextFire = game.time.now + 60 / iceturret.rpm * 1000;
					iceballfiresound.play();
					turret.animations.play('shoot');
					let iceball;
					if (iceballs.countDead()>0) {
						iceball = iceballs.getFirstDead();
						iceball.revive();
						iceball.animations.stop();
					}
					else {
						iceball = iceballs.create(player.x-20,player.y-15,'fireballs',"iceball_0001.png");
						iceball.body.setSize(64,64,0,0);
						iceball.anchor.set(0.5,0.5);
						iceball.animations.add('fly',[ "iceball_0001.png", "iceball_0002.png", "iceball_0003.png", "iceball_0004.png", "iceball_0005.png", "iceball_0006.png","iceball_0007.png","iceball_0008.png","iceball_0009.png","iceball_0010.png","iceball_0011.png","iceball_0012.png"]);
					}
					
					iceball.position = Phaser.Circle.circumferencePoint(turret.circle,turret.rotation-1.4);
					iceball.rotation = turret.rotation;
					iceball.attackPower = iceturret.damage+round.healthBonus*2;
					game.physics.arcade.moveToXY(iceball, closest.x, closest.y, 1500);
					iceball.lifespan = 1200;
					
					iceball.animations.play('fly',10,false,true);
					turret.duration -= 100;
					closest.firedAt += iceturret.damage+round.healthBonus*2;
				}
			}
			else if (turret.turretType==='Lightning') {
				turret.lightning.position = Phaser.Circle.circumferencePoint(turret.circle, turret.rotation - 2.1);
				turret.lightning.rotation = turret.rotation - (0.2*player.lr) + ((game.time.now % 100)*0.004*player.lr);
				if (game.time.now > turret.nextFire && enemyDistance < 512 && closest.health - closest.firedAt > 1 && !closest.onfire) {
					turret.nextFire = game.time.now + 60 / lightningturret.rpm * 1000;
					lightningfiresound.play();
					turret.lightning.scale.setTo(0,0);
					turret.lightning.alpha = 0;
					turret.lightning.frameName = 'bolt_strike_0001.png';
					turret.lightning.scaleTweenX.start();
					turret.lightning.scaleTweenY.start();
					turret.lightning.alphaTween.start();
					turret.duration -= 100;
					const strikes = [];
					for (i=0; i<20; i++) {
						strikes[i] = timer.add(1300+i*50,function () {
							enemies.forEachAlive(function (enemy) {
								let angleBetween = (game.physics.arcade.angleBetween(turret, enemy)) - ((turret.rotation - 1.5));
								angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
								if (game.physics.arcade.distanceBetween(enemy,turret)<512 && angleBetween<0.4 && enemy.state !== 'spawning' || game.physics.arcade.distanceBetween(enemy,turret)<100 && angleBetween<0.6 && enemy.state !== 'spawning') {
									enemy.hit = true;
									let icemulti = 1;
									if (enemy.ice.alive && enemy.frozen>1) icemulti = 4;
									enemy.damage(player.lightninggun.damage*0.05*icemulti+round.healthBonus);
									player.score += player.lightninggun.damage*0.05;
									player.cash += player.lightninggun.damage*0.05;
									scoreText.text = 'Score: ' + player.score;
									cashText.text = 'Cash: ' + player.cash;
							}},this);
							vomitballs.forEachAlive(function (vomitball) {
								let angleBetween = game.physics.arcade.angleBetween(player, vomitball) - (player.rotation - flamethrower.rotateOffset);
								angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
								if (game.physics.arcade.distanceBetween(vomitball,player)<512 && angleBetween<0.6) {
									vomitball.kill();
								}
							},this);
							crows.forEachAlive(function (crow) {
								let angleBetween = game.physics.arcade.angleBetween(player, crow) - (player.rotation - flamethrower.rotateOffset);
								angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true));
								if (game.physics.arcade.distanceBetween(crow,player)<512 && angleBetween<0.6) {
									crow.kill();
									player.cash += 5;
									player.score += 5;
									scoreText.text = 'Score: ' + player.score;
									cashText.text = 'Cash: ' + player.cash;
								}
							},this);
							timer.remove(strikes[i]);
						});
					}
				}	
			}
			//}
		}
		else {
			turret.flameOn = false;
		}
	}
	else {
		turret.flameOn = false;
	}
}

function roundEnd () {
	if (round.timeLeft>240) {
		player.score += round.timeLeft - 240;
		player.cash += round.timeLeft - 240;
	}
	timer.remove(round.timer);
	let secondsLeft = countdownTime;
	round.timeText.visible = false;
	countDownText.visible = true;
	countDownText.text = secondsLeft;
	turrets.forEachAlive(function (turret) {
		turret.duration -= 1000;
	},this);
	const countdown = timer.loop(1000, function () {
		secondsLeft--;
		if (secondsLeft < 1) {
			countDownText.visible = false;
			newRound();
			timer.remove(countdown);
		}
		countDownText.text = secondsLeft;
	});
	if (player.currentWeapon===helicopter || player.currentWeapon ===tank) playerDamage(25);
}

function newRound () {
		round.roundNumber++;
		round.enemiesLeftText.visible = true;
		round.roundText.text = 'Round: ' + round.roundNumber;
		if (round.roundNumber % 10 === 1) {
			round.totalPoints = round.totalPoints + Math.floor(round.totalPoints/10) + 3;
			round.healthBonus++;
			if (round.roundNumber % 200 === 41) round.bossHealth++;
			if (round.roundNumber % 200 === 81) round.bossSpeed++;
			if (round.roundNumber % 200 === 121) round.bossLives++;
			if (round.roundNumber & 200 === 161) round.bossSpecial++;
			if (round.roundNumber % 160 === 1) round.bossNumber++;
		}
		player.cash += 100;
		player.score += 100;
		

		
		
		if (player.score>statistics.highscore) {
			statistics.highscore = player.score;
			Lockr.set('highscore',player.score);
		}
		statistics.totalscore += (player.score - player.lastScoreSave);
		player.lastScoreSave = player.score;
		Lockr.set('totalscore',statistics.totalscore);


	statistics.totalrounds += round.roundNumber;
		Lockr.set('totalrounds',statistics.totalrounds);

		if (round.roundNumber > statistics.highestround) {
		statistics.highestround = round.roundNumber;
		Lockr.set('highestround',round.roundNumber);
		}
		scoreText.text = 'Score: ' + player.score;
		cashText.text = 'Cash: ' + player.cash;
		round.specialWeapon = false;
		round.usedPoints = 0;
		round.killedThisRound = 0;
		round.enemiesLeftText.text = 'Enemies Left: ' + (round.totalPoints - round.killedThisRound);

		turrets.forEachAlive(function (turret) {
			turret.duration -= 1000;
		},this);

		if (round.roundNumber%10 === 0) {
			if (round.roundNumber%40===10) bossRound(round.bossNumber,0,0,0);
			if (round.roundNumber%40===20) bossRound(0,round.bossNumber,0,0);
			if (round.roundNumber%40===30) bossRound(0,0,round.bossNumber,0);
			if (round.roundNumber%40===0) bossRound(0,0,0,round.bossNumber);
			round.enemiesLeftText.visible = false;
		}
		
		
		else setRoundTimer();
		
		if (round.roundNumber === 11) {
			EZGUI.components.buyMGTurretButton.text = 'Buy MG Turret - $' + mgturret.cost;
			EZGUI.components.buyFlameTurretButton.text = 'Buy Flame Turret - $' + flameturret.cost;
			EZGUI.components.buyRocketTurretButton.text = 'Buy Rocket Turret-$' + rocketturret.cost;
			EZGUI.components.buyIceTurretButton.text = 'Buy Ice Turret-$' + iceturret.cost;
			EZGUI.components.buyLightningTurretButton.text = 'Buy Lightning Turret-$' + lightningturret.cost;
		}
		
		if (player.currentWeapon===helicopter || player.currentWeapon ===tank) playerDamage(25);
	
}

function setRoundTimer () {
	round.timeLeft = roundTime;
	round.timeText.visible = true;
	round.timer = timer.loop(1000, function () {
		round.timeLeft--;
		if (round.timeLeft < 1) {
			round.timeText.text = '0:00';
			if (enemies.countLiving()>0) {
				enemy = enemies.getFirstAlive();
				enemy.damage(20);
				explodeAnim(enemy.x,enemy.y)
			}
			else if (turrets.countLiving>0) {
				turrets.getFirstAlive().lifespan -= 6000;
			}
			else if (partners.countLiving()>0) {
				partner = partners.getFirstAlive();
				partner.damage(50);
				explodeAnim(partner.x,partner.y);
			}
			else if (player.alive) {
				playerDamage(50);
				explodeAnim(player.x,player.y);
			}
		}
		else {
			if (round.timeLeft % 60 < 10) round.timeText.text = Math.floor(round.timeLeft/60) + ':0' + round.timeLeft % 60;
			else round.timeText.text = Math.floor(round.timeLeft/60) + ':' + round.timeLeft % 60;
		}
	})	
}

function bulletHit (enemy,bullet) {
	if (enemy.state==='spawning') {
		bullet.kill();
		return false;
	}
	if (enemy.alive) {
		if (bullet.bulletType !== 'rifle' || enemy.health > bullet.attackPower) bullet.kill();
		else bullet.attackPower -= enemy.health;

		if (enemy.ice.alive && enemy.frozen>1) bullet.attackPower *= 2;

		player.cash += (20+(bullet.attackPower*3));
		player.score += (20+(bullet.attackPower*3));

		enemy.hit = true;
		if (enemy.health <= bullet.attackPower) {
			player.cash += 10;
			player.score += 10;
		}
		if (bullet.bulletType!=='pellet') bullethitsound.play();
		scoreText.text = 'Score: ' + player.score;
		cashText.text = 'Cash: ' + player.cash;
		enemy.damage(bullet.attackPower);
		//enemy.onfire = true;
		//enemy.tint = 0xFF0000;
		let splat;

		if (splatter.countDead()>0) {
			splat = splatter.getFirstDead();
			splat.revive();
		}
		else {
			splat = splatter.create(0,0,'splatter',0);
			splat.animations.add('gib',[0,1,2,3,4,5,6]);
			splat.anchor.setTo(0.5,0.5);
		}
		if (bullet.bulletType!=='rifle') {
			splat.x = (bullet.x+enemy.x)*0.5;
			splat.y = (bullet.y+enemy.y)*0.5;
		} 
		else {
			splat.x = (bullet.x+enemy.x*2)/2;
			splat.y = (bullet.y+enemy.y*2)/3
		} 	
		splat.animations.play('gib',15,false,true);

	}
	enemies.forEachAlive(function (moose) {
		if (moose.enemyType==='moose') {
			if (game.physics.arcade.distanceBetween(enemy,moose)<500) moose.enraged = true;
		}
	},this)
}

function bulletHitCrow (crow,bullet) {
	crow.damage(bullet.attackPower);

	if (crow.health <= bullet.attackPower) {
			player.cash += 10;
			player.score += 10;
	} 
	else bullet.kill();
	if (bullet.bulletType!=='rifle') bullet.kill();
	else bullet.attackPower -= crow.health;
	
	
	player.cash += (20+(bullet.attackPower*3));
	player.score += (20+(bullet.attackPower*3));
	scoreText.text = 'Score: ' + player.score;
	cashText.text = 'Cash: ' + player.cash;
}



/*function bulletHitTurret(bullet,turret) {
	if (bullet.bulletType != 'turret') {
		bullet.kill();
		turret.kill();
	}
}*/

function zombieTouchTurret (enemy,turret) {
	enemy.damage(1);
	turret.duration -= 25000;
}

function rocketHit(enemy,rocket) {
	enemy.hit = true;
	enemy.damage(rocket.attackPower*0.5);
	player.cash+=100;
	player.score+=100;
	rocket.kill();
}

/*function zombieTouchGuts (enemy,particles) {
	if (enemy.enemyType == 'moose') {
		enemy.enraged = true;
	}
}*/

function zombieCollision (enemy1,enemy2) {
	if (enemy1.enemyType === 'moose') {
		enemy1.enraged = true;
	}
	if (enemy2.enemyType === 'moose') {
		enemy2.enraged = true;
	}
	if (enemy1.onfire && !enemy2.onfire && enemy1.fireDegree<4) {
		enemy2.onfire = true;
		enemy2.fireDegree = enemy1.fireDegree + 1;
	}
	else if (enemy2.onfire && !enemy1.onfire && enemy2.fireDegree<4) {
		enemy1.onfire = true;
		enemy1.fireDegree = enemy2.fireDegree + 1;
	}
	if (enemy1.ice.alive || enemy2.ice.alive) {
		enemy1.body.velocity.x = 0;
		enemy1.body.velocity.y = 0;
		enemy2.body.velocity.x = 0;
		enemy2.body.velocity.y = 0;
	}
	if (enemy1.body.immovable) enemy2.body.immovable;
	else if (enemy2.body.immovable) enemy1.body.immovable;
}

function playerEnemyCollision (player,enemy) {
	if (player.energy && enemy.state !== 'spawning') {
		let dmg = game.math.distance(player.body.velocity.x, player.body.velocity.y, enemy.body.velocity.x, enemy.body.velocity.y);
		playerDamage(5);
		//dmg = Math.floor(dmg * 0.4 - 20)
		if (dmg < 0) dmg = 0;
		enemy.hit = true;
		enemy.damage(dmg);
		//console.log(dmg);
	}
}


function rocketDeath (rocket) {
	enemies.forEachAlive(function (enemy) {
		const distance = game.physics.arcade.distanceBetween(enemy, rocket);
		if (distance<250 && enemy.state !== 'spawning') {
			enemy.hitByRocket = true;
			player.cash += 40;
			player.score += 40;
			enemy.hit = true;
			let rocketDamage = Math.ceil(rocket.attackPower * 0.5 * (1 - distance * 0.004));
			if (rocketDamage>rocket.attackPower) rocketDamage = rocket.attackPower;
			//console.log(rocketDamage);
			//if (enemy.enemyType == 'doctor') enemy.damage(rocketDamage*0.6);
			enemy.damage(rocketDamage);
			enemy.tint = rgbToHex(255,10,10);

		}
	});
	crows.forEachAlive(function (crow) {
		if (game.physics.arcade.distanceBetween(crow,rocket)<250) {
			player.cash += 40;
			player.score += 40;
			crow.kill();
		}
	},this);
	scoreText.text = 'Score: ' + player.score;
	cashText.text = 'Cash: ' + player.cash;	
	explosion(rocket.x,rocket.y);
	explodeAnim(rocket.x,rocket.y);

}

function explodeAnim (x,y) {
	explosionsound.play();
	const explodeanim = explosions.create(x, y, 'explosion', 1);
	explodeanim.lightSize = 0;
	explodeanim.anchor.setTo(0.5,0.5);
	explodeanim.angle = game.rnd.integerInRange(-180,180);
	const size = game.add.tween(explodeanim.scale).to({x: 2, y: 2}, 500, Phaser.Easing.Exponential.In, true);
	const lightGrow = game.add.tween(explodeanim).to({lightSize: 80}, 500, Phaser.Easing.Linear.In, false);
	const lightShrink = game.add.tween(explodeanim).to({lightSize: 0}, 500, Phaser.Easing.Linear.In, false);
	lightGrow.chain(lightShrink);
	lightGrow.start();
	//explodeanim.animations.add('boom',["expl_06_0000.png","expl_06_0001.png","expl_06_0002.png","expl_06_0003.png","expl_06_0004.png","expl_06_0005.png","expl_06_0006.png","expl_06_0007.png","expl_06_0008.png","expl_06_0009.png","expl_06_00010.png","expl_06_00011.png","expl_06_00012.png","expl_06_00013.png","expl_06_00014.png","expl_06_00015.png","expl_06_00016.png","expl_06_00017.png","expl_06_00018.png","expl_06_00019.png","expl_06_0020.png","expl_06_0021.png","expl_06_0022.png","expl_06_0023.png","expl_06_0024.png","expl_06_0025.png","expl_06_0026.png","expl_06_0027.png","expl_06_0028.png","expl_06_0029.png","expl_06_0030.png","expl_06_0031.png"]);
	explodeanim.animations.add('boom',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
	explodeanim.animations.play('boom',20,false,true);
	
}

function explosion(x,y) {
	enemies.forEachAlive(function (enemy) {
		const mass = enemy.body.mass;
		const radius = 100;
		const distance = game.physics.arcade.distanceToXY(enemy, x, y);
		const force = 10;
		//var angle =  game.physics.arcade.angleToXY(enemy,x,y);
		const angle = game.math.angleBetween(x, y, enemy.x, enemy.y);
		//game.physics.arcade.moveToXY(enemy,x,y,-100);
		if (distance<radius) {
			enemy.shocked = true;
			timer.add(1000,function () {
				enemy.shocked = false;
				enemy.tint = rgbToHex(255,255,255);
			});
			enemy.body.velocity.x += Math.cos(angle) * ((force*radius - distance) / mass);
			enemy.body.velocity.y += Math.sin(angle) * ((force*radius - distance) / mass);
		}
	})
}

function playerHitTorch (sprite,torch) {
	playerBurn(1,2,100,0.001);
}

function vomitballHit (player,vomitball) {
	if (player.energy) {
		const fireball = fireballs.create(player.x - 20, player.y - 15, 'fireballs', "fireball_0001.png");
		fireball.position = vomitball.position;
		fireball.rotation = vomitball.rotation + 3.14159;
		fireball.body.setSize(16,16,0,0);
		fireball.anchor.set(0.5,0.5);
		fireball.attackPower = 1;
		game.physics.arcade.velocityFromRotation(fireball.rotation,600,fireball.body.velocity);
		fireball.lifespan = 1200;
		fireball.animations.add('fly',[ "fireball_0001.png", "fireball_0002.png", "fireball_0003.png", "fireball_0004.png", "fireball_0005.png", "fireball_0006.png"],20,true);
		fireball.animations.add('explode',["fireball_hit_0001.png","fireball_hit_0002.png","fireball_hit_0003.png","fireball_hit_0004.png","fireball_hit_0005.png","fireball_hit_0006.png","fireball_hit_0007.png","fireball_hit_0008.png","fireball_hit_0009.png"],15);
		fireball.animations.play('fly');
		vomitball.kill();
		return false;
	}
	
	
	vomitball.body.velocity.x *= 0.6;
	vomitball.body.velocity.y *= 0.6;

	playerDamage(vomitball.attackPower);
	if (player.currentWeapon===helicopter)		{
		tintPlayer(true);
		playerDamage(vomitball.attackPower);
		timer.add(100, function () {
			tintPlayer(false);
		});
	}
	vomitball.attackPower = 0;
	vomitball.animations.play('explode',20,false,true);
	//console.log(player.health);
}

function enemyBulletHit(player,enemyBullet) {
	playerDamage(enemyBullet.attackPower);
	const blood = game.rnd.pick([player.blood1, player.blood2]);
	blood.x = (player.x+enemyBullet.x)*0.5;
	blood.y = (player.y+enemyBullet.y)*0.5;
	blood.rotation = game.physics.arcade.angleBetween(player,enemyBullet);
	blood.animations.play('spurt');
	enemyBullet.kill();
	enemyBullet.destroy();
}

function enemyBulletHitPartner(partner,enemyBullet) {
	partner.damage(enemyBullet.attackPower);
	const blood = game.rnd.pick([partner.blood1, partner.blood2]);
	blood.x = (partner.x+enemyBullet.x)*0.5;
	blood.y = (partner.y+enemyBullet.y)*0.5;
	console.log(blood);
	blood.rotation = game.physics.arcade.angleBetween(partner,enemyBullet);
	blood.animations.play('spurt');

	
	/*var blood = game.rnd.pick([partner.blood1,partner.blood2]);
	blood.x = (partner.x*3+enemyBullet.x)*0.25;
	blood.y = (partner.y*3+enemyBullet.y)*0.25
	blood.rotation = game.physics.arcade.angleBetween(partner,enemyBullet)
	blood.animations.play('spurt');*/
	
	enemyBullet.kill();
	enemyBullet.destroy();
	//console.log('partnerHit')
}


function vomitballHitPartner (vomitball,partner) {
	partner.damage(vomitball.attackPower);
	vomitball.attackPower = 0;
	vomitball.body.velocity.x *= 0.6;
	vomitball.body.velocity.y *= 0.6;
	vomitball.animations.play('explode',20,false,true);
}

function fireballHit (enemy,fireball) {
	//vomitball.body.drag.x = 500;
	//vomitball.body.drag.y = 500;
	enemy.hit = true;
	enemy.fireDegree = 0;
	fireballhitsound.play(null,0,1,false,false);
	fireball.body.velocity.x *= 0.6;
	fireball.body.velocity.y *= 0.6;
	enemy.damage(fireball.attackPower);
	fireball.attackPower = 0;
	enemy.onfire = true;
	fireball.animations.play('explode',20,false,true);
	enemies.forEachAlive(function (moose) {
		if (moose.enemyType==='moose') {
			if (game.physics.arcade.distanceBetween(enemy,moose)<500) moose.enraged = true;;
		}
	},this);
	//console.log(player.health);
	player.cash += 40;
	player.score += 40;
	scoreText.text = 'Score: ' + player.score;
	cashText.text = 'Cash: ' + player.cash;
}

function iceballHit (enemy,iceball) {
	//vomitball.body.drag.x = 500;
	//vomitball.body.drag.y = 500;
	enemy.hit = true;
	iceballhitsound.play(null,0,1,false,false);
	//iceball.kill();
	//iceball.body.velocity.x *= 0.6;
	//iceball.body.velocity.y *= 0.6;
	if (enemy.onfire) enemy.onfire=false;
	else if (!enemy.hitbyIceball && enemy.state!=='spawning'){
		enemy.damage(iceball.attackPower);
		if (enemy.alive && !enemy.ice.alive && enemy.frozen===0) {
			iceball.kill();
			iceball.destroy();
		}
		enemy.frozen+=iceball.attackPower*2;
		enemy.tint = rgbToHex(40,110,255);
		if (enemy.frozen*2>=enemy.health) {
			enemy.ice.frameName = 'ice_break_0001.png';
			enemy.ice.revive();
			enemy.body.immovable = true;
			enemy.body.moves = false;
		}	
		
		enemy.hitbyIceball = true;
	}
	
	player.cash += 32;
	player.score += 32;
	scoreText.text = 'Score: ' + player.score;
	cashText.text = 'Cash: ' + player.cash;


	enemies.forEachAlive(function (moose) {
		if (moose.enemyType==='moose') {
			if (game.physics.arcade.distanceBetween(enemy,moose)<500) moose.enraged = true;;
		}
	},this)
	//console.log(player.health);
}

function fireballHitCrow (crow,fireball) {
	player.cash += 10;
	player.score += 10;
	scoreText.text = 'Score: ' + player.score;
	cashText.text = 'Cash: ' + player.cash;
	crow.kill();
}

function iceballHitCrow (crow,iceball) {
	player.cash += 10;
	player.score += 10;
	scoreText.text = 'Score: ' + player.score;
	cashText.text = 'Cash: ' + player.cash;
	crow.kill();
}




function vomitballHitBullet (bullet,vomitball) {
	if (vomitball.health>1) {
		if (bullet.bulletType !== 'rifle') bullet.kill();
		vomitball.damage(1)
	}
	vomitball.body.velocity.x *= 0.4;
	vomitball.body.velocity.y *= 0.4;
	vomitball.attackPower = 0;
	vomitball.animations.play('explode',20,false,true);
}





function vomitballHitTurret (vomitball,turret) {
	vomitball.body.velocity.x *= 0.4;
	vomitball.body.velocity.y *= 0.4;
	vomitball.attackPower = 0;
	vomitball.animations.play('explode',20,false,true);
	turret.duration -= 10000;

}

function enemyDeath (enemy) {
	burningsound.stop();
	
	timer.remove(enemy.pathfinder);
	timer.remove(enemy.dot);
	const particlesMade = game.rnd.integerInRange(6, 8);
	emitParticles(enemy.x,enemy.y,2000,particlesMade,enemy.emitter);
	
	if (round.timeLeft<1) return false;
	
	if (!enemy.specialSpawn && round.roundNumber % 10 !== 0) {
		if (enemy.hit) {
			player.cash += enemy.value;
			player.score += enemy.value;
			round.timeLeft += enemy.value*0.1;
			spawnPowerup(enemy.x,enemy.y,game.rnd.integerInRange(1,200));
			round.killedThisRound++;
			round.enemiesLeftText.text = 'Enemies Left: ' + (round.totalPoints - round.killedThisRound);	
		}
		else {
			round.usedPoints--;
		}

	}

	if (enemy.enemyType === 'zombie') {
		statistics.zombiesKilled++;
		Lockr.set('zombiesKilled',statistics.zombiesKilled);
	}
	else if (enemy.enemyType === 'fatso') {
		statistics.fatsosKilled++;
		Lockr.set('fatsosKilled',statistics.fatsosKilled);
	}
	else if (enemy.enemyType === 'vomit') {
		statistics.vomitsKilled++;
		Lockr.set('vomitsKilled',statistics.vomitsKilled);
	}
	else if (enemy.enemyType === 'dog') {
		statistics.dogsKilled++;
		Lockr.set('dogsKilled',statistics.dogsKilled);
	}
	else if (enemy.enemyType === 'crow') {
		statistics.crowsKilled++;
		Lockr.set('crowsKilled',statistics.crowsKilled);
	}
	else if (enemy.enemyType === 'moose') {
		statistics.mooseKilled++;
		Lockr.set('mooseKilled',statistics.mooseKilled);
	}

	player.cash += 10;
	player.score += 10;

	if (player.score>statistics.highscore) {
		statistics.highscore = player.score;
		Lockr.set('highscore',player.score);
	}

	scoreText.text = 'Score: ' + player.score;
	cashText.text = 'Cash: ' + player.cash;
	statistics.totalscore += (player.score - player.lastScoreSave);
	player.lastScoreSave = player.score;
	Lockr.set('totalscore',statistics.totalscore);

	//zombieemitter.start(true,17000,0,particlesMade,true);

	if (round.killedThisRound===round.totalPoints) {
		//timer.add(2000,newRound)
		roundEnd();
	}
	
	enemies.forEachAlive(function (moose) {
		if (moose.enemyType==='moose') {
			if (game.physics.arcade.distanceBetween(enemy,moose)<300) moose.enraged = true;;
		}
	},this)
}

function doctorDeath (doctor) {
	doctor.lives--;
	if (doctor.lives > 0) {
		doctor.frameName = "doctor_pain_0001.png";
		doctor.revive(doctor.maxHealth);
		//doctor.onfire = false;
		doctor.state = 'spawning';
		doctor.nextSpawn = game.time.now + 500;
		//doctor.tint = rgbToHex(120,120,255);
		doctor.hitbyIceball = false;
		doctor.body.immovable = true;
		doctor.body.moves = false;
	}
	else {
		emitParticles(doctor.x,doctor.y,15000,game.rnd.integerInRange(6,8),doctor.emitter);
		player.cash += doctor.value;
		player.score += doctor.value;

		statistics.doctorsKilled++;
		Lockr.set('doctorsKilled',statistics.doctorsKilled);
		if (enemies.countLiving()===0) {
			spawnPowerup(doctor.x-50,doctor.y-50,4);
			spawnPowerup(doctor.x-50,doctor.y+50,4);
			spawnPowerup(doctor.x+50,doctor.y-50,10);
			spawnPowerup(doctor.x+50,doctor.y+50,10);
			spawnPowerup(doctor.x,doctor.y,game.rnd.integerInRange(17,58));
			roundEnd();
		}
		//doctor.destroy();
	}
}

function kidDeath (kid) {
	kid.lives--;
	if (kid.lives>0) {
		kid.revive(kid.maxHealth);
		kid.animations.play('pain');
		kid.onfire = false;
		kid.frozen = 0;
		
	}
	else {
		player.cash += kid.value;
		player.score += kid.value;
		emitParticles(kid.x,kid.y,15000,game.rnd.integerInRange(6,8),kidemitter);
		if (enemies.countLiving()===0) {
			spawnPowerup(kid.x-40,kid.y-40,4);
			spawnPowerup(kid.x-40,kid.y+40,4);
			spawnPowerup(kid.x+40,kid.y-40,10);
			spawnPowerup(kid.x+40,kid.y+40,10);
			spawnPowerup(kid.x,kid.y,game.rnd.integerInRange(17,58));	
			roundEnd();
		}
	}
}

function pyroDeath (pyro) {
	pyro.lives--;
	if (pyro.lives > 0) {
		//doctor.frameName = "doctor_pain_0001.png";
		pyro.revive(pyro.maxHealth);
		pyro.animations.play('pain');
		//doctor.onfire = false;
		pyro.state = 'spawning';
		pyro.nextSpawn = game.time.now + 500;
		//doctor.tint = rgbToHex(120,120,255);
		pyro.hitbyIceball = false;
		pyro.body.moves = false;
		pyro.spawnCount = 0;
		pyro.nextSpawn = game.time.now + 2000;
	}
	else {
		emitParticles(pyro.x,pyro.y,15000,game.rnd.integerInRange(6,8),pyroemitter);
		player.cash += pyro.value;
		player.score += pyro.value;

		//statistics.doctorsKilled++;
		//Lockr.set('doctorsKilled',statistics.doctorsKilled);
		if (enemies.countLiving()===0) {
			spawnPowerup(pyro.x-50,pyro.y-50,4);
			spawnPowerup(pyro.x-50,pyro.y+50,4);
			spawnPowerup(pyro.x+50,pyro.y-50,10);
			spawnPowerup(pyro.x+50,pyro.y+50,10);
			spawnPowerup(pyro.x,pyro.y,game.rnd.integerInRange(17,58));
			roundEnd();
		}
	}
}

function witchDeath (witch) {
	witch.lives--;
	if (witch.lives>0) {
		witch.revive(witch.maxHealth);
		witch.animations.play('pain');
		witch.onfire = false;
		witch.frozen = 0;
		witch.nextFire = game.time.now + 2000;
		witch.nextTeleport = game.time.now + 6000;
		witch.smoke.alpha = 0;
		
		if (witch.state==='fire') witch.state = 'lightning';
		else witch.state = 'fire';

		spawnCrow(witch.x,witch.y,true);
		spawnCrow(witch.x,witch.y,true);
		spawnCrow(witch.x,witch.y,true);
	}
	else {
		player.cash += witch.value;
		player.score += witch.value;
		emitParticles(witch.x,witch.y,15000,game.rnd.integerInRange(6,8),witchemitter);
		if (enemies.countLiving()===0) {
			spawnPowerup(witch.x-40,witch.y-40,4);
			spawnPowerup(witch.x-40,witch.y+40,4);
			spawnPowerup(witch.x+40,witch.y-40,10);
			spawnPowerup(witch.x+40,witch.y+40,10);
			spawnPowerup(witch.x,witch.y,game.rnd.integerInRange(17,58));	
			roundEnd();
		}
	}
}

function spawnPowerup (x,y,random) {
	let powerup;
	let texture;
	if (random<=8) { // Cash
		if (random<5) {
			texture = 'cash_0001.png';
		}
		else {
			texture = 'cash_0002.png';
		}
		powerup = powerups.create(x,y,'powerups',texture);
		//powerup.body.setSize(32,32,16,16);
		powerup.powerupType = 'cash';
		powerup.lifespan = 30000;
		powerup.anchor.setTo(0.5,0.5);
		powerup.scale.setTo(0.5,0.5);
		powerup.scale.setTo(0.5,0.5);
		powerup.body.setSize(80,80,0,0);

	}
	if (random>8 && random<=17 && player.health < player.maxHealth && player.currentWeapon !== helicopter && player.currentWeapon !== tank) {
		powerup = powerups.create(x, y, 'powerups', "MedPak2_Pixel.png");
		powerup.powerupType = 'health';
	}
	if (random>17 && random<=25)	{ // Pistol Ammo
		if (random<21) {
			texture = "clip_0001.png";
		}
		else {
			texture = "clip_0002.png";
		}
		powerup = powerups.create(x,y,'powerups',texture);
		//powerup.body.setSize(32,32,16,16);
		powerup.powerupType = 'pistolAmmo';
		powerup.lifespan = 30000;
		powerup.anchor.setTo(0.5,0.5);
		powerup.scale.setTo(0.5,0.5);
		powerup.body.setSize(80,80,0,0);
	}
	if (random>25 && random<=31 && player.shotgun.purchased)	{ // Shotgun Ammo
		if (random>28) {
			texture = "buckshot_0001.png";
		}
		else {
			texture = "buckshot_0002.png";
		}

		powerup = powerups.create(x,y,'powerups',texture);
		//powerup.body.setSize(32,32,16,16);
		powerup.powerupType = 'shotgunAmmo';
		powerup.scale.setTo(0.5,0.5);
	}

	if (random>31 && random<=37 && player.machinegun.purchased)	{ // MG Ammo
		if (random>34) {
			texture = "ammobox_0001.png";
		}
		else {
			texture = "ammobox_0002.png";
		}

		powerup = powerups.create(x,y,'powerups',texture);
		powerup.powerupType = 'mgAmmo';
		powerup.scale.setTo(0.5,0.5);
	}
	if (random>37 && random<=43 && player.rifle.purchased)	{ // Rifle Ammo
		if (random>40) {
			texture = "bullets_0001.png";
		}
		else {
			texture = "bullets_0002.png";
		}

		powerup = powerups.create(x,y,'powerups',texture);
		powerup.powerupType = 'rifleAmmo';
		powerup.scale.setTo(0.5,0.5);
	}

	if (random>43 && random<=47 && player.rocketlauncher.purchased)	{ // Rocket Ammo
		if (random>45) {
			texture = "shell_0001.png";
		}
		else {
			texture = "shell_0002.png";
		}

		powerup = powerups.create(x,y,'powerups',texture);
		//powerup.body.setSize(32,32,16,16);
		powerup.powerupType = 'rocketAmmo';
	}

	if (random>47 && random<=51 && player.fireballgun.purchased)	{ 
		if (random>49) {
			texture = "flametank_0001.png";
		}
		else {
			texture = "flametank_0002.png";
		}

		powerup = powerups.create(x,y,'powerups',texture);
		powerup.powerupType = 'fireballAmmo';
		powerup.scale.setTo(0.8,0.8);
	}
	if (random>51 && random<=54 && player.iceballgun.purchased)	{ 
		powerup = powerups.create(x,y,'powerups',"smallsnowflake.png");
		powerup.powerupType = 'iceballAmmo';
		powerup.scale.setTo(0.4,0.4);
	}
	if (random>54 && random<=58 && player.lightninggun.purchased)	{ 
		if (random>56) {
			texture = "battery_0001.png";
		}
		else {
			texture = "battery_0002.png";
		}

		powerup = powerups.create(x,y,'powerups',texture);
		powerup.powerupType = 'lightningAmmo';
		powerup.scale.setTo(0.8,0.8);
		console.log('shouldhavedropped');
	}

	if (random>58 && random <=60 && round.roundNumber > 10 && player.currentWeapon !== flamethrower && player.currentWeapon !== minigun && player.currentWeapon !== helicopter && player.currentWeapon !== tank && !round.specialWeapon)	{ // Temporary flamethrower
		powerup = powerups.create(x,y,'soldier',"2h_flamethrower.png");
		powerup.powerupType = 'flamethrower';
		round.specialWeapon = true

	}

	if (random>60 && random <=62 && round.roundNumber > 10 && player.currentWeapon !== flamethrower && player.currentWeapon !== minigun && player.currentWeapon !== helicopter && player.currentWeapon !== tank &&  !round.specialWeapon)	{ // Temporary minigun
		powerup = powerups.create(x,y,'soldier',"2h_minigun.png");
		//powerup.body.setSize(32,32,16,16);
		powerup.powerupType = 'minigun';
		powerup.lifespan = 30000;
		round.specialWeapon = true;
	}

	if (random>62 && random<=64 && round.roundNumber>10 && !round.specialWeapon && player.currentWeapon !== helicopter && player.currentWeapon !== tank) {
		powerup = powerups.create(x,y,'powerups',"smallpurple.png");
		powerup.powerupType = 'energy';
		powerup.scale.setTo(0.5,0.5);
		round.specialWeapon = true;
	}
	if (random===65 && round.roundNumber>10 && !round.specialWeapon && player.currentWeapon !== helicopter && player.currentWeapon !== tank) {
		powerup = powerups.create(x,y,'extrapowerups',"helicopterammo.png");
		//powerup.body.setSize(32,32,16,16);
		powerup.powerupType = 'helicopter';
		powerup.scale.setTo(0.25,0.25);
		round.specialWeapon = true;
	}
	if (random===66 /*&& round.roundNumber>10*/ && !round.specialWeapon && player.currentWeapon !== helicopter && player.currentWeapon !== tank) {
		powerup = powerups.create(x,y,'extrapowerups',"tank2.png");
		powerup.powerupType = 'tank';
		powerup.scale.setTo(0.5,0.5);
		round.specialWeapon = true;
	}
	
	if (powerup!=null) {
		powerup.lifespan = 60000;
		powerup.anchor.setTo(0.5,0.5);
		powerup.body.setSize(80,80,0,0);
		powerup.pickedUp = false;
	}

}




function powerupActivate (powerup) {
	//console.log(sprite);
	if (powerup.pickedUp) return false;
	statistics.totalpowerupspickedup++;
	Lockr.set('totalpowerupspickedup',statistics.totalpowerupspickedup);
	
	if (powerup.powerupType==='cash') {
		player.cash += 200;
		player.score += 200;
		if (player.score>statistics.highscore) {
			statistics.highscore = player.score;
			Lockr.set('highscore',player.score);
		}
		statistics.totalscore += (player.score - player.lastScoreSave);
		player.lastScoreSave = player.score;
		Lockr.set('totalscore',statistics.totalscore);
		
		scoreText.text = 'Score: ' + player.score;
		cashText.text = 'Cash: ' + player.cash;
	}
	if (powerup.powerupType==='pistolAmmo') {
		player.pistoltype.ammoReserveLeft += (player.pistoltype.magazineSize*2);

		if (player.pistoltype.ammoReserveLeft>player.pistoltype.ammoReserve) {
			player.pistoltype.ammoReserveLeft = player.pistoltype.ammoReserve;
		}
		resetAmmoCounter();
		
		partners.forEachAlive(function (partner) {
			partner.dualsmg.ammoReserveLeft += (partner.dualsmg.magazineSize*2);
			if (partner.dualsmg.ammoReserveLeft>partner.dualsmg.ammoReserve) {
				partner.dualsmg.ammoReserveLeft = partner.dualsmg.ammoReserve;
			}
		},this);
	}
	
	if (powerup.powerupType==='shotgunAmmo') {
		player.shotgun.ammoReserveLeft += 20;
		if (player.shotgun.ammoReserveLeft>player.shotgun.ammoReserve) {
			player.shotgun.ammoReserveLeft = player.shotgun.ammoReserve;
		}
		resetAmmoCounter();
		partners.forEachAlive(function (partner) {
			partner.shotgun.ammoReserveLeft += (partner.shotgun.magazineSize*2);
			if (partner.shotgun.ammoReserveLeft>partner.shotgun.ammoReserve) {
				partner.shotgun.ammoReserveLeft = partner.shotgun.ammoReserve;
			}
		},this);		
	}
	if (powerup.powerupType==='mgAmmo') {
		player.machinegun.ammoReserveLeft += 200;
		if (player.machinegun.ammoReserveLeft>player.machinegun.ammoReserve) {
			player.machinegun.ammoReserveLeft = player.machinegun.ammoReserve;
		}
		partners.forEachAlive(function (partner) {
			partner.machinegun.ammoReserveLeft += (partner.machinegun.magazineSize*2);
				if (partner.machinegun.ammoReserveLeft>partner.machinegun.ammoReserve) {
					partner.machinegun.ammoReserveLeft = partner.machinegun.ammoReserve;
				}
		},this);	
		resetAmmoCounter();
	}
	
	if (powerup.powerupType==='rocketAmmo') {
		player.rocketlauncher.ammoReserveLeft += (player.rocketlauncher.magazineSize*2);
		if (player.rocketlauncher.ammoReserveLeft>rocketlauncher.ammoReserve) {
			player.rocketlauncher.ammoReserveLeft = player.rocketlauncher.ammoReserve;
		}
		resetAmmoCounter();
		/*partners.forEachAlive(function (partner) {
			partner.rocketlauncher.ammoReserveLeft += (partner.rocketlauncher.magazineSize*2)
				if (partner.rocketlauncher.ammoReserveLeft>partner.rocketlauncher.ammoReserve) {
					partner.rocketlauncher.ammoReserveLeft = partner.rocketlauncher.ammoReserve;
				}
			},this);*/	
	}
	
	if (powerup.powerupType==='rifleAmmo') {
		player.rifle.ammoReserveLeft += player.rifle.magazineSize*2;
		if (player.rifle.ammoReserveLeft>player.rifle.ammoReserve) {
			player.rifle.ammoReserveLeft = player.rifle.ammoReserve;
		}
		resetAmmoCounter();
		partners.forEachAlive(function (partner) {
			partner.rifle.ammoReserveLeft += (partner.rifle.magazineSize*2);
				if (partner.rifle.ammoReserveLeft>partner.rifle.ammoReserve) {
					partner.rifle.ammoReserveLeft = partner.rifle.ammoReserve;
				}
			},this);
	}

	if (powerup.powerupType==='fireballAmmo') {
		player.fireballgun.ammoReserveLeft += player.fireballgun.magazineSize*2;
		if (player.fireballgun.ammoReserveLeft>player.fireballgun.ammoReserve) {
			player.fireballgun.ammoReserveLeft = player.fireballgun.ammoReserve;
		}
		resetAmmoCounter();
	}
	if (powerup.powerupType==='iceballAmmo') {
		player.iceballgun.ammoReserveLeft += player.iceballgun.magazineSize*2;
		if (player.iceballgun.ammoReserveLeft>player.iceballgun.ammoReserve) {
			player.iceballgun.ammoReserveLeft = player.iceballgun.ammoReserve;
		}
		resetAmmoCounter();
	}
	if (powerup.powerupType==='lightningAmmo') {
		player.lightninggun.ammoReserveLeft += player.lightninggun.magazineSize*2;
		if (player.lightninggun.ammoReserveLeft>player.lightninggun.ammoReserve) {
			player.lightninggun.ammoReserveLeft = player.lightninggun.ammoReserve;
		}
		resetAmmoCounter();
	}
	
	if (powerup.powerupType==='health') {
		//player.health = player.maxHealth;
		if (!player.energy && player.currentWeapon!==helicopter && player.currentWeapon!==tank) {
			player.health = player.maxHealPoint + 25;
			player.maxHealPoint = player.health;
			if (player.health > player.maxHealth) player.health = player.maxHealth;
		}
		partners.forEachAlive(function (partner) {partner.health = partner.maxHealth},this);
		updateHealthBar();
	}
	
	if (player.currentWeapon===helicopter || player.currentWeapon === tank) {
		powerup.kill();
		return false;
	}
		
	if (powerup.powerupType==='energy') {
		player.energy = true;
		player.health = 300;
		player.maxHealPoint = player.health;
		player.speed = 400;
		player.body.drag.x = 600;
		player.body.drag.y = 600;
		player.tank = true;
		updateHealthBar();
		const drain = timer.loop(500, function () {
			playerDamage(2);
			if (player.health <= 100) {
				player.speed = 200;
				player.body.drag.x = 300;
				player.body.drag.y = 300;
				player.maxHealth = 100;
				player.maxHealPoint = 100;
				if (player.health > player.maxHealth) {
					player.health = player.maxHealth;
				}
				player.energy = false;
				player.weapon.visible = true;
				player.tank = false;
				updateHealthBar();
				timer.remove(drain);
			}
		});
	}


	if (powerup.powerupType==='flamethrower') {
		flamethrower.duration = flamethrower.maxDuration;
		flamethrower.heat = 0;
		equipFlame();
		resetAmmoCounter();
	}

	if (powerup.powerupType==='minigun') {
		equipMinigun();
	}
	if (powerup.powerupType==='helicopter') {
		equipHelicopter();
		//equipHelicopter();
	}
	
	if (powerup.powerupType==='tank') {
		equipTank();
		powerup.kill();
		const wait = timer.add(1000, function () {
			equipTank();
			timer.remove(wait);
		}, this);
		//equipHelicopter();
	}
	
	pickupsound.play();
	powerup.checkWorldBounds = true;
	powerup.outOfBoundsKill = true;
	powerup.pickedUp = true;
	powerup.scale.x *=2;
	powerup.scale.y *= 2;
	powerup.body.gravity.y = -1000;
	statistics.totalpowerupspickedup++;
	Lockr.set('totalpowerupspickedup',statistics.totalpowerupspickedup);
}

function pickPowerUp (sprite,powerup) {
	powerupActivate(powerup);
}

function partnerPowerup (partner,powerup) {
	powerupActivate(powerup);
}

function cleanUp() {
	const aCleanup = [];
	enemies.forEachDead(function(item){
		enemies.remove(item);
		aCleanup.push(item);
	});
	bullets.forEachDead(function(item){
		bullets.remove(item);
		aCleanup.push(item);
	});
	rockets.forEachDead(function(item){
		rockets.remove(item);
		aCleanup.push(item);
	});
	powerups.forEachDead(function(item){
		powerups.remove(item);
		aCleanup.push(item);
	});

	for (i = aCleanup.length-1;i>-1;i--) {
		let getitem = aCleanup[i];
		getitem.destroy();
		getitem = null;
	}
}

function emitParticles (x,y,lifespan,number,emitter) {
	emitter.x = x;
	emitter.y = y;
	emitter.start(true,lifespan,null,number,true);
	emitter.k += number;
}

function rng(average,variance) {
	//return Math.floor(Math.random() * ((average*(1+variance)) - (average*(1-variance)) + 1)) + Math.round(average*(1-variance));
	return game.rnd.integerInRange(average*(1+variance),average*(1-variance));
}

function pauseGame () {

	paused = true;

	if (player.score>statistics.highscore) {
		statistics.highscore = player.score;
		Lockr.set('highscore',player.score);
	}

	statistics.totalscore += (player.score - player.lastScoreSave);
	player.lastScoreSave = player.score;
	Lockr.set('totalscore',statistics.totalscore);


	game.physics.arcade.isPaused = true;
	timer.pause();
	enemies.forEachAlive(function (enemy) {
		//enemy.torso.animations.paused = true;
		enemy.animations.paused = true;
		if (enemy.enemyType!=='crow') {
			enemy.fire2.animations.paused = true;
			enemy.ice.animations.paused = true;
		}
	},this);
	bullets.forEachAlive(function (thisbullet) {
		thisbullet.pauselifespan = true;
	},this);
	vomitballs.forEachAlive(function (thisvomitball) {
		thisvomitball.pauselifespan = true;
		thisvomitball.animations.paused = true;
	},this);
	turrets.forEachAlive(function (thisturret) {
		thisturret.pauselifespan = true;
		thisturret.animations.paused = true;
	},this);
	powerups.forEachAlive(function (thispowerup) {
		thispowerup.pauselifespan = true;
	},this);
	rockets.forEachAlive(function (thisrocket) {
		thisrocket.pauselifespan = true;
	})
}

function resumeGame () {
	paused = false;
	game.physics.arcade.isPaused = false;
	timer.resume();
	enemies.forEachAlive(function (enemy) {
		enemy.animations.paused = false;
	},this);
	bullets.forEachAlive(function (thisbullet) {
		thisbullet.pauselifespan = false;
	},this);
	vomitballs.forEachAlive(function (thisvomitball) {
		thisvomitball.pauselifespan = false;
		thisvomitball.animations.paused = false;
	},this);
	turrets.forEachAlive(function (thisturret) {
		thisturret.pauselifespan = false;
		thisturret.animations.paused = false;
	},this);
	powerups.forEachAlive(function (thispowerup) {
		thispowerup.pauselifespan = false;
	},this);
	rockets.forEachAlive(function (thisrocket) {
		thisrocket.pauselifespan = false;
	})
}

function tilePropertyToGid(value, map, property) {
	let keys, i, i2;
	if (typeof (property) === "undefined") {
		property = "type";
	}
	for (i = 0; i < map.tilesets.length; i++) {
		if (!(map.tilesets[i].hasOwnProperty("tileProperties"))) {
			continue;
		}
		keys = Object.keys(map.tilesets[i].tileProperties);
		for (i2 = 0; i2 < keys.length; i2++) {
			if ((map.tilesets[i].tileProperties[keys[i2]].hasOwnProperty(property)) && (map.tilesets[i].tileProperties[keys[i2]][property] === value)) {
				return (parseInt(keys[i2], 10) + parseInt(map.tilesets[i].firstgid, 10));
			}
		}
	}
	console.log("Error: No GID found!");
	return false;
}

function playerBurn(minDmg,maxDmg,delay,slow) {
	if (!player.lavaTouch && player.currentWeapon !== helicopter && !player.energy) {
		playerDamage(game.rnd.integerInRange(minDmg,maxDmg));
		player.speed *= slow;
		player.body.drag.x = 0;
		player.body.drag.y = 0;
		player.lavaTouch = true;
		timer.add(delay, function () {
			player.lavaTouch = false;
			tintPlayer(false);
			player.speed /= slow;
			player.body.drag.x = 1200;
			player.body.drag.y = 1200;
		});
		tintPlayer(true);
	}
}

function lavaBurn (sprite,tile) {
		sprite.lavaContact++;
		if (sprite.lavaContact<2) return false;
		if (sprite === player) {
			playerBurn(2,3,80,0.1);
			return false;
		}
		if (sprite.state !== 'spawning') {
			sprite.onfire = true;
			sprite.fireDegree = 100;
		}
}

function rgbToHex (r, g, b) {
	return "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


function updateHealthBar () {
	healthBar.clear();
	const rectColor = rgbToHex(200, 200, 200);
	healthBar.beginFill(rectColor,0.5);
	healthBar.drawRect(0,0,34,520);
	if (player.maxHealPoint > player.maxHealth ) player.maxHealPoint = player.maxHealth;

	if (player.health > 0) {
		let x = (player.health / player.maxHealth) * 100;
		if (x>100) x = 100;
		let lineColor = rgbToHex((x > 50 ? 1 - 2 * (x - 50) / 100.0 : 1.0) * 255, (x > 50 ? 1.0 : 2 * x / 100.0) * 255, 0);
		if (player.health>100) lineColor = rgbToHex(10,10,200);
		healthBar.lineStyle(24,lineColor,0.75);
		healthBar.moveTo(17,510);
		healthBar.lineTo(17,510-x*5)
	}

	healthBar.endFill();
	healthText.text = Math.round(player.health*100/player.maxHealth) + '%';

}

function updateoverheatBar () {
	overheatBar.clear();
	const rectColor = rgbToHex(200, 200, 200);
	overheatBar.beginFill(rectColor,0.5);
	overheatBar.drawRect(0,0,104,16);
	overheatBar.drawRect(0,20,104,16);
	if (player.currentWeapon===player.minigun) var b = minigun.duration;
	else if (player.currentWeapon===player.flamethrower) var b = flamethrower.duration;
	const x = player.currentWeapon.duration / b * 100;
	const line1Color = rgbToHex((x > 50 ? 1 - 2 * (x - 50) / 100.0 : 1.0) * 255, (x > 50 ? 1.0 : 2 * x / 100.0) * 255, 0);
	overheatBar.lineStyle(12,line1Color,0.75);
	overheatBar.moveTo(2,28);
	overheatBar.lineTo(2+player.currentWeapon.duration*100/b,28);
	

	if (player.currentWeapon.heat > 0) {
		//var lineColor = rgbToHex((x > 50 ? 1-2*(x-50)/100.0 : 1.0) * 255, (x > 50 ? 1.0 : 2*x/100.0) * 255, 0);
		//x = player.currentWeapon.heat
		//if (x>player.currentWeapon.heatCapacity) x = player.currentWeapon.heatCapacity
		let y = player.currentWeapon.heatCapacity * 0.125 - player.currentWeapon.heat * 8 / player.currentWeapon.heatCapacity * 12.5;
		if (y < 5) y = 5;
		const lineColor = rgbToHex((y > 50 ? 1 - 2 * (y - 50) / 100.0 : 1.0) * 255, (y > 50 ? 1.0 : 2 * y / 100.0) * 255, 0);
		//var lineColor = rgbToHex(250,10,10);
		//healthBar.beginFill(color);
		//healthBar.drawRect(0,0,1000,1000)
		overheatBar.lineStyle(12,lineColor,0.75);
		overheatBar.moveTo(2,8);
		overheatBar.lineTo(2+player.currentWeapon.heat*0.125,8)
	}


	/*var y = player.currentWeapon.duration/10000
	if (y < 5) y = 5;
	var lineColor = rgbToHex((y > 50 ? 1-2*(y-50)/100.0 : 1.0) * 255, (y > 50 ? 1.0 : 2*y/100.0) * 255, 0);
	overheatBar.lineStyle(12,lineColor,0.75);
	overheatBar.moveTo(2,24);
	overheatBar.lineTo(2 + player.currentWeapon.duration*0.000167,24)*/

	overheatBar.endFill();
	//healthText.text = player.health*100/player.maxHealth + '%';

}

function playerDamage (x) {
	if (player.energy) x = Math.floor(x*0.5);
	player.damage(x);
	updateHealthBar();
	if (player.maxHealPoint > ((player.health+player.maxHealth)*0.5+(player.maxHealth*0.25))) {
		player.maxHealPoint = (player.health+player.maxHealth)*0.5+(player.maxHealth*0.25)
	}
	player.noRegen = true;
	player.lastDamageTaken += x;
	timer.remove(timeUntilRegen);
	timeUntilRegen = timer.add(2000+(3*player.lastDamageTaken), function () {
		player.noRegen = false;
		player.lastDamageTaken = 0;
	})

}

function regenHealth () {
	if (!player.noRegen && player.health < player.maxHealPoint && Math.random() > 0.5) {
		player.health++;
		updateHealthBar();
	}
}

function createSettingsMenu () {
	EZGUI.components.backButton.on('click',function (event) {
		if (game.state.current === 'menu') {
			settingsMenu.visible = false;
			mainMenu.visible = true;
		}
		else {
			settingsMenu.visible = false;
			pauseScreen.visible = true;
			pauseScreen.alpha = 0.8;
		}

	});
	if (controls !== defaultcontrols) {
		EZGUI.components.upButton.text = controls.upKey[1]  + ' - Up ';
		EZGUI.components.downButton.text = controls.downKey[1] + ' - Down ';
		EZGUI.components.leftButton.text = controls.leftKey[1] + ' - Left ';
		EZGUI.components.rightButton.text = controls.rightKey[1] + ' - Right ';
		EZGUI.components.reloadButton.text = controls.reloadKey[1] + ' - Reload ';
		EZGUI.components.dropTurretButton.text = controls.dropTurretKey[1] + ' - Drop Turret ';

	}
	EZGUI.components.upButton.on('click',function (event) {
		EZGUI.components.upButton.text = toggleControlKey('upKey') + ' - Up '
	});
	EZGUI.components.downButton.on('click',function (event) {
		EZGUI.components.downButton.text = toggleControlKey('downKey') + ' - Down '
	});
	EZGUI.components.leftButton.on('click',function (event) {
		EZGUI.components.leftButton.text = toggleControlKey('leftKey') + ' - Left '
	});
	EZGUI.components.rightButton.on('click',function (event) {
		EZGUI.components.rightButton.text = toggleControlKey('rightKey') + ' - Right '
	});
	EZGUI.components.reloadButton.on('click',function (event) {
		EZGUI.components.reloadButton.text = toggleControlKey('reloadKey') + ' - Reload '
	});

	EZGUI.components.dropTurretButton.on('click',function (event) {
		EZGUI.components.dropTurretButton.text = toggleControlKey('reloadKey') + ' - Drop Turret '
	});

	EZGUI.components.resetButton.on('click',function (event) {
		controls = defaultcontrols;
		Lockr.set('controls',null);
		EZGUI.components.upButton.text = controls.upKey[1]  + ' - Up ';
		EZGUI.components.downButton.text = controls.downKey[1] + ' - Down ';
		EZGUI.components.leftButton.text = controls.leftKey[1] + ' - Left ';
		EZGUI.components.rightButton.text = controls.rightKey[1] + ' - Right ';
		EZGUI.components.reloadButton.text = controls.reloadKey[1] + ' - Reload ';
		EZGUI.components.dropTurretButton.text = controls.dropTurretKey[1] + ' - Drop Turret ';
	});

	EZGUI.components.muteButton.on('click',function (event) {
		if (!game.sound.mute) {
			EZGUI.components.muteButton.text = 'Unmute Sound';
			game.sound.mute = true;
		}
		else {
			EZGUI.components.muteButton.text = 'Mute Sound';
			game.sound.mute = false;
		}


	});

	EZGUI.components.changePauseButton.on('click',function (event) {
		keyboard.addKey(controls.pauseKey[0]).onDown.removeAll();
		EZGUI.components.changePauseButton.text = toggleControlKey('pauseKey') + ' - Pause Game';
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
				pauseGame();
			}

		})
	});

}

function toggleControlKey(string) {
	const newKey = game.input.keyboard.lastKey.keyCode;
	controls[string][0] = newKey;

	Lockr.set('controls',controls);
	let keyName = String.fromCharCode(newKey);
	if (newKey === 8) keyName = "backspace"; //  backspace
	if (newKey === 9) keyName = "tab"; //  tab
	if (newKey === 13) keyName = "enter"; //  enter
	if (newKey === 16) keyName = "shift"; //  shift
	if (newKey === 17) keyName = "ctrl"; //  ctrl
	if (newKey === 18) keyName = "alt"; //  alt
	if (newKey === 19) keyName = "pause/break"; //  pause/break
	if (newKey === 20) keyName = "caps lock"; //  caps lock
	if (newKey === 27) keyName = "escape"; //  escape
	if (newKey === 33) keyName = "page up"; // page up, to avoid displaying alternate character and confusing people
	if (newKey === 34) keyName = "page down"; // page down
	if (newKey === 35) keyName = "end"; // end
	if (newKey === 36) keyName = "home"; // home
	if (newKey === 37) keyName = "left arrow"; // left arrow
	if (newKey === 38) keyName = "up arrow"; // up arrow
	if (newKey === 39) keyName = "right arrow"; // right arrow
	if (newKey === 40) keyName = "down arrow"; // down arrow
	if (newKey === 45) keyName = "insert"; // insert
	if (newKey === 46) keyName = "delete"; // delete
	if (newKey === 91) keyName = "left window"; // left window
	if (newKey === 92) keyName = "right window"; // right window
	if (newKey === 93) keyName = "select key"; // select key
	if (newKey === 96) keyName = "numpad 0"; // numpad 0
	if (newKey === 97) keyName = "numpad 1"; // numpad 1
	if (newKey === 98) keyName = "numpad 2"; // numpad 2
	if (newKey === 99) keyName = "numpad 3"; // numpad 3
	if (newKey === 100) keyName = "numpad 4"; // numpad 4
	if (newKey === 101) keyName = "numpad 5"; // numpad 5
	if (newKey === 102) keyName = "numpad 6"; // numpad 6
	if (newKey === 103) keyName = "numpad 7"; // numpad 7
	if (newKey === 104) keyName = "numpad 8"; // numpad 8
	if (newKey === 105) keyName = "numpad 9"; // numpad 9
	if (newKey === 106) keyName = "multiply"; // multiply
	if (newKey === 107) keyName = "add"; // add
	if (newKey === 109) keyName = "subtract"; // subtract
	if (newKey === 110) keyName = "decimal point"; // decimal point
	if (newKey === 111) keyName = "divide"; // divide
	if (newKey === 112) keyName = "F1"; // F1
	if (newKey === 113) keyName = "F2"; // F2
	if (newKey === 114) keyName = "F3"; // F3
	if (newKey === 115) keyName = "F4"; // F4
	if (newKey === 116) keyName = "F5"; // F5
	if (newKey === 117) keyName = "F6"; // F6
	if (newKey === 118) keyName = "F7"; // F7
	if (newKey === 119) keyName = "F8"; // F8
	if (newKey === 120) keyName = "F9"; // F9
	if (newKey === 121) keyName = "F10"; // F10
	if (newKey === 122) keyName = "F11"; // F11
	if (newKey === 123) keyName = "F12"; // F12
	if (newKey === 144) keyName = "num lock"; // num lock
	if (newKey === 145) keyName = "scroll lock"; // scroll lock
	if (newKey === 186) keyName = ";"; // semi-colon
	if (newKey === 187) keyName = "="; // equal-sign
	if (newKey === 188) keyName = ","; // comma
	if (newKey === 189) keyName = "-"; // dash
	if (newKey === 190) keyName = "."; // period
	if (newKey === 191) keyName = "/"; // forward slash
	if (newKey === 192) keyName = "`"; // grave accent
	if (newKey === 219) keyName = "["; // open bracket
	if (newKey === 220) keyName = "\\"; // back slash
	if (newKey === 221) keyName = "]"; // close bracket
	if (newKey === 222) keyName = "'"; // single quote

	controls[string][1] = keyName;
	Lockr.set('controls',controls);
	return keyName;
}


function homingRockets (rocket) { // Find closest enemy, turn to direction of enemy, move in that direction.
	if (enemies.countLiving()>0 && rocket.lifespan < 800) {
		const distance = [];
		let closest;
		enemies.forEachAlive(function (enemy) {
			const distanceBetween = game.physics.arcade.distanceBetween(enemy, rocket);
			let angleBetween = (game.physics.arcade.angleBetween(rocket, enemy)) - ((rocket.rotation - rocketlauncher.rotateOffset));
			angleBetween = Math.abs(game.math.wrapAngle(angleBetween,true)) ;
			const distanceAndAngle = distanceBetween * (1 + angleBetween);
			if (distanceAndAngle < Math.min.apply(Math, distance) && enemy.state!=='spawning'){
				closest = enemy;
			}
			distance[distance.length] = distanceAndAngle;

		}, this);
		if (closest !== undefined) {
			if (game.physics.arcade.distanceBetween(rocket,closest)>400) return false;
			//console.log(rocket.wobble);
			const targetAngle = game.physics.arcade.angleBetween(rocket, closest) + rocketlauncher.rotateOffset;
			//targetAngle += game.math.degToRad(rocket.wobble);
			if (targetAngle !== rocket.rotation) {
				let delta = targetAngle - rocket.rotation;
				if (delta > Math.PI) delta -= Math.PI * 2;
				else if (delta < -Math.PI) delta += Math.PI * 2;
				if (delta > 0) {
					rocket.rotation += 0.2
				}
				else {
					rocket.rotation -= 0.2
				}
				if (Math.abs(delta) < this.game.math.degToRad(0.2)) {
					rocket.rotation = targetAngle;
				}
			}
			rocket.body.velocity.x = Math.cos(rocket.rotation - rocketlauncher.rotateOffset) * rocketlauncher.bulletVelocity;
			rocket.body.velocity.y = Math.sin(rocket.rotation - rocketlauncher.rotateOffset) * rocketlauncher.bulletVelocity;
		}
	}
}


function cheat() {
	player.health = Infinity;
	player.cash = 1000000;
	player.energy = true;
	player.speed = 600;
	return 'You are a dirty cheater.'
}
