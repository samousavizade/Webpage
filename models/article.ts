import Author from "./author";

export enum TAG {
  FIN_ML="Financial ML.",
  ML="Machine Learning",
  CV="Computer Vision",
  NLP="NLP",
}

class Article {
  id: number;

  imageLink: string;
  title: string;
  subTitle: string;
  author: Author;
  createdAt: Date | string;
  tag: TAG;
  keywords: string[];

  contentMDFile: string;
  summary: string;

  nLikes: number;

  constructor(
    id: number,
    imageLink: string,
    title: string,
    subTitle: string,
    author: Author,
    createdAt: Date,
    tag: TAG,
    keywords: string[],
    content_md_file: string,
    summary: string,
    nLikes: number,
  ) {
    this.id = id;
    this.imageLink = imageLink;
    this.title = title;
    this.subTitle = subTitle;
    this.author = author;
    this.createdAt = createdAt;
    this.tag = tag;
    this.keywords = keywords;
    this.contentMDFile = content_md_file;
    this.summary = summary;
    this.nLikes = nLikes;
  }
}

export default Article;
