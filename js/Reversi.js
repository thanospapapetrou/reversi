class Reversi {
    static FORMAT_COLUMN = (column) => String.fromCharCode('a'.charCodeAt(0) + column);
    static FORMAT_ROW = (row) => (row + 1).toString();

    static #DISPLAY_NONE = 'none';
    static #PARAMETER_COLOR = 'color';
    static #PARAMETER_DIFFICULTY = 'difficulty';
    static #PARAMETER_MODE = 'mode';
    static #PARAMETER_VARIANT = 'variant';
    static #SELECTOR_COLOR = 'select#color';
    static #SELECTOR_DIFFICULTY = 'select#difficulty';
    static #SELECTOR_FORM = 'form';
    static #SELECTOR_MODE = 'select#mode';
    static #SELECTOR_VARIANT = 'select#variant';
    static #SIZE = 8;
    // TODO timer
    // TODO constants cleanup

    #variant;
    #mode;
    #color;
    #board;
    #log;

    static main() {
        const variant = Reversi.#getParameter(Reversi.#PARAMETER_VARIANT, Variant);
        const mode = Reversi.#getParameter(Reversi.#PARAMETER_MODE, Mode);
        const color = Reversi.#getParameter(Reversi.#PARAMETER_COLOR, Color);
        const difficulty = Reversi.#getParameter(Reversi.#PARAMETER_DIFFICULTY, Difficulty);
        (variant != null) && (document.querySelector(Reversi.#SELECTOR_VARIANT).value = variant);
        (mode != null) && (document.querySelector(Reversi.#SELECTOR_MODE).value = mode);
        (color != null) && (document.querySelector(Reversi.#SELECTOR_COLOR).value = color);
        (difficulty != null) && (document.querySelector(Reversi.#SELECTOR_DIFFICULTY).value = difficulty);
        Reversi.toggleColorDifficulty();
        if ((variant != null) && (mode != null)
                && ((Mode[mode] == Mode.TWO_PLAYERS) || ((color != null) && (difficulty != null)))) {
            document.querySelector(Reversi.#SELECTOR_FORM).style.display = Reversi.#DISPLAY_NONE;
            new Reversi(Variant[variant], Mode[mode], Color[color], Difficulty[difficulty]).initialize();
        }
    }

    static toggleColorDifficulty() {
        const twoPlayers = Mode[document.querySelector(Reversi.#SELECTOR_MODE).value] == Mode.TWO_PLAYERS;
        document.querySelector(Reversi.#SELECTOR_COLOR).disabled = twoPlayers;
        document.querySelector(Reversi.#SELECTOR_DIFFICULTY).disabled = twoPlayers;
    }

    static #getParameter(key, enumeration) {
        const value = new URLSearchParams(location.search).get(key);
        return Object.keys(enumeration).includes(value) ? value : null;
    }

    constructor(variant, mode, color, difficulty) {
        this.#variant = variant;
        this.#mode = mode;
        this.#color = color;
        this.#board = new Board(Reversi.#SIZE);
        this.#log = new Log();
    }

    initialize() {
        this.#log.logVariant(this.#variant);
        this.#variant.initialize(this.#board, this.#log, Color.BLACK, () => {
            // TODO start timer
            this.ply(this.#mode, this.#color, Color.BLACK);
        });
    }

    ply(mode, color, ply) {
        const captives = [];
        for (let i = 0; i < this.#board.length; i++) {
            for (let j = 0; j < this.#board[i].length; j++) {
                (this.#board.capture(i, j, ply).length > 0) && captives.push({i, j});
            }
        }
        const next = (ply == Color.BLACK) ? Color.WHITE : Color.BLACK;
        if (captives.length == 0) {
            const captives = [];
            for (let i = 0; i < this.#board.length; i++) {
                for (let j = 0; j < this.#board[i].length; j++) {
                    (this.#board.capture(i, j, next).length > 0) && captives.push({i, j});
                }
            }
            if (captives.length == 0) {
                    // TODO stop timer
                    this.#log.logScore(this.#board.score(Color.BLACK), this.#board.score(Color.WHITE));
                    // TODO alert
            } else {
                this.#log.logPly(null, null, ply);
                this.ply(mode, color, next);
            }
        } else if ((mode == Mode.SINGLE_PLAYER) && (color != ply)) {
            this.#board.forEach((row) => row.forEach((square) => square.busy()));
            this.#board.play(captives[0].i, captives[0].j, ply, this.#log);
            this.ply(mode, color, next);
        } else {
            this.#board.forEach((row) => row.forEach((square) => square.disable()));
            captives.forEach(({i, j}) => {
                this.#board[i][j].enable((event) => {
                    this.#board.play(i, j, ply, this.#log);
                    this.ply(mode, color, next);
                });
            });
        }
    }
}
