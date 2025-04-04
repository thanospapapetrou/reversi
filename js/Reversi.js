class Reversi {
    static FORMAT_FILE = (file) => String.fromCharCode('a'.charCodeAt(0) + file);
    static FORMAT_RANK = (rank) => (rank + 1).toString();

    static #DISPLAY_NONE = 'none';
    static #MESSAGE_DRAW = 'It\'s a draw';
    static #MESSAGE_WIN = (variant, mode, color, score) => (mode == Mode.SINGLE_PLAYER)
            ? ((score * variant.score * color.score > 0) ? `You (${color.name}) win!`
                    : `Computer (${((color == Color.BLACK) ? Color.WHITE : Color.BLACK).name}) wins!`)
            : ((score * variant.score * Color.BLACK.score > 0) ? `Player 1 (${Color.BLACK.name}) wins!`
                    : `Player 2 (${Color.WHITE.name}) wins!`);
    static #PARAMETER_COLOR = 'color';
    static #PARAMETER_DIFFICULTY = 'difficulty';
    static #PARAMETER_HINTS = 'hints';
    static #PARAMETER_MODE = 'mode';
    static #PARAMETER_VARIANT = 'variant';
    static #SELECTOR_COLOR = 'select#color';
    static #SELECTOR_DIFFICULTY = 'select#difficulty';
    static #SELECTOR_FORM = 'form';
    static #SELECTOR_HINTS = 'select#hints';
    static #SELECTOR_MODE = 'select#mode';
    static #SELECTOR_VARIANT = 'select#variant';
    static #SIZE = 8;
    // TODO antireversi

    variant;
    mode;
    color;
    difficulty;
    hints;
    board;
    #log;
    #score;
    #timer;

    static main() {
        const variant = Reversi.#getParameter(Reversi.#PARAMETER_VARIANT, Variant);
        const mode = Reversi.#getParameter(Reversi.#PARAMETER_MODE, Mode);
        const color = Reversi.#getParameter(Reversi.#PARAMETER_COLOR, Color);
        const difficulty = Reversi.#getParameter(Reversi.#PARAMETER_DIFFICULTY, Difficulty);
        const hints = Reversi.#getParameter(Reversi.#PARAMETER_HINTS, Hints);
        (variant != null) && (document.querySelector(Reversi.#SELECTOR_VARIANT).value = variant);
        (mode != null) && (document.querySelector(Reversi.#SELECTOR_MODE).value = mode);
        (color != null) && (document.querySelector(Reversi.#SELECTOR_COLOR).value = color);
        (difficulty != null) && (document.querySelector(Reversi.#SELECTOR_DIFFICULTY).value = difficulty);
        (hints != null) && (document.querySelector(Reversi.#SELECTOR_HINTS).value = hints);
        Reversi.toggleColorDifficulty();
        if ((variant != null) && (mode != null) && ((Mode[mode] == Mode.TWO_PLAYERS) || ((color != null)
                && (difficulty != null)))) {
            document.querySelector(Reversi.#SELECTOR_FORM).style.display = Reversi.#DISPLAY_NONE;
            new Reversi(Variant[variant], Mode[mode], Color[color], Difficulty[difficulty], Hints[hints] || Hints.NONE)
                    .initialize();
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

    constructor(variant, mode, color, difficulty, hints) {
        this.variant = variant;
        this.mode = mode;
        this.color = color;
        this.difficulty = difficulty;
        this.hints = hints;
        this.board = new Board(Reversi.#SIZE);
        this.#log = new Log();
        new Label(variant.name);
        this.#score = new Score();
        this.#timer = new Timer();
    }

    initialize() {
        this.variant.initialize(this, Color.BLACK, () => {
            this.#score.update(this.board.score(Color.BLACK), this.board.score(Color.WHITE));
            this.#timer.start();
            this.#ply(Color.BLACK);
        });
    }

    play(rank, file, color) {
        this.board.capture(rank, file, color).forEach((captive) => captive.disk = color);
        this.board[rank][file].disk = color;
        this.#log.log(rank, file, color);
        this.#score.update(this.board.score(Color.BLACK), this.board.score(Color.WHITE));
    }

    #ply(color) {
        const captives =this.board.getPossibilities(color);
        const opponent = (color == Color.BLACK) ? Color.WHITE : Color.BLACK;
        if (captives.length == 0) {
            const captives = this.board.getPossibilities(opponent);
            if (captives.length == 0) {
                    this.#timer.stop();
                    const score = this.board.score(Color.BLACK) - this.board.score(Color.WHITE);
                    this.board.forEach((rank) => rank.forEach((square => square.disable())));
                    alert((score == 0) ? Reversi.#MESSAGE_DRAW
                            : Reversi.#MESSAGE_WIN(this.variant, this.mode, this.color, score));
            } else {
                this.#log.log(null, null, color);
                this.#ply(opponent);
            }
        } else if ((this.mode == Mode.SINGLE_PLAYER) && (this.color != color)) {
            this.board.forEach((rank) => rank.forEach((square) => square.busy()));
            const alphaBeta = this.#alphaBeta(this.board, this.difficulty, -Infinity, Infinity, color);
            this.play(alphaBeta.rank, alphaBeta.file, color);
            this.#ply(opponent);
        } else {
            this.board.forEach((rank) => rank.forEach((square) => square.disable()));
            captives.forEach(({i, j}) => {
                this.board[i][j].enable(this.hints, this.board.capture(i, j, color), (event) => {
                    this.play(i, j, color);
                    this.#ply(opponent);
                });
            });
            if (this.hints >= Hints.BEST) {
                const alphaBeta = this.#alphaBeta(this.board, this.difficulty, -Infinity, Infinity, color);
                this.board[alphaBeta.rank][alphaBeta.file].setBest();
            }
        }
    }

    #alphaBeta(board, depth, a, b, color) {
        if ((depth == 0) || board.terminal) {
            return {file: null, rank: null,
                    score: this.variant.score * (board.score(Color.BLACK) - board.score(Color.WHITE))};
        }
        const possibilities = board.getPossibilities(color);
        if (color == Color.BLACK) {
            let rank = null;
            let file = null;
            let score = -Infinity;
            for (let {i, j} of possibilities) {
                const child = this.#copyBoard(board);
                child.capture(i, j, color).forEach((captive) => captive.disk = color);
                child[i][j].disk = color;
                rank = i;
                file = j;
                score = Math.max(score, this.#alphaBeta(child, depth - 1, a, b, Color.WHITE).score);
                if (score > b) {
                    break;
                }
                a = Math.max(a, score);
            }
            if (possibilities.length == 0) {
                score = Math.max(score, this.#alphaBeta(board, depth - 1, a, b, Color.WHITE).score);
            }
            return {rank, file, score};
        } else {
            let rank = null;
            let file = null;
            let score = Infinity;
            for (let {i, j} of possibilities) {
                const child = this.#copyBoard(board);
                child.capture(i, j, color).forEach((captive) => captive.disk = color);
                child[i][j].disk = color;
                rank = i;
                file = j;
                score = Math.min(score, this.#alphaBeta(child, depth - 1, a, b, Color.BLACK).score);
                if (score < a) {
                    break;
                }
                b = Math.min(b, score);
            }
            if (possibilities.length == 0) {
                score = Math.min(score, this.#alphaBeta(board, depth - 1, a, b, Color.BLACK).score);
            }
            return {rank, file, score};
        }
    }

    #copyBoard(board) {
        const newBoard = [];
        for (let rank of board) {
            const newRank = [];
            for (let file of rank) {
                newRank.push({disk: file.disk});
            }
            newBoard.push(newRank);
        }
        const that = this;
        newBoard.capture = function() {
            return that.board.capture.apply(newBoard, [].slice.call(arguments, 0));
        };
        newBoard.getPossibilities = function() {
            return that.board.getPossibilities.apply(newBoard, [].slice.call(arguments, 0));
        };
        newBoard.score = function() {
            return that.board.score.apply(newBoard, [].slice.call(arguments, 0));
        };
        newBoard.terminal = function() {
            return that.board.terminal.apply(newBoard, [].slice.call(arguments, 0));
        };
        return newBoard;
    }
}
