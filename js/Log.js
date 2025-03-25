class Log {
    static #ELEMENT_TEXTAREA = 'textarea';

    #move;
    #log;

    constructor() {
        this.#move = 0;
        const textarea = document.createElement(Log.#ELEMENT_TEXTAREA);
        this.#log = document.createTextNode('');
        textarea.appendChild(this.#log);
        document.body.appendChild(textarea);
    }

    log(row, column, color) {
        this.#log.nodeValue += color.formatPly(this.#move, row, column);
        (color == Color.BLACK) && (this.#move++);
    }
}
