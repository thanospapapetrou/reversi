class Log {
    static #ELEMENT_TEXTAREA = 'textarea';
    static #FORMAT_MOVE = (row, column) => (Reversi.FORMAT_COLUMN(column) + Reversi.FORMAT_ROW(row)).padEnd(4);
    static #FORMAT_SCORE = (black, white) => `\n${black} - ${white}`;
    static #TEXT_PASS = 'pass';

    #turn;
    #log;

    constructor() {
        this.#turn = 0;
        const textarea = document.createElement(Log.#ELEMENT_TEXTAREA);
        this.#log = document.createTextNode('');
        textarea.appendChild(this.#log);
        document.body.appendChild(textarea);
    }

    logMove(row, column, color) {
        this.#log.nodeValue += color.formatPly(this.#turn, ((row == null) || (column == null)) ? Log.#TEXT_PASS
                : Log.#FORMAT_MOVE(row, column));
        (color == Color.BLACK) && (this.#turn++);
    }

    logScore(black, white) {
        this.#log.nodeValue += Log.#FORMAT_SCORE(black, white);
    }
}
