
import { Button } from '@/components/ui/button';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={view === 'grid' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className="h-9 px-3"
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={view === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="h-9 px-3"
      >
        <LayoutList className="h-4 w-4 mr-2" />
        List
      </Button>
    </div>
  );
};

export default ViewToggle;
