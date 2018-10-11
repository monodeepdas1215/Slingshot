var bootState={
    create:function(){
        //starting the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //starting the menu state
        game.state.start('menu');
    }
};