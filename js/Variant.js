const Variant = Object.freeze({
    REVERSI: {name: 'Reversi', score: 1, initialize: (reversi, ply, next) => {
        const center = [];
        for (let i = 0; i < reversi.board.length; i++) {
            for (let j = 0; j < reversi.board[i].length; j++) {
                (Math.floor(reversi.board.length / 2) - 1 <= i) && (i < Math.floor(reversi.board.length / 2) + 1)
                        && (Math.floor(reversi.board[i].length / 2) - 1 <= j)
                        && (j < Math.floor(reversi.board[i].length / 2) + 1)
                        && (reversi.board[i][j].disk == null) && center.push({i, j});
            }
        }
        const opponent = (ply == Color.BLACK) ? Color.WHITE : Color.BLACK;
        if (center.length > 0) {
            if ((reversi.mode == Mode.SINGLE_PLAYER) && (reversi.color != ply)) {
                const {i, j} = center[Math.floor(Math.random() * center.length)];
                reversi.play(i, j, ply);
                Variant.REVERSI.initialize(reversi, opponent, next);
            } else {
                reversi.board.forEach((rank, i) => rank.forEach((square, j) => center
                        .some((sq) => (sq.i == i) && (sq.j == j)) ? square.enable(reversi.hints, [], (event) => {
                            reversi.play(i, j, ply);
                            Variant.REVERSI.initialize(reversi, opponent, next);
                        }) : square.disable()));
            }
        } else {
            next();
        }
    }},
    OTHELLO: {name: 'Othello', score: 1, initialize: (reversi, ply, next) => {
        const centerRank = Math.floor(reversi.board.length / 2);
        for (let i = centerRank - 1; i < centerRank + 1; i++) {
            const centerFile = Math.floor(reversi.board[i].length / 2);
            for (let j = centerFile - 1; j < centerFile + 1; j++) {
                reversi.board[i][j].disk = Object.values(Color)[(i + j + 1) % 2];
            }
        }
        next();
    }},
    ANTI_REVERSI: {name: 'Anti-Reversi', score: -1, initialize: (reversi, ply, next) =>
        Variant.REVERSI.initialize(reversi, ply, next)}
});
