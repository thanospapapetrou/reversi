const Color = Object.freeze({
    BLACK: {disk: '⚫', formatPly: (turn, move) => `${(turn + 1).toString().padStart(2)}. ${move}`},
    WHITE: {disk: '⚪', formatPly: (turn, move) => ` ${move}\n`}
});
