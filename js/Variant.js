const Variant = Object.freeze({
    REVERSI: (board, color, next) => {
        const center = board.flatMap((row, i) => row.filter((square, j) => (Math.floor(board.length / 2) - 1 <= i)
                && (i < Math.floor(board.length / 2) + 1) && (Math.floor(board[i].length / 2) - 1 <= j)
                && (j < Math.floor(board[i].length / 2) + 1) && (board[i][j].disk == null)));
        (center.length > 0) ? board.forEach((row) => row.forEach((square) => center.includes(square)
                ? square.enable(color, [], () => Variant.REVERSI(board, (color == Color.BLACK) ? Color.WHITE
                : Color.BLACK, next)) : square.disable())) : next();
    },
    OTHELLO: (board, color, next) => {
        const centerRow = Math.floor(board.length / 2);
        for (let i = centerRow - 1; i < centerRow + 1; i++) {
            const centerColumn = Math.floor(board[i].length / 2);
            for (let j = centerColumn - 1; j < centerColumn + 1; j++) {
                board[i][j].disk = Object.values(Color)[(i + j + 1) % 2];
            }
        }
        next();
    }
});
