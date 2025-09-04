class ProgressBar {
    constructor(color, parentPosition) {
        this.parentPosition = parentPosition;
        this.offset = { x: 1, y: 9 };
        this.position = { x: 0, y: 0 }; // Will be calculated during runtime
        this.size = { x: 0, y: 1 }; // X will be calculated during runtime
        this.fullSize = { x: 10, y: 1 };
        this.color = color;
        this.border = {
            visible: false,
            color: 'black',
            width: 0.75,
            size: this.fullSize
        };
    }

    calculatePosition() {
        this.position.x = this.parentPosition.x + this.offset.x;
        this.position.y = this.parentPosition.y + this.offset.y;
    }

    setPercentage(percentage) {
        this.size.x = this.fullSize.x * percentage / 100;

        this.border.visible = percentage > 0;
    }
}