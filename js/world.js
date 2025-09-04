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

        // Delete lowest island if outside of map
        if(this.islands[0].position.y + this.islands[0].size.y < 0) {
            this.islands.shift();
        }
    }

    getLowestCollidingIsland(object) {
        let lowestCollidingIsland = null;
        for (const island of this.islands) {
            if(island.isCollidingWith(object)) {
                if(!lowestCollidingIsland || island.position.y + island.size.y < lowestCollidingIsland.position.y + lowestCollidingIsland.size.y) {
                    lowestCollidingIsland = island;
                }
            }
        }
        return lowestCollidingIsland;
    }

    worldMovement(offset) {
        // Move islands
        for (const island of this.islands) {
            island.position.y -= offset;
        }

        this.minY -= offset;
    }

    nextTick(canvas) {
        // Create new islands
        this.createIslands();

        // Tick islands
        for (const island of this.islands) {
            island.nextTick(canvas);
        }
    }
}