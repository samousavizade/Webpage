import Author from "./author";

export enum TAG {
  FIN_ML="Financial ML.",
  ML="Machine Learning",
  CV="Computer Vision",
  NLP="NLP",
}

class Article {
  id: number;

  image_link: string;
  title: string;
  subTitle: string;
  author: Author;
  date: string;
  tag: TAG;
  keywords: string[];

  content_md_file: string;
  summary: string;

  nLikes: number;
  doesCurrentUserLike: boolean;

  constructor(
    id: number,
    image_link: string,
    title: string,
    subTitle: string,
    author: Author,
    date: string,
    tag: TAG,
    keywords: string[],
    content_md_file: string,
    summary: string,
    nLikes: number,
    doesCurrentUserLike: boolean
  ) {
    this.id = id;
    this.image_link = image_link;
    this.title = title;
    this.subTitle = subTitle;
    this.author = author;
    this.date = date;
    this.tag = tag;
    this.keywords = keywords;
    this.content_md_file = content_md_file;
    this.summary = summary;
    this.nLikes = nLikes;
    this.doesCurrentUserLike = doesCurrentUserLike;
  }
}

export default Article;
