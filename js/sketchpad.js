const lineWidthDecreaseButton = document.querySelector('#lineWidthDecrease');
const lineWidthSpan = document.querySelector('#lineWidth');
const lineWidthIncreaseButton = document.querySelector('#lineWidthIncrease');
const lineColorInput = document.querySelector('#lineColor');
const undoButton = document.querySelector('#undo');

const svg = document.querySelector('svg');

const defaultLineColor = '#0064FF';

const minLineWidth = 2;
const maxLineWidth = 20;

const history = [];

const config = {
    _lineColor: localStorage.getItem('lineColor') || defaultLineColor,
    get lineColor() {
        return this._lineColor;
    },
    set lineColor(value) {
        this._lineColor = value;

        localStorage.setItem('lineColor', this._lineColor);

        return this._lineColor;
    },
    _lineWidth: parseInt(localStorage.getItem('lineWidth'), 10) || minLineWidth,
    get lineWidth() {
        return this._lineWidth;
    },
    set lineWidth(value) {
        this._lineWidth = Math.min(Math.max(value, minLineWidth), maxLineWidth);

        localStorage.setItem('lineWidth', this._lineWidth);

        return this._lineWidth;
    }
};

lineWidthSpan.innerText = config.lineWidth;

lineColorInput.value = config.lineColor;

const handleDrawMove = e => {
    const item = history[history.length - 1];

    item.coords = `${item.coords} L${e.offsetX} ${e.offsetY}`;

    item.path.setAttribute('d', item.coords);
};

svg.addEventListener('mousedown', e => {
    e.preventDefault();

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const coords = `M${e.offsetX} ${e.offsetY}`;

    history[history.length] = { path, coords };

    svg.appendChild(path);

    path.setAttribute('d', coords);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', config.lineColor);
    path.setAttribute('stroke-width', config.lineWidth);

    svg.addEventListener('mousemove', handleDrawMove);
});

svg.addEventListener('mouseup', e => {
    e.preventDefault();
    svg.removeEventListener('mousemove', handleDrawMove);
});

lineWidthDecreaseButton.addEventListener('click', () => {
    config.lineWidth -= 1;
    lineWidthSpan.innerText = config.lineWidth;
});

lineWidthIncreaseButton.addEventListener('click', () => {
    config.lineWidth += 1;
    lineWidthSpan.innerText = config.lineWidth;
});

lineColorInput.addEventListener(
    'change',
    e => (config.lineColor = e.target.value)
);

undoButton.addEventListener('click', () => {
    const item = history.pop();

    svg.removeChild(item.path);
});
