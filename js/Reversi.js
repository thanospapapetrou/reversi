class Reversi {
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

    #board;

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
            new Reversi(Variant[variant], Mode[mode], Color[color], Difficulty[difficulty]);
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
        this.#board = new Board(Reversi.#SIZE);
        this.#board[3][3].disk = Color.WHITE;
        this.#board[3][4].disk = Color.BLACK;
        this.#board[4][3].disk = Color.BLACK;
        this.#board[4][4].disk = Color.WHITE;
        this.#board.ply(Color.BLACK);
    }
}
