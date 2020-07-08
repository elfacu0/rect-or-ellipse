class Shapes {
    constructor() {
        this.shapes = [];
    }
    addShape(type, shape) {
        this.shapes.push({ type, minPos: shape.minPos, maxPos: shape.maxPos });
    }
    draw() {
        this.shapes.forEach((shape) => {
            if (shape.type === 'Rect') {
                rect(
                    shape.minPos.x,
                    shape.minPos.y,
                    shape.maxPos.x,
                    shape.maxPos.y
                );
            } else if (shape.type === 'Ellipse') {
                let x = shape.minPos.x + (shape.maxPos.x - shape.minPos.x) / 2;
                let width = shape.maxPos.x - shape.minPos.x;
                let y = shape.minPos.y + (shape.maxPos.y - shape.minPos.y) / 2;
                let height = shape.maxPos.y - shape.minPos.y;
                ellipse(x, y, width, height);
            }
        });
    }
}
