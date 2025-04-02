class Square {
    static #CLASS_BEST = 'best';
    static #CLASS_BOARD = 'board';
    static #CLASS_CAPTIVE = 'captive';
    static #CLASS_POSSIBLE = 'possible';

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

    enable(hints, captives, action) {
        this.#cell.style.cursor = CssCursor.POINTER;
        (hints >= Hints.POSSIBLE) && this.#cell.classList.add(Square.#CLASS_POSSIBLE);
        (hints >= Hints.CAPTIVES) && (this.#cell.onmouseenter = (event) => captives.forEach((captive) =>
                captive.#cell.classList.add(Square.#CLASS_CAPTIVE)));
        (hints >= Hints.CAPTIVES) && (this.#cell.onmouseleave = (event) => captives.forEach((captive) =>
                captive.#cell.classList.remove(Square.#CLASS_CAPTIVE)));
        this.#cell.onclick = action;
    }

    setBest() {
        this.#cell.classList.add(Square.#CLASS_BEST);
    }

    disable() {
        this.busy();
        this.#cell.style.cursor = CssCursor.NOT_ALLOWED;
    }

    busy() {
        this.#cell.style.cursor = CssCursor.WAIT;
        this.#cell.classList.remove(Square.#CLASS_POSSIBLE);
        this.#cell.classList.remove(Square.#CLASS_BEST);
        this.#cell.classList.remove(Square.#CLASS_CAPTIVE);
        this.#cell.onmouseenter = null;
        this.#cell.onmouseleave = null;
        this.#cell.onclick = null;
    }
}
