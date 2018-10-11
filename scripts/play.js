var playState={
    preload:function(){
        game.load.crossOrigin='anonymous';
        game.load.image('board','assets/board-dart.png');
        game.load.image('launchpad','assets/launchpad.png');
        game.load.image('weapon','assets/arrow.png');
        game.load.image('dot','assets/spots.png');
        game.load.image('obstacle','assets/obstacle.png');
        game.load.image('obstacle1','assets/obstacle1.png');
        game.load.image('obstacle2','assets/obstacle2.png');
        game.load.image('pointer','assets/pointer.png');
    },
    create:function(){

        //center point for reference
        cX = 720;
        cY = 360;
        myPoint=new Phaser.Point(cX,cY);

        //game background
        game.stage.backgroundColor = "#ffffff";

        //creating circles
        var graphics = game.add.graphics(0, 0);
        
        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawCircle(cX, cY, 250); //orbit 1 radius
        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawCircle(cX, cY, 355); //orbit 2 radius
        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawCircle(cX, cY, 455); //orbit 3 radius
        graphics.lineStyle(1, 0x19cb65, 1);
        graphics.drawCircle(cX, cY, 650); //launchpad orbit

        //creating the board
        board = game.add.sprite(cX, cY,'board');
        game.physics.arcade.enable(board);
        board.body.setCircle(50);
        board.anchor.x=0.5;
        board.anchor.y=0.5;
        board.allowGravity=true;

        //creating the launchpad
        launchpad = game.add.sprite(cX,cY-orbitLaunchpad,'launchpad');
        launchpad.anchor.x=0.5;
        launchpad.anchor.x=0.5;

        //pointer
        pointer = game.add.sprite(0,0,'pointer');
        launchpad.addChild(pointer);

        //giving it an initial position
        this.moveSpriteOnCircle(angle,launchpad,orbitLaunchpad);

        //weapons
        weapon = game.add.weapon(1,'weapon');
        weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        weapon.bulletSpeed = 600;
        weapon.bulletKillDistance = maxWeaponValidDistance;
        weapon.fireRate = 100;
        weapon.trackSprite(launchpad, 0, 15, true);
        
        
        //obstacle
        //orbit 1
        obstacle1 = game.add.sprite(cX,cY-orbit1,'obstacle');
        obstacle2 = game.add.sprite(cX,cY+orbit1,'obstacle');
        obstacle3 = game.add.sprite(cX-orbit1,cY,'obstacle');
        obstacle4 = game.add.sprite(cX+orbit1,cY,'obstacle');
        //orbit 2
        obstacle5 = game.add.sprite(cX-orbit2,cY,'obstacle2');
        obstacle6 = game.add.sprite(cX+orbit2,cY,'obstacle2');
        obstacle7 = game.add.sprite(cX-orbit2,cY-orbit2,'obstacle2');
        obstacle8 = game.add.sprite(cX-orbit2,cY+orbit2,'obstacle2');
        obstacle9 = game.add.sprite(cX-orbit2-5,cY+20,'obstacle2');
        obstacle10 = game.add.sprite(cX+orbit2+5,cY-20,'obstacle2');
        //orbit 3
        obstacle11 = game.add.sprite(cX-orbit3,cY,'obstacle2');
        obstacle12 = game.add.sprite(cX-orbit3-1,cY+10,'obstacle2');
        obstacle13 = game.add.sprite(cX-orbit3-1,cY-10,'obstacle2');
        obstacle14 = game.add.sprite(cX+orbit3,cY,'obstacle2');
        obstacle15 = game.add.sprite(cX+orbit3-1,cY+10,'obstacle2');
        obstacle16 = game.add.sprite(cX+orbit3-1,cY-10,'obstacle2');
        obstacle17 = game.add.sprite(cX-10,cY+orbit3,'obstacle2');
        obstacle18 = game.add.sprite(cX+10,cY+orbit3,'obstacle2');
        obstacle19 = game.add.sprite(cX-10,cY+orbit3,'obstacle2');
        obstacle20 = game.add.sprite(cX+10,cY-orbit3,'obstacle2');

        obstacle1.visible=false;
        obstacle2.visible=false;
        obstacle3.visible=false;
        obstacle4.visible=false;
        obstacle5.visible=false;
        obstacle6.visible=false;
        obstacle7.visible=false;
        obstacle8.visible=false;
        obstacle9.visible=false;
        obstacle10.visible=false;
        obstacle11.visible=false;
        obstacle12.visible=false;
        obstacle13.visible=false;
        obstacle14.visible=false;
        obstacle15.visible=false;
        obstacle16.visible=false;
        obstacle17.visible=false;
        obstacle18.visible=false;
        obstacle19.visible=false;
        obstacle20.visible=false;

        //adding to an array for better manipulation in update function using loops
        obstacle.push(obstacle1);
        obstacle.push(obstacle2);
        obstacle.push(obstacle3);
        obstacle.push(obstacle4);
        obstacle.push(obstacle5);
        obstacle.push(obstacle6);
        obstacle.push(obstacle7);
        obstacle.push(obstacle8);
        obstacle.push(obstacle9);
        obstacle.push(obstacle10);
        obstacle.push(obstacle11);
        obstacle.push(obstacle12);
        obstacle.push(obstacle13);
        obstacle.push(obstacle14);
        obstacle.push(obstacle15);
        obstacle.push(obstacle16);
        obstacle.push(obstacle17);
        obstacle.push(obstacle18);
        obstacle.push(obstacle19);
        obstacle.push(obstacle20);

        //setting the anchor the weapons to the center of the weapons so as to avoid eliptical movement
        for(i=0;i<obstacle.length;i++)
            obstacle[i].anchor.setTo(0.5,0.5);
        
        //scoreText and timer text
        scoreText = game.add.text(16, 16, 'Score: 0', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
        timerText = game.add.text(1000, 16, 'Score: 0', { font: "30pt Courier", fill: "#000000", stroke: "#000000", strokeThickness: 2 });
    },
    update:function(){
        //if the timer is out then end the game and goto the gameOver state
        if(timer<=0){
            game.state.start('gameOver');
        }else{
            timer--;
        }
    
        //rotating the obstacles
        for(i=0;i<obstacle.length;i++){
            if(i<4)
                obstacle[i].angle+=obstacleAngleChange;
            else if (i<10)
                obstacle[i].angle-=obstacleAngleChange;
            else
                obstacle[i].angle+=obstacleAngleChange;
        }
        
        //orbit 1
        this.moveSpriteOnCircle(obstacle1.angle,obstacle1,orbit1);
        this.moveSpriteOnCircle(obstacle2.angle-90,obstacle2,orbit1);
        this.moveSpriteOnCircle(obstacle3.angle-180,obstacle3,orbit1);
        this.moveSpriteOnCircle(obstacle4.angle-270,obstacle4,orbit1);
    
        //orbit 2
        this.moveSpriteOnCircle(obstacle5.angle-60,obstacle5,orbit2);
        this.moveSpriteOnCircle(obstacle6.angle-120,obstacle6,orbit2);
        this.moveSpriteOnCircle(obstacle7.angle-180,obstacle7,orbit2);
        this.moveSpriteOnCircle(obstacle8.angle-240,obstacle8,orbit2);
        this.moveSpriteOnCircle(obstacle9.angle-300,obstacle9,orbit2);
        this.moveSpriteOnCircle(obstacle10.angle,obstacle10,orbit2);
    
        //orbit 3
        this.moveSpriteOnCircle(obstacle11.angle-36,obstacle11,orbit3);
        this.moveSpriteOnCircle(obstacle12.angle-72,obstacle12,orbit3);
        this.moveSpriteOnCircle(obstacle13.angle-108,obstacle13,orbit3);
        this.moveSpriteOnCircle(obstacle14.angle-144,obstacle14,orbit3);
        this.moveSpriteOnCircle(obstacle15.angle-180,obstacle15,orbit3);
        this.moveSpriteOnCircle(obstacle16.angle-216,obstacle16,orbit3);
        this.moveSpriteOnCircle(obstacle17.angle-252,obstacle17,orbit3);
        this.moveSpriteOnCircle(obstacle18.angle-288,obstacle18,orbit3);
        this.moveSpriteOnCircle(obstacle19.angle-324,obstacle19,orbit3);
        this.moveSpriteOnCircle(obstacle20.angle-360,obstacle20,orbit3);
    
        //updating the motion of the board
        board.angle+=0.5;
        this.moveSpriteOnCircle(board.angle,board,orbitBoard);
    
        //controlling the launchpad movement
        launchpad.rotation=game.physics.arcade.angleBetween(launchpad, myPoint);
        var mouseX = game.input.x;
        var mouseY = game.input.y;    
        theta = Math.atan2(mouseX-cX, mouseY-cY)
        var newX = Math.sin(theta) * orbitLaunchpad;
        var newY = Math.cos(theta) * orbitLaunchpad;
        launchpad.x=cX + newX;
        launchpad.y=cY + newY;
        
        //firing weapons
        if (game.input.activePointer.isDown)
        {
            weapon.fire();
        }
    
        //handling collision of the weapon with the board
        game.physics.arcade.collide(weapon.bullets, board, this.onSlingShotHandler, null, this);
    
        //handling collision of the weapon with the obstacles
        for(i=0;i<obstacle.length;i++)
            game.physics.arcade.collide(weapon.bullets, obstacle[i],this.killIt,null,this);
    
        //displaying timer
        timerText.text = 'Time Left : '+(parseInt(timer/60));
    },
    killIt:function(object1,object2){
        object2.kill();
        object1.visible=false;
        object1.body.enable=false;
    },
    onSlingShotHandler:function(object1,object2){

        //handling the sticking of the weapon on the board
        //deg=game.physics.arcade.angleBetween(object1, object2);
        deg=object2.angle;
        theta=Phaser.Math.degToRad(deg);

        pocX=(object1.x+50*Math.cos(theta))-object1.x;
        pocY=(object1.y+50*Math.sin(theta))-object1.y;
        dot=game.add.sprite(pocX,pocY,'dot');

        console.log('Angle of weapon : '+deg);
        console.log('x : '+object2.x+50*Math.cos(theta));
        console.log('y : '+object2.y+50*Math.sin(theta));

        dot.anchor.setTo(0.5,0.5);
        board.addChild(dot);

        //killing the weapon
        object2.kill();
        score+=1;
        scoreText.text = 'Score : ' + score;
        for(i=0;i<obstacle.length;i++){
            if(obstacle[i].visible==false){
                obstacle[i].visible=true;
                game.physics.arcade.enable(obstacle[i]);
                obstacle[i].body.enable=true;
                break;
            }
        }
    },
    getRandom:function(min,max){
        return Math.floor(Math.random()*(max-min))+min;
    },
    moveSpriteOnCircle:function(deg,sprite,radius) {
        var theta = Phaser.Math.degToRad(deg)

        var newX = Math.sin(theta) * radius;
        var newY = Math.cos(theta) * radius;

        sprite.x=cX + newX;
        sprite.y=cY + newY;
    },
    render:function(){
        game.debug.body(board);
        game.debug.bodyInfo(200,200,board);
        weapon.debug();
    }
};

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};