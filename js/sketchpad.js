const defaultLineColor = '#0064FF';

const minLineWidth = 2;
const maxLineWidth = 20;

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

const history = [];

const inputMoveEvent = e => {
    const item = history[history.length - 1];

    item.coords = `${item.coords} L${e.offsetX} ${e.offsetY}`;

    item.path.setAttribute('d', item.coords);
};

const inputDownEvent = e => {
    e.preventDefault();

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const coords = `M${e.offsetX} ${e.offsetY}`;

    history[history.length] = { path, coords };

    e.currentTarget.appendChild(path);

    path.setAttribute('d', coords);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', config.lineColor);
    path.setAttribute('stroke-width', config.lineWidth);

    e.currentTarget.addEventListener('mousemove', inputMoveEvent);
};

const inputUpEvent = e => {
    e.preventDefault();
    e.currentTarget.removeEventListener('mousemove', inputMoveEvent);
};
