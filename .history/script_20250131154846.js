const drawingArea = document.getElementById('drawing-area');
const colorPicker = document.getElementById('color-picker');
const clearButton = document.getElementById('clear-button');


const rootStyles = getComputedStyle(document.documentElement);



const numRows = parseInt(rootStyles.getPropertyValue('--grid-size'));
const numCols = parseInt(rootStyles.getPropertyValue('--grid-size'));
const cellSize = parseInt(rootStyles.getPropertyValue('--cell-size'));

let drawingData = Array.from({ length: numRows }, () => Array(numCols).fill('#FFFFFF'));

function createDrawingArea() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.addEventListener('mousedown', () => drawCell(row, col));
            cell.addEventListener('mousemove', (event) => {
                if (isMouseDown) {
                    drawCell(row, col);
                }
            });
            drawingArea.appendChild(cell);
        }
    }
}

function drawCell(row, col) {
    const color = colorPicker.value;
    drawingData[row][col] = color;
    const cell = drawingArea.children[row * numCols + col];
    cell.style.backgroundColor = color;
}

function clearDrawingArea() {
    drawingData = Array.from({ length: numRows }, () => Array(numCols).fill('#FFFFFF'));
    for (let i = 0; i < drawingArea.children.length; i++) {
        drawingArea.children[i].style.backgroundColor = '#FFFFFF';
    }
}

colorPicker.addEventListener('input', (event) => {
    colorPicker.value = event.target.value;
});

clearButton.addEventListener('click', clearDrawingArea);

createDrawingArea();

let isMouseDown = false;

drawingArea.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // Check if the left mouse button is pressed
        isMouseDown = true;
    }
});

drawingArea.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const cell = event.target;
        const row = Math.floor(cell.offsetTop / cellSize);
        const col = Math.floor(cell.offsetLeft / cellSize);
        drawCell(row, col);
    }
});

drawingArea.addEventListener('mouseup', (event) => {
    if (event.button === 0) { // Check if the left mouse button is released
        isMouseDown = false;
    }
});

drawingArea.addEventListener('mouseleave', () => {
    isMouseDown = false; // Reset if the mouse leaves the element
});
