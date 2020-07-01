import { Article } from './article';

export interface Category {
  id?: number;
  title: string;
  articles?: Article[];
}
