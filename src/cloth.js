import { Config } from './config.js';
import { Point } from './point.js';

export class Cloth {
    constructor() {
        this.points = [];

        var start_x = Config.canvas_width / 2 - Config.cloth_width * Config.spacing / 2;

        for (var y = 0; y <= Config.cloth_height; y++) {
            for (var x = 0; x <= Config.cloth_width; x++) {
                var p = new Point(start_x + x * Config.spacing, Config.start_y + y * Config.spacing);

                x != 0 && p.attach(this.points[this.points.length - 1]);
                y == 0 && p.pin(p.x, p.y);
                y != 0 && p.attach(this.points[x + (y - 1) * (Config.cloth_width + 1)])

                this.points.push(p);
            }
        }
    }

    update() {
        var i = Config.physics_accuracy;

        while (i--) {
            var p = this.points.length;
            while (p--) this.points[p].resolve_constraints();
        }

        i = this.points.length;
        while (i--) this.points[i].update(.016);
    }

    draw(ctx) {
        ctx.beginPath();

        var i = this.points.length;
        while (i--) this.points[i].draw(ctx);

        ctx.stroke();
    }
}