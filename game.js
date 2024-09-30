// Set up the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player_right = {
    x: canvas.width - 30,
    y: canvas.height / 2 - 50,
    width: 20,
    height: 100,
    speed: 5,
    dy: 0
};

let player_left = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 20,
    height: 100,
    speed: 5,
    dy: 0
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 20,
    height: 100,
    speed: 5,
    radius: 15,
    color: 'grey',
    direction_x: 0, // 0 = left - 1 = right
    direction_y: 0  // 0 = up - 1 = down
}



function resetParameter(){
    player_right.x = canvas.width - 30;
    player_right.y = canvas.height / 2 - 50;
    player_right.width = 20;
    player_right.height = 100;
    player_right.speed = 5;
    player_right.dy = 0;
    
    player_left.x = 10;
    player_left.y = canvas.height / 2 - 50;
    player_left.width = 20;
    player_left.height = 100;
    player_left.speed = 5;
    player_left.dy = 0;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.width = 20;
    ball.height = 100;
    ball.speed = 5;
    ball.radius = 15;
    ball.color = 'grey';
    ball.direction_x = 0; // 0 = left - 1 = right
    ball.direction_y = 0;  // 0 = up - 1 = down
}

let gamePaused = true;  // Start with the game paused
// Event listener to start the game on spacebar press
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        gamePaused = false;  // Unpause the game when spacebar is pressed
    }
});


// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the players (paddles)
function drawPlayers() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player_right.x, player_right.y, player_right.width, player_right.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(player_left.x, player_left.y, player_left.width, player_left.height);
}

function isBallinPlayer(playerx, playery, playerWidth, playerHeight) {
    // Calculate the player's boundaries
    const playerLeft = playerx;
    const playerRight = playerx + playerWidth;
    const playerTop = playery;
    const playerBottom = playery + playerHeight;

    // X-axis: Check if the ball's left or right edge is within the paddle's X bounds
    if (ball.x + ball.radius >= playerLeft && ball.x - ball.radius <= playerRight) {
        // Y-axis: Check if the ball's top or bottom edge is within the paddle's Y bounds
        if (ball.y + ball.radius >= playerTop && ball.y - ball.radius <= playerBottom) {
            return true;  // Ball is colliding with the paddle
        }
    }
    return false;  // No collision
}

// console.log(ball.x, player_right.x, player_right.y);
// Move the ball
function mooveBall() {
    // Move the ball based on direction
    if (ball.direction_x === 0) {
        // Check collision with the left paddle
        if (isBallinPlayer(player_left.x, player_left.y, player_left.width, player_left.height)) {
            ball.direction_x = 1;  // Reverse direction
            ball.x = player_left.x + player_left.width / 2 + ball.radius; // Position the ball just outside the paddle
        } else {
            ball.x -= ball.speed;  // Move the ball left
        }
    } else if (ball.direction_x === 1) {
        // Check collision with the right paddle
        if (isBallinPlayer(player_right.x, player_right.y, player_right.width, player_right.height)) {
            ball.direction_x = 0;  // Reverse direction
            ball.x = player_right.x - player_right.width / 2 - ball.radius; // Position the ball just outside the paddle
        } else {
            ball.x += ball.speed;  // Move the ball right
        }
    }
}

function checkWin() {
    if (ball.x <= 0){
        clearCanvas();
        ctx.font = "30px Courier New";
        ctx.fillStyle = "blue";
        ctx.fillText("Blue WIN", canvas.width / 2 - 20, canvas.height / 2);
        return true
    } else if (ball.x >= canvas.width) {
        clearCanvas();
        ctx.font = "30px Courier New";
        ctx.fillStyle = "red";
        ctx.fillText("Red WIN", canvas.width / 2 - 20, canvas.height / 2);
        return true
    }
    return false
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // Create a full circle
    ctx.fillStyle = ball.color; // Set the fill color
    ctx.fill(); // Fill the circle
    ctx.closePath();
}

// Update player positions based on their velocities
function updatePlayers() {
    // Right player movement
    player_right.y += player_right.dy;
    // Prevent the paddle from going off the top or bottom of the canvas
    if (player_right.y < 0) player_right.y = 0;
    if (player_right.y + player_right.height > canvas.height) player_right.y = canvas.height - player_right.height;

    // Left player movement
    player_left.y += player_left.dy;
    // Prevent the paddle from going off the top or bottom of the canvas
    if (player_left.y < 0) player_left.y = 0;
    if (player_left.y + player_left.height > canvas.height) player_left.y = canvas.height - player_left.height;
}

// Move the players based on key input
function movePlayer(e) {
    if (e.code === 'ArrowUp') {
        player_right.dy = -player_right.speed;
    } else if (e.code === 'ArrowDown') {
        player_right.dy = player_right.speed;
    } else if (e.code === 'KeyW') {
        player_left.dy = -player_left.speed;
    } else if (e.code === 'KeyS') {
        player_left.dy = player_left.speed;
    }
}

// Stop the players when the key is released
function stopPlayer(e) {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        player_right.dy = 0;
    } else if (e.code === 'KeyW' || e.code === 'KeyS') {
        player_left.dy = 0;
    }
}

// Game loop
function gameLoop() {
    // console.log(ball.direction_x);
    if (!gamePaused){
        clearCanvas();
        drawPlayers();
        mooveBall();
        drawBall();
        updatePlayers();
        if (checkWin() === true){
            clearCanvas();
            resetParameter();
            gamePaused = true;
            gameLoop();
        }
    } else {
        // Optionally display a "Press space to start" message
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Press Space to Start", canvas.width / 2 - 150, canvas.height / 2);
    }

    requestAnimationFrame(gameLoop);
}

// Event listeners for keydown and keyup
document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);

// Start the game loop
gameLoop();

