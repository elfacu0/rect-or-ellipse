let model;
let currentShape;
// let state = 'training';
let state = 'prediction';
let isDrawing = false;
let shapes = new Shapes();
const button = document.querySelector('#clear-button');
button.addEventListener('click', () => {
    shapes = new Shapes();
});

function setup() {
    createCanvas(400, 400);
    rectMode(CORNERS);
    let options = {
        inputs: 100,
        outputs: ['label'],
        task: 'classification',
        debug: 'true',
        learningRate: 0.3,
    };
    model = ml5.neuralNetwork(options);
    // model.loadData('./model2.json');

    const modelInfo = {
        model: './models/model.json',
        metadata: './models/model_meta.json',
        weights: './models/model.weights.bin',
    };
    model.load(modelInfo, () => {
        console.log('Model Loaded');
    });
}

function draw() {
    background(220);
    stroke(100);
    if (mouseIsPressed && isDrawing) {
        currentShape.draw();
    }
    if (state === 'training') {
        line(width / 2, 0, width / 2, height);
        text('Rect', width * 0.25, 10);
        text('Ellipse', width * 0.75, 10);
    } else {
        shapes.draw();
    }
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        if (isDrawing === false) {
            currentShape = new Shape({
                x0: mouseX,
                y0: mouseY,
                x1: pmouseX,
                y1: pmouseY,
            });
            isDrawing = true;
        }
    }
}

function mouseDragged() {
    if (isDrawing === true) {
        currentShape.addLine({
            x0: mouseX,
            y0: mouseY,
            x1: pmouseX,
            y1: pmouseY,
        });
    }
}

function mouseReleased() {
    trainClassifier();
    if (state === 'training') {
        eraseShape();
    }
    isDrawing = false;
}

function eraseShape() {
    currentShape = {};
}

function trainClassifier() {
    let inputs = [];
    if (!currentShape || !Array.isArray(currentShape.lines)) return '';
    let increment = Math.ceil(currentShape.lines.length / 20);
    for (let i = 0; i < currentShape.lines.length; i += increment) {
        inputs.push(currentShape.lines[i].x0);
        inputs.push(currentShape.lines[i].y0);
        inputs.push(currentShape.lines[i].x1);
        inputs.push(currentShape.lines[i].y1);
    }

    console.log(inputs);
    if (state === 'training') {
        if (mouseX < width / 2) {
            console.log('Rect');
            let target = {
                label: 'Rect',
            };
            model.addData(inputs, target);
        } else {
            console.log('Ellipse');
            let target = {
                label: 'Ellipse',
            };
            model.addData(inputs, target);
        }
    } else if (state === 'prediction') {
        model.classify(inputs, gotResults);
    }
}

function keyPressed() {
    if (key === 't') {
        model.normalizeData();
        let options = {
            batchSize: 64,
            epochs: 300,
        };
        model.train(options, whileTraining, finishedTraining);
    }
    if (key === 's') {
        model.save('weights');
    }
}

function whileTraining(epoch, loss) {
    console.log(epoch, loss);
}

function finishedTraining() {
    console.log('finished');
    state = 'prediction';
}

function gotResults(error, results) {
    if (error) {
        return 'Error';
    } else {
        console.log(results[0]);
        console.log(results);
        shapes.addShape(results[0].label, currentShape);
    }
    eraseShape();
}
