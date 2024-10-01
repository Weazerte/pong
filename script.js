import * as THREE from 'three';

class Player {
    constructor(x, y, z, size, speed, dy, dx, color){
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.speed = speed;
        this.dy = dy;
        this.dx = dx;
        this.color = color;
    }
    sceneADD(scene){
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: this.color });
        const cube = new THREE.Mesh(geometry, material);
        this.pCube = cube;
        cube.position.x = this.x;
        cube.position.y = this.y;
        cube.position.z = this.z;
        scene.add(cube);
    }
    
    getx(){
        return this.x;
    }

    gety(){
        return this.y;
    }

    getz(){
        return this.z;
    }

    getwidth(){
        return this.size;
    }

    getheight(){
        return this.size;
    }

    moveUp(){
        this.dy += this.speed;
    }
    moveDown(){
        this.dy -= this.speed;
    }
    moveLeft(){
        this.dx -= this.speed;
    }
    moveRight(){
        this.dx += this.speed;
    }
}


class ball {

    constructor(x, y, z, width, height, speed, radius, color, direction_x, direction_y){
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.radius = radius;
        this.color = color;
        this.direction_x = direction_x;
        this.direction_y = direction_y;
    }

    sceneADD(scene){
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: this.color });
        const sphere = new THREE.Mesh(geometry, material);
        this.bSphere = sphere;
        sphere.position.x = this.x;
        sphere.position.y = this.y;
        sphere.position.z = this.z;
        scene.add(sphere);
    }

    isBallinPlayer(playerx, playery, playerWidth, playerHeight) {
        // Calculate the player's boundaries
        const playerLeft = playerx;
        const playerRight = playerx + playerWidth;
        const playerTop = playery;
        const playerBottom = playery + playerHeight;
    
        // X-axis: Check if the ball's left or right edge is within the paddle's X bounds
        if (this.x + this.radius >= playerLeft && this.x - this.radius <= playerRight) {
            // Y-axis: Check if the ball's top or bottom edge is within the paddle's Y bounds
            if (this.y + this.radius >= playerTop && this.y - this.radius <= playerBottom) {
                return true;  // this is colliding with the paddle
            }
        }
        return false;  // No collision
    }

    isBallinWall(){
        if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= window.innerHeight) {
            return true;
        }
        return false;
    }

    // Move the ball
    mooveBall() {
    // Move the ball based on direction
    if (this.direction_x === 0) {
        console.log(player_left.getx(), player_left.gety(), player_left.getwidth(), player_left.getheight());
        // Check collision with the left paddl
        if (this.isBallinPlayer(player_left.getx(), player_left.gety(), player_left.getwidth(), player_left.getheight())) {
            this.direction_x = 1;  // Reverse direction
            this.x = player_left.getx() + player_left.getwidth() / 2 + this.radius; // Position the ball just outside the paddle
        } else {
            if (this.isBallinWall()){
                this.direction_y = !this.direction_y;  // Reverse direction
            }
            this.x -= this.speed;
        }
    } else if (this.direction_x === 1) {
        // Check collision with the right paddle
        if (this.isBallinPlayer(player_right.getx(), player_right.gety(), player_right.getwidth(), player_right.getheight())) {
            this.direction_x = 0;  // Reverse direction
            this.x = player_right.getx() - player_right.getwidth() / 2 - this.radius; // Position the ball just outside the paddle
        } else {
            if (this.isBallinWall()){
                this.direction_y = !this.direction_y;  // Reverse direction
            }
            this.y += this.speed;
            this.x += this.speed;
        }
    }
}
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 5, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const player_left = new Player(-5, 0, 0, 1, 0.2, 0, 0, 'purple');
player_left.sceneADD(scene);
const player_right = new Player(5, 0, 0, 1, 0.2, 0, 0, 'blue');
player_right.sceneADD(scene);
const balll = new ball(0, 0, 0, 1, 1, 0.1, 0.4, 'red', 0, 1);
balll.sceneADD(scene);
camera.position.z = 6;
const light = new THREE.PointLight('', 11111, 100);
scene.add(light);
light.position.set(0, 0, 20);

// Move the players based on key input
function movePlayer(e) {
    if (e.code === 'ArrowUp') {
        player_right.moveUp();
        // player_right.pCube.rotateZ(0.1);
    } else if (e.code === 'ArrowDown') {
        player_right.moveDown();
    } else if (e.code === 'KeyW') {
        player_left.moveUp();
    } else if (e.code === 'KeyS') {
        player_left.moveDown();
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

function updatePos() {
    player_right.y += player_right.dy;
    player_left.y += player_left.dy;
    player_right.pCube.position.y = player_right.y;
    player_left.pCube.position.y = player_left.y;
    balll.bSphere.position.x = balll.x;
}

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);

const animate = function () {
    requestAnimationFrame(animate);
    updatePos();
    balll.mooveBall();
    renderer.render(scene, camera);
};


animate();