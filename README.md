# SBO Tech - Shopify Development Agency

A modern Next.js website for SBO Tech, a Shopify app development agency. Features a dynamic blog, portfolio showcase, and admin panel with MongoDB integration.

## Features

- **Dynamic Blog System**: Create, edit, and manage blog posts with rich content
- **Portfolio Showcase**: Display projects with detailed case studies
- **Admin Panel**: Full CRUD operations for blog posts and projects
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Responsive Design**: Modern UI built with Tailwind CSS
- **SEO Optimized**: Dynamic metadata and Open Graph tags

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MongoDB with Mongoose ODM
- **Icons**: Heroicons
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sbo_home
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/sbo_tech

# For MongoDB Atlas (recommended for production):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sbo_tech?retryWrites=true&w=majority

# Next.js Environment Variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The database will be created automatically when you first run the application

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and add it to `.env.local`

### 5. Seed the Database

Run the seed script to populate the database with sample data:

```bash
npm run seed
```

This will create:
- 3 sample blog posts
- 3 sample projects

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── blogs/         # Blog CRUD operations
│   │   └── projects/      # Project CRUD operations
│   ├── admin/             # Admin panel
│   ├── blogs/             # Blog pages
│   └── work/              # Work/portfolio pages
├── components/            # React components
│   ├── admin/            # Admin panel components
│   ├── shared/           # Shared components (Header, Footer, Layout)
│   └── ui/               # UI components
├── lib/                  # Utility functions
│   ├── api.ts           # API client functions
│   └── mongodb.ts       # MongoDB connection
├── models/               # Mongoose schemas
│   ├── BlogPost.ts      # Blog post schema
│   └── Project.ts       # Project schema
└── scripts/             # Database scripts
    └── seed.ts          # Database seeding script
```

## API Endpoints

### Blog Posts
- `GET /api/blogs` - Get all blog posts (with filtering)
- `POST /api/blogs` - Create new blog post
- `GET /api/blogs/[id]` - Get specific blog post
- `PUT /api/blogs/[id]` - Update blog post
- `DELETE /api/blogs/[id]` - Delete blog post

### Projects
- `GET /api/projects` - Get all projects (with filtering)
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

## Admin Panel

Access the admin panel at `/admin` to manage:

- **Dashboard**: Overview of content and analytics
- **Blog Posts**: Create, edit, delete, and manage blog posts
- **Projects**: Create, edit, delete, and manage portfolio projects
- **Analytics**: View site performance metrics

## Content Management

### Blog Posts
- Rich text content with HTML support
- Author information with avatars and bios
- Categories and tags
- Featured posts
- Draft/Published/Archived status
- SEO metadata

### Projects
- Detailed project descriptions
- Feature lists and technology stacks
- Client information and impact metrics
- Project status tracking
- Timeline and team information

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sbo_tech?retryWrites=true&w=majority
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.ts`
- Customize shadcn/ui components in `src/components/ui/`

### Content
- Update sample data in `src/scripts/seed.ts`
- Modify page content in respective component files
- Update metadata in page files

### Features
- Add new API endpoints in `src/app/api/`
- Create new components in `src/components/`
- Extend database schemas in `src/models/`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.
