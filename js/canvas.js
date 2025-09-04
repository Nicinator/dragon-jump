class Canvas {
    constructor() {
        this.canvasElement = document.getElementById('playground');
        this.context = this.canvasElement.getContext('2d');

        this.content = [];

        window.addEventListener('resize', () => { this.handleResize() });
        this.handleResize();
    }

    addContent(content) {
        this.content.push(content);
    }

    draw() {
        for (const item of this.content) {
            const drawPosition = { x: item.position.x * coordinateSize, y: canvasHeightInPX - (item.position.y + item.size.y) * coordinateSize };
            const drawSize = { x: item.size.x * coordinateSize, y: item.size.y * coordinateSize };
            if(item.image !== undefined) {
                // Use texture
                if(item.isFacingRight) {
                    // Mirror image
                    this.context.save();
                    this.context.scale(-1, 1);
                    this.context.drawImage(item.image, drawPosition.x * -1, drawPosition.y, drawSize.x * -1, drawSize.y);
                    this.context.restore();
                } else {
                    this.context.drawImage(item.image, drawPosition.x, drawPosition.y, drawSize.x, drawSize.y);
                }
            } else {
                // Draw color
                this.context.fillStyle = item.color || 'green';
                this.context.fillRect(drawPosition.x, drawPosition.y, drawSize.x, drawSize.y);
            }

            // Draw border
            if(item.border?.visible) {
                this.context.beginPath();
                this.context.lineWidth = item.border.width;
                this.context.strokeStyle = item.border.color;
                this.context.rect(item.position.x * coordinateSize, canvasHeightInPX - (item.position.y + item.border.size.y) * coordinateSize, item.border.size.x * coordinateSize, item.border.size.y * coordinateSize)
                this.context.stroke();
            }
        }
        this.content = [];
    }

    clear() {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    handleResize() {
        this.canvasElement.width = coordinateSize * 100;
        this.canvasElement.height = coordinateSize * 100 / ASPECT_RATIO;
    }
}