import { Article } from '../article/article';

export interface Category {
  id?: number;
  title: string;
  articles?: Article[];
}
