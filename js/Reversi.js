class Reversi {
    static #SIZE = 8;

    #board;

    static main() {
        new Reversi();
    }

    constructor() {
        this.#board = new Board(Reversi.#SIZE);
        this.#board[3][3].disk = Color.WHITE;
        this.#board[3][4].disk = Color.BLACK;
        this.#board[4][3].disk = Color.BLACK;
        this.#board[4][4].disk = Color.WHITE;

        this.#board[2][3].disk = Color.BLACK;
        this.#board[3][3].disk = Color.BLACK;

        for (let i = 0; i < this.#board.length; i++) {
            for (let j = 0; j < this.#board.length; j++) {
                if (this.#board.capture(i, j, Color.WHITE).length > 0) {
                    console.log(`${i} ${j} ${JSON.stringify(this.#board.capture(i, j, Color.WHITE))}`);
                }
            }
        }
    }
}
