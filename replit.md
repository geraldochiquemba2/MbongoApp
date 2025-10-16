# Mbongo Investment Platform

## Overview

Mbongo is an educational investment platform designed specifically for the Angolan market (BODIVA - Bolsa de Dívida e Valores de Angola). The platform serves as a financial literacy tool that helps users learn about investing, simulate investment scenarios, discover authorized intermediaries, and stay updated with market news. It bridges the gap between novice investors and the Angolan capital markets by providing accessible educational content, interactive calculators, and practical guidance in Portuguese.

The application targets Angolan investors who want to understand and participate in local investment opportunities including Treasury Bonds (Títulos do Tesouro), stocks traded on BODIVA, and investment funds.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Rendering**: React 18+ with client-side rendering using Vite as the build tool and development server. The application uses wouter for lightweight client-side routing.

**UI Component System**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling. The design follows a "New York" style variant with extensive use of HSL-based color variables for theming. Custom color palette implements a blue-focused brand identity (Mbongo Primary Blue: 215 85% 45%) with support for both light and dark modes, though dark mode is currently enforced.

**State Management**: TanStack Query (React Query) handles server state with configured defaults for reduced refetching. No global client state management library is used - component-level state with React hooks is preferred.

**Typography & Design**: Custom font stack using Inter (primary) and Plus Jakarta Sans (headings) loaded from Google Fonts. The design system references fintech platforms (Nubank/Revolut) and trading platforms for professional credibility while maintaining educational accessibility.

**Page Structure**: Multi-page application with distinct routes for Home, Learn (Aprender), Simulate (Simular), Where to Buy (Onde Comprar), and News (Notícias). Each page includes a sticky navbar, themed content sections with background imagery/video, and shared footer.

**AI Features**: The Learn page features an interactive AI assistant powered by Groq's Llama 3.3 70B model. Users can ask questions about investments in Portuguese and receive educational responses. The assistant includes:
- Text-based Q&A with suggested questions
- Text-to-Speech functionality using PlayAI TTS via Groq
- Audio playback controls for each response
- Race condition prevention for concurrent audio requests

### Backend Architecture

**Runtime & Framework**: Node.js with Express.js server running on ESM modules. Development uses tsx for TypeScript execution, production uses esbuild for bundling.

**API Design**: RESTful API endpoints mounted under `/api` prefix. Implements:
- News retrieval endpoint (`GET /api/news`)
- AI chat assistant endpoint (`POST /api/chat`) using Groq's Llama 3.3 70B model
- Text-to-Speech endpoint (`POST /api/tts`) using Groq's PlayAI TTS integration
- Newsletter subscription endpoint (`POST /api/newsletter/subscribe`) with automatic welcome email
- Newsletter unsubscribe endpoint (`POST /api/newsletter/unsubscribe`)
- Newsletter subscribers list endpoint (`GET /api/newsletter/subscribers`) for admin
- Send investment opportunity endpoint (`POST /api/newsletter/send-opportunity`) for admin notifications
The architecture supports future expansion with the `registerRoutes` pattern.

**Development Environment**: Custom Vite integration in development mode with HMR (Hot Module Replacement) through middleware mode. Replit-specific plugins provide runtime error overlays and development banners.

**Data Layer Pattern**: Abstract storage interface (`IStorage`) implemented with PostgreSQL storage (`PgStorage`). Uses Neon serverless PostgreSQL for all data persistence including user authentication, wallets, and newsletter subscriptions.

### Database & ORM

**ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach. Schema definitions use Drizzle's type-safe table builders and integrate with Zod for runtime validation.

**Database Provider**: Configured for Neon serverless PostgreSQL (@neondatabase/serverless driver). Connection string expected via `DATABASE_URL` environment variable. WebSocket support configured using the `ws` package to enable Neon serverless connections in Node.js environment.

**Schema Design**: 
- Users table with UUID primary keys, phone/password authentication fields
- Wallets table with user relationship and total balance tracking
- Sub-wallets table for investment goals with target amounts and dates
- Wallet transactions table for deposit/withdrawal history
- News articles table with rich metadata (title, description, content, source, category, publication date, image URL, importance flag)
- Newsletter subscribers table with email, subscription date, and active status
- Uses `createInsertSchema` from drizzle-zod for type-safe insert operations

**Migration Strategy**: Drizzle Kit manages migrations with schema stored in `/shared/schema.ts` and migration files output to `/migrations` directory.

### Data Patterns

**Mock Data Architecture**: The application currently operates with simulated data that mirrors real Angolan financial market information. Mock data includes:
- Treasury bonds (BT/OT) with realistic rates and minimum investments
- BODIVA-listed stocks with price movements and sectors
- Financial news based on actual market events
- Broker/intermediary information from authorized institutions

**Real-time Updates**: News section implements auto-refresh (5-minute intervals) and manual refresh capabilities with last-update timestamps. Architecture prepared for WebSocket or streaming integration when connecting to real APIs.

### Architectural Decisions

**Monorepo Structure**: Single repository with clear separation:
- `/client` - Frontend React application
- `/server` - Backend Express server
- `/shared` - Shared TypeScript types and schemas accessible to both layers
- Path aliases configured in both tsconfig and Vite for clean imports

**Type Safety**: End-to-end TypeScript with strict mode enabled. Shared schema definitions ensure type consistency between client and server. Drizzle-Zod integration provides runtime validation matching compile-time types.

**Build Strategy**: Separate build processes for client (Vite) and server (esbuild). Client builds to `/dist/public`, server bundles to `/dist`. Production serves static files from built client and runs bundled server.

