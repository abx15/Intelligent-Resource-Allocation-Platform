# 🚀 Setup Guide

## Prerequisites

Before setting up the Intelligent Resource Allocation Platform, ensure you have the following installed:

### Required Software

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **MongoDB** (v6.0 or higher)
- **Redis** (v7.0 or higher)
- **Git** (latest version)

### Optional Software

- **Docker** (v20.10 or higher) - For containerized setup
- **Docker Compose** (v2.0 or higher) - For multi-container setup
- **MongoDB Compass** - For database management
- **Redis Desktop Manager** - For Redis management

## Installation Methods

Choose one of the following installation methods:

### Method 1: Local Development Setup

#### Step 1: Clone the Repository

```bash
git clone https://github.com/username/intelligent-resource-allocation.git
cd intelligent-resource-allocation
```

#### Step 2: Install Dependencies

**Frontend Dependencies:**
```bash
cd client
npm install
# or
yarn install
```

**Backend Dependencies:**
```bash
cd ../server
npm install
# or
yarn install
```

#### Step 3: Set Up Environment Variables

**Client Environment (.env):**
```bash
cp client/.env.example client/.env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

**Server Environment (.env):**
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/allocai
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here

# External Services
OPENAI_API_KEY=your_openai_api_key_here

# Frontend URL
CLIENT_URL=http://localhost:5173

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

#### Step 4: Start Database Services

**Option A: Using Local Installation**

Start MongoDB:
```bash
# On macOS (using Homebrew)
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

Start Redis:
```bash
# On macOS (using Homebrew)
brew services start redis

# On Ubuntu/Debian
sudo systemctl start redis-server

# On Windows
redis-server
```

**Option B: Using Docker**

```bash
# Start MongoDB and Redis containers
docker run -d --name mongodb -p 27017:27017 mongo:6.0
docker run -d --name redis -p 6379:6379 redis:7.0-alpine
```

#### Step 5: Initialize Database

```bash
cd server
npm run seed
```

This will populate the database with sample data for testing.

#### Step 6: Start Development Servers

**Start Backend Server:**
```bash
cd server
npm run dev
```

**Start Frontend Server** (in a new terminal):
```bash
cd client
npm run dev
```

#### Step 7: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

### Method 2: Docker Setup (Recommended)

#### Step 1: Clone the Repository

```bash
git clone https://github.com/username/intelligent-resource-allocation.git
cd intelligent-resource-allocation
```

#### Step 2: Set Up Environment Variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit the environment files as described in Method 1.

#### Step 3: Build and Start Containers

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check container status
docker-compose ps
```

#### Step 4: Initialize Database

```bash
# Run database seeding
docker-compose exec server npm run seed
```

#### Step 5: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

### Method 3: Production Docker Setup

#### Step 1: Clone and Configure

```bash
git clone https://github.com/username/intelligent-resource-allocation.git
cd intelligent-resource-allocation
```

#### Step 2: Configure Production Environment

```bash
# Create production environment file
cp server/.env.example server/.env.production
cp client/.env.example client/.env.production
```

Edit `server/.env.production`:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/allocai_prod
REDIS_URL=redis://redis:6379
JWT_SECRET=your_production_jwt_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
OPENAI_API_KEY=your_production_openai_key
CLIENT_URL=https://your-domain.com
```

#### Step 3: Deploy with Docker Compose

```bash
# Use production compose file
docker-compose -f docker-compose.prod.yml up -d

# Initialize production database
docker-compose -f docker-compose.prod.yml exec server npm run seed
```

## Configuration Details

### Database Configuration

#### MongoDB Setup

**Local MongoDB Setup:**
```bash
# Create database user
mongo
use allocai
db.createUser({
  user: "allocai_user",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "allocai" }]
})
```

**MongoDB Atlas Setup (Cloud):**
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Update `MONGODB_URI` in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/allocai
```

#### Redis Setup

**Local Redis Setup:**
```bash
# Test Redis connection
redis-cli ping
# Should return: PONG
```

**Redis Cloud Setup:**
1. Create a Redis Cloud account
2. Create a new database
3. Get your connection string
4. Update `REDIS_URL` in `.env`:
```env
REDIS_URL=redis://username:password@host:port
```

### OpenAI API Setup

1. Create an OpenAI account at https://platform.openai.com
2. Navigate to API Keys section
3. Create a new API key
4. Add the key to your `.env` file:
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Email Configuration (Optional)

For email notifications, configure SMTP settings:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@your-domain.com
FROM_NAME=Intelligent Resource Allocation
```

**Gmail Setup:**
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `SMTP_PASS`

## Development Workflow

### Code Structure

