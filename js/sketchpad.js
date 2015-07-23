(function () {

    'use strict';

    var svg = document.querySelector('svg'),
        label = svg.querySelector('text'),
        path = null,
        coords = null;

    function handleDrawMove(e) {

        e.preventDefault();

        if (e.touches) { e = e.touches[0]; }

        coords += ' L' + e.pageX + ' ' + e.pageY;

        path.setAttribute('d', coords);

    }

    function handleDrawStart(e) {

        e.preventDefault();

        if (e.touches) { e = e.touches[0]; }

        if (label) {

            svg.removeChild(label);

            label = null;

        }

        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        svg.appendChild(path);

        coords = 'M' + e.pageX + ' ' + e.pageY;

        path.setAttribute('d', coords);

        svg.addEventListener('mousemove', handleDrawMove);
        svg.addEventListener('touchmove', handleDrawMove);

    }

    function handleDrawEnd() {

        path = null;
        coords = null;

        svg.removeEventListener('mousemove', handleDrawMove);
        svg.removeEventListener('touchmove', handleDrawMove);

    }

    function handleResize() {

        svg.setAttribute('width', window.innerWidth);
        svg.setAttribute('height', window.innerHeight);

    }

    handleResize();

    svg.addEventListener('mousedown', handleDrawStart);
    svg.addEventListener('touchstart', handleDrawStart);

    svg.addEventListener('mouseup', handleDrawEnd);
    svg.addEventListener('touchend', handleDrawEnd);

    window.addEventListener('resize', handleResize);

}());
