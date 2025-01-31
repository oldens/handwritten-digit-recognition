class DrawingBoard {
    constructor() {
        this.drawingArea = document.getElementById('drawing-area');
        this.colorPicker = document.getElementById('color-picker');
        this.clearButton = document.getElementById('clear-button');

        this.rootStyles = getComputedStyle(document.documentElement);
        this.numRows = parseInt(this.rootStyles.getPropertyValue('--grid-size'));
        this.numCols = this.numRows;
        this.cellSize = parseInt(this.rootStyles.getPropertyValue('--cell-size'));

        this.drawingData = this.initializeDrawingData();
        this.isMouseDown = false;

        this.createDrawingArea();
        this.setupEventListeners();
    }

    initializeDrawingData() {
        return Array.from({ length: this.numRows }, () => Array(this.numCols).fill('#FFFFFF'));
    }

    createDrawingArea() {
        const fragment = document.createDocumentFragment();

        for (let row = 1; row <= this.numRows; row++) {
            for (let col = 1; col <= this.numCols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.style.gridColumn = col;
                cell.style.gridRow = row;
                fragment.appendChild(cell);
            }
        }

        this.drawingArea.appendChild(fragment);
    }

    drawCell(cell) {
        cell.style.backgroundColor = this.colorPicker.value;
    }

    clearDrawingArea() {
        this.drawingData = this.initializeDrawingData();
        this.drawingArea.querySelectorAll('.cell').forEach(cell => {
            cell.style.backgroundColor = '#FFFFFF';
        });
    }

    handleMouseEvent(event) {
        const cell = event.target;
        if (cell.classList.contains('cell')) {
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

        document.addEventListener('mouseup', () => this.isMouseDown = false);
        this.drawingArea.addEventListener('mouseleave', () => this.isMouseDown = false);
    }
}

// Initialize the drawing board
new DrawingBoard();