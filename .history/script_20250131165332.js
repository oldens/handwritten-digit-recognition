class DrawingBoard {
    constructor() {
        this.drawingArea = document.getElementById('drawing-area');
        this.colorPicker = document.getElementById('color-picker');
        this.clearButton = document.getElementById('clear-button');

        const rootStyles = getComputedStyle(document.documentElement);
        this.numRows = parseInt(rootStyles.getPropertyValue('--grid-size'), 10);
        this.numCols = this.numRows;
        this.cellSize = parseInt(rootStyles.getPropertyValue('--cell-size'), 10);

        this.drawingData = new Map(); // Store painted cells
        this.isMouseDown = false;

        this.setupDrawingArea();
        this.setupEventListeners();
    }

    setupDrawingArea() {
        this.drawingArea.style.display = "grid";
        this.drawingArea.style.gridTemplateColumns = `repeat(${this.numCols}, ${this.cellSize}px)`;
        this.drawingArea.style.gridTemplateRows = `repeat(${this.numRows}, ${this.cellSize}px)`;
        this.drawingArea.innerHTML = ""; // Clear before creating

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < this.numRows * this.numCols; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            fragment.appendChild(cell);
        }
        this.drawingArea.appendChild(fragment);
    }

    drawCell(cell) {
        const color = this.colorPicker.value;
        cell.style.backgroundColor = color;
        this.drawingData.set(cell, color); // Store painted color
    }

    clearDrawingArea() {
        requestAnimationFrame(() => {
            this.drawingData.clear(); // Clear map
            this.drawingArea.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = '');
        });
    }

    handleMouseEvent(event) {
        const cell = event.target;
        if (cell.classList.contains('cell') && !this.drawingData.get(cell)) {
            this.drawCell(cell);
        }
    }

    setupEventListeners() {
        this.clearButton.addEventListener('click', () => this.clearDrawingArea());

        this.drawingArea.addEventListener('mousedown', (event) => {
            this.isMouseDown = true;
            this.handleMouseEvent(event);
        });

        this.drawingArea.addEventListener('mousemove', (event) => {
            if (this.isMouseDown) this.handleMouseEvent(event);
        });

        document.addEventListener('mouseup', () => (this.isMouseDown = false));
    }
}

// Initialize the optimized drawing board
new DrawingBoard();