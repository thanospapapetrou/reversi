class Log {
    static #ELEMENT_TEXTAREA = 'textarea';
    static #FORMAT_MOVE = (row, column) => (Reversi.FORMAT_COLUMN(column) + Reversi.FORMAT_ROW(row)).padEnd(4);
    static #FORMAT_SCORE = (black, white) => `Score: ${black} - ${white}\n`; // TODO depending on ply, might need a new line before
    static #FORMAT_VARIANT = (variant) => `Variant: ${variant.name}\n`
    static #TEXT_PASS = 'pass';

    #turn;
    #log;

    constructor() {
        this.#turn = 0;
        this.#log = document.createElement(Log.#ELEMENT_TEXTAREA);
        this.#log.appendChild(document.createTextNode(''));
        document.body.appendChild(this.#log);
    }

    logVariant(variant) {
        this.#logMessage(Log.#FORMAT_VARIANT(variant));
    }

    logMove(row, column, color) {
        this.#logMessage(color.formatPly(this.#turn, ((row == null) || (column == null))
            ? Log.#TEXT_PASS : Log.#FORMAT_MOVE(row, column)));
        (color == Color.BLACK) && (this.#turn++);
    }

    logScore(black, white) {
        this.#logMessage(Log.#FORMAT_SCORE(black, white));
    }

    #logMessage(message) {
        this.#log.firstChild.nodeValue += message;
        this.#log.scrollTop = this.#log.scrollHeight;
    }
}
