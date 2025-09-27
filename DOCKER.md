# Docker Setup for Omnichannel

This document describes the Docker setup for the omnichannel application, which includes both backend (Node.js/Express) and frontend (Next.js) services.

## 🏗️ Architecture

The application consists of three main services:
- **Backend**: Node.js/Express API server (port 3001)
- **Web**: Next.js frontend application (port 3000)
- **Database**: PostgreSQL database server (port 5432)

## 📁 Docker Files Structure

```
omnichannel/
├── docker-compose.yml          # Production setup
├── docker-compose.dev.yml      # Development setup
├── package.json                # Root package with Docker scripts
├── packages/
│   ├── backend/
│   │   ├── Dockerfile          # Production backend image
│   │   ├── Dockerfile.dev      # Development backend image
│   │   └── .dockerignore
│   └── web/
│       ├── Dockerfile          # Production web image
│       ├── Dockerfile.dev      # Development web image
│       └── .dockerignore
```

## 🚀 Quick Start

### Production Setup

1. **Build and start all services:**
```bash
npm run docker:build
npm run docker:up
```

2. **Access the applications:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Backend Health: http://localhost:3001/health
- Database: localhost:5432 (user: omnichannel_user, db: omnichannel)

3. **Stop all services:**
```bash
npm run docker:down
```

### Development Setup

1. **Start development environment with hot reload:**
```bash
npm run docker:dev
```

2. **Stop development environment:**
```bash
npm run docker:dev:down
```

## 🛠️ Available Scripts

### Root Level Scripts

| Script | Description |
|--------|-------------|
| `npm run docker:build` | Build all Docker images |
| `npm run docker:up` | Start all services in production mode |
| `npm run docker:down` | Stop all services |
| `npm run docker:logs` | View logs from all services |
| `npm run docker:dev` | Start development environment |
| `npm run docker:dev:down` | Stop development environment |
| `npm run docker:clean` | Clean up containers and images |

### Individual Service Scripts

#### Backend (packages/backend)
```bash
npm run docker:build    # Build backend image
npm run docker:run      # Run backend container
npm run docker:dev      # Run backend in development mode
```

#### Web (packages/web)
```bash
npm run docker:build    # Build web image
npm run docker:run      # Run web container
npm run docker:dev      # Run web in development mode
```

## 🔧 Docker Compose Configurations

### Production (docker-compose.yml)

- **Multi-stage builds** for optimized images
- **Health checks** for both services
- **Non-root users** for security
- **Volume mounts** for logs
- **Network isolation** between services
- **Automatic restarts** unless manually stopped

### Development (docker-compose.dev.yml)

- **Volume mounts** for live code reloading
- **Development dependencies** included
- **Hot reload** enabled
- **Faster builds** with dev-specific Dockerfiles

## 🏥 Health Checks

Both services include health checks:

- **Backend**: `GET /health` endpoint
- **Web**: HTTP check on port 3000

Health check status can be monitored with:
```bash
docker-compose ps
```

## 📊 Monitoring and Logs

### View logs
```bash
# All services
npm run docker:logs

# Specific service
docker-compose logs -f backend
docker-compose logs -f web
```

### Check service status
```bash
docker-compose ps
```

### Access running containers
```bash
# Backend container
docker-compose exec backend sh

# Web container
docker-compose exec web sh
```

## 🔒 Security Features

- **Non-root users** in production containers
- **Minimal base images** (Alpine Linux)
- **Multi-stage builds** to reduce attack surface
- **Security headers** via Helmet middleware
- **CORS configuration** for cross-origin requests

## 🌍 Environment Variables

### Backend Environment Variables

Create `packages/backend/.env`:
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://omnichannel_user:omnichannel_password@database:5432/omnichannel
DB_HOST=database
DB_PORT=5432
DB_NAME=omnichannel
DB_USER=omnichannel_user
DB_PASSWORD=omnichannel_password
```

### Web Environment Variables

Create `packages/web/.env.local`:
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧹 Cleanup

### Remove all containers and volumes
```bash
npm run docker:clean
```

### Remove specific images
```bash
docker rmi omnichannel-backend
docker rmi omnichannel-web
```

### Clean up Docker system
```bash
docker system prune -a
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 3001 are not in use
2. **Permission issues**: On Linux/macOS, ensure Docker has proper permissions
3. **Build failures**: Check that all dependencies are properly installed

### Debug Commands

```bash
# Check container logs
docker-compose logs backend
docker-compose logs web

# Check container status
docker-compose ps

# Inspect container
docker-compose exec backend sh
```

### Reset Everything

```bash
# Stop and remove all containers, networks, and volumes
docker-compose down -v

# Remove all images
docker rmi $(docker images -q)

# Clean up system
docker system prune -a
```

## 📈 Performance Tips

1. **Use .dockerignore** files to exclude unnecessary files
2. **Multi-stage builds** reduce final image size
3. **Alpine Linux** base images are smaller and more secure
4. **Layer caching** is optimized in the Dockerfiles
5. **Development volumes** improve hot reload performance

## 🔄 CI/CD Integration

The Docker setup is ready for CI/CD integration:

```yaml
# Example GitHub Actions step
- name: Build and test
  run: |
    npm run docker:build
    npm run docker:up
    # Run tests here
    npm run docker:down
```
