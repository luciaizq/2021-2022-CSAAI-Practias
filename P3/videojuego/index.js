console.log('Ejecutando JS del Breakout...');
//-- Elementos de la gui
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    
}

console.log("Ejecuitando JS...");

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//---- Configurar las funciones de retrollamada

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}
  

const canvas = document.getElementById("canvas");

//-- Defino el tamaño del canvas
canvas.width = 600;
canvas.height = 700;

//-- Obtengo el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Variables
var ballSize = 15;
var paddleHeight = 20;
var paddleWidth = 100;
var paddle = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
    // Estado del juego
var inProcess = false;
//ladrillos
const BRICK = {
    rows: 7, 
    columns: 10,
    width: 50,
    height: 20,
    padding: 8,
    marginTop: 60,
    marginLeft: 15,
    show: true
};

let x = canvas.width/2;
let y = canvas.height-190;
let velx = 4;
let vely = 3;
let scores = 0;
let lifes = 3;

//-- Sonidos
const playing = new Audio("playing.mp3");
const point = new Audio("punto.mp3");
const touch = new Audio("rebote.mp3");
const gameover = new Audio("gameover.mp3");
const fail = new Audio("fallo.mp3");
const win = new Audio("victoria.mp3");

//-- Dibujo pelota
function drawBall() {
    ctx.beginPath();
        ctx.arc(x, y, ballSize, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(0, 38, 255, 0.75)';
        ctx.fill();
    ctx.closePath();
}

//-- Dibujo raqueta
function drawPaddle() {
    ctx.beginPath();
        ctx.rect(paddle, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = 'rgba(0, 38, 255, 0.75)';
        ctx.fill();
    ctx.closePath();
    booleanPaddle();
}

//-- Estado teclas raqueta y saque
function booleanPaddle() {
    window.onkeydown = (e) => {
        if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        } else if (e.keyCode == 32 ) {
            inProcess = true;
            // Sacar con barra espaciadora
        }
    }
    window.onkeyup = (e) => {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        } 
    }
}

//-- Implemento ladrillos en matriz bidimensional
var bricks = [];
for (i=0; i<BRICK.columns; i++) {
    bricks[i] = [];
    for(j=0; j<BRICK.rows; j++) {
        bricks[i][j] = {
            x: (i*(BRICK.width+BRICK.padding))+BRICK.marginLeft,
            y: (j*(BRICK.height+BRICK.padding))+BRICK.marginTop,
            visible: BRICK.show
        };  // Asocio a cada ladrillo su posición y su visibilidad (true)
    }
}

//-- Dibujo ladrillos
function drawBricks() {
    for(i=0; i<BRICK.columns; i++) {
        for(j=0; j<BRICK.rows; j++) {
            if(bricks[i][j].visible){
              ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, BRICK.width, BRICK.height);
                ctx.fillStyle = 'rgba(0, 38, 255, 0.75)';
                ctx.fill();
            ctx.closePath();  
            }       
        }
    }
}

//-- Detecto colisiones 
function collisions() {
    for(i=0; i<BRICK.columns; i++) {
        for(j=0; j<BRICK.rows; j++) {
            var l = bricks[i][j];
            if(l.visible == true) {
                if(x > l.x && x < l.x + BRICK.width && y > l.y && y < l.y + BRICK.height) {
                    vely = -vely;
                    l.visible = false;
                    point.play();
                    scores += 1;
                    console.log(scores);
                    if (scores == 70) {
                        win.play();
                        alert('¡HAS GANADO');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

//-- Mostrar puntuación y vidas
function drawPoints() {
    ctx.font = "50px mifuente";
    ctx.fillStyle = 'black';
    ctx.fillText("Puntuación: " + scores, 20, 40);
    ctx.fillText("Vidas: " + lifes, 450, 40);
}

//-- Movimientos del juego
function move() {
    console.log('Pelota en mvto...');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawPoints();
    collisions();

    if (inProcess) {
        setInterval(playing.play(), 500);
        if (x < ballSize || x >= (canvas.width - ballSize)) {
            velx = -velx;
        }
        if (y <= ballSize) {
            vely = -vely;
        } else if (y > (canvas.height - ballSize)) {
            if (x > paddle && x < paddle + paddleWidth) {
                vely = -vely;   // En caso de rebotar en la raqueta
                touch.play();
            } else {            // En caso de tocar el suelo
                fail.play();
                lifes = lifes - 1;
                if (lifes <= 0) {
                    gameover.play();
                    alert("GAME OVER!");
                    document.location.reload();
                } else {
                    inProcess = false;
                    x = canvas.width/2;
                    y = canvas.height-190;
                    velx = 4;
                    vely = 2;
                    paddle = (canvas.width - paddleWidth)/2;
                }
            }
        }
        if(rightPressed && paddle < canvas.width - paddleWidth) {
            paddle = paddle + 7;
        } else if(leftPressed && paddle > 0) {
            paddle = paddle - 7;
        }

        x = x + velx;
        y = y + vely;
    }
    requestAnimationFrame(move);
}

move();