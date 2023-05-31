import { Config } from './config.js';
import { Cloth } from './cloth.js';
import { setupCanvas } from './canvas.js';
import { createEditor } from './editor.js';

let mouse = {
    down: false, 
    button: 1,
    x: 0,
    y: 0,
    px: 0,
    py: 0
}

let cloth;

function update(ctx) {
    ctx.clearRect(0, 0, Config.canvas_width, Config.canvas_height);

    cloth.update();
    cloth.draw(ctx);

    requestAnimationFrame(() => update(ctx));
}

window.onload = function () {
    const { canvas, ctx, boundsx, boundsy} = setupCanvas();

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    Config.canvas_width = canvas.width;
    Config.canvas_height = canvas.height;

    ctx.strokeStyle = '#003366';

    createEditor(Config, ctx);

    cloth = new Cloth();

    update(ctx);
};

export { mouse, cloth, update };
