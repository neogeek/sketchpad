const defaultLineColor = '#0064FF';

const minLineWidth = 2;
const maxLineWidth = 20;

export const config = {
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

export const history = [];

export const inputMoveEvent = e => {
    if (e.touches && e.touches.length > 1) {
        return;
    }

    e.preventDefault();

    if (e.touches) {
        e = e.touches[0];
    }

    const svg = e.target.closest('svg');

    const { top, left } = svg.getBoundingClientRect();

    const item = history[history.length - 1];

    item.coords = `${item.coords} L${e.pageX - (left + window.pageXOffset)} ${
        e.pageY - (top + window.pageYOffset)
    }`;

    item.path.setAttribute('d', item.coords);
};

export const inputDownEvent = e => {
    if (e.touches && e.touches.length > 1) {
        return;
    }

    e.preventDefault();

    if (e.touches) {
        e = e.touches[0];
    }

    const svg = e.target.closest('svg');

    const { top, left } = svg.getBoundingClientRect();

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const coords = `M${e.pageX - (left + window.pageXOffset)} ${
        e.pageY - (top + window.pageYOffset)
    }`;

    history[history.length] = { path, coords };

    svg.appendChild(path);

    path.setAttribute('d', coords);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', config.lineColor);
    path.setAttribute('stroke-width', config.lineWidth);

    svg.addEventListener('mousemove', inputMoveEvent);
    svg.addEventListener('touchmove', inputMoveEvent);
};

export const inputUpEvent = e => {
    e.preventDefault();

    const svg = e.target.closest('svg');

    svg.removeEventListener('mousemove', inputMoveEvent);
    svg.removeEventListener('touchmove', inputMoveEvent);
};
