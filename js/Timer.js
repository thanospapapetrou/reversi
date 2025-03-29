class Timer {
    static #FORMAT = (min, s) => `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    static #MS_PER_S = 1000;
    static #S_PER_MIN = 60;

    #timer;
    #start;
    #interval;

    constructor() {
        const timer = document.createElement(HtmlElement.PARAGRAPH);
        this.#timer = document.createTextNode(Timer.#FORMAT(0, 0));
        timer.appendChild(this.#timer);
        document.body.appendChild(timer);
        this.#start = null;
        this.#interval = null;
    }

    start() {
        this.#start = new Date();
        this.#interval = setInterval(this.#update.bind(this), Timer.#MS_PER_S);
    }

    stop() {
        clearInterval(this.#interval);
    }

    #update() {
        const seconds = Math.floor((new Date() - this.#start) / Timer.#MS_PER_S);
        this.#timer.nodeValue = Timer.#FORMAT(Math.floor(seconds / Timer.#S_PER_MIN), seconds % Timer.#S_PER_MIN);
    }
}