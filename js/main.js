// Set global coordinate size
const ASPECT_RATIO = 16 / 9;
var coordinateSize;
function handleResize() {
    if(window.innerHeight * ASPECT_RATIO > window.innerWidth) {
        // Portrait
        coordinateSize = window.innerWidth / 100;
    } else {
        // Landscape
        coordinateSize = window.innerHeight / 100 * ASPECT_RATIO;
    }
}
window.addEventListener('resize', () => { handleResize() });
handleResize();

const playground = new Canvas();
const player = new Character();
const controls = new Controls();

// Generate test island
const island = new Island();

let lastTimestamp = Date.now();

// Game loop
function tick() {
    // Get time delta
    const currentTimestamp = Date.now();
    const deltaTime = currentTimestamp - lastTimestamp;
    lastTimestamp = currentTimestamp;

    // Tick character
    player.nextTick(playground, controls, deltaTime);

    // Tick island
    island.nextTick(playground);

    // Render image
    playground.clear();
    playground.draw();

    // Continue game loop
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);