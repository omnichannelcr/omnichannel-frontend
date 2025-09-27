# Omnichannel Application

A full-stack omnichannel communication platform built with Node.js, Express, Next.js, and PostgreSQL. This application enables seamless customer support across multiple communication channels including email, chat, phone, and SMS.

## 🏗️ Architecture

The application consists of three main services:
- **Backend**: Node.js/Express API server with TypeScript
- **Frontend**: Next.js React application
- **Database**: PostgreSQL database with Knex.js migrations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd omnichannel
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Copy environment template
cp packages/backend/env.example packages/backend/.env

# Edit the .env file with your configuration
```

4. **Start the application:**
```bash
# Start all services with Docker
npm run docker:up
```

5. **Access the application:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Database**: localhost:5432

## 📁 Project Structure

```
omnichannel/
├── packages/
│   ├── backend/                 # Node.js/Express API
│   │   ├── src/
│   │   │   ├── index.ts         # Server entry point
│   │   │   ├── middleware/      # Express middleware
│   │   │   └── routes/          # API routes
│   │   ├── database/            # Database configuration
│   │   │   ├── knexfile.ts      # Knex configuration
│   │   │   ├── connection.ts    # Database connection
│   │   │   ├── migrations/      # Database migrations
│   │   │   ├── seeds/           # Sample data
│   │   │   └── init/            # Database initialization
│   │   ├── Dockerfile           # Production Docker image
│   │   ├── Dockerfile.dev       # Development Docker image
│   │   └── package.json
│   └── web/                     # Next.js frontend
│       ├── src/
│       │   └── app/             # Next.js app directory
│       ├── Dockerfile           # Production Docker image
│       ├── Dockerfile.dev       # Development Docker image
│       └── package.json
├── docker-compose.yml           # Production services
├── docker-compose.dev.yml       # Development services
├── package.json                 # Root package configuration
├── DOCKER.md                    # Docker documentation
└── README.md                    # This file
```

## 🛠️ Development

### Local Development (without Docker)

1. **Start the database:**
```bash
# Using Docker for database only
docker-compose up database -d
```

2. **Start the backend:**
```bash
cd packages/backend
npm install
npm run dev
```

3. **Start the frontend:**
```bash
cd packages/web
npm install
npm run dev
```

### Docker Development

```bash
# Start development environment with hot reload
npm run docker:dev

# Stop development environment
npm run docker:dev:down
```

## 🗄️ Database

### Database Schema

The application includes the following main tables:
- **users**: User accounts (admin, agent, customer)
- **channels**: Communication channels (email, chat, phone, SMS)
- **conversations**: Customer support conversations
- **messages**: Individual messages within conversations

### Database Commands

```bash
# Run database migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Reset database (rollback + migrate + seed)
npm run db:reset
```

### Sample Data

The database includes sample data:
- **Admin user**: admin@omnichannel.com / password
- **Support agent**: agent@omnichannel.com / password
- **Sample customer**: customer@example.com / password

## 🐳 Docker

### Production Setup

```bash
# Build and start all services
npm run docker:build
npm run docker:up

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

### Development Setup

```bash
# Start development environment
npm run docker:dev

# Stop development environment
npm run docker:dev:down
```

### Database Access

```bash
# Connect to production database
docker-compose exec database psql -U omnichannel_user -d omnichannel

# Connect to development database
docker-compose -f docker-compose.dev.yml exec database psql -U omnichannel_user -d omnichannel_dev
```

For detailed Docker instructions, see [DOCKER.md](./DOCKER.md).

## 📊 API Endpoints

### Health Check
- `GET /health` - Server and database health status

### API Routes
- `GET /api` - Welcome message and API information

## 🔧 Environment Variables

### Backend Configuration

Create `packages/backend/.env`:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://omnichannel_user:omnichannel_password@localhost:5432/omnichannel_dev
DB_HOST=localhost
DB_PORT=5432
DB_NAME=omnichannel_dev
DB_USER=omnichannel_user
DB_PASSWORD=omnichannel_password

# JWT Configuration (for future auth implementation)
# JWT_SECRET=your-secret-key
# JWT_EXPIRES_IN=7d
```

### Frontend Configuration

Create `packages/web/.env.local`:

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Testing

```bash
# Run backend tests
cd packages/backend
npm test

# Run frontend tests
cd packages/web
npm test

# Run all tests
npm test
```

## 📝 Available Scripts

### Root Level

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both backend and frontend in development mode |
| `npm run build` | Build both backend and frontend |
| `npm run start` | Start both services in production mode |
| `npm run lint` | Run linting for all packages |
| `npm run docker:build` | Build all Docker images |
| `npm run docker:up` | Start all services in production mode |
| `npm run docker:down` | Stop all services |
| `npm run docker:logs` | View logs from all services |
| `npm run docker:dev` | Start development environment |
| `npm run docker:dev:down` | Stop development environment |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:reset` | Reset database (rollback + migrate + seed) |

### Backend Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Check TypeScript types |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run Docker container |

### Frontend Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build Next.js application |
| `npm start` | Start Next.js production server |
| `npm run lint` | Run ESLint |

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Input validation** and sanitization
- **Non-root Docker containers** in production
- **Environment variable** configuration
- **SQL injection** protection with parameterized queries

## 🚀 Deployment

### Production Deployment

1. **Build the application:**
```bash
npm run build
```

2. **Start production services:**
```bash
npm run docker:up
```

3. **Verify deployment:**
```bash
curl http://localhost:3001/health
```

### Environment Configuration

For production deployment, ensure you:
1. Set `NODE_ENV=production`
2. Use secure database credentials
3. Configure proper CORS origins
4. Set up SSL/TLS certificates
5. Configure reverse proxy (nginx/Apache)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Ensure all TypeScript types are correct
4. Write tests for new features
5. Update documentation as needed

## 📋 Features

### Current Features
- ✅ Multi-service Docker setup
- ✅ PostgreSQL database with migrations
- ✅ TypeScript backend with Express.js
- ✅ Next.js frontend with Tailwind CSS
- ✅ Health check endpoints
- ✅ Database connection pooling
- ✅ Graceful shutdown handling
- ✅ Environment configuration
- ✅ Development and production configurations

### Planned Features
- 🔄 User authentication and authorization
- 🔄 Real-time messaging with WebSockets
- 🔄 File upload and media sharing
- 🔄 Email integration
- 🔄 SMS integration
- 🔄 Phone call integration
- 🔄 Chat widget for websites
- 🔄 Analytics and reporting
- 🔄 Multi-tenant support
- 🔄 API rate limiting
- 🔄 Comprehensive testing suite

## 📞 Support

For support, email support@omnichannel.com or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js for the web framework
- Next.js for the React framework
- PostgreSQL for the database
- Docker for containerization
- TypeScript for type safety
