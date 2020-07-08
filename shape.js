class Shape {
    constructor(line) {
        this.startPos = line;
        this.lines = [];
        this.minPos = createVector(2000, 2000);
        this.maxPos = createVector(0, 0);
        this.maxValue = 0;
    }

    addLine(line) {
        //normalize position
        const linePositions = {
            x0: line.x0 - this.startPos.x0,
            y0: line.y0 - this.startPos.y0,
            x1: line.x1 - this.startPos.x1,
            y1: line.y1 - this.startPos.y1,
        };
        this.lines.push(linePositions);

        this.minPos.x = Math.min(line.x0, line.x1, this.minPos.x);
        this.maxPos.x = Math.max(line.x0, line.x1, this.maxPos.x);

        this.minPos.y = Math.min(line.y0, line.y1, this.minPos.y);
        this.maxPos.y = Math.max(line.y0, line.y1, this.maxPos.y);

        this.maxValue = Math.max(
            linePositions.x0,
            linePositions.y0,
            linePositions.x1,
            linePositions.y1,
            this.maxValue
        );
    }

    draw() {
        this.lines.forEach((pos) => {
            stroke(100);
            line(
                pos.x0 + this.startPos.x0,
                pos.y0 + this.startPos.y0,
                pos.x1 + this.startPos.x1,
                pos.y1 + this.startPos.y1
            );
        });
        // rect(this.minPos.x, this.minPos.y, this.maxPos.x, this.maxPos.y);
    }
}
