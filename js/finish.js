var finishState = {

	preload: function (){

		game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
	},

    create: function () {
    	win = game.add.audio('win');
	    win.play();
        winText = game.add.text(300, 100, 'You win', { fontSize: '52px', fill: '#FFF' });

        // Save score
        if(localStorage.getItem('highScore') === null){
            localStorage.setItem('highScore',score);
        }
        else if(score > localStorage.getItem('highScore')){
            localStorage.setItem('highScore',score);
        }

        button = game.add.button(game.world.centerX - 95, 400, 'button', nextLevel, this, 2, 1, 0);
    }

};
