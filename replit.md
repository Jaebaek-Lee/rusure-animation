# Replit.md

## Overview

This is a full-stack web application built with React/TypeScript on the frontend and Express.js on the backend. The application uses PostgreSQL with Drizzle ORM for data persistence and includes a comprehensive UI component library based on shadcn/ui. The project features a modern development setup with Vite for frontend bundling and supports both development and production environments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite with React plugin
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **UI Components**: Comprehensive component library using Radix UI primitives

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon serverless database
- **Session Management**: Built-in session handling with pg-simple

### Development Setup
- **Build Tool**: ESBuild for server bundling
- **Dev Server**: Custom Vite integration with HMR
- **Type Checking**: TypeScript with strict mode
- **Code Quality**: Consistent import paths and module resolution

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Migrations**: Automatic migration generation to `./migrations`
- **Connection**: Environment-based DATABASE_URL configuration

### Storage Interface
- **Abstraction**: IStorage interface for database operations
- **Implementation**: MemStorage class for in-memory development
- **User Operations**: CRUD operations for user management
- **Extensibility**: Easy to extend with additional entities

### UI Component System
- **Base Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Components**: 40+ pre-built components (buttons, forms, dialogs, etc.)
- **Customization**: Configurable theme with dark/light mode support

### Frontend Features
- **Interactive Elements**: Eye-tracking character, custom cursor, background particles
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: Built-in toast system for user feedback

## Data Flow

1. **Client Requests**: Frontend makes API calls using fetch with credentials
2. **Server Processing**: Express routes handle requests and interact with storage
3. **Database Operations**: Storage interface abstracts database interactions
4. **Response Handling**: TanStack Query manages server state and caching
5. **UI Updates**: React components re-render based on query state changes

### Authentication Flow
- Session-based authentication using connect-pg-simple
- User credentials stored securely in PostgreSQL
- Frontend maintains auth state through query client

## External Dependencies

### Database
- **Neon Serverless**: PostgreSQL database hosting
- **Connection Pooling**: Built-in connection management
- **Environment Variables**: DATABASE_URL for connection string

### Development Tools
- **Replit Integration**: Custom plugins for development environment
- **Error Handling**: Runtime error modal for development
- **Code Mapping**: Source map support for debugging

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide Icons**: Comprehensive icon library
- **Class Variance Authority**: Type-safe variant handling

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized bundle to `dist/public`
- **Backend**: ESBuild creates single bundled server file
- **Static Assets**: Served directly from dist/public directory

### Environment Configuration
- **Development**: Hot reloading with Vite dev server
- **Production**: Express serves static files and API routes
- **Database**: Environment-based connection configuration

### Build Process
1. Frontend assets built with Vite
2. Server code bundled with ESBuild
3. Database migrations applied with Drizzle
4. Static files served from Express in production

The application is designed to be easily deployable on platforms like Replit, with support for both development and production environments through environment variable configuration.