'use strict';

function Canvas(value){
    const elem = document.getElementById(value);
    this.ctx = elem.getContext("2d");
    this.add = function(figure){
        figure.draw(this.ctx);
    }
}

function Figure(x1, y1, x2, y2, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    return this;
}

function Line(figure) {
    this.figure = figure;
    this.draw = function(ctx) {
        ctx.strokeStyle = this.figure.color;
        ctx.beginPath();
        ctx.moveTo(this.figure.x1, this.figure.y1);
        ctx.lineTo(this.figure.x2, this.figure.y2);
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function Rect(figure) {
    this.figure = figure;
    this.draw = function (ctx) {
        ctx.fillStyle = this.figure.color;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.fillRect(this.figure.x1, this.figure.y1, (this.figure.x2-this.figure.x1), (this.figure.y2-this.figure.y1));
        ctx.closePath();
    }
}

function Circle(figure) {
    this.figure = figure;
    this.draw = function(ctx) {
        ctx.fillStyle = this.figure.color;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(
            (this.figure.x1 + (this.figure.x2-this.figure.x1)/2),
            (this.figure.y1 + (this.figure.y2-this.figure.y1)/2),
            (this.figure.x2-this.figure.x1)/2,
            0,
            360,
            false
        );
        ctx.closePath();
        ctx.fill();
    }
}

let drawArea = new Canvas('my-canvas');

let rect1 = new Rect(new Figure(500,300,600,500,'lightgreen'));
let rect2 = new Rect(new Figure(550,250,700,350,'lightpink'));
let rect3 = new Rect(new Figure(650,300,750,400,'yellow'));
drawArea.add(rect1);
drawArea.add(rect2);
drawArea.add(rect3);

let circle1 = new Circle(new Figure(150,100,250,200,'lightblue'));
let circle2 = new Circle(new Figure(150, 150, 350, 350, 'lightblue'));
drawArea.add(circle1);
drawArea.add(circle2);

for (let x = 0; x < 800; x += 40) {
    drawArea.add(new Line(new Figure(x,0,(x+20),20,'red')));
    drawArea.add(new Line(new Figure((x+20),20,(x+40),0,'red')));
}

drawArea.add(new Line(new Figure(150, 500, 400, 400, 'grey')));
drawArea.add(new Line(new Figure(180, 530, 430, 430, 'grey')));
