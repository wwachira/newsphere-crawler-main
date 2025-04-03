
import { Article, Category, Source } from "@/types/news";
import { v4 as uuidv4 } from "uuid";

// Mock sources
const sources: Source[] = [
  {
    id: "techcrunch",
    name: "TechCrunch",
    url: "https://techcrunch.com",
    icon: "https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png"
  },
  {
    id: "bbc-news",
    name: "BBC News",
    url: "https://www.bbc.com/news",
    icon: "https://www.bbc.co.uk/favicon.ico"
  },
  {
    id: "cnn",
    name: "CNN",
    url: "https://www.cnn.com",
    icon: "https://www.cnn.com/favicon.ico"
  },
  {
    id: "the-verge",
    name: "The Verge",
    url: "https://www.theverge.com",
    icon: "https://www.theverge.com/favicon.ico"
  },
  {
    id: "wired",
    name: "Wired",
    url: "https://www.wired.com",
    icon: "https://www.wired.com/favicon.ico"
  }
];

// Generate mock articles
const generateMockArticles = (count: number = 30): Article[] => {
  const categories: Category[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];
  
  const titles = [
    "New AI Breakthrough Could Revolutionize Healthcare",
    "Tech Giants Announce Partnership on Quantum Computing Initiative",
    "Scientists Discover Potential Treatment for Rare Disease",
    "Global Markets React to Economic Policy Changes",
    "Innovative Startup Secures $50M in Funding for Climate Solution",
    "Research Shows Benefits of Mediterranean Diet for Heart Health",
    "New Study Reveals Impact of Social Media on Mental Health",
    "Advances in Renewable Energy Storage Show Promise",
    "Sports Team Breaks Record With Historic Championship Win",
    "Entertainment Industry Adapts to Changing Viewer Preferences",
    "Tech Companies Implement New Privacy Features",
    "Medical Researchers Make Breakthrough in Cancer Treatment",
    "New Space Mission Aims to Explore Distant Planets",
    "Economic Experts Predict Growth Despite Challenges",
    "Innovative App Helps Users Track Environmental Impact"
  ];
  
  const descriptions = [
    "Researchers have developed a new AI model that can predict disease outcomes with 95% accuracy.",
    "Leading tech companies join forces to advance quantum computing research and applications.",
    "A clinical trial shows promising results for a treatment targeting a previously untreatable condition.",
    "Stock markets worldwide respond to major policy announcements from central banks.",
    "Climate tech startup receives significant investment to scale carbon capture technology.",
    "Long-term study confirms benefits of Mediterranean eating patterns for cardiovascular health.",
    "Research indicates correlation between social media usage patterns and mental wellbeing indicators.",
    "New battery technology could make renewable energy storage more efficient and affordable.",
    "Team overcomes obstacles to win championship after record-breaking season performance.",
    "Streaming platforms and content creators adapt to changing consumer viewing habits.",
    "New features aim to give users more control over their personal data and privacy settings.",
    "Clinical trials show promising results for targeted therapy approach to treating specific cancers.",
    "Space agency announces plans for mission to explore potentially habitable exoplanets.",
    "Despite global challenges, economists project moderate growth in key sectors over coming year.",
    "New mobile application helps consumers track and reduce their environmental footprint."
  ];
  
  const images = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1480&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581089778245-3ce67677f718?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1374&auto=format&fit=crop"
  ];
  
  const articles: Article[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomSourceIndex = Math.floor(Math.random() * sources.length);
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const randomTitleIndex = Math.floor(Math.random() * titles.length);
    const randomDescIndex = Math.floor(Math.random() * descriptions.length);
    const randomImageIndex = Math.floor(Math.random() * images.length);
    
    // Generate a random date within the last 7 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    
    articles.push({
      id: uuidv4(),
      title: titles[randomTitleIndex],
      description: descriptions[randomDescIndex],
      content: `${descriptions[randomDescIndex]} This is a longer, more detailed article content that would contain the full text of the news article. It would include multiple paragraphs, possibly quotes from sources, and in-depth analysis of the topic at hand.`,
      url: `https://example.com/article/${i}`,
      image: images[randomImageIndex],
      publishedAt: date.toISOString(),
      source: sources[randomSourceIndex],
      category: categories[randomCategoryIndex]
    });
  }
  
  return articles;
};

// Create a pool of mock articles
const mockArticlesPool = generateMockArticles(50);

// Function to search articles by keywords
export const searchArticles = (
  keywords: string[] = [], 
  sourceIds: string[] = [], 
  categories: Category[] = [],
  page: number = 1,
  pageSize: number = 10
): Promise<{ articles: Article[], totalResults: number }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      let filteredArticles = [...mockArticlesPool];
      
      // Filter by keywords if provided
      if (keywords.length > 0) {
        filteredArticles = filteredArticles.filter(article => 
          keywords.some(keyword => 
            article.title.toLowerCase().includes(keyword.toLowerCase()) || 
            article.description.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      }
      
      // Filter by sources if provided
      if (sourceIds.length > 0) {
        filteredArticles = filteredArticles.filter(article => 
          sourceIds.includes(article.source.id)
        );
      }
      
      // Filter by categories if provided
      if (categories.length > 0) {
        filteredArticles = filteredArticles.filter(article => 
          categories.includes(article.category)
        );
      }
      
      // Paginate results
      const startIndex = (page - 1) * pageSize;
      const paginatedArticles = filteredArticles.slice(startIndex, startIndex + pageSize);
      
      resolve({
        articles: paginatedArticles,
        totalResults: filteredArticles.length
      });
    }, 500); // Simulate 500ms of network delay
  });
};

// Function to get available sources
export const getSources = (): Promise<Source[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...sources]);
    }, 300);
  });
};

// Function to get article by ID
export const getArticleById = (id: string): Promise<Article | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = mockArticlesPool.find(article => article.id === id);
      resolve(article || null);
    }, 300);
  });
};

// Function to get available categories
export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']);
    }, 200);
  });
};
