class Island {
    constructor(isFirstIsland = false) {
        if(isFirstIsland) {
            this.position = { x: 40, y: -10 };
            this.size = { x: 20, y: 20 };
        } else {
            this.position = { x: 0, y: 0 };
            this.size = { x: 0, y: 0 };
        }

        this.collisionSize = { ...this.size }; // Will be overwritten when island is spawned
        this.collisionPositionOffset = { x: 0, y: -2 };

        this.image = document.getElementById('island');

        this.slipperyness = 50;
    }

    spawn(minY) {
        // Random size between 10 and 20
        this.size.x = this.size.y = Math.random() * 5 + 10;

        // Set collision properties
        this.collisionSize = { ...this.size };
        this.collisionPositionOffset.y *= this.size.x / 20;

        // Randomize position
        this.position.x = Math.random() * (100 - this.size.x);
        this.position.y = Math.random() * (30 - this.size.y) + minY;
    }

    isCollidingWith(object) {
        const collisionPosition = { x: this.position.x + this.collisionPositionOffset.x, y: this.position.y + this.collisionPositionOffset.y };
        if(
            collisionPosition.x < object.position.x + object.size.x && collisionPosition.x + this.collisionSize.x > object.position.x &&
            collisionPosition.y < object.position.y + object.size.y && collisionPosition.y + this.collisionSize.y > object.position.y
        ) {
            return true;
        }

        return false;
    }

    getCollisionY() {
        return this.position.y + this.collisionPositionOffset.y + this.collisionSize.y;
    }

    nextTick(canvas) {
        canvas.addContent(this);
    }
}