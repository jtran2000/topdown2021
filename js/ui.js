const main = {
        id: 'mainMenu',
        padding: 4,
        position: {x:0, y:0},
        width: res.width,
        height: res.height,
		component: 'Window',
        children: [
                    {
                      id: 'playButton',
                      text: 'Play',
                      component: 'Button',
                      padding: 4,
                      position: { x: res.width*0.5 - 60, y: 238},
                      width: 120,
                      height: 80

                    },
					                    {
                      id: 'settingsButton',
                      text: 'Settings',
                      component: 'Button',
                      padding: 4,
                      position: { x: res.width*0.5 - 60, y: 338},
                      width: 120,
                      height: 80

                    },
					{
						id: 'openStatisticsButton',
						text: 'Statistics',
						component: 'Button',
						padding: 4,
						position: { x: res.width*0.5 - 60, y: 438},
						width: 120,
						height: 80
					},
                    {
                      id: 'zombiestitle',
                      text: 'Zombies',
                      font: {
                              size: '72px',
                              family: 'Skranji',
                              color: 'red'

                            },
                      component: 'label',
                      position: {x:res.width*0.5, y:100},
                      height: 0,
                      width: 0

                    }
                  ]

};

const pause = {
	id: 'pauseMenu',
	padding: 4,
	position: {x:res.width*0.5 - 75,y: res.height*0.5 - 140},
	component: 'Window',
	width: 150,
	height: 275,
	header: {id:'abc', position: {x:0, y:0}, height:40, text:'Paused'},
	children: [
			{
				id: 'resumeButton',
				text: 'resume',
				component: 'Button',
				padding: 3,
				position: {x:24,y:10},
				width: 100,
				height: 50
			},
			{
				id: 'restartButton',
				text: 'restart',
				component: 'Button',
				padding: 3,
				position: {x:24,y:65},
				width: 100,
				height: 50
			},
			{
				id: 'quitButton',
				text: 'quit',
				component: 'Button',
				padding: 3,
				position: {x:24,y:120},
				width: 100,
				height: 50
			},
			{
				id: 'settingsFromPauseButton',
				text: 'settings',
				component: 'Button',
				padding: 3,
				position: {x:24,y:175},
				width: 100,
				height: 50
			}
		]
};

var settings = {
	id: 'settingsMenu',
	padding: 4,
	position: {x:res.width*0.5 - 195, y:res.height*0.5 - 195},
	component: 'Window',
	width: 390,
	height: 390,
	header: {id:'def', position: {x:0, y:0}, height:40, text:'Settings'},
		children: [
			{
				id: 'upButton',
				text: 'W - Up',
				component: 'Button',
				padding: 3,
				position: {x:20,y:20},
				width: 160,
				height: 40
			},
			{
				id: 'downButton',
				text: 'S - Down',
				component: 'Button',
				padding: 3,
				position: {x:20,y:70},
				width: 160,
				height: 40
			},
			{
				id: 'rightButton',
				text: 'D - Right',
				component: 'Button',
				padding: 3,
				position: {x:20,y:120},
				width: 160,
				height: 40
			},
			{
				id: 'leftButton',
				text: 'A - Left',
				component: 'Button',
				padding: 3,
				position: {x:20,y:170},
				width: 160,
				height: 40
			},
			{
				id: 'reloadButton',
				text: 'R - Reload',
				component: 'Button',
				padding: 3,
				position: {x:20,y:220},
				width: 160,
				height: 40
			},
			{
				id: 'dropTurretButton',
				text: 'T - Drop Turret',
				component: 'Button',
				padding: 3,
				position: {x:200,y:20},
				width: 160,
				height: 40
			},
			{
				id: 'changePauseButton',
				text: 'P - Pause',
				component: 'Button',
				padding: 3,
				position: {x:200,y:70},
				width: 160,
				height: 40
			},
			
			{
				id: 'resetButton',
				text: 'Reset to Default',
				component: 'Button',
				padding: 3,
				position: {x:200,y:120},
				width: 160,
				height: 40
			},
			{
				id: 'muteButton',
				text: 'Mute Sound',
				component: 'Button',
				padding: 3,
				position: {x:200,y:170},
				width: 160,
				height: 40
			},
			{
				id: 'backButton',
				text: 'Back',
				component: 'Button',
				padding: 3,
				position: {x:200,y:220},
				width: 160,
				height: 40
			},
			{
				id: 'instructions',
				text: 'Press a key then select the action you want to assign the key to.',
				font: {
                    size: '20px',
                    family: 'Arial',
					wordWrap:true,
					wordWrapWidth: 300
                },
				component: 'Label',
				padding: 3,
				position: {x:20,y:280},
				width: 350,
				height: 50
			}
		]

};

var shop = {
	id: 'shopMenu',
	padding: 4,
	position: {x:res.width*0.5 - 400,y: res.height*0.5-155},
	component: 'Window',
	width: 800,
	height: 310,
	header: {id:'abc', position: {x:0, y:0}, height:40, text:'Shop'},
	children: [
			{
				id: 'upgradepistolButton',
				text: 'Upgrade Pistol - $2000',
				component: 'Button',
				padding: 3,
				position: {x:10,y:15},
				width: 250,
				height: 40
			},
			{
				id: 'buyshotgunButton',
				text: 'Buy Shotgun - $6000',
				component: 'Button',
				padding: 3,
				position: {x:10,y:65},
				width: 250,
				height: 40
			},
			{
				id: 'buyrifleButton',
				text: 'Buy Rifle - $12000',
				component: 'Button',
				padding: 3,
				position: {x:10,y:115},
				width: 250,
				height: 40
			},			
			{
				id: 'buyMGButton',
				text: 'Buy MG - $24000',
				component: 'Button',
				padding: 3,
				position: {x:10,y:165},
				width: 250,
				height: 40
			},
			{
				id: 'buyrocketButton',
				text: 'Buy Rocket - $96000',
				component: 'Button',
				padding: 3,
				position: {x:10,y:215},
				width: 250,
				height: 40
			},
			{
				id: 'buyfireballgunButton',
				text: 'Fireball Gun - $96000',
				component: 'Button',
				padding: 3,
				position: {x:270,y:15},
				width: 250,
				height: 40
			},
			{
				id: 'buyiceballgunButton',
				text: 'Ice Gun - $96000',
				component: 'Button',
				padding: 3,
				position: {x:270,y:65},
				width: 250,
				height: 40
			},
			{
				id: 'buylightninggunButton',
				text: 'Lightning Gun - $96000',
				component: 'Button',
				padding: 3,
				position: {x:270,y:115},
				width: 250,
				height: 40
			},
			{
				id: 'buyHealthButton',
				text: 'Heal - $300000',
				component: 'Button',
				padding: 3,
				position: {x:270,y:165},
				width: 250,
				height: 40
			},
/*			{
				id: 'buyPartnerButton',
				text: 'Hire Partner - $1000000',
				component: 'Button',
				padding: 3,
				position: {x:270,y:215},
				width: 250,
				height: 40
			},*/
			{
				id: 'notreal',
				text: 'Coming Soon',
				component: 'Button',
				padding: 3,
				position: {x:270,y:215},
				width: 250,
				height: 40
			},
			{
				id: 'buyMGTurretButton',
				text: 'MG Turret - Locked',
				component: 'Button',
				padding: 3,
				position: {x:530,y:15},
				width: 250,
				height: 40
			},
			{
				id: 'buyFlameTurretButton',
				text: 'Flame Turret - Locked',
				component: 'Button',
				padding: 3,
				position: {x:530,y:65},
				width: 250,
				height: 40
			},
			{
				id: 'buyRocketTurretButton',
				text: 'Rocket Turret - Locked',
				component: 'Button',
				padding: 3,
				position: {x:530,y:115},
				width: 250,
				height: 40
			},
			{
				id: 'buyIceTurretButton',
				text: 'Ice Turret - Locked',
				component: 'Button',
				padding: 3,
				position: {x:530,y:165},
				width: 250,
				height: 40
			},
			{
				id: 'buyLightningTurretButton',
				text: 'Lightning Turret - Locked',
				component: 'Button',
				padding: 3,
				position: {x:530,y:215},
				width: 250,
				height: 40
			}
	]
};

var gameover = {
	id: 'gameOver',
	padding: 4,
	position: {x:res.width*0.5 - 100 ,y:res.height*0.5 - 140},
	component: 'Window',
	width: 200,
	height: 250,
	header: {id:'abc', position: {x:0, y:0}, height:40, text:'Game Over'},
	children: [
			{
				id: 'scoreWindow',
				text: 'placeholder',
				component: 'Label',
				position: {x:0,y:15},
				width: 190,
				height: 60
			},
			{
				id: 'restartButton2',
				text: 'restart',
				component: 'Button',
				padding: 3,
				position: {x:50,y:85},
				width: 100,
				height: 50
			},
			{
				id: 'quitButton2',
				text: 'quit',
				component: 'Button',
				padding: 3,
				position: {x:50,y:145},
				width: 100,
				height: 50
			}
	]
};

var pausebutton = {
	id: 'pauseButton',
	padding: 4,
	position: {x:res.width-100,y:5},
	text: 'Pause',
	component: 'Button',
	width: 90,
	height: 40
};

var statistics = {
	id: 'statisticsWindow',
	padding:4,
	position: {x:0,y:0},
	width: 1280,
	height: 720,
	header: {id:'statisticsHeader', position: {x:0, y:0}, height:40, text:'Statistics'},
	children: [
		{
			id: 'playerNameLabel',
			text: 'placeholder',
			component: 'Label',
			padding: 3,
			position: {x:200,y:15},
			width: 200,
			height: 70,
			font: {
                    size: '48px',
                    family: 'Skranji',
                    color: 'white'
                  }
		},
		{
			id: 'highScoreLabel',
			text: 'placeholder',
			component: 'Label',
			padding: 3,
			position: {x:50,y:100},
			width: 200,
			height: 70,
			font: {
                    size: '24px',
                    family: 'Skranji',
                    color: 'white'
                  }
		},
		{
			id: 'killsLabel',
			text: 'placeholder',
			component: 'Label',
			padding: 3,
			position: {x:400,y:100},
			width: 200,
			height: 70,
			font: {
                    size: '24px',
                    family: 'Skranji',
                    color: 'white'
                  }
		},
		{
			id: 'resetStatisticsButton',
			text: 'Reset Statistics',
			component: 'Button',
			padding: 3,
			position: {x:100, y:590},
			width: 200,
			height: 60
		},
		{
			id: 'changeNameButton',
			text: 'Change Name',
			component: 'Button',
			padding: 3,
			position: {x:500, y:590},
			width: 200,
			height: 60
		},
		{
			id: 'backToMenuButton',
			text: 'Back',
			component: 'Button',
			padding: 3,
			position: {x:900, y:590},
			width: 200,
			height: 60
		}
	]
};

var nameBox = {
	id: 'nameWindow',
	component: 'Window',
	padding: 4,
	width: 600,
	height: 400,
	position: {x:300,y:100},
	header: {id:'NameHeader', position: {x:0, y:0}, height:40, text:'Choose Your Name'},
	children: [
		{
			id: 'TextBox',
			text: 'Type Your Name Here',
			component: 'Input',
			position: 'center',
			width: 300,
			height: 50
		},
		{
			id: 'NextButton',
			text: 'Next',
			component: 'Button',
			position: {x:250,y:300},
			width: 100,
			height: 50
		}
	]
};