**Session Management**: Session-based authentication using Passport.js with phone/password authentication. Sessions stored in memory (MemoryStore) for development. Production should use PostgreSQL-backed sessions with connect-pg-simple.

**Educational vs Transactional**: Architectural decision to remain an educational/informational platform rather than executing actual trades. Connects users to authorized intermediaries (banks/brokers) for actual transactions.

## Development Setup

**Test User**: For development and testing purposes, a test user is available:
- Nome: Geraldo Abreu  
- Telefone: 923456789
- Senha: 123456
- Carteira inicial: 50.000,00 Kz

This user can be created via the registration endpoint and persists in the PostgreSQL database.

## External Dependencies

### Third-Party Services

**AI & TTS Services**: Integrated with Groq API for:
- Llama 3.3 70B conversational AI for investment education
- PlayAI TTS for text-to-speech synthesis (voice: Calum-PlayAI)
- API key managed through environment variable `GROQ_API_KEY`

**Email Services**: Integrated with Resend for transactional emails:
- Newsletter subscription welcome emails
- Investment opportunity notifications to subscribers
- Professional HTML email templates with Mbongo branding
- API key managed through environment variable `RESEND_API_KEY`
- Uses `onboarding@resend.dev` as sender (free tier)
- Support for batch email sending to multiple subscribers
- Free tier: 3,000 emails/month (100 emails/day) without domain verification required
- Migrated from Brevo (October 2025) due to account activation issues

**News Integration (Planned)**: Documentation exists for integrating external news APIs including:
- NewsAPI for general financial news filtering by Angola/Portuguese content
- Alpha Vantage for financial market news with sentiment analysis
- Finage for real-time streaming financial news

Current implementation uses mock data that mirrors real Angolan financial news, designed to be swapped for API calls when integrated.

**Font Delivery**: Google Fonts CDN for Inter and Plus Jakarta Sans typefaces.

**Video Content**: YouTube embedded videos for background elements on Hero and Product sections (autoplay, muted, looped).

### Database & Infrastructure

**PostgreSQL Database**: Neon serverless PostgreSQL expected to be provisioned and connected via DATABASE_URL environment variable. Drizzle ORM provides the abstraction layer.

**Development Tools**: Replit-specific tooling including vite-plugin-runtime-error-modal, vite-plugin-cartographer, and vite-plugin-dev-banner for enhanced development experience.

### External Market Data (Future)

**Regulatory Bodies**: Platform references official data from:
- CMC (Comissão do Mercado de Capitais) - Market regulator
- BNA (Banco Nacional de Angola) - Central bank monetary policy
- BODIVA - Stock exchange market data

**Broker Integration**: Lists authorized intermediaries (commercial banks and investment firms) with contact information. No direct API integration - serves as directory for users to contact brokers directly.

### API Client Architecture

**HTTP Client**: Native fetch API wrapped in custom `apiRequest` utility with automatic error handling and JSON content-type headers. Credentials included for session-based authentication.

**Query Configuration**: TanStack Query configured with:
- Custom query function that handles 401 responses based on context
- Disabled automatic refetching by default (staleTime: Infinity)
- Specific components opt-in to refetch intervals (e.g., news every 5 minutes)

## Deployment & Production

### Render Deployment Configuration

**Platform**: Configured for deployment on Render.com free tier with keep-alive functionality.

**Deployment Files**:
- `render.yaml` - Infrastructure as code configuration for Render
- `DEPLOY_RENDER.md` - Complete deployment guide in Portuguese

**Build & Start**:
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Production build outputs to `/dist` directory

**Health Monitoring**:
- Health check endpoint: `GET /api/health`
- Returns status, timestamp, and uptime information
- Used for monitoring and keep-alive pings

**Keep-Alive System** (prevents free tier sleep after 15 minutes):
1. **Internal Keep-Alive**: node-cron scheduled job pings `/api/health` every 10 minutes
   - Only runs in production when `NODE_ENV=production` and `RENDER_SERVICE_NAME` is set
   - Uses `RENDER_EXTERNAL_URL` environment variable for self-ping
   - Logs ping success/failure for monitoring

2. **External Monitoring** (recommended): UptimeRobot or Cron-Job.org
   - Provides redundancy if internal system fails
   - Offers uptime monitoring and alerting
   - Configured to ping health endpoint every 5-10 minutes

**Environment Variables Required**:
- `NODE_ENV=production`
- `GROQ_API_KEY` - For AI chat and TTS features
- `RESEND_API_KEY` - For email notifications (newsletter welcome and opportunities)
- `PORT` - Auto-configured by Render (default 10000)
- `RENDER_EXTERNAL_URL` - Auto-provided by Render for keep-alive

## Newsletter System

**Implementation**: Full newsletter subscription system with email notifications

**Features**:
- Newsletter subscription form in footer section
- Email validation with Zod schema
- Duplicate subscription prevention
- Welcome email sent automatically on subscription using Resend
- Admin endpoint to send investment opportunity emails to all subscribers
- Unsubscribe functionality
- PostgreSQL storage (data persists across server restarts)

**Email Templates**:
- Welcome email with platform introduction and investment categories
- Investment opportunity email with customizable title, description, type, return rate, and link
- Professional HTML emails with Mbongo branding and responsive design

**Integration Note**: Using Resend for email sending with manual API key configuration stored in secrets. Resend free tier allows 3,000 emails/month (100 emails/day) without domain verification, making it ideal for development and small-scale production use. Migrated from Brevo in October 2025 due to account activation requirements.

**Free Tier Limits**:
- 750 hours/month (sufficient for 24/7 with keep-alive)
- 100 GB bandwidth/month
- Cold start ~30-60 seconds when waking from sleep