class Log {
    static #COLUMNS = 13;
    static #FORMAT = (rank, file) => (Reversi.FORMAT_FILE(file) + Reversi.FORMAT_RANK(rank)).padEnd(4);
    static #ROWS = 20;
    static #TEXT_PASS = 'pass';

    #round;
    #log;

    constructor() {
        this.#round = 0;
        this.#log = document.createElement(HtmlElement.TEXTAREA);
        this.#log.rows = Log.#ROWS;
        this.#log.columns = Log.#COLUMNS;
        this.#log.appendChild(document.createTextNode(''));
        document.body.appendChild(this.#log);
    }

    log(rank, file, color) {
        this.#log.firstChild.nodeValue += color.formatPly(this.#round, ((rank == null) || (file == null))
                ? Log.#TEXT_PASS : Log.#FORMAT(rank, file));
        this.#log.scrollTop = this.#log.scrollHeight;
        (color == Color.WHITE) && (this.#round++);
    }
}
