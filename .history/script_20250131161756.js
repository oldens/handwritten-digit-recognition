const drawingArea = document.getElementById('drawing-area');
const colorPicker = document.getElementById('color-picker');
const clearButton = document.getElementById('clear-button');

const rootStyles = getComputedStyle(document.documentElement);

const numRows = parseInt(rootStyles.getPropertyValue('--grid-size'));
const numCols = numRows;
const cellSize = parseInt(rootStyles.getPropertyValue('--cell-size'));

let drawingData = Array.from({ length: numRows }, () => Array(numCols).fill('#FFFFFF'));

function createDrawingArea() {
    for (let row = 1; row <= numRows; row++) {
        for (let col = 1; col <= numCols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.gridColumn = col;
            cell.style.gridRow = row;
            drawingArea.appendChild(cell);
        }
    }
}

function drawCell(cell) {
    const color = colorPicker.value;
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
    isMouseDown = true;
        handleMouseEvent(event);
});

drawingArea.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        handleMouseEvent(event);
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

function handleMouseEvent(event) {
    const cell = event.target;
    if (cell.classList.contains('cell')) {
        const row = Math.floor(cell.offsetTop / cellSize) + 1;
        const col = Math.floor(cell.offsetLeft / cellSize) + 1;
        drawCell(row, col);
    }
}
