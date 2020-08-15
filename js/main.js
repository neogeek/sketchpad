import {
    clear,
    config,
    history,
    inputDownEvent
} from 'https://unpkg.com/drawtheline@1.1.0/index.js';

import slowreveal from 'https://unpkg.com/slowreveal@1.2.1/index.js';

const lineWidthDecreaseButton = document.querySelector('#lineWidthDecrease');
const lineWidthSpan = document.querySelector('#lineWidth');
const lineWidthIncreaseButton = document.querySelector('#lineWidthIncrease');
const lineColorInput = document.querySelector('#lineColor');
const undoButton = document.querySelector('#undo');
const clearButton = document.querySelector('#clear');
const downloadButton = document.querySelector('#downloadButton');
const downloadLink = document.querySelector('#downloadLink');

const svg = document.querySelector('svg');

lineWidthSpan.innerText = config.lineWidth;

lineColorInput.value = config.lineColor;

svg.addEventListener('mousedown', inputDownEvent);
svg.addEventListener('touchstart', inputDownEvent);

lineWidthDecreaseButton.addEventListener('click', e => {
    e.preventDefault();

    config.lineWidth -= 1;
    lineWidthSpan.innerText = config.lineWidth;
});

lineWidthIncreaseButton.addEventListener('click', e => {
    e.preventDefault();

    config.lineWidth += 1;
    lineWidthSpan.innerText = config.lineWidth;
});

lineColorInput.addEventListener(
    'change',
    e => (config.lineColor = e.target.value)
);

undoButton.addEventListener('click', e => {
    e.preventDefault();

    const item = history.pop();

    svg.innerHTML = history.last();
});

clearButton.addEventListener('click', e => {
    clear(svg);
});

downloadButton.addEventListener('click', e => {
    var url = URL.createObjectURL(
        new Blob([svg.outerHTML], { type: 'image/svg+xml' })
    );

    var anchor = document.createElement('a');
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', 'drawing.svg');

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
});

undoButton.addEventListener('mouseup', () => {
    downloadLink.setAttribute(
        'href',
        `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.outerHTML)}`
    );
});

svg.addEventListener('mouseup', () => {
    downloadLink.setAttribute(
        'href',
        `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.outerHTML)}`
    );
});

svg.addEventListener('touchend', () => {
    downloadLink.setAttribute(
        'href',
        `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.outerHTML)}`
    );
});

svg.innerHTML = history.last();

slowreveal(svg, { speed: 50 });
