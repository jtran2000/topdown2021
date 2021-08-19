function initWeapons () {
	/*To Do:
	- Remove equipfunction
	- Remove bulletsUsedInMagazine
	- Remove ammoReserveLeft*/
	 
	 pistol = {
		 magazineSize: 15,
		 damage: 2,
		 ammoReserve: 60,
		 reloadTime: 1000,
		 rpm: 150,
		 bulletsUsedInMagazine: 0,
		 ammoReserveLeft: 60,
		 rotateOffset: 1.8,
		 firefunction: firePistol,
		 equipfunction: equipPistol,
		 bulletVelocity: 1000

	};
	 dualpistol = {
		 magazineSize: 15,
		 damage: 2,
		 ammoReserve: 120,
		 reloadTime: 1000,
		 rpm: 150,
		 bulletsUsedInMagazine: 0,
		 ammoReserveLeft: 120,
		 rotateOffset: 1.5,
		 firefunction: fireDual,
		 equipfunction: equipDualPistol,
		 bulletVelocity: 1000
	};
	 smg = {
		 magazineSize: 30,
		 damage: 2,
		 ammoReserve: 150,
		 reloadTime: 1000,
		 rpm: 600,
		 bulletsUsedInMagazine: 0,
		 ammoReserveLeft: 150,
		 rotateOffset: 1.8,
		 firefunction: firePistol,
		 equipfunction: equipSMG,
		 bulletVelocity: 1200
	};

	 dualsmg = {
		 magazineSize: 30,
		 damage: 2,
		 ammoReserve: 360,
		 reloadTime: 1000,
		 rpm: 600,
		 bulletsUsedInMagazine: 0,
		 ammoReserveLeft: 360,
		 rotateOffset: 1.5,
		 firefunction: fireDual,
		 equipfunction: equipDualSMG,
		 bulletVelocity: 1200
	};

	 shotgun = {
		 magazineSize: 10,
		 damage: 1,
		 ammoReserve: 60,
		 reloadTime: 1300,
		 rpm: 100,
		 bulletsUsedInMagazine: 0,
		 ammoReserveLeft: 60,
		 rotateOffset: 1.5,
		 firefunction: fireShotgun,
		 price: 6000,
		 purchased: false,
		 bulletVelocity: 860
	};

	machinegun = {
		magazineSize: 100,
		damage: 3,
		ammoReserve: 500,
		reloadTime: 1200,
		rpm: 800,
		bulletsUsedInMagazine: 0,
		ammoReserveLeft: 500,
		rotateOffset: 1.5,
		firefunction: fireMG,
		price: 24000,
		purchased: false,
		bulletVelocity:1500
	};

	rifle = {
		magazineSize: 8,
		damage: 40,
		ammoReserve: 72,
		reloadTime: 1300,
		rpm: 110,
		bulletsUsedInMagazine:0,
		ammoReserveLeft: 72,
		rotateOffset: 1.5,
		firefunction: fireRifle,
		price: 12000,
		purchased: false,
		bulletVelocity: 2000

	};
	fireballgun = {
		magazineSize: 6,
		damage: 1,
		ammoReserve: 24,
		reloadTime: 2000,
		rpm: 300,
		bulletsUsedInMagazine: 0,
		ammoReserveLeft: 24,
		rotateOffset: 1.5,
		firefunction: fireFireballGun,
		price: 96000,
		purchased: false,
		bulletVelocity:700
	};
	iceballgun = {
		magazineSize: 12,
		damage: 16,
		ammoReserve: 48,
		reloadTime: 2000,
		rpm: 300,
		bulletsUsedInMagazine: 0,
		ammoReserveLeft: 48,
		rotateOffset: 1.5,
		firefunction: fireIceballGun,
		price: 96000,
		purchased: false,
		bulletVelocity:1500
	};
	lightninggun = {
		magazineSize: 4,
		damage: 500,
		ammoReserve: 20,
		reloadTime: 10000,
		rpm: 20,
		bulletsUsedInMagazine: 0,
		ammoReserveLeft: 20,
		rotateOffset: 1.38,
		firefunction: fireLightningGun,
		price: 96000,
		purchased: false,
		bulletVelocity:1000
	};

	flamethrower = {
		duration: 120000,
		maxDuration: 120000,
		heatCapacity:800,
		heat:0,
		heatRate: 6,
		cooldown: 5,
		rotateOffset: 1.5,
		firefunction: fireFlame,
		price: 8000,
		purchased: false
	};

	minigun = {
		duration: 150000,
		heatCapacity:800,
		heat:0,
		heatRate: 6,
		cooldown: 4,
		rpm: 1000,
		rotateOffset: 1.5,
		firefunction: fireMinigun,
		price: 8000,
		purchased: false
	};

	rocketlauncher = {
		magazineSize: 5,
		damage: 100,
		ammoReserve: 25,
		reloadTime: 2000,
		rpm: 60,
		bulletsUsedInMagazine: 0,
		ammoReserveLeft: 16,
		rotateOffset: 1.5,
		firefunction: fireRocket,
		price: 96000,
		purchased: false,
		bulletVelocity: 800
	};

	helicopter = {
		magazineSize: Infinity,
		damage: 6,
		ammoReserve: 200,
		reloadTime: 1200,
		rpm: 1600,
		bulletsUsedInMagazine: 0,
		ammoReserveLeft: 200,
		rotateOffset: 1.6,
		firefunction: fireHelicopter,
		price: 8000,
		purchased: false
	};

	tank = {
		magazineSize: Infinity,
		damage:100,
		ammoReserve: 200,
		reloadTime: 1200,
		rpm: 120,
		bulletsUsedInMagazine: 0,
		ammoReserveLeft: 200,
		rotateOffset: 1.6,
		firefunction: fireTank,
		price: 8000,
		purchased: false
	};

	mgturret = {
		damage:8,
		rpm: 300,
		duration: 300000,
		cost: 5000,
		dropfunction: createMGTurret,
		exists: false
	};

	flameturret = {
		duration: 300000,
		cost: 6000,
		dropfunction: createFlameTurret,
		exists: false
	};

	rocketturret = {
		rpm: 60,
		duration: 300000,
		cost: 6000,
		dropfunction: createRocketTurret,
		exists: false
	};

	iceturret = {
		damage:16,
		rpm: 100,
		duration: 300000,
		cost: 6000,
		dropfunction: createIceTurret,
		exists: false
	};
	lightningturret = {
		damage:500,
		rpm: 20,
		duration: 300000,
		cost: 5000,
		dropfunction: createLightningTurret,
		exists: false
	};

	//pistoltype = pistol;
	upgradePrice = 2000;
}
