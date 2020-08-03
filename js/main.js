import { config, inputDownEvent, inputUpEvent } from './sketchpad.js';

const lineWidthDecreaseButton = document.querySelector('#lineWidthDecrease');
const lineWidthSpan = document.querySelector('#lineWidth');
const lineWidthIncreaseButton = document.querySelector('#lineWidthIncrease');
const lineColorInput = document.querySelector('#lineColor');
const undoButton = document.querySelector('#undo');

const svg = document.querySelector('svg');

lineWidthSpan.innerText = config.lineWidth;

lineColorInput.value = config.lineColor;

svg.addEventListener('mousedown', inputDownEvent);
svg.addEventListener('touchstart', inputDownEvent);

svg.addEventListener('mouseup', inputUpEvent);
svg.addEventListener('touchend', inputUpEvent);

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
