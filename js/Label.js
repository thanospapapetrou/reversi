class Label {
    constructor(text) {
        const paragraph = document.createElement(HtmlElement.PARAGRAPH);
        paragraph.appendChild(document.createTextNode(text));
        document.body.appendChild(paragraph);
    }
}
