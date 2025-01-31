const drawingArea = document.getElementById('drawing-area');
const colorPicker = document.getElementById('color-picker');
const clearButton = document.getElementById('clear-button');

const numRows = 30;
const numCols = 30;
const cellSize = 255; // Change to 20 if you want larger cells

let drawingData = Array.from({ length: numRows }, () => Array(numCols).fill('#FFFFFF'));

function createDrawingArea() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.addEventListener('mousedown', () => drawCell(row, col));
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
