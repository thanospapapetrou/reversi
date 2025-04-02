const Color = Object.freeze({
    BLACK: {disk: '⚫', name: 'black', score: 1, formatPly: (round, ply) => `${(round + 1).toString().padStart(2)}. ${ply}`},
    WHITE: {disk: '⚪', name: 'white', score: -1, formatPly: (round, ply) => ` ${ply}\n`}
});
