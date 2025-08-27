class Island {
    constructor(isFirstIsland = false) {
        if(isFirstIsland) {
            this.position = { x: 40, y: -10 };
            this.size = { x: 20, y: 20 };
        } else {
            this.position = { x: 0, y: 0 };
            this.size = { x: 0, y: 0 };
        }
    }

    spawn(minY) {
        // Random size between 10 and 20
        this.size.x = this.size.y = Math.random() * 5 + 10;

        // Randomize position
        this.position.x = Math.random() * (100 - this.size.x);
        this.position.y = Math.random() * (40 - this.size.y) + minY;
    }

    isCollidingWith(object) {
        if(
            this.position.x < object.position.x + object.size.x && this.position.x + this.size.x > object.position.x &&
            this.position.y < object.position.y + object.size.y && this.position.y + this.size.y > object.position.y
        ) {
            return true;
        }

        return false;
    }

    nextTick(canvas) {
        canvas.addContent(this);
    }
}