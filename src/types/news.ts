
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: Source;
  category: Category;
}

export interface Source {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

export type Category = 
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export interface NewsFilters {
  keywords: string[];
  sources: string[];
  categories: Category[];
  dateFrom?: string;
  dateTo?: string;
}
