
import { Article } from '@/types/news';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ArticleCardProps {
  article: Article;
  view?: 'grid' | 'list';
}

const ArticleCard = ({ article, view = 'grid' }: ArticleCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
  
  if (view === 'list') {
    return (
      <Card className="article-card mb-4 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 relative">
            <img 
              src={article.image} 
              alt={article.title} 
              className="h-48 md:h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop';
              }}
            />
          </div>
          <div className="md:w-3/4 flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                {article.source.icon && (
                  <img src={article.source.icon} alt={article.source.name} className="w-4 h-4" />
                )}
                <span className="text-sm text-muted-foreground">{article.source.name}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{formattedDate}</span>
              </div>
              <Link to={`/article/${article.id}`} className="hover:text-newsBlue-600 transition-colors">
                <h3 className="font-bold text-xl leading-tight text-balance">{article.title}</h3>
              </Link>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-muted-foreground line-clamp-2">{article.description}</p>
            </CardContent>
            <CardFooter className="mt-auto pt-2">
              <div className="flex items-center justify-between w-full">
                <Badge variant="outline" className="capitalize">{article.category}</Badge>
                <Link to={`/article/${article.id}`} className="text-newsBlue-600 hover:text-newsBlue-800 text-sm font-medium">
                  Read more
                </Link>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="article-card h-full overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop';
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          {article.source.icon && (
            <img src={article.source.icon} alt={article.source.name} className="w-4 h-4" />
          )}
          <span className="text-sm text-muted-foreground">{article.source.name}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
        <Link to={`/article/${article.id}`} className="hover:text-newsBlue-600 transition-colors">
          <h3 className="font-bold text-lg leading-tight line-clamp-2">{article.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-muted-foreground text-sm line-clamp-2">{article.description}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex items-center justify-between w-full">
          <Badge variant="outline" className="capitalize">{article.category}</Badge>
          <Link to={`/article/${article.id}`} className="text-newsBlue-600 hover:text-newsBlue-800 text-sm font-medium">
            Read more
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
