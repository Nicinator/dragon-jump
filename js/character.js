class Character {
    constructor() {
        this.position = { x: 44, y: 8 };
        this.previousPosition = { ...this.position }; // Copy object
        this.velocity = { x: 0, y: 0 };
        this.size = { x: 12, y: 12 };
        this.collisionSize = { x: 3, y: 10 };
        this.collisionPositionOffset = { x: 4.5, y: 0 };
        this.textures = {
            standing: document.getElementById('characterStanding'),
            sneaking: document.getElementById('characterSneaking'),
        };
        this.image = this.textures.standing;
        this.isFacingRight = true;

        this.isChargingJump = false;
        this.jumpCharge = 0;
        this.negativeJumpCharge = 0;
        this.maxJumpHeight = 62;
        this.maxJumpPenalty = 55;

        this.glidingSpeed = 150;

        this.isStanding = true;
        this.isGliding = false;

        this.xSlipperyness = 100;
        this.movementSpeedValues = {
            standing: 350,
            flying: 50,
        }
        this.movementSpeed = this.movementSpeedValues.standing;

        this.progressBar = new ProgressBar('red', this.position);
    }

    nextTick(canvas, controls, deltaTime) {
        // Jump charge
        this.calculateJumpCharge(deltaTime);

        // Progress bar
        this.progressBar.calculatePosition();
        this.progressBar.setPercentage(100 / this.maxJumpHeight * (this.jumpCharge - this.negativeJumpCharge));
        canvas.addContent(this.progressBar);

        // Position
        this.calculatePosition(controls, deltaTime);

        this.selectTexture(canvas);
    }

    calculatePosition(controls, deltaTime) {
        // Horizontal

        if(controls.isMovingLeft && !controls.isMovingRight) {
            this.isFacingRight = false;

            this.velocity.x -= deltaTime * this.movementSpeed / 1000;
        } else if(controls.isMovingRight && !controls.isMovingLeft) {
            this.isFacingRight = true;

            this.velocity.x += deltaTime * this.movementSpeed / 1000;
        }
        this.velocity.x *= Math.max(1 - deltaTime / this.xSlipperyness, 0);


        this.position.x += this.velocity.x * deltaTime / 1000;

        // Collision with walls
        if(this.position.x + this.collisionPositionOffset.x < 0) {
            this.position.x = 0 - this.collisionPositionOffset.x;
            this.velocity.x = 0;
        }

        if(this.position.x + this.collisionPositionOffset.x > 100 - this.collisionSize.x) {
            this.position.x = 100 - this.collisionSize.x - this.collisionPositionOffset.x;
            this.velocity.x = 0;
        }

        // Vertical
        // Gravity
        this.velocity.y -= GRAVITY * deltaTime / 1000;

        if(this.isGliding) {
            this.velocity.y *= Math.max(1 - deltaTime / this.glidingSpeed, 0);
        }

        this.position.y += this.velocity.y * deltaTime / 1000;

        const collisionBoundingBox = this.getCollisionBoundingBox();
        const collidingIsland = world.getLowestCollidingIsland(collisionBoundingBox);
        const collisionThreshold = 0.000000001; // To prevent floating point inaccuracies
        const collidingIslandCollisionY = collidingIsland?.getCollisionY();
        if(collidingIsland && this.previousPosition.y >= collidingIslandCollisionY - collisionThreshold) {
            // Is standing / landing on island
            this.position.y = collidingIslandCollisionY;
            this.velocity.y = 0;
            this.xSlipperyness = collidingIsland.slipperyness;
            this.movementSpeed = this.movementSpeedValues.standing;
            this.isStanding = true;
            this.isGliding = false;
        } else {
            this.isStanding = false;
            this.xSlipperyness = 1000;
            this.movementSpeed = this.movementSpeedValues.flying;
        }
        

        this.previousPosition = { ...this.position };
    }

    worldMovement(offset) {
        this.position.y -= offset;
        this.previousPosition.y -= offset;
    }

    getCollisionBoundingBox() {
        const collisionBoundingBox = { position: { ...this.position }, size: { ...this.collisionSize } };
        collisionBoundingBox.position.x += this.collisionPositionOffset.x;
        collisionBoundingBox.position.y += this.collisionPositionOffset.y;
        return collisionBoundingBox;
    }

    calculateJumpCharge(deltaTime) {
        if(this.isChargingJump && this.jumpCharge < this.maxJumpHeight) {
            this.jumpCharge += deltaTime / (300 / this.maxJumpHeight) * ((this.maxJumpHeight / 10 + this.jumpCharge) / this.maxJumpHeight);
        }
        if(this.jumpCharge > this.maxJumpHeight) {
            this.jumpCharge = this.maxJumpHeight;
        }

        if(this.jumpCharge === this.maxJumpHeight && this.negativeJumpCharge < this.maxJumpPenalty) {
            this.negativeJumpCharge += deltaTime / (250 / this.maxJumpPenalty) * ((this.maxJumpPenalty - this.negativeJumpCharge) / this.maxJumpPenalty);
        }
        if(this.negativeJumpCharge > this.maxJumpPenalty) {
            this.negativeJumpCharge = this.maxJumpPenalty;
        }
    }

    selectTexture(canvas) {
        if(this.isChargingJump) {
            this.image = this.textures.sneaking;
        } else {
            this.image = this.textures.standing;
        }

        canvas.addContent(this);
    }

    jump() {
        // Set velocity to jump charge value (per second)
        this.velocity.y = this.jumpCharge - this.negativeJumpCharge;

        // Reset values
        this.jumpCharge = 0;
        this.negativeJumpCharge = 0;
    }

    drop() {
        this.position.y -= 0.00001;
        this.previousPosition.y = this.position.y;
    }
}