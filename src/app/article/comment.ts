import { Article } from './article';

export interface Comment {
  id?: number;
  content: string;
  article: Article;
  author: any;
}
