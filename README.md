# News Aggregator

A modern, responsive news aggregator web application built with React and TypeScript. This application fetches articles from multiple news sources and provides a clean, user-friendly interface for browsing, searching, and filtering news articles.

## Features

- **Article Search and Filtering**: Search articles by keyword and filter by date, category, and source
- **Personalized News Feed**: Customize your news feed by selecting preferred sources, categories, and authors
- **Mobile-Responsive Design**: Optimized for viewing on all devices, from mobile phones to desktop computers
- **Multiple News Sources**: Aggregates articles from NewsAPI, The Guardian, and The New York Times

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API requests
- **date-fns** - Date formatting utilities
- **Docker** - Containerization
- **Nginx** - Web server for production

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for containerized deployment)
- API keys for news sources (optional, but recommended for full functionality)

## Getting Started

### Option 1: Running with Docker (Recommended)

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd news-aggregator
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   ```
   REACT_APP_NEWS_API_KEY=fbfd8977de0544ae9afef72f33db4eed
   REACT_APP_GUARDIAN_API_KEY=ac65600d-4c66-4cb7-9bab-d73b9667bace
   REACT_APP_NYTIMES_API_KEY=lLjCEEiO6K2T6cAPbGNZqiwn1zhIa7jBn1LSMbf1qDqSRKPs
   ```

3. **Build and run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

### Option 2: Running Locally (Development)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   ```
   REACT_APP_NEWS_API_KEY=fbfd8977de0544ae9afef72f33db4eed
   REACT_APP_GUARDIAN_API_KEY=ac65600d-4c66-4cb7-9bab-d73b9667bace
   REACT_APP_NYTIMES_API_KEY=lLjCEEiO6K2T6cAPbGNZqiwn1zhIa7jBn1LSMbf1qDqSRKPs
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## Getting API Keys

### NewsAPI.org
1. Visit https://newsapi.org/register
2. Sign up for a free account
3. Copy your API key from the dashboard

### The Guardian
1. Visit https://open-platform.theguardian.com/access/
2. Register for an API key
3. Copy your API key

### New York Times
1. Visit https://developer.nytimes.com/get-started
2. Sign up for an account
3. Create an app and copy your API key

**Note**: The application will work without API keys, but you may see errors or limited functionality. For the best experience, configure at least one API key.

## Project Structure

```
news-aggregator/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── ArticleCard.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── PreferencesModal.tsx
│   │   └── SearchBar.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useNews.ts
│   ├── services/           # API services
│   │   ├── newsApiService.ts
│   │   ├── guardianService.ts
│   │   ├── nytimesService.ts
│   │   └── newsAggregator.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── storage.ts
│   ├── App.tsx             # Main application component
│   ├── App.css             # Application styles
│   ├── index.tsx           # Application entry point
│   └── index.css           # Global styles
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Usage

### Searching Articles
- Use the search bar at the top to search for articles by keyword
- Press Enter or click the Search button to execute the search

### Filtering Articles
- Use the filter panel on the left (desktop) or top (mobile) to filter articles by:
  - **Category**: Business, Entertainment, Health, Science, Sports, Technology, etc.
  - **Source**: NewsAPI, The Guardian, or The New York Times
  - **Date Range**: Select a date range using the "Date From" and "Date To" fields
- Click "Clear Filters" to reset all filters

### Personalizing Your Feed
1. Click the "Preferences" button in the header
2. Select your preferred news sources
3. Choose your preferred categories
4. Add preferred authors (type author name and press Enter or click Add)
5. Click "Save Preferences" to apply your settings

Your preferences are saved in your browser's local storage and will persist across sessions.

## Docker Commands

### Build the Docker image:
```bash
docker-compose build
```

### Run the container:
```bash
docker-compose up
```

### Run in detached mode:
```bash
docker-compose up -d
```

### Stop the container:
```bash
docker-compose down
```

### View logs:
```bash
docker-compose logs -f
```

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

### Code Quality

This project follows best practices:
- **DRY (Don't Repeat Yourself)**: Reusable components and utilities
- **KISS (Keep It Simple, Stupid)**: Simple, straightforward implementations
- **SOLID Principles**: 
  - Single Responsibility: Each service handles one news source
  - Open-Closed: Easy to extend with new news sources
  - Liskov Substitution: Services follow consistent interfaces
  - Interface Segregation: Focused interfaces for different concerns
  - Dependency Inversion: Dependencies injected through constructors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Errors
If you see API errors:
1. Verify your API keys are correctly set in the `.env` file
2. Check that your API keys are valid and have not expired
3. Ensure you're not exceeding API rate limits
4. Some APIs may require specific request formats or have CORS restrictions

### Docker Issues
If Docker build fails:
1. Ensure Docker and Docker Compose are installed and running
2. Check that port 3000 is not already in use
3. Try rebuilding with `docker-compose build --no-cache`

### Build Issues
If npm install fails:
1. Ensure you're using Node.js 18 or higher
2. Try clearing npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then run `npm install` again

## License

This project is created as part of a take-home challenge for innovcripta AG.

## Contact

For questions or issues, please refer to the project documentation or contact the development team.
