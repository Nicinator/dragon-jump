class Controls {
    constructor() {
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isPressingSpace = false;

        window.addEventListener('keydown', (event) => { this.handleKeyEvent(event) });
        window.addEventListener('keyup', (event) => { this.handleKeyEvent(event) });
    }

    handleKeyEvent(event) {
        //event.preventDefault();

        const key = event.code;
        const isKeyDown = event.type == 'keydown';

        switch(key) {
            case 'KeyA':
                this.isMovingLeft = isKeyDown;
                break;
            case 'KeyD':
                this.isMovingRight = isKeyDown;
                break;
            case 'Space':
                this.isPressingSpace = isKeyDown;
                break;
        }
    }

    nextTick() {
        player.isChargingJump = this.isPressingSpace && player.isStanding;

        if(!this.isPressingSpace && player.isStanding) {
            player.jump();
        }
    }
}