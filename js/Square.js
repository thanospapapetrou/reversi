class Square {
    static #CLASS_BOARD = 'board';

    #cell;

    constructor(parent) {
        this.#cell = document.createElement(HtmlElement.CELL);
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
        this.#cell.style.cursor = CssCursor.POINTER;
        this.#cell.onclick = action;
    }

    disable() {
        this.#cell.style.cursor = CssCursor.NOT_ALLOWED;
        this.#cell.onclick = null;
    }

    busy() {
        this.#cell.style.cursor = CssCursor.WAIT;
        this.#cell.onclick = null;
    }
}
