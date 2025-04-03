
import { useNews } from '@/context/NewsContext';
import { Category, Source } from '@/types/news';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const NewsFilters = () => {
  const { sources, categories, filters, setFilters } = useNews();
  const [searchInput, setSearchInput] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilters({ keywords: [searchInput.trim()] });
    } else {
      setFilters({ keywords: [] });
    }
  };
  
  const handleSourceToggle = (sourceId: string) => {
    setFilters({
      sources: filters.sources.includes(sourceId)
        ? filters.sources.filter(id => id !== sourceId)
        : [...filters.sources, sourceId]
    });
  };
  
  const handleCategoryToggle = (category: Category) => {
    setFilters({
      categories: filters.categories.includes(category)
        ? filters.categories.filter(cat => cat !== category)
        : [...filters.categories, category]
    });
  };
  
  const clearFilters = () => {
    setFilters({
      keywords: [],
      sources: [],
      categories: []
    });
    setSearchInput('');
  };
  
  const hasActiveFilters = 
    filters.keywords.length > 0 || 
    filters.sources.length > 0 || 
    filters.categories.length > 0;
  
  return (
    <div className="mb-6 space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search news articles..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter size={18} className="mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {filters.sources.length + filters.categories.length + (filters.keywords.length > 0 ? 1 : 0)}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-8 px-2 text-sm"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              
              {filters.keywords.length > 0 && (
                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <div className="flex flex-wrap gap-2">
                    {filters.keywords.map(keyword => (
                      <Badge key={keyword} variant="secondary" className="gap-1">
                        {keyword}
                        <X 
                          size={14} 
                          className="cursor-pointer" 
                          onClick={() => setFilters({ keywords: [] })}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Sources</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {sources.map((source: Source) => (
                    <div key={source.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`source-${source.id}`} 
                        checked={filters.sources.includes(source.id)}
                        onCheckedChange={() => handleSourceToggle(source.id)}
                      />
                      <Label 
                        htmlFor={`source-${source.id}`}
                        className="flex items-center cursor-pointer text-sm"
                      >
                        {source.icon && (
                          <img src={source.icon} alt={source.name} className="w-4 h-4 mr-2" />
                        )}
                        {source.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge 
                      key={category}
                      variant={filters.categories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer capitalize"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button size="sm" onClick={() => setFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </form>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.keywords.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              Keyword: {filters.keywords[0]}
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => setFilters({ keywords: [] })}
              />
            </Badge>
          )}
          
          {filters.sources.map(sourceId => {
            const source = sources.find(s => s.id === sourceId);
            return (
              <Badge key={sourceId} variant="secondary" className="gap-1">
                Source: {source?.name}
                <X 
                  size={14} 
                  className="cursor-pointer" 
                  onClick={() => handleSourceToggle(sourceId)}
                />
              </Badge>
            );
          })}
          
          {filters.categories.map(category => (
            <Badge key={category} variant="secondary" className="gap-1 capitalize">
              Category: {category}
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => handleCategoryToggle(category)}
              />
            </Badge>
          ))}
          
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2 text-sm">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsFilters;
