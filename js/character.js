class Character {
    constructor() {
        this.position = { x: 45, y: 10 };
        this.size = { x: 10, y: 10 };
        this.textures = {
            standingRight: document.getElementById('characterStandingRight'),
            standingLeft: document.getElementById('characterStandingLeft'),
        };
        this.image = this.textures.standingRight;
        this.isFacingRight = true;

        this.isChargingJump = false;
        this.jumpCharge = 0;
        this.negativeJumpCharge = 0;
        this.maxJumpHeight = 50;
        this.maxJumpPenalty = 40;

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
        let velocity = 0;

        if(controls.isMovingLeft && !controls.isMovingRight) {
            this.isFacingRight = false;

            velocity = -30;
        } else if(controls.isMovingRight && !controls.isMovingLeft) {
            this.isFacingRight = true;

            velocity = 30;
        }

        this.position.x += velocity * deltaTime / 1000;

        if(this.position.x < 0) {
            this.position.x = 0;
        }

        if(this.position.x > 100 - this.size.x) {
            this.position.x = 100 - this.size.x;
        }

        this.selectTexture(canvas);
    }

    calculateJumpCharge(deltaTime) {
        if(this.isChargingJump && this.jumpCharge < this.maxJumpHeight) {
            this.jumpCharge += deltaTime / 7 * ((5 + this.jumpCharge) / 50);
        }
        if(this.jumpCharge > this.maxJumpHeight) {
            this.jumpCharge = this.maxJumpHeight;
        }

        if(this.jumpCharge === this.maxJumpHeight && this.negativeJumpCharge < this.maxJumpPenalty) {
            this.negativeJumpCharge += deltaTime / 5 * ((45 - this.negativeJumpCharge) / 40);
        }
        if(this.negativeJumpCharge > this.maxJumpPenalty) {
            this.negativeJumpCharge = this.maxJumpPenalty;
        }
    }

    selectTexture(canvas) {
        if(this.isFacingRight) {
            this.image = this.textures.standingRight;
        } else {
            this.image = this.textures.standingLeft;
        }

        canvas.addContent(this);
    }

    jump() {
        console.log('jump', this.jumpCharge - this.negativeJumpCharge);

        // Reset values
        this.jumpCharge = 0;
        this.negativeJumpCharge = 0;
    }
}