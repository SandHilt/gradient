let isGradient = document.body.parentNode.classList.contains("cssgradients") | false;
let lastColor = null;
let lock = false;

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
    document.body.addEventListener("click", () => {
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

        document.body.style.background = lastColor.cor.showColor();
    }, false);
    /**
     * Caso contrário, trabalhará com Gradiente de duas cores.
     */
} else {
    document.body.addEventListener("click", () => {
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

        /**
         * Se a cor do gradiente não foi definida,
         * então ele criará um vetor de cores
         */
        if (!lastColor) {
            lastColor = {};
            lastColor.cor = new Map([
                ["primary", new Color()],
                ["secondary", new Color()]
            ]);
        } else {
            while (true) {
                let primary = new Color();
                let secondary = new Color();

                if (!primary.compareColor(lastColor.cor.get("primary")) && !secondary.compareColor(lastColor.cor.get("secondary"))) {
                    lastColor.cor.set("primary", primary);
                    lastColor.cor.set("secondary", secondary);
                    break;
                }
            }
        }

        let cor1 = lastColor.cor.get("primary").showColor();
        let cor2 = lastColor.cor.get("secondary").showColor();

        // console.log(`cor1: ${cor1}, cor2: ${cor2}`);

        /**
         * Promessa para ver se o DOM não está
         * alterando asyncronamente
         */
        let promise = new Promise((r, j) => {
            if (!lock) {
                lock = true;
                r();
            } else {
                j();
            }
        });

        promise.then((r) => {
            document.body.style.background = `linear-gradient(${main}${aux}, ${cor1}, ${cor2})`;
            lock = false;
        }, (j) => {
            console.log(`Sorry - ${new Date()}`);
        });

        // document.body.style.background = `linear-gradient(${main}${aux}, ${cor1}, ${cor2})`;
    }, false);

}
