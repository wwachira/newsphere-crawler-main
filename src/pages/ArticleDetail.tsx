
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArticleById } from '@/services/mockNewsService';
import { Article } from '@/types/news';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import NewsHeader from '@/components/NewsHeader';
import { useToast } from '@/components/ui/use-toast';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const articleData = await getArticleById(id);
        setArticle(articleData);
        if (!articleData) {
          toast({
            title: 'Article not found',
            description: 'The article you requested could not be found.',
            variant: 'destructive',
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        toast({
          title: 'Error',
          description: 'Failed to load the article. Please try again later.',
          variant: 'destructive',
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, navigate, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NewsHeader />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-12 w-full mb-4" />
          <div className="flex items-center space-x-2 mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!article) return null;
  
  const formattedDate = format(new Date(article.publishedAt), 'MMMM d, yyyy');
  
  return (
    <div className="min-h-screen flex flex-col">
      <NewsHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to news
        </Button>
        
        <h1 className="text-3xl font-bold mb-4 text-balance">{article.title}</h1>
        
        <div className="flex flex-wrap items-center mb-6 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            {article.source.icon && (
              <img src={article.source.icon} alt={article.source.name} className="w-5 h-5 mr-2" />
            )}
            <span>{article.source.name}</span>
          </div>
          
          <span className="text-muted-foreground">•</span>
          
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          <span className="text-muted-foreground">•</span>
          
          <Badge variant="outline" className="capitalize">{article.category}</Badge>
        </div>
        
        <div className="aspect-video bg-muted overflow-hidden rounded-lg mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop';
            }}
          />
        </div>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg font-medium mb-6">{article.description}</p>
          
          <div className="space-y-6">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <Button variant="outline" asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <LinkIcon className="mr-2 h-4 w-4" />
                Read original article
              </a>
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline">Share</Button>
              <Button>Save for later</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetail;
