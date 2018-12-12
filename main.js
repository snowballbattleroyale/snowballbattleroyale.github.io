var player;
var enemys = []

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
        window.addEventListener('mousedown', function (e) {
            myGameArea.x = e.pageX-20;
            myGameArea.y = e.pageY-20;
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

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.angle = 0
    this.speed = 1;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y); 
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height); 
        ctx.restore(); 
    }
    this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
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

function updateGameArea() {
    myGameArea.clear();
    if (myGameArea.x && myGameArea.y) {
        player.x = myGameArea.x;
        player.y = myGameArea.y;        
    }
    
    if (distence(player.x,player.y,enemys[0].x,enemys[0].y) < 100)
    {
        pointto(enemys[0].x, enemys[0].y, player.x, player.y, enemys[0]);
        enemys[0].newPos();
    }
    player.update();
    enemys[0].update();
}
