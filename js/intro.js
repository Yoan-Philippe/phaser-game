var introState = {

	preload: function (){

		game.load.spritesheet('startButton', 'assets/button_sprite_sheet.png', 193, 71);
		game.load.audio('intro', 'assets/music/long_away_home.wav');
		game.load.audio('start', 'assets/sounds/go.ogg');
	},

    create: function () {
    	intro = game.add.audio('intro');
    	intro.onDecoded.add(startMusic, this);
        introText = game.add.text(100, 100, 'Welcome to Phaser game', { fontSize: '52px', fill: '#FFF' });
        button = game.add.button(game.world.centerX - 95, 400, 'startButton', startGame, this, 2, 1, 0);
    }

};
