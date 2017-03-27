var introState = {

	preload: function (){

		game.load.spritesheet('startButton', 'assets/greenSheet.png', 191, 50);
		game.load.audio('intro', 'assets/music/long_away_home.wav');
		game.load.audio('start', 'assets/sounds/go.ogg');
	},

    create: function () {
    	intro = game.add.audio('intro');
    	intro.onDecoded.add(startMusic, this);
        introText = game.add.text(100, 100, 'Welcome to Phaser game', { fontSize: '52px', fill: '#FFF' });
        button = game.add.button(game.world.centerX - 95, 400, 'startButton', startGame, this, 1, 0, 1);
        introText = game.add.text(game.world.centerX - 35, 405, 'Play', { fontSize: '32px', fill: '#1a1a1a' });

        startKeyboard = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        

        if(localStorage.getItem('highScore') != null){
            highscore = localStorage.getItem('highScore');
            highscoreText = game.add.text(game.world.centerX - 115, 300, 'High score: ' + highscore, { fontSize: '32px', fill: '#FFF' });
        }

    },

    update: function () {
        if (startKeyboard.isDown)
        {
            startGame();
        }
    } 

};