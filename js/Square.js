class Square {
    static #CLASS_BOARD = 'board';
    static #CURSOR_NOT_ALLOWED = 'not-allowed';
    static #CURSOR_POINTER = 'pointer';
    static #CURSOR_WAIT = 'wait';
    static #ELEMENT_CELL = 'td';

    #cell;

    constructor(parent) {
        this.#cell = document.createElement(Square.#ELEMENT_CELL);
        this.#cell.classList.add(Square.#CLASS_BOARD);
        parent.appendChild(this.#cell);
    }

    get disk() {
        return Object.values(Color).find((color) => color.disk == this.#cell.firstChild?.nodeValue) || null;
    }

    set disk(color) {
        this.#cell.firstChild && this.#cell.removeChild(this.#cell.firstChild);
        this.#cell.appendChild(document.createTextNode(color.disk));
    }

    enable(action) {
        this.#cell.style.cursor = Square.#CURSOR_POINTER;
        this.#cell.onclick = action;
    }

    disable() {
        this.#cell.style.cursor = Square.#CURSOR_NOT_ALLOWED;
        this.#cell.onclick = null;
    }

    busy() {
        this.#cell.style.cursor = Square.#CURSOR_WAIT;
        this.#cell.onclick = null;
    }
}