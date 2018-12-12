var player;
var enemys = []
var playerimg = document.getElementById("player");
var enemyimg = document.getElementById("enemy");

var mouX;
var mouY;

function startGame() {
    enemys[0] = new component(30, 30, "blue", 10, 120);
    player = new component(30, 30, "red", 10, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 20;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
        window.addEventListner('mousemove', function(e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function vector2(x_, y_) {
    this.x = x_;
    this.y = y_;
}

function component(width, height, color, x, y, imgt) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.angle = 0;
    this.speed = 1;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.drawText(myGameArea.x, 100, 100);
        ctx.translate(this.x, this.y); 
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height); 
        //ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height); 
        ctx.restore(); 
    }
    this.godir = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.moveSpeed = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function distence(x_,y_,x1_,y1_)
{
    var dist = Math.sqrt((x1_-x_)*(x1_-x_)+(y1_-y_)*(y1_-y_));
    return dist;
}

function pointto(x_,y_,x1_,y1_,obj) {
    var objpos = new vector2(x_, y_);
    var localPos = new vector2(x1_,y1_);
    var offset = new vector2(objpos.x - localPos.x, objpos.y - localPos.y);
    var angle = Math.atan2(offset.y, offset.x);
    obj.angle = angle - 90;
}

function playerMove(speed) {
    player.speedX = 0;
    player.speedY = 0; 
    //do wasd
    if (myGameArea.key && myGameArea.key == 65) {player.speedX = -speed; }
    if (myGameArea.key && myGameArea.key == 68) {player.speedX = speed; }
    if (myGameArea.key && myGameArea.key == 87) {player.speedY = -speed; }
    if (myGameArea.key && myGameArea.key == 83) {player.speedY = speed; }
    pointto(player.x, player.y, myGameArea.x, myGameArea.y, player);
    player.moveSpeed();
}

function updateGameArea() {
    
    myGameArea.clear();
    playerMove(4);
    if (distence(player.x,player.y,enemys[0].x,enemys[0].y) < 500)
    {
        pointto(enemys[0].x, enemys[0].y, player.x, player.y, enemys[0]);
        enemys[0].godir();
    }
    player.update();
    enemys[0].update();
}
