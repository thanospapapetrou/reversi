const Color = Object.freeze({
    BLACK: {disk: '⚫', formatPly: (round, ply) => `${(round + 1).toString().padStart(2)}. ${ply}`},
    WHITE: {disk: '⚪', formatPly: (round, ply) => ` ${ply}\n`}
});
