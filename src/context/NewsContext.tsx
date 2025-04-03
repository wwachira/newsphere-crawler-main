
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, Category, NewsFilters, Source } from '@/types/news';
import { getCategories, getSources, searchArticles } from '@/services/mockNewsService';
import { useToast } from '@/components/ui/use-toast';

interface NewsContextProps {
  articles: Article[];
  isLoading: boolean;
  sources: Source[];
  categories: Category[];
  filters: NewsFilters;
  totalResults: number;
  currentPage: number;
  pageSize: number;
  setFilters: (filters: Partial<NewsFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  refreshNews: () => Promise<void>;
}

const NewsContext = createContext<NewsContextProps | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<NewsFilters>({
    keywords: [],
    sources: [],
    categories: [],
  });

  const updateFilters = (newFilters: Partial<NewsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const fetchSources = async () => {
    try {
      const sourcesData = await getSources();
      setSources(sourcesData);
    } catch (error) {
      console.error('Error fetching sources:', error);
      toast({
        title: 'Error',
        description: 'Failed to load news sources. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load news categories. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const result = await searchArticles(
        filters.keywords,
        filters.sources,
        filters.categories,
        currentPage,
        pageSize
      );
      
      setArticles(result.articles);
      setTotalResults(result.totalResults);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load news articles. Please try again later.',
        variant: 'destructive',
      });
      setArticles([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Load sources and categories on initial render
  useEffect(() => {
    fetchSources();
    fetchCategories();
  }, []);

  // Fetch articles when filters or pagination changes
  useEffect(() => {
    fetchArticles();
  }, [filters, currentPage, pageSize]);

  return (
    <NewsContext.Provider
      value={{
        articles,
        isLoading,
        sources,
        categories,
        filters,
        totalResults,
        currentPage,
        pageSize,
        setFilters: updateFilters,
        setPage: setCurrentPage,
        setPageSize,
        refreshNews: fetchArticles,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = (): NewsContextProps => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
