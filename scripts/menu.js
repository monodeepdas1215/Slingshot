var menuState={
    preload:function(){
        game.load.image('playButton','assets/play-button.png');
    },
    create:function(){
        game.stage.backgroundColor = "#ffffff";
        game.add.text(530, 126, 'Slingshot v2.0', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
        playButton = game.add.button(656,296,'playButton',this.actionClick,this);
    },
    update:function(){
    },
    actionClick:function(){
        game.state.start('play');
    }
};