const Color = Object.freeze({
    BLACK: {disk: '⚫', formatPly: (move, row, column) => `${(move + 1).toString().padStart(2)}. ${((row == null) || (column == null)) ? 'pass' : Reversi.FORMAT_ROW(row) + Reversi.FORMAT_COLUMN(column)}`},
    WHITE: {disk: '⚪', formatPly: (move, row, column) => ` ${((row == null) || (column == null)) ? 'pass' : Reversi.FORMAT_ROW(row) + Reversi.FORMAT_COLUMN(column)}\n`}
});
// TODO improve formatting and make pass a constant
// TODO do not use constants in if/case blocks
