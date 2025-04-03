
import { useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import NewsFilters from '@/components/NewsFilters';
import NewsPagination from '@/components/NewsPagination';
import ViewToggle from '@/components/ViewToggle';
import { useNews } from '@/context/NewsContext';
import NewsHeader from '@/components/NewsHeader';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { articles, isLoading, totalResults } = useNews();
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen flex flex-col">
      <NewsHeader />
      
      <main className="flex-grow">
        <div className="news-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Latest News</h2>
              <p className="text-muted-foreground">Stay updated with the latest articles from multiple sources</p>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>
          
          <NewsFilters />
          
          {isLoading ? (
            view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="h-48 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                    <Skeleton className="h-48 w-full md:w-1/4" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : totalResults === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try changing your search query or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} view={view} />
              ))}
            </div>
          )}
          
          <NewsPagination />
        </div>
      </main>
      
      <footer className="border-t mt-12 py-6 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="bg-newsBlue-500 text-white font-bold px-2 py-1 rounded">NS</span>
                <span className="font-bold">NewsSphere</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                &copy; {new Date().getFullYear()} NewsSphere. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
