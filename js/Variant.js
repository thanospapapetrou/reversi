const Variant = Object.freeze({
    REVERSI: {name: 'Reversi', initialize: (board, log, color, next) => {
        // TODO reversi for single player
        const center = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                (Math.floor(board.length / 2) - 1 <= i) && (i < Math.floor(board.length / 2) + 1)
                        && (Math.floor(board[i].length / 2) - 1 <= j) && (j < Math.floor(board[i].length / 2) + 1)
                        && (board[i][j].disk == null) && center.push(board[i][j]);
            }
        }
        (center.length > 0) ? board.forEach((row, i) => row.forEach((square, j) => center.includes(square)
                ? square.enable((event) => {
                    board.play(i, j, color, log);
                    Variant.REVERSI.initialize(board, log, (color == Color.BLACK) ? Color.WHITE : Color.BLACK, next);
                }) : square.disable())) : next();
    }},
    OTHELLO: {name: 'Othello', initialize: (board, log, color, next) => {
        const centerRow = Math.floor(board.length / 2);
        for (let i = centerRow - 1; i < centerRow + 1; i++) {
            const centerColumn = Math.floor(board[i].length / 2);
            for (let j = centerColumn - 1; j < centerColumn + 1; j++) {
                board[i][j].disk = Object.values(Color)[(i + j + 1) % 2];
            }
        }
        next();
    }}
});
