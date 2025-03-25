const Variant = Object.freeze({
    REVERSI: (board, log, color, next) => board.reversi(log, color, next),
    OTHELLO: (board, log, color, next) => board.othello(color, next)
});
