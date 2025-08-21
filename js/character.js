class Character {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.size = { x: 10, y: 10 };
        this.textures = {
            standingRight: document.getElementById('characterStandingRight'),
            standingLeft: document.getElementById('characterStandingLeft'),
        };
        this.image = this.textures.standingRight;
        this.isFacingRight = true;
    }

    nextTick(canvas, controls, deltaTime) {
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

    selectTexture(canvas) {
        if(this.isFacingRight) {
            this.image = this.textures.standingRight;
        } else {
            this.image = this.textures.standingLeft;
        }

        canvas.addContent(this);
    }
}