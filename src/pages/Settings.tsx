
import { useState } from 'react';
import NewsHeader from '@/components/NewsHeader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Bell, Mail, Save } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [emailNotification, setEmailNotification] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [emailFrequency, setEmailFrequency] = useState('daily');
  const [keywordNotifications, setKeywordNotifications] = useState(true);
  const [sourceNotifications, setSourceNotifications] = useState(true);
  const [maxArticlesPerEmail, setMaxArticlesPerEmail] = useState([10]);
  
  const handleSaveNotifications = () => {
    toast({
      title: 'Settings saved',
      description: 'Your notification settings have been updated successfully.',
    });
  };
  
  const handleSavePreferences = () => {
    toast({
      title: 'Preferences saved',
      description: 'Your preferences have been updated successfully.',
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NewsHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="-ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
        
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications about new articles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Browser Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications in your browser when new articles match your criteria.
                      </p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Notifications
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={emailNotification}
                      onChange={(e) => setEmailNotification(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email Frequency</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={emailFrequency === 'realtime' ? 'default' : 'outline'}
                        onClick={() => setEmailFrequency('realtime')}
                        className="flex-1"
                      >
                        Real-time
                      </Button>
                      <Button
                        variant={emailFrequency === 'daily' ? 'default' : 'outline'}
                        onClick={() => setEmailFrequency('daily')}
                        className="flex-1"
                      >
                        Daily Digest
                      </Button>
                      <Button
                        variant={emailFrequency === 'weekly' ? 'default' : 'outline'}
                        onClick={() => setEmailFrequency('weekly')}
                        className="flex-1"
                      >
                        Weekly
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Notification Triggers</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="keyword"
                          checked={keywordNotifications}
                          onCheckedChange={() => setKeywordNotifications(!keywordNotifications)}
                        />
                        <Label htmlFor="keyword">Articles matching my keywords</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="source"
                          checked={sourceNotifications}
                          onCheckedChange={() => setSourceNotifications(!sourceNotifications)}
                        />
                        <Label htmlFor="source">Articles from my favorite sources</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Maximum articles per email</Label>
                      <span className="text-sm text-muted-foreground">{maxArticlesPerEmail[0]}</span>
                    </div>
                    <Slider
                      value={maxArticlesPerEmail}
                      onValueChange={setMaxArticlesPerEmail}
                      min={1}
                      max={20}
                      step={1}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications} className="ml-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>
                  Customize your news reading experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Default View</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="default">Grid</Button>
                    <Button variant="outline">List</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Default Sort</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="default">Newest First</Button>
                    <Button variant="outline">Relevance</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Articles per page</Label>
                    <span className="text-sm text-muted-foreground">10</span>
                  </div>
                  <Slider
                    defaultValue={[10]}
                    min={5}
                    max={50}
                    step={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Reading Experience</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="open-new" />
                      <Label htmlFor="open-new">Open articles in new tab</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-scroll" />
                      <Label htmlFor="auto-scroll">Auto-scroll to top when navigating</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} className="ml-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
