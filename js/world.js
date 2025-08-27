class World {
    constructor() {
        this.maxNumberOfIslands = 100;
        this.islands = [];

        // Generate first island
        this.islands.push(new Island(true));

        this.minY = this.islands[0].position.y; // Starter island is on -10
    }

    createIslands() {
        while(this.islands.length < this.maxNumberOfIslands && this.minY <= HIGHEST_Y) {
            const island = new Island();
            island.spawn(this.minY);

            let isColliding = false;
            for (const previousIsland of this.islands) {
                if(island.isCollidingWith(previousIsland)) {
                    isColliding = true;
                    break;
                }
            }

            if(!isColliding) {
                this.minY = island.position.y;

                this.islands.push(island);
            }
        }
    }

    nextTick(canvas) {
        this.createIslands();

        for (const island of this.islands) {
            island.nextTick(canvas);
        }
    }
}