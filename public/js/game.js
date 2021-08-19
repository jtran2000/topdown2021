/**
 * Created by Julius on 6/4/2015.
 */

const res = {
	height: 648,
	width: 1152
};
const game = new Phaser.Game(res.width, res.height, Phaser.WebGL, '', null, false, true);
let ammoCounter;
let scoreText;
let player;
let bullets;
let vomitballs;
let timer;
let nextFire = 0;
let enemies = null;
const maxEnemies = 20;
let nextSpawn = 1000;
const span = 0.25;
let countdownTime = 2;
let roundTime = 300;
let roundTimeLeft = 0;
let debug = false;

//var highscore;
//var highestround;
//var gamesplayed;
//let statistics;

let playerName;
let round = {//20 totalPoints roundNumber 1
	totalPoints: 20,
	usedPoints: 0,
	roundNumber: 1,
	killedThisRound: 0,
	healthBonus: 0,
	bossHealth: 0,
	bossSpeed: 0,
	bossLives: 0,
	bossSpecial: 0,
	bossNumber: 2,
	specialWeapon: false
};
let paused = false;
let timeUntilRegen;
let controls;
const defaultcontrols = {
	upKey: [87, 'W'],
	downKey: [83, 'S'],
	leftKey: [65, 'A'],
	rightKey: [68, 'D'],
	reloadKey: [82, 'R'],
	dropTurretKey: [84, 'T'],
	pauseKey: [80, 'P']
};


let mouseOverPause = false;
const rocketTurnSpeed = 30;
let flameOn = false;
z = 0;

let norotate;
game.state.add('boot',bootState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.start('boot');
