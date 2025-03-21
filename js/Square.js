class Square {
    static #CLASS_BOARD = 'board';
    static #DISC = '⬤';
    static #ELEMENT_CELL = 'td';

    #cell;

    constructor(parent) {
        this.#cell = document.createElement(Square.#ELEMENT_CELL);
        this.#cell.classList.add(Square.#CLASS_BOARD);
        parent.appendChild(this.#cell);
    }

    get disk() {
        return Object.values(Color).find((color) => color == this.#cell.style.color);
    }

    set disk(color) {
        this.#cell.firstChild || this.#cell.appendChild(document.createTextNode(Square.#DISC));
        this.#cell.style.color = color;
    }
}