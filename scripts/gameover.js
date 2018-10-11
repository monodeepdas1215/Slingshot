var gameOverState={
    preload:function(){
        game.load.image('replay','assets/replay.png');
    },
    create:function(){
        scoreText=game.add.text(570, 480, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
        scoreText.text='Your Score : '+score;
        replayButton = game.add.button(656,296,'replay',this.actionClick,this);
    },
    update:function(){
    },
    actionClick:function(){
        timer=3600;
        score=0;
        obstacle=[];
        game.state.start('play');
    }
};