
import { Button } from '@/components/ui/button';
import { useNews } from '@/context/NewsContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NewsPagination = () => {
  const { totalResults, currentPage, pageSize, setPage, setPageSize } = useNews();
  
  const totalPages = Math.ceil(totalResults / pageSize);
  
  if (totalResults === 0) return null;
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
      <div className="text-sm text-muted-foreground">
        Showing {Math.min((currentPage - 1) * pageSize + 1, totalResults)} - {Math.min(currentPage * pageSize, totalResults)} of {totalResults} results
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center mr-4">
          <span className="text-sm text-muted-foreground mr-2">Items per page:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(parseInt(value))}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {generatePaginationButtons(currentPage, totalPages).map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-1">...</span>
              );
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPage(pageNum)}
                className="h-8 w-8"
              >
                {pageNum}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate pagination buttons
const generatePaginationButtons = (currentPage: number, totalPages: number) => {
  // For 7 or fewer pages, show all page numbers
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  // For more than 7 pages, use a more complex logic with ellipsis
  const pages = [];
  
  // Always include first page
  pages.push(1);
  
  // Add ellipsis if needed
  if (currentPage > 3) {
    pages.push('...');
  }
  
  // Add pages around the current page
  const rangeStart = Math.max(2, currentPage - 1);
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
  
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }
  
  // Add ellipsis if needed
  if (currentPage < totalPages - 2) {
    pages.push('...');
  }
  
  // Always include last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  
  return pages;
};

export default NewsPagination;
