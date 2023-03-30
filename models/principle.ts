class Principle {
    id: number;
    imageLink: string;
    principleTitle: string;
    text: string;
    author: string;

    constructor(
        id: number,
        imageLink: string,
        principleTitle: string,
        text: string,
        author: string,
    ) {
        this.id = id;
        this.imageLink = imageLink;
        this.principleTitle = principleTitle;
        this.text = text;
        this.author = author;
    }
}

export default Principle;
