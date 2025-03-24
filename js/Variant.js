const Variant = Object.freeze({
    REVERSI: (board, color, next) => board.reversi(color, next),
    OTHELLO: (board, color, next) => board.othello(color, next)
});
