/**
 * Created by Julius on 6/4/2015.
 */
var playState = {
	create: function () {

		statistics.gamesplayed++;
		Lockr.set('gamesplayed',statistics.gamesplayed);



		
		//lavalayer.fixedToCamera = false;
		//tweenTint(bottomlayer, 16777215,255255153,2000)

		/*map = game.add.tilemap('desert');
		map.addTilesetImage('Desert', 'deserttiles');
		lavalayer = map.createLayer('Ground');
		lavalayer.resizeWorld();(*/

		timer = game.time.create(false);
		timer.start();
		startTheGame();
		
		
		
		
	/*	var lava = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
		map.setTileIndexCallback(lava,lavaBurn,this,lavalayer); //adds collision*/

/*		var walkables = [46,32,33,34,35,36,37,38,39,40,41,42,43,44,45,31]; //46 is the new zero
		pathfinder.setGrid(map.layers[1].data,walkables,50); //uncomment this
		for (i=0; i<lava.length;i++) {
			pathfinder.setTileCost(lava[i],20) // make lava hard to walk on
		}*/


		game.input.mouse.mouseDownCallback = null;
		game.stage.disableVisibilityChange = true;

	},
	update: function () {
		if (!paused) {
			if (player.alive) {
				player.lavaContact = 0;
				rockets.forEachAlive(homingRockets, this);
				//updateHealthBar();
				game.physics.arcade.overlap(enemies, bullets, bulletHit); //Bullets hitting enemy
				game.physics.arcade.overlap(crows, bullets, bulletHitCrow);

				game.physics.arcade.overlap(player, powerups, pickPowerUp); //Touching powerup
				game.physics.arcade.overlap(partners, powerups, partnerPowerup);
				
				game.physics.arcade.overlap(player, vomitballs, vomitballHit); //Player hit by vomit
				
				game.physics.arcade.overlap(player, enemyBullets, enemyBulletHit); 
				
				game.physics.arcade.overlap(partners, enemyBullets, enemyBulletHitPartner); 

				game.physics.arcade.overlap(bullets, vomitballs, vomitballHitBullet);

				game.physics.arcade.overlap(vomitballs, turrets, vomitballHitTurret);


				game.physics.arcade.overlap(enemies, turrets, zombieTouchTurret);

				game.physics.arcade.overlap(enemies, fireballs, fireballHit);
				
				game.physics.arcade.overlap(crows, fireballs, fireballHitCrow);
				
				game.physics.arcade.overlap(enemies, iceballs, iceballHit);
				
				game.physics.arcade.overlap(crows, iceballs, iceballHitCrow);
				
				game.physics.arcade.overlap(enemies, rockets, rocketHit);
				game.physics.arcade.overlap(crows, rockets, rocketHit);				// Enemy touches rocket
				game.physics.arcade.overlap(vomitballs,partners,vomitballHitPartner);

				game.physics.arcade.collide(enemies, enemies, zombieCollision);

				game.physics.arcade.overlap(bullets, torches, bullet => {bullet.kill()} );
				game.physics.arcade.collide(enemies, lavalayer);

				game.physics.arcade.collide(enemies,partners);

				game.physics.arcade.collide(bullets,lavalayer, bullet => {bullet.kill()});

				if (player.currentWeapon !== helicopter) {
					game.physics.arcade.collide(player, enemies, playerEnemyCollision);
					game.physics.arcade.collide(player, lavalayer);
					game.physics.arcade.collide(player, turrets);
					game.physics.arcade.collide(player, torches, playerHitTorch);
					game.physics.arcade.collide(player,partners);
				}
				playerInput();
				if (round.roundNumber % 10 !== 0) spawn();
				turrets.forEachAlive(turretBehavior, this);
				partners.forEachAlive(partnerBehavior,this);
			}
				enemies.forEachAlive(zombieBehavior, this);
				crows.forEachAlive(crowBehavior, this);
		}

        if (debug) {
            fpscounter.text = 'FPS:' + game.time.fps;
            anglecounter.text = 'Angle:' + (player.rotation);
            speedometer.text = player.body.velocity.x + ',' + player.body.velocity.y
        }
	},
	render: function () {
		if (debug) {
			game.debug.body(player);
		}
	}
};
