var level2State = {

    preload: function () {

        var loadingLabel = game.add.text(350, 150, 'loading...', {font: '30px Courier', fill: '#fff'});

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('fuel', 'assets/fuel.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('firstaid', 'assets/firstaid.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('zombie', 'assets/zombie/zombie_tilesheet.png', 80, 110);
        game.load.spritesheet('tree1', 'assets/foliagePack_default.png', 150, 210);
        game.load.spritesheet('tree2', 'assets/foliagePack_default.png', 172, 193, 150,-20);
        game.load.image('bullet', 'assets/weapon/ammo_machinegun.png');

        game.load.audio('win', 'assets/sounds/you_win.ogg');
        game.load.audio('lose', 'assets/sounds/time_over.ogg');
        game.load.audio('coin', 'assets/sounds/coin.wav');
        game.load.audio('diamond', 'assets/sounds/diamond.wav');
        game.load.audio('medic', 'assets/sounds/power_up.ogg');
        game.load.audio('hit', 'assets/sounds/hit4.ogg');

    },

    create: function () {
        game.add.sprite(0, 0, 'sky');

        platforms = game.add.group();
        platforms.enableBody = true;

        decorations = game.add.group();

        // The Groud
        var tree1 = decorations.create(20, 330, 'tree1');
        var tree2 = decorations.create(650, 208, 'tree2');
        tree1.frame = 0;
        tree2.frame = 19;

        // The Groud
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        // The platforms
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
        ledgeActive = platforms.create(320, 120, 'ground');
        ledgeActive.scale.setTo(0.5,1);
        ledgeActive.body.immovable = true;
        lifebar = platforms.create(720, 26, 'fuel');
        lifebar.body.immovable = true;
        lifebar.scale.setTo(1, 0.15);


        players = game.add.group();
        ennemies = game.add.group();

        // The players
        player = game.add.sprite(400, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        players.add(player);

        player2 = game.add.sprite(100, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player2);
        player2.body.collideWorldBounds = true;
        player2.animations.add('left', [0, 1, 2, 3], 10, true);
        player2.animations.add('right', [5, 6, 7, 8], 10, true);

        players.add(player2);
        players.setAll('body.gravity.y', 600);
        players.setAll('body.bounce.y', 0.2);

        player2.scale.setTo(1.5, 1.5);

        zombiePositions = [[400,40], [600,game.world.height - 300], [150,180], [700,460], [700,420]];
        for (var i = 0; i < 5; i++)
        {
            zombie = game.add.sprite(zombiePositions[i][0], zombiePositions[i][1], 'zombie');
            game.physics.arcade.enable(zombie);

            scaleZombie = 0.5 + Math.random() * 0.2;
            zombie.scale.setTo(scaleZombie, scaleZombie);
            zombie.animations.add('left', [09, 10], 4, true);
            zombie.animations.add('right', [09, 10], 4, true);
            ennemies.add(zombie);
        }
        ennemies.setAll('body.gravity.y', 300);
        ennemies.setAll('body.bounce.y', 0.2);
        ennemies.setAll('body.collideWorldBounds', true);

        player.body.onCollide = new Phaser.Signal();
        player2.body.onCollide = new Phaser.Signal();
        player.body.onCollide.add(checkCollide, this);
        player2.body.onCollide.add(checkCollidePlayer2, this);
        
        //  Creates 1 single bullet, using the 'bullet' graphic
        weapon = game.add.weapon(3, 'bullet');
        game.physics.arcade.enable(weapon);

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:
        weapon.bulletAngleOffset = 90;
        weapon.fireRate = 400;
        //weapon.autofire = true;

        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 400;
        weapon.fireAngle = 0;

        weapon.trackSprite(player, 20, 20);
        fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


        healers = game.add.group();
        healers.enableBody = true;

        firstaid = healers.create(385, 50, 'firstaid');
        game.physics.arcade.enable(firstaid);
        firstaid.body.gravity.y = 200;
        firstaid.body.bounce.y = 0.2;


        // Collectables
        stars = game.add.group();
        stars.enableBody = true;
        starPositions = [[320,60], [450,60], [150,180], [700,460]];
        for (var i = 0; i < 4; i++)
        {
            var star = stars.create(starPositions[i][0], starPositions[i][1], 'star');
            star.body.gravity.y = 600;
            star.body.bounce.y = 0.2 + Math.random() * 0.2;
        }

        diamonds = game.add.group();
        diamonds.enableBody = true;
        for (var i = 1; i < 4; i++)
        {
            if(i == 1){
                var diamond = diamonds.create(i * 325, 70, 'diamond');
            }
            if(i == 2){
                var diamond = diamonds.create(i * 370, 350, 'diamond');
            }
            if(i == 3){
                var diamond = diamonds.create(i * 20, 190, 'diamond');
            }
            diamond.body.gravity.y = 100;
            diamond.body.bounce.y = 0.1 + Math.random() * 0.2;
        }

        // Textfields
        scoreText = game.add.text(16, 16, 'Score LEVEL 2: 0', { fontSize: '32px', fill: '#000' });
        healthText = game.add.text(16, 50, 'Health: 100', { fontSize: '32px', fill: '#000' });
        remainingText = game.add.text(300, 16, 'Time : 400', { fontSize: '32px', fill: '#000' });
        fuelText = game.add.text(620, 20, 'Fuel: ', { fontSize: '32px', fill: '#000' });
        loseText = game.add.text(300, 80, 'You lose', { fontSize: '32px', fill: '#000' });
        loseText.visible = false;
    },

    update: function(){
            var hitPlatformHeal = game.physics.arcade.collide(healers, platforms);
            var hitPlatform = game.physics.arcade.collide(player, platforms);
            var hitPlatformPlayer2 = game.physics.arcade.collide(player2, platforms);


            ennemies.forEach(function(item) {
                game.physics.arcade.collide(item, platforms);
                game.physics.arcade.overlap(weapon.bullets, item, hitZombie, null, this);

            }, this);

            var playerOnWall = player.body.onWall();

            // Movements
            cursors = game.input.keyboard.createCursorKeys();
            up = game.input.keyboard.addKey(Phaser.Keyboard.W);
            down = game.input.keyboard.addKey(Phaser.Keyboard.S);
            left = game.input.keyboard.addKey(Phaser.Keyboard.A);
            right = game.input.keyboard.addKey(Phaser.Keyboard.D);

            if (fireButton.isDown)
            {
                weapon.fire();
            }


            player.body.velocity.x = 0;
            if (cursors.left.isDown) {
                player.body.velocity.x = -150;
                player.animations.play('left');
                weapon.fireAngle = 180;
            } else if (cursors.right.isDown)
            {
                player.body.velocity.x = 150;
                player.animations.play('right');
                weapon.fireAngle = 0;
            }
            else {
                player.animations.stop();
                player.frame = 4;
            }


            player2.body.velocity.x = 0;
            if (left.isDown) {
                player2.body.velocity.x = -150;
                player2.animations.play('left');
            } else if (right.isDown)
            {
                player2.body.velocity.x = 150;
                player2.animations.play('right');
            } else {
                player2.animations.stop();
                player2.frame = 4;
            }

            if(player.body.touching.down && hitPlatform){
                nbrJump = 20;
                lifebar.body.position.x = 720;
            }

            if (cursors.up.isDown && nbrJump > 0) {
                nbrJump = nbrJump -1;
                player.body.velocity.y = -280;
                lifebar.body.position.x = lifebar.body.position.x + 4;
            }

            if (up.isDown)
            {
                player2.body.velocity.y = -200;
            }

            if (cursors.up.isDown && playerOnWall)
            {
                player.body.velocity.y = -250;
            }


            //Star
            game.physics.arcade.collide(stars, platforms);
            game.physics.arcade.overlap(player2, stars, collectStar, null, this);

            game.physics.arcade.overlap(weapon.bullets, platforms, killBullet, null, this);


             //Medic
            game.physics.arcade.overlap(player, firstaid, healPlayer, null, this);

            //Diamond
            game.physics.arcade.collide(diamonds, platforms);
            game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);

            time = time - 1;
            if(time >= 0){
                remainingText.text = 'Time: ' + time;
                if(score == 230){
                    game.state.start('finish');
                }
            }
            else{
                if(loseText.visible == false){
                    loseText.visible = true;
                    //lose = game.add.audio('lose');
                    //lose.play();
                }
            }

            if(ledgeActive.body.position.x > 250 && direction == 'left'){
                if(ledgeActive.body.velocity.x < -200){
                    ledgeActive.body.velocity.x = ledgeActive.body.velocity.x + 2;
                }
                ledgeActive.body.velocity.x = ledgeActive.body.velocity.x - 2;
            }
            else{
                direction = 'right';
                if(ledgeActive.body.position.x < 310){
                    if(ledgeActive.body.velocity.x > 200){
                        ledgeActive.body.velocity.x = ledgeActive.body.velocity.x - 2;
                    }
                    else{
                        ledgeActive.body.velocity.x = ledgeActive.body.velocity.x + 2;
                    }
                }
                else{
                    direction = 'left';
                }
            }

            ennemies.forEach(function(item) {
                
                if(item.body.position.x > 5 && directionZombie == 'left'){
                    item.body.position.x = item.body.position.x - 2;
                    item.animations.play('left');
                }
                else{
                    directionZombie = 'right';
                    if(item.body.position.x < 750){
                       item.body.position.x = item.body.position.x + 2;
                       item.animations.play('right');
                    }
                    else{
                        directionZombie = 'left';
                    }
                }

            }, this);

    }
};
