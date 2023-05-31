import { Config } from './config.js';
import { Point } from './point.js';

export class Constraint {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = Config.spacing;
    }

    resolve() {
        var diff_x  = this.p1.x - this.p2.x,
            diff_y  = this.p1.y - this.p2.y,
            dist    = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
            diff    = (this.length - dist) / dist;

        if (dist > Config.tear_distance) this.p1.remove_constraint(this);

        var px = diff_x * diff * 0.5;
        var py = diff_y * diff * 0.5;

        this.p1.x += px;
        this.p1.y += py;
        this.p2.x -= px;
        this.p2.y -= py;
    }

    draw(ctx) {
        // ctx.beginPath();
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 17;
        ctx.shadowOffsetY = 10;

        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
    }
}