class Controls {
    constructor(player) {
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.player = player;

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
                player.isChargingJump = isKeyDown;

                if(!isKeyDown) {
                    this.player.jump();
                }
                break;
        }
    }
}