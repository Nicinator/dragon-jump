// Set global coordinate size
const ASPECT_RATIO = 16 / 9;
const HIGHEST_Y = 100 / ASPECT_RATIO;
const GRAVITY = 50; // 50% of with per second squared
const WORLD_ACCELERATION = 0.04;
const MAX_WORLD_MOVEMENT_SPEED = 10;
let worldMovementSpeed = 2;
let coordinateSize;
let canvasHeightInPX = 0;
function handleResize() {
    if(window.innerHeight * ASPECT_RATIO > window.innerWidth) {
        // Portrait
        coordinateSize = window.innerWidth / 100;
    } else {
        // Landscape
        coordinateSize = window.innerHeight / 100 * ASPECT_RATIO;
    }

    canvasHeightInPX = Math.floor(coordinateSize * 100 / ASPECT_RATIO);
}
window.addEventListener('resize', () => { handleResize() });
handleResize();

const playground = new Canvas();
const player = new Character();
const controls = new Controls();

// Generate world
const world = new World();
world.createIslands();

let lastTimestamp = Date.now();

// Game loop
function tick() {
    // Get time delta
    const currentTimestamp = Date.now();
    const deltaTime = currentTimestamp - lastTimestamp;
    lastTimestamp = currentTimestamp;

    // World movement
    if(worldMovementSpeed < MAX_WORLD_MOVEMENT_SPEED) {
        worldMovementSpeed += WORLD_ACCELERATION * deltaTime / 1000;
    } else if(worldMovementSpeed > MAX_WORLD_MOVEMENT_SPEED) {
        worldMovementSpeed = MAX_WORLD_MOVEMENT_SPEED;
    }
    const worldMovementOffset = worldMovementSpeed * deltaTime / 1000;
    world.worldMovement(worldMovementOffset);
    player.worldMovement(worldMovementOffset);

    // Tick world
    world.nextTick(playground);

    // Tick character
    player.nextTick(playground, controls, deltaTime);

    // Tick controls
    controls.nextTick();

    // Render image
    playground.clear();
    playground.draw();

    // Continue game loop
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);