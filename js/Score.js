class Score {
    static #FORMAT_SCORE = (black, white) => `${black} - ${white}`;

    #score;

    constructor() {
        const score = document.createElement(HtmlElement.PARAGRAPH);
        this.#score = document.createTextNode('');
        score.appendChild(this.#score);
        document.body.appendChild(score);
    }

    update(black, white) {
        this.#score.nodeValue = Score.#FORMAT_SCORE(black, white);
    }
}