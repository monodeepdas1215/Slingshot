var game = new Phaser.Game(1440,720,Phaser.AUTO, 'slightshot-demo');

var board;
var launchpad;
var frameCouter = 0;
var cX,cY;
var angle = 0;
var speed = 5;
var leftKey,rightKey,fireButton;
var myPoint;
var weapon;
var pointer;
var score=0;
var obstacle=[];
var counter=0;
var scoreText;
var timer=3600;// as the default frame rate is 60 so 60 frames per sec * 60 secs
var timerText;

var orbitBoard=50;
var orbit1=125;
var orbit2=175;
var orbit3=225;
var orbitLaunchpad=325;
var maxWeaponValidDistance=240;

//The speed with which the hinderbubbles are moving can be configured with this variable
var obstacleAngleChange=1.5;

var playButton, replayButton;

//adding all the game states
game.state.add('boot',bootState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('gameOver',gameOverState);

//starting the game by booting up phaser engine
game.state.start('boot');