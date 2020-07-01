export interface Article {
  id?: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  comments: any[];
  author: any;
  category: any;
}
