# Fitness Coaching Platform

A modern fitness coaching platform built with React, TypeScript, and Supabase.

## Features

- User authentication and profiles
- Dashboard with progress tracking
- BMI and BMR calculators
- Nutrition management
- Session booking system
- Progress photo sharing
- Admin panel for user and content management
- Real-time messaging

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "coaching tege"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. Run database migrations:
   - Apply all migrations in `supabase/migrations/` to your Supabase project

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Building for Production

1. Build the application:
```bash
npm run build
```

2. The production-ready files will be in the `dist/` directory

3. Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── integrations/   # Supabase client and types
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── utils/          # Helper utilities
├── supabase/
│   └── migrations/     # Database migrations
├── public/             # Static assets
└── dist/               # Production build output
```

## Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

Make sure to:
1. Set environment variables in your hosting platform
2. Run `npm run build` before deploying
3. Configure your hosting to serve the `dist/` folder

## License

Private project - All rights reserved