```
intelligent-resource-allocation/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   └── store/         # State management
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Express middleware
│   └── package.json
└── docs/                  # Documentation
```

### Development Commands

**Frontend:**
```bash
cd client

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

**Backend:**
```bash
cd server

# Start development server
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Seed database
npm run seed

# Run tests
npm test

# Run linting
npm run lint
```

### Git Workflow

1. **Create feature branch:**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes and commit:**
```bash
git add .
git commit -m "feat: add your feature description"
```

3. **Push and create PR:**
```bash
git push origin feature/your-feature-name
```

### Code Quality

**Linting:**
- ESLint for JavaScript/TypeScript
- Prettier for code formatting
- Husky for pre-commit hooks

**Testing:**
- Unit tests with Jest
- Integration tests
- E2E tests with Playwright (planned)

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error:** `Error: listen EADDRINUSE :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

#### MongoDB Connection Failed

**Error:** `MongoNetworkError: failed to connect to server`

**Solution:**
1. Check if MongoDB is running:
```bash
brew services list | grep mongodb
# or
sudo systemctl status mongod
```

2. Start MongoDB service
3. Check connection string in `.env`
4. Verify firewall settings

#### Redis Connection Failed

**Error:** `Redis connection failed`

**Solution:**
1. Check if Redis is running:
```bash
redis-cli ping
```

2. Start Redis service
3. Check Redis URL in `.env`

#### OpenAI API Errors

**Error:** `Invalid API key`

**Solution:**
1. Verify OpenAI API key is correct
2. Check if key has credits
3. Ensure key is properly set in `.env`

#### Frontend Build Errors

**Error:** TypeScript compilation errors

**Solution:**
```bash
# Check TypeScript version
npx tsc --version

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for type errors
npx tsc --noEmit
```

### Performance Issues

#### Slow API Response

**Solutions:**
1. Check database indexes
2. Enable Redis caching
3. Monitor memory usage
4. Check for memory leaks

#### High Memory Usage

**Solutions:**
1. Monitor Node.js process memory
2. Check for memory leaks in services
3. Optimize database queries
4. Implement pagination

### Database Issues

#### MongoDB Slow Queries

**Solutions:**
1. Add appropriate indexes:
```javascript
// In MongoDB shell
db.employees.createIndex({ "department": 1, "availability": -1 })
db.projects.createIndex({ "status": 1, "priority": -1 })
db.allocations.createIndex({ "projectId": 1, "employeeId": 1 })
```

2. Use aggregation pipelines for complex queries
3. Implement query optimization

#### Redis Memory Issues

**Solutions:**
1. Set memory limits:
```bash
redis-cli config set maxmemory 256mb
redis-cli config set maxmemory-policy allkeys-lru
```

2. Monitor Redis memory usage
3. Implement key expiration

## Monitoring and Debugging

### Application Logs

**Development Logs:**
```bash
# Backend logs
cd server && npm run dev

# Frontend logs
cd client && npm run dev
```

**Production Logs:**
```bash
# Docker logs
docker-compose logs -f server
docker-compose logs -f client

# Application logs
tail -f server/logs/app.log
```

### Database Monitoring

**MongoDB Monitoring:**
```bash
# Connect to MongoDB shell
mongo

# Check database stats
db.stats()

# Check collection stats
db.employees.stats()

# Monitor slow queries
db.setProfilingLevel(2)
db.system.profile.find().limit(5).sort({ts:-1}).pretty()
```

**Redis Monitoring:**
```bash
# Redis info
redis-cli info

# Monitor memory
redis-cli info memory

# Monitor commands
redis-cli monitor
```

### Performance Monitoring

**Node.js Monitoring:**
```bash
# Check process memory
node --inspect server/src/index.ts

# Monitor with PM2
pm2 start server/dist/index.js --name "resource-allocation-api"
pm2 monit
```

## Security Considerations

### Environment Variables

- Never commit `.env` files to version control
- Use strong, unique secrets
- Rotate secrets regularly
- Use environment-specific configurations

### Database Security

- Use strong passwords for database users
- Enable authentication in MongoDB
- Use SSL/TLS for database connections
- Regular database backups

### API Security

- Implement rate limiting
- Validate all input data
- Use HTTPS in production
- Keep dependencies updated

## Next Steps

After successful setup:

1. **Explore the API**: Read the [API Documentation](./api-docs.md)
2. **Understand Architecture**: Review the [Architecture Guide](./architecture.md)
3. **Review Contributing Guidelines**: See [Contributing Guide](./contributing.md)
4. **Deploy to Production**: Follow the [Deployment Guide](./deployment.md)

## Support

If you encounter any issues:

1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Join our community discussions

---

For additional help, refer to the [main documentation](../README.md) or contact the development team.
