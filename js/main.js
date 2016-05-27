let html = document.getElementsByTagName('html')[0];
let isGradient = html.classList.contains("cssgradients") | false;
let lastColor = null;

class Color {
    constructor() {
        this.r = Math.floor(Math.random() * 255);
        this.g = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
    }

    compareColor(color) {
        if ((this.r == color.r) && (this.g == color.g) && (this.b == color.b)) {
            return true;
        }

        return false;
    }

    showColor() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}

/**
 * Se não houver a opção de Gradiente no CSS,
 * ele utilizará apenas cor.
 */
if (!isGradient) {
    html.addEventListener("click", () => {
        if (!lastColor) {
            lastColor = {};
            lastColor.cor = new Color();
        } else {
            while (true) {
                let temp = new Color();
                if (!temp.compareColor(lastColor.cor)) {
                    lastColor.cor = temp;
                    break;
                }
            }
        }

        html.style.background = lastColor.cor.showColor();
    }, false);
    /**
     * Caso contrário, trabalhará com Gradiente de duas cores.
     */
} else {
    html.addEventListener("click", () => {
        let pos = ["top", "right", "bottom", "left", "deg"];
        let getPos = () => Math.floor(Math.random() * pos.length);

        let main = getPos();
        let aux = pos[main];
        pos[main] = "";

        if (aux !== "deg") {
            main = `to ${aux}`;
            aux = " " + pos[getPos()];
        } else {
            main = `${Math.floor(Math.random() * 360)}deg`;
            aux = "";
        }

//        lastColor.direction = [main, aux];

        if (!lastColor) {
            lastColor = {};
            lastColor.cor = new Map([["primary", new Color()],["secondary", new Color()]]);
        } else {
            while(true) {
                let primary = new Color();
                let secondary = new Color();

                if (!primary.compareColor(lastColor.cor.get("primary")) && !primary.compareColor(lastColor.cor.get("secondary"))) {
                    lastColor.cor.set("primary", primary);
                    lastColor.cor.set("secondary", secondary);
                    break;
                }
            }
        }

        let cor1 = lastColor.cor.get("primary").showColor();
        let cor2 = lastColor.cor.get("secondary").showColor();

        console.log(`cor1: ${cor1}, cor2: ${cor2}`);

        html.style.background = `linear-gradient(${main}${aux}, ${cor1}, ${cor2})`;
    }, false);

}
