var w = 640;
var h = 480;

var score = 0;
var health = 100;
var zombieHealth = 100;
var zombie2Health = 100;
var time = 1300;
var starPoint = 10;
var diamondPoint = 50;
var scoreText;
var remainingText;
var nbrJump = 2;
var direction = 'left';
var directionZombie = 'left';
var directionZombie2 = 'left';
var fuelBar;
var zombieCanMove = true;
var playerHit = false;
var player2Hit = false;

var weapon;
var fireButton;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

game.state.add('boot', bootState);
game.state.add('intro', introState);
game.state.add('level1', loadState);
game.state.add('finish', finishState);
//game.state.add('level2', level2State);

game.state.start('boot');


function nextLevel () {
    score = 0;
    health = 100;
    zombieHealth = 100;
    zombie2Health = 100;
    time = 1500;
    game.state.start('level1');
}

function startGame () {
    start = game.add.audio('start');
    start.volume = 0.5;
    start.play();
    game.state.start('level1');
}

function restartGame () {
    score = 0;
    health = 100;
    zombieHealth = 100;
    zombie2Health = 100;
    time = 1300;
    zombieCanMove = true;
    startGame();
}

function startMusic() {
    intro.volume = 0.4;
    intro.play();
    //intro.fadeIn(4000);
}

function collectStar (player, star) {
	coin = game.add.audio('coin');
    coin.play();
    star.kill();
    score += starPoint;
    scoreText.text = 'Score: ' + score;
}

function collectDiamond (player, diamond) {
	diamondSound = game.add.audio('diamond');
    diamondSound.play();
    diamond.kill();
    score += diamondPoint;
    scoreText.text = 'Score: ' + score;
}


function healPlayer (player, medic) {
    healSound = game.add.audio('medic');
    healSound.play();
    medic.kill();
    health += 50;

    healthText.text = 'Health: ' + health;
}


function hitZombie (zombie, bullet) {
    hit = game.add.audio('hit');
    hit.play();
    bullet.kill();
    if(zombieHealth > 0){
        zombieHealth -= 30;
    }
    else{
        zombie.kill();
        score += 20;
        scoreText.text = 'Score: ' + score;
    }
}

function hitZombie2 (zombie2, bullet) {
    hit = game.add.audio('hit');
    hit.play();
    bullet.kill();
    if(zombie2Health > 0){
        zombie2Health -= 30;
    }
    else{
        zombie2.kill();
        score += 20;
        scoreText.text = 'Score: ' + score;
    }
}

function killBullet (bullet, platform) {
    bullet.kill();
}


function checkCollide (sprite1, sprite2){
    if(sprite2.key == 'zombie'){
        if(health>0){
            health -= 1;
        }
        else{
            player.kill();
        }
        healthText.text = 'Health: ' + health;
    }
}

function checkCollidePlayer2 (sprite1, sprite2){
    if(sprite2.key == 'zombie'){
        if(health>0){
            health -= 1;
        }
        else{
            sarah.kill();
        }
        healthText.text = 'Health: ' + health;
    }
}