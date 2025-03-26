class Log {
    static #ELEMENT_TEXTAREA = 'textarea';
    static #FORMAT_PLY = (rank, file) => (Reversi.FORMAT_FILE(file) + Reversi.FORMAT_RANK(rank)).padEnd(4);
    static #FORMAT_SCORE = (black, white) => `Score: ${black} - ${white}\n`; // TODO depending on ply, might need a new line before
    static #FORMAT_VARIANT = (variant) => `Variant: ${variant.name}\n`
    static #TEXT_PASS = 'pass';

    #round;
    #log;

    constructor() {
        this.#round = 0;
        this.#log = document.createElement(Log.#ELEMENT_TEXTAREA);
        this.#log.appendChild(document.createTextNode(''));
        document.body.appendChild(this.#log);
    }

    logVariant(variant) {
        this.#logMessage(Log.#FORMAT_VARIANT(variant));
    }

    logPly(rank, file, color) {
        this.#logMessage(color.formatPly(this.#round, ((rank == null) || (file == null))
            ? Log.#TEXT_PASS : Log.#FORMAT_PLY(rank, file)));
        (color == Color.WHITE) && (this.#round++);
    }

    logScore(black, white) {
        this.#logMessage(Log.#FORMAT_SCORE(black, white));
    }

    #logMessage(message) {
        this.#log.firstChild.nodeValue += message;
        this.#log.scrollTop = this.#log.scrollHeight;
    }
}
