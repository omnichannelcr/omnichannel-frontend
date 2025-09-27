# Omnichannel Backend

A Node.js backend server built with Express.js and TypeScript for the omnichannel application.

## Features

- ✅ Express.js server with TypeScript
- ✅ CORS enabled for frontend integration
- ✅ Security middleware (Helmet)
- ✅ Request compression
- ✅ Request logging
- ✅ Error handling middleware
- ✅ Health check endpoint
- ✅ Environment variable configuration
- ✅ ESLint configuration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env
```

3. Update `.env` file with your configuration

### Development

Start the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

### Production

Build and start the production server:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Routes
- `GET /api` - Welcome message and API info

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Check TypeScript types

## Project Structure

```
src/
├── index.ts              # Server entry point
├── middleware/
│   ├── errorHandler.ts   # Error handling middleware
│   └── logger.ts         # Request logging middleware
└── routes/
    └── index.ts          # API routes
```

## Environment Variables

See `env.example` for all available environment variables.

## Docker

### Development
```bash
npm run docker:dev
```

### Production
```bash
npm run docker:build
npm run docker:run
```

See the main [DOCKER.md](../../DOCKER.md) file for complete Docker setup instructions.

## Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Ensure all TypeScript types are correct with `npm run type-check`
