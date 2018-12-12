var player;
var snowball;
var core = 0;
var enemys = [];
var playerimg = document.getElementById("player");
var enemyimg = document.getElementById("enemy");

var mouX;
var mouY;

function startGame() {
    enemys[0] = new gameObject(30, 30, "blue", 10, 120);
    player = new gameObject(30, 30, "red", 10, 120);
    snowball = new gameObject(10, 10, "white", player.x,player.y);
    gameArea.start();
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 20;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGame, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameArea.key = false;
        })
        window.addEventListener('mousemove', function (e) {
            gameArea.x = e.pageX;
            gameArea.y = e.pageY;
        })
        window.addEventListener('mousedown', function (e) {
            gameArea.md = e;
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

function gameObject(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.angle = 0;
    this.speed = 1;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.context;
        ctx.save();
        ctx.fillText(core, 100, 50);
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

function pointto(x_,y_,x1_,y1_, off,obj) {
    var objpos = new vector2(x_, y_);
    var localPos = new vector2(x1_,y1_);
    var offset = new vector2(objpos.x - localPos.x, objpos.y - localPos.y);
    var angle = Math.atan2(offset.y, offset.x);
    obj.angle = angle - off;
}

function playerMove(speed) {
    player.speedX = 0;
    player.speedY = 0; 
    //do wasd
    if (gameArea.key && gameArea.key == 65) {player.speedX = -speed; }
    if (gameArea.key && gameArea.key == 68) {player.speedX = speed; }
    if (gameArea.key && gameArea.key == 87) {player.speedY = -speed; }
    if (gameArea.key && gameArea.key == 83) {player.speedY = speed; }
    pointto(player.x, player.y, gameArea.x, gameArea.y, 0, player);
    player.moveSpeed();
}

function collision(localObj, otherObj) {
    if (localObj.x < otherObj.x + otherObj.width &&
        localObj.x + localObj.width > otherObj.x &&
        localObj.y < otherObj.y + otherObj.height &&
        localObj.height + localObj.y > otherObj.y) {
        return true;
    }
    else {
        return false;
    }
}

function moveSnowball() {
    snowball.speed = 30;
    if (collision(snowball, enemys[0])) {
        core++;
        snowball.x = player.x;
        snowball.y = player.y;
    }
    if (gameArea.key && gameArea.key == 32) {
        snowball.godir();
    }
    else {
        snowball.x = player.x;
        snowball.y = player.y;
        pointto(snowball.x, snowball.y, gameArea.x, gameArea.y, 90 * Math.PI / 180, snowball);
    }
}

function updateGame() {
    gameArea.clear();
    moveSnowball();
    playerMove(4);
    if (distence(player.x,player.y,enemys[0].x,enemys[0].y) < 500)
    {
        pointto(enemys[0].x, enemys[0].y, player.x, player.y, 90, enemys[0]);
        enemys[0].godir();
    }
    player.update();
    snowball.update();
    enemys[0].update();
}
