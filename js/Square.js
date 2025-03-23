class Square {
    static #CLASS_BOARD = 'board';
    static #ELEMENT_CELL = 'td';

    #cell;

    constructor(parent) {
        this.#cell = document.createElement(Square.#ELEMENT_CELL);
        this.#cell.classList.add(Square.#CLASS_BOARD);
        parent.appendChild(this.#cell);
    }

    get disk() {
        return Object.values(Color).find((color) => color == this.#cell.firstChild?.nodeValue) || null;
    }

    set disk(color) {
        this.#cell.firstChild && this.#cell.removeChild(this.#cell.firstChild);
        this.#cell.appendChild(document.createTextNode(color));
    }

    enable(color, captures, next) {
        this.#cell.style.backgroundColor = 'lightgreen';
        this.#cell.style.cursor = 'pointer';
        this.#cell.onclick = (event) => {
            for (let capture of captures) {
                capture.disk = color;
            }
            this.disk = color;
            next();
        };
    }

    disable() {
        this.#cell.style.backgroundColor = 'red';
        this.#cell.style.cursor = 'not-allowed';
        this.#cell.onclick = null;
    }
}