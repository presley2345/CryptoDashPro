# OrbitalPay - Crypto Trading Platform

## Overview

OrbitalPay is a full-stack cryptocurrency trading platform built with modern web technologies. It features a React frontend with a Node.js/Express backend, PostgreSQL database via Drizzle ORM, and integrates with Appwrite for authentication and file storage. The platform provides users with trading capabilities, account management, document verification, and real-time market data visualization.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack React Query for server state, React Context for auth
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Appwrite integration
- **File Storage**: Appwrite Storage for document uploads
- **API Design**: RESTful endpoints with proper error handling

### Database Design
The system uses PostgreSQL with the following main entities:
- **Users**: Core user information, financial data, and account tiers
- **Transactions**: Financial transactions (deposits, withdrawals, profits)
- **Notifications**: System notifications and alerts
- **Document Verifications**: KYC document storage and verification status
- **Payment Submissions**: Payment proof submissions
- **Market Data**: Real-time cryptocurrency market information

## Key Components

### Authentication System
- Appwrite-based authentication with email/password
- Role-based access control
- Session management with persistent login state
- Profile management with country/currency settings

### Trading Platform
- Real-time market data integration via TradingView widgets
- Market ticker with live price updates
- Multi-tier account system (Bronze, Silver, Gold, Platinum, Diamond)
- Financial portfolio tracking (invested, profit, bonus, balance)

### Document Management
- KYC document upload system
- Multi-file support for ID verification
- Document type validation
- Verification status tracking

### Payment System
- Cryptocurrency deposit address generation
- Payment screenshot upload functionality
- Transaction history tracking
- Withdrawal request system with authorization codes

### User Interface
- Dark theme optimized for trading
- Mobile-responsive design
- Professional trading interface
- Real-time notifications system

## Data Flow

### User Registration Flow
1. User submits registration form with personal details
2. Appwrite creates authentication account
3. User document created in PostgreSQL via Drizzle
4. Welcome notification generated
5. Email verification (if configured)

### Trading Flow
1. User accesses dashboard with real-time market data
2. TradingView widgets display live charts
3. Market ticker shows current prices
4. User financial data loaded from database
5. Transaction history displayed

### Document Verification Flow
1. User uploads ID documents via Appwrite Storage
2. Document metadata stored in PostgreSQL
3. Verification status tracked in database
4. Admin review process (external)
5. Status updates reflected in user interface

### Payment Flow
1. User requests deposit with amount
2. System generates unique Bitcoin address
3. User uploads payment screenshot
4. Payment submission recorded in database
5. Manual verification process initiated

## External Dependencies

### Core Dependencies
- **Appwrite**: Authentication, user management, and file storage
- **TradingView**: Real-time market data and charting widgets
- **Smartsupp**: Live chat customer support integration
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: PostgreSQL hosting (based on connection string)

### UI Dependencies
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **date-fns**: Date manipulation utilities

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESLint/Prettier**: Code formatting and linting

## Deployment Strategy

### Development Environment
- Vite dev server for frontend hot reloading
- Express server with middleware for API routes
- PostgreSQL database via environment variables
- Appwrite cloud integration

### Production Build
- Vite builds optimized React bundle
- ESBuild compiles server code for Node.js
- Static assets served from Express
- Database migrations via Drizzle Kit

### Environment Configuration
- Database connection via `DATABASE_URL`
- Appwrite configuration via environment variables
- Build-time optimization for production
- Docker-ready containerization support

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 04, 2025. Initial setup