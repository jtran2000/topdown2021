/**
 * Created by Julius on 6/4/2015.
 */
var menuState = {
	create: function () {
		game.input.onDown.addOnce(() => {
			game.sound.context.resume();
		});
		//menuText = game.add.text(200,200,'Click Anywhere To Play',{fill:'#fffae8'});
		//menuText.fixedToCamera = true;
		EZGUI.Theme.load(['assets/metalworks-theme/metalworks-theme.json'], function () {
			//create the gui
			//the second parameter is the theme name, see kenney-theme.json, the name is defined under __config__ field
			pauseScreen = EZGUI.create(pause, 'metalworks');
			pauseScreen.visible = false;
			shopMenu = EZGUI.create(shop,'metalworks');
			shopMenu.visible = false;
			gameOverScreen = EZGUI.create(gameover,'metalworks');
			gameOverScreen.visible = false;
			mainMenu = EZGUI.create(main, 'metalworks');
			settingsMenu = EZGUI.create(settings, 'metalworks');
			settingsMenu.visible = false;
			statisticsScreen = EZGUI.create(statistics,'metalworks');
			statisticsScreen.visible = false;
			nameScreen = EZGUI.create(nameBox,'metalworks');
			nameScreen.visible = false;
			EZGUI.components.highScoreLabel.text = 'High Score: ' + statistics.highscore + '\nTotal Score: ' + statistics.totalscore + '\nHighest Round: ' + statistics.highestround + '\nTotal Rounds: ' + statistics.totalrounds + '\nTotal Powerups\nPicked Up: ' + statistics.totalpowerupspickedup + '\nGames Played: ' + statistics.gamesplayed + '\nDeaths: ' + statistics.deaths;
			EZGUI.components.killsLabel.text = 'Zombies Killed: ' + statistics.zombiesKilled + '\nFatsos Killed: ' + statistics.fatsosKilled + '\nVomits Killed: ' + statistics.vomitsKilled + '\nDogs Killed: ' + statistics.dogsKilled + '\nCrows Killed: ' + statistics.crowsKilled + '\nMoose Killed: ' + statistics.mooseKilled + '\nScientists Killed: ' + statistics.doctorsKilled + '\nTotal Kills: ' + (statistics.zombiesKilled + statistics.fatsosKilled + statistics.vomitsKilled + statistics.dogsKilled + statistics.crowsKilled + statistics.mooseKilled + statistics.doctorsKilled);

			if (playerName == null) {
				mainMenu.visible = false;
				nameScreen.visible = true;
			}
			else {
				EZGUI.components.playerNameLabel.text = 'Statistics for ' + playerName;
			}

			label = EZGUI.components.zombiestitle;
			EZGUI.components.playButton.on('click', function (event) {
				game.state.start('play');
				mainMenu.visible = false;
			});
			EZGUI.components.settingsButton.on('click', function (event) {
				settingsMenu.visible = true;
				mainMenu.visible = false;
			});
			createSettingsMenu();
			EZGUI.components.openStatisticsButton.on('click', function (event) {
				statisticsScreen.visible = true;
				mainMenu.visible = false;

			});

			EZGUI.components.backToMenuButton.on('click', function (event) {
				statisticsScreen.visible = false;
				mainMenu.visible = true;

			});

			EZGUI.components.changeNameButton.on('click', function (event) {
				Lockr.set('playerName',null);
				location.reload();
			});

			EZGUI.components.resetStatisticsButton.on('click', function (event) {
				Lockr.set('highscore',null);
				Lockr.set('totalscore',null);
				Lockr.set('highestround',null);
				Lockr.set('highscore',null);
				Lockr.set('totalrounds',null);
				Lockr.set('totalpowerupspickedup',null);
				Lockr.set('gamesplayed',null);
				Lockr.set('deaths',null);
				Lockr.set('zombiesKilled',null);
				Lockr.set('fatsosKilled',null);
				Lockr.set('vomitsKilled',null);
				Lockr.set('dogsKilled',null);
				Lockr.set('crowsKilled',null);
				Lockr.set('mooseKilled',null);
				Lockr.set('doctorsKilled',null);
				location.reload();
			});


			EZGUI.components.NextButton.on('click', function (event) {
				playerName = EZGUI.components.TextBox.text;
				playerName = playerName.trim();
				Lockr.set('playerName',playerName);
				EZGUI.components.playerNameLabel.text = 'Statistics for ' + playerName;
				mainMenu.visible = true;
				nameScreen.visible = false;
			});


		})
		//game.input.mouse.mouseDownCallback = function () {
			//game.state.start('play');
		//}
	}
};

