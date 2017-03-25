var finishState = {

    create: function () {
    	win = game.add.audio('win');
	    win.play();
        winText = game.add.text(300, 100, 'You win', { fontSize: '52px', fill: '#FFF' });
    }

};
