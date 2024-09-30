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

function isBallinPlayer(direction, playerx, playery) {
    if (direction = 0){
        if (ball.x - ball.speed <= player_left.x + 9 && ball.x - ball.speed >= player_left.x - 9) {
            return 0;
        } else return 1;
    } else if (direction = 1) {
        if (ball.x + ball.speed <= player_right.x + 9 && ball.x + ball.speed >= player_right.x - 9) {
            return 0;
        } else return 1;
    }
}

function mooveBall() {
    if (ball.direction_x = 0){
        if (isBallinPlayer(ball.direction_x, ))
    } else if (ball.direction_x = 1) {
        if (ball.x + ball.speed <= player_right.x + 9 && ball.x + ball.speed >= player_right.x - 9) {
            console.log(ball.x, player_right.x, player_right.y);
            ball.direction_x = 0;
        } else ball.x += ball.speed;
    }
}

function drawBall(){
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // Create a full circle
    ctx.fillStyle = ball.color; // Set the fill color
    ctx.fill(); // Fill the circle
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
    clearCanvas();
    drawPlayers();
    mooveBall();
    drawBall();
    updatePlayers();

    requestAnimationFrame(gameLoop);
}

// Event listeners for keydown and keyup
document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);

// Start the game loop
gameLoop();

