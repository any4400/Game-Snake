const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

let snake =[];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction) ;

let dir;

function direction(e) {
    if(e.keyCode == 37 && dir != 'right') //сравниваем код нажатой клавиши с кодом стрелки "Влево"
        dir = 'left';
    else if(e.keyCode == 38 && dir != 'down')
        dir = 'up';
    else if(e.keyCode == 39 && dir != 'left')
        dir = 'right';
    else if(e.keyCode == 40 && dir != 'up')
        dir = 'down';
}

function eatTail(head, arr) {
    for(let i=0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            alert('You are loser'); 
        }
 
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red"; //первый элемент змейки - зеленый, остальные  - красные
        ctx.fillRect(snake[i].x, snake[i].y, box , box); //задаем начальные координаты, высоту и ширину квадрата змейки
    }

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7); //выводим счет и указываем координаты его расположения

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
    } else {
        snake.pop(); // удаляем последний элемент в массиве
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3*box || snakeY > box * 17) {
        clearInterval(game);
        alert('You are loser');   
    }

    
    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake);

    snake.unshift(newHead); //добавляем новый элемент в начало
}


let game = setInterval(drawGame, 100);