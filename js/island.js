class Island {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.size = { x: 0, y: 0 };

        this.spawn();
    }

    spawn() {
        // Random size between 10 and 20
        this.size.x = this.size.y = Math.random() * 10 + 10;

        // Randomize position
        this.position.x = Math.random() * (100 - this.size.x);
        this.position.y = Math.random() * (50 - this.size.y);
    }

    nextTick(canvas) {
        canvas.addContent(this);
    }
}