import { Constraint } from './constraint.js';
import { Config } from './config.js';
import { mouse } from './main.js';

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.px = x; // previous x
        this.py = y; // previous y
        this.vx = 0; // velocity x
        this.vy = 0; // velocity y
        this.pin_x = null;
        this.pin_y = null;
        this.constraints = [];
    }

    update(delta) {
        if(mouse.down){
            var diff_x = this.x - mouse.x;
            var diff_y = this.y - mouse.y;
            var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

            if(mouse.button == 1){
                if(dist < Config.mouse_influence){
                    this.px = this.x - (mouse.x - mouse.px) * 1.8;
                    this.py = this.y - (mouse.y - mouse.py) * 1.8;
                }
            }else if(dist < Config.mouse_cut){
                this.constraints = [];
            }
        }

        this.add_force(0, Config.gravity);

        delta *= delta;
        let nx = this.x + ((this.x - this.px) * .99) + ((this.vx / 2) * delta);
        let ny = this.y + ((this.y - this.py) * .99) + ((this.vy / 2) * delta);

        this.px = this.x;
        this.py = this.y;
        this.x = nx;
        this.y = ny;

        this.vy = this.vx = 0;
    }

    draw(ctx) {
        if(!this.constraints.length) return;

        // ctx.beginPath();
        
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

        var i = this.constraints.length;
        while(i--){
            this.constraints[i].draw(ctx);
        }

        // ctx.stroke();
    }

    resolve_constraints(boundsx, boundsy) {
        if(this.pin_x != null && this.pin_y != null){
            this.x = this.pin_x;
            this.y = this.pin_y;
            return;
        }

        var i = this.constraints.length;
        while(i--){
            this.constraints[i].resolve();
        }

        this.x > boundsx ? this.x = 2 * boundsx - this.x : 1 > this.x && (this.x = 2 - this.x);
        this.y < 1 ? this.y = 2 - this.y : this.y > boundsy && (this.y = 2 * boundsy - this.y);
    }

    attach(point){
        this.constraints.push(new Constraint(this, point));
    }

    remove_constraint(constraint) {
        this.constraints.splice(this.constraints.indexOf(constraint), 1);
    }

    add_force(x, y){
        this.vx += x;
        this.vy += y;

        var round = 400;
        this.vx = ~~(this.vx * round) / round;
        this.vy = ~~(this.vy * round) / round;
    }

    pin(pinx, piny){
        this.pin_x = pinx;
        this.pin_y = piny;
    }
}