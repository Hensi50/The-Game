let inputDir = { x: 0, y: 0 };
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
let goverSound=new Audio('gover.WAV');
let gSound=new Audio('eat.WAV');
//let bgSound=new Audio('bgMusic.mp3');

const bord = document.getElementById("bord");

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // Self-collision
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    // Wall-collision
    if (
        sarr[0].x >= 18 || sarr[0].x <= 0 ||
        sarr[0].y >= 18 || sarr[0].y <= 0
    ) {
        return true;
    }
    return false;
}

function gameEngine() {
    // Check for collision
    if (isCollide(snakeArr)) {
    goverSound.play();
    //bgSound.pause();
    setTimeout(() => {
        alert("Game over! your score was:" + score + " Press any key to play again!");
        score = 0; // <-- ADD THIS LINE
        scoreBox.innerHTML = "score:0";
        inputDir = { x: 0, y: 0 };
        snakeArr = [{ x: 13, y: 15 }];
        //bgSound.play();
    }, 100); 
}

   

    // If snake eats the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        gSound.play();
        score += 1;
        scoreBox.innerHTML = "score:" + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
            
        });
        let a = 2, b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;  // Fixed typo: was `yx` instead of `y`

    // Render the snake and food
    bord.innerHTML = "";

    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.gridRowStart = e.y;
        snakeElement.classList.add(index === 0 ? 'h' : 's');
        bord.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('f');
    bord.appendChild(foodElement);
}

//main logic


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y !== 1) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;
        case "ArrowDown":
            if (inputDir.y !== -1) {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;
        case "ArrowRight":
            if (inputDir.x !== -1) {
                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;
        case "ArrowLeft":
            if (inputDir.x !== 1) {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;
    }
});
