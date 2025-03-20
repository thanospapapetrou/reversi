class Reversi {
    static #SIZE = 8;

    #board;

    static main() {
        new Reversi();
    }

    constructor() {
        this.#board = new Board(Reversi.#SIZE);
    }
}
