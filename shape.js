class Shape {
    constructor(line) {
        this.startPos = line;
        this.lines = [];
        this.minPos = createVector(2000, 2000);
        this.maxPos = createVector(0, 0);
    }

    addLine(line) {
        //normalize position
        this.lines.push({
            x0: line.x0 - this.startPos.x0,
            y0: line.y0 - this.startPos.y0,
            x1: line.x1 - this.startPos.x1,
            y1: line.y1 - this.startPos.y1,
        });
        if (line.x0 < this.minPos.x) {
            this.minPos.x = line.x0;
        }
        if (line.x0 > this.maxPos.x) {
            this.maxPos.x = line.x0;
        }

        if (line.x1 < this.minPos.x) {
            this.minPos.x = line.x1;
        }
        if (line.x1 > this.maxPos.x) {
            this.maxPos.x = line.x1;
        }

        if (line.y0 < this.minPos.y) {
            this.minPos.y = line.y0;
        }
        if (line.y0 > this.maxPos.y) {
            this.maxPos.y = line.y0;
        }

        if (line.y1 < this.minPos.y) {
            this.minPos.y = line.y1;
        }
        if (line.y1 > this.maxPos.y) {
            this.maxPos.y = line.y1;
        }
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
