
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const NewsHeader = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="bg-newsBlue-500 text-white font-bold px-2 py-1 rounded">NS</span>
          <h1 className="text-2xl font-bold text-foreground">NewsSphere</h1>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Link to="/settings">
            <Button variant="outline">Settings</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NewsHeader;
