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
            if(item.image !== undefined) {
                // Use texture
                this.context.drawImage(item.image, item.position.x * coordinateSize, item.position.y * coordinateSize, item.size.x * coordinateSize, item.size.y * coordinateSize);
            } else {
                // Draw color
                this.context.fillStyle = 'green';
                this.context.fillRect(item.position.x * coordinateSize, item.position.y * coordinateSize, item.size.x * coordinateSize, item.size.y * coordinateSize);
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