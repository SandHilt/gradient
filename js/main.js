let x = document.getElementsByTagName('html')[0];
let isGradient = x.classList.contains("cssgradients") | false;
const MAX_BUFFER = 5;
let buffer = [];

class Color {
    constructor() {
        this.r = Math.floor(Math.random() * 255);
        this.g = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
    }

    showColor() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}


x.addEventListener("click", () => {
    let addColorBuffer = (color) => {
        if(buffer.length + 1 > MAX_BUFFER){
            buffer.pop();
        }
        buffer.push(color);
    };

    let color = {};

    if(isGradient){
        let pos = ["top", "right", "bottom", "left", "deg"];
        let getPos = () => Math.floor(Math.random() * pos.length);

        let main = getPos();
        let aux = pos[main];
        pos[main] = "";

        if(aux !== "deg"){
            main = `to ${aux}`;
            aux = " " + pos[getPos()];
        } else {
            main = `${Math.floor(Math.random() * 360)}deg`;
            aux = "";
        }

        color.direction = [main, aux];
        color.cor = [new Color(), new Color()];

        let cor1 = color.cor[0].showColor();
        let cor2 = color.cor[1].showColor();

        x.style.background = `linear-gradient(${main}${aux}, ${cor1}, ${cor2})`;
    } else {
        color.cor = new Color();

        x.style.background = color.cor.showColor();
    }

    addColorBuffer(color);

    // console.log(x.style.background);
    console.dir(buffer);

}, false);
