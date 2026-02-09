# 🚀 Deployment Guide

## Overview

This guide covers deploying the Intelligent Resource Allocation Platform to various environments, from development to production. We'll cover Docker deployment, cloud deployment, and best practices for security and scalability.

## Deployment Options

### 1. Docker Deployment (Recommended)

#### Development Deployment

**Prerequisites:**
- Docker and Docker Compose installed
- Environment variables configured

**Steps:**

1. **Clone and Configure:**
```bash
git clone https://github.com/username/intelligent-resource-allocation.git
cd intelligent-resource-allocation

# Configure environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env
```

2. **Start Services:**
```bash
# Development deployment
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

3. **Initialize Database:**
```bash
docker-compose exec server npm run seed
```

**Access Points:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- Redis: localhost:6379

#### Production Deployment

1. **Production Environment Setup:**
```bash
# Create production environment files
cp server/.env.example server/.env.production
cp client/.env.example client/.env.production
```

2. **Configure Production Variables:**
```env
# server/.env.production
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/allocai_prod
REDIS_URL=redis://redis:6379
JWT_SECRET=your_production_jwt_secret_here
JWT_REFRESH_SECRET=your_production_refresh_secret_here
OPENAI_API_KEY=your_production_openai_key
CLIENT_URL=https://your-domain.com

# client/.env.production
VITE_API_URL=https://your-domain.com/api
VITE_SOCKET_URL=https://your-domain.com
```

3. **Deploy with Production Compose:**
```bash
docker-compose -f docker-compose.prod.yml up -d

# Initialize production database
docker-compose -f docker-compose.prod.yml exec server npm run seed
```

### 2. Cloud Deployment

#### AWS Deployment

**Prerequisites:**
- AWS account
- AWS CLI installed and configured
- Domain name (optional)

**Architecture:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AWS ECS       │    │   AWS RDS       │    │  AWS ElastiCache│
│   (Containers)  │    │   (MongoDB)     │    │   (Redis)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   AWS ALB       │
                    │   (Load Balancer)│
                    └─────────────────┘
                                 │
                         ┌─────────────────┐
                         │   CloudFront    │
                         │   (CDN)         │
                         └─────────────────┘
```

**Steps:**

1. **Create ECR Repository:**
```bash
# Create repository for backend
aws ecr create-repository --repository-name resource-allocation-api

# Create repository for frontend
aws ecr create-repository --repository-name resource-allocation-client
```

2. **Build and Push Images:**
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and push backend
docker build -t resource-allocation-api ./server
docker tag resource-allocation-api:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/resource-allocation-api:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/resource-allocation-api:latest

# Build and push frontend
docker build -t resource-allocation-client ./client
docker tag resource-allocation-client:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/resource-allocation-client:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/resource-allocation-client:latest
```

3. **Create ECS Task Definition:**
```json
{
  "family": "resource-allocation",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/resource-allocation-api:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "MONGODB_URI",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:<account-id>:secret:resource-allocation/mongodb-uri"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/resource-allocation",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

4. **Create ECS Service:**
```bash
aws ecs create-service \
  --cluster resource-allocation \
  --service-name api-service \
  --task-definition resource-allocation \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
```

#### Google Cloud Platform Deployment

**Prerequisites:**
- GCP account
- gcloud CLI installed and configured
- Google Cloud Build enabled

**Steps:**

1. **Enable Required APIs:**
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable sql-component.googleapis.com
gcloud services enable redis.googleapis.com
```

2. **Build and Deploy with Cloud Build:**
```yaml
# cloudbuild.yaml
steps:
  # Build backend image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/resource-allocation-api', './server']
  
  # Build frontend image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/resource-allocation-client', './client']
  
  # Push images
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/resource-allocation-api']
  
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/resource-allocation-client']
  
  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args: [
      'run', 'deploy', 'resource-allocation-api',
      '--image', 'gcr.io/$PROJECT_ID/resource-allocation-api',
      '--region', 'us-central1',
      '--platform', 'managed',
      '--allow-unauthenticated'
    ]

images:
  - 'gcr.io/$PROJECT_ID/resource-allocation-api'
  - 'gcr.io/$PROJECT_ID/resource-allocation-client'
```

3. **Deploy:**
```bash
gcloud builds submit --config cloudbuild.yaml
```

#### Azure Deployment

**Prerequisites:**
- Azure account
- Azure CLI installed and configured

**Steps:**

1. **Create Resource Group:**
```bash
az group create --name resource-allocation-rg --location eastus
```

2. **Create Container Registry:**
```bash
az acr create --resource-group resource-allocation-rg --name resourceallocationacr --sku Basic
```

3. **Build and Push Images:**
```bash
# Login to ACR
az acr login --name resourceallocationacr

# Build and push backend
docker build -t resourceallocationacr.azurecr.io/resource-allocation-api ./server
docker push resourceallocationacr.azurecr.io/resource-allocation-api

# Build and push frontend
docker build -t resourceallocationacr.azurecr.io/resource-allocation-client ./client
docker push resourceallocationacr.azurecr.io/resource-allocation-client
```

4. **Deploy to Container Instances:**
```bash
az container create \
  --resource-group resource-allocation-rg \
  --name resource-allocation-api \
  --image resourceallocationacr.azurecr.io/resource-allocation-api \
  --cpu 1 \
  --memory 2 \
  --ports 5000 \
  --environment-variables NODE_ENV=production
```

### 3. Kubernetes Deployment

#### Prerequisites
- Kubernetes cluster (minikube for local, cloud provider for production)
- kubectl configured
- Helm installed (optional)

#### Deployment Manifests

**Namespace:**
```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: resource-allocation
```

**ConfigMap:**
```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: resource-allocation-config
  namespace: resource-allocation
data:
  NODE_ENV: "production"
  PORT: "5000"
  CLIENT_URL: "https://your-domain.com"
```

**Secret:**
```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: resource-allocation-secrets
  namespace: resource-allocation
type: Opaque
data:
  mongodb-uri: <base64-encoded-mongodb-uri>
  jwt-secret: <base64-encoded-jwt-secret>
  openai-api-key: <base64-encoded-openai-key>
```

**Backend Deployment:**
```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: resource-allocation-api
  namespace: resource-allocation
spec:
  replicas: 3
  selector:
    matchLabels:
      app: resource-allocation-api
  template:
    metadata:
      labels:
        app: resource-allocation-api
    spec:
      containers:
      - name: api
        image: your-registry/resource-allocation-api:latest
        ports:
        - containerPort: 5000
        envFrom:
        - configMapRef:
            name: resource-allocation-config
        - secretRef:
            name: resource-allocation-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 5000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 5
```

**Service:**
```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: resource-allocation-api-service
  namespace: resource-allocation
spec:
  selector:
    app: resource-allocation-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 5000
  type: ClusterIP
```

**Ingress:**
```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: resource-allocation-ingress
  namespace: resource-allocation
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - your-domain.com
    secretName: resource-allocation-tls
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: resource-allocation-api-service
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: resource-allocation-client-service
            port:
              number: 80
```

**Deploy to Kubernetes:**
```bash
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

## Database Deployment

### MongoDB

#### MongoDB Atlas (Recommended for Production)

1. **Create Cluster:**
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a new cluster
   - Choose cluster tier and region

2. **Configure Security:**
   - Add IP whitelist (0.0.0.0/0 for cloud deployment)
   - Create database user
   - Enable authentication

3. **Get Connection String:**
   - Go to Cluster → Connect
   - Select "Connect your application"
   - Copy connection string

4. **Update Environment:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/allocai_prod
```

#### Self-Hosted MongoDB

**Docker Compose:**
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6.0
    container_name: resource-allocation-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secure_password
      MONGO_INITDB_DATABASE: allocai_prod
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    ports:
      - "27017:27017"
    networks:
      - resource-allocation-network

volumes:
  mongodb_data:
    driver: local

networks:
  resource-allocation-network:
    driver: bridge
```

### Redis

#### Redis Cloud (Recommended for Production)

1. **Create Redis Account:**
   - Sign up at https://redis.com/cloud
   - Create a new database
   - Choose subscription plan

2. **Get Connection String:**
   - Copy connection string from dashboard
   - Update environment variables

#### Self-Hosted Redis

**Docker Compose:**
```yaml
version: '3.8'
services:
  redis:
    image: redis:7.0-alpine
    container_name: resource-allocation-redis
    restart: unless-stopped
    command: redis-server --requirepass secure_password
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - resource-allocation-network

volumes:
  redis_data:
    driver: local

networks:
  resource-allocation-network:
    driver: bridge
```

## SSL/TLS Configuration

### Let's Encrypt with Certbot

**For Ubuntu/Debian:**
```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d api.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare SSL

1. **Sign up for Cloudflare**
2. **Add your domain**
3. **Change nameservers to Cloudflare**
4. **Enable SSL/TLS in Cloudflare dashboard**
5. **Set SSL/TLS encryption mode to "Full"**

## Monitoring and Logging

### Application Monitoring

#### Prometheus and Grafana

**docker-compose.monitoring.yml:**
```yaml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources

volumes:
  prometheus_data:
  grafana_data:
```

**prometheus.yml:**
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'resource-allocation-api'
    static_configs:
      - targets: ['api:5000']
    metrics_path: '/metrics'
```

### Log Management

#### ELK Stack

**docker-compose.logging.yml:**
```yaml
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.5.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf

  kibana:
    image: docker.elastic.co/kibana/kibana:8.5.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200

volumes:
  elasticsearch_data:
```

## Performance Optimization

### Database Optimization

#### MongoDB Indexing

```javascript
// Connect to MongoDB
mongo allocai_prod

// Create indexes for better performance
db.employees.createIndex({ "department": 1, "availability": -1 })
db.projects.createIndex({ "status": 1, "priority": -1, "startDate": 1 })
db.allocations.createIndex({ "projectId": 1, "employeeId": 1 })
db.allocations.createIndex({ "startDate": 1, "endDate": 1 })

// Check index usage
db.employees.getIndexes()
db.employees.explain("executionStats").find({ department: "Engineering" })
```

#### Redis Optimization

```bash
# Set memory limits
redis-cli config set maxmemory 256mb
redis-cli config set maxmemory-policy allkeys-lru

# Monitor Redis
redis-cli info memory
redis-cli info stats
```

### Application Optimization

#### Node.js Performance

```javascript
// server/src/performance.ts
import cluster from 'cluster';
import os from 'os';

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Worker processes
  require('./index');
  console.log(`Worker ${process.pid} started`);
}
```

#### Caching Strategy

```javascript
// server/src/middleware/cache.ts
import Redis from 'redis';

const redis = Redis.createClient(process.env.REDIS_URL);

export const cacheMiddleware = (duration: number = 300) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await redis.get(key);
      
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      // Override res.json to cache response
      const originalJson = res.json;
      res.json = function(data) {
        redis.setex(key, duration, JSON.stringify(data));
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};
```

## Security Best Practices

### Environment Security

1. **Use Secrets Management:**
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Secret Manager
   - HashiCorp Vault

2. **Secure Environment Variables:**
```bash
# Use encrypted secrets
echo "your_secret" | gcloud secrets create jwt-secret --data-file=-

# Access in application
const secret = await accessSecretVersion('jwt-secret');
```

### Network Security

1. **Firewall Configuration:**
```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 5000/tcp  # Deny direct API access
sudo ufw enable
```

2. **VPN for Database Access:**
   - Use AWS VPC
   - Azure VNet
   - Google Cloud VPC

### Application Security

1. **Rate Limiting:**
```javascript
// server/src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // stricter limit for AI endpoints
  message: 'Too many AI requests'
});
```

2. **Input Validation:**
```javascript
// server/src/middleware/validation.ts
import { z } from 'zod';

export const employeeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  department: z.string(),
  skills: z.array(z.string())
});

export const validateEmployee = (req: Request, res: Response, next: NextFunction) => {
  try {
    employeeSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
```

## Backup and Recovery

### Database Backups

#### MongoDB Backups

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
DB_NAME="allocai_prod"

# Create backup
mongodump --host localhost:27017 --db $DB_NAME --out $BACKUP_DIR/$DATE

# Compress backup
tar -czf $BACKUP_DIR/mongodb_backup_$DATE.tar.gz -C $BACKUP_DIR $DATE

# Remove uncompressed backup
rm -rf $BACKUP_DIR/$DATE

# Keep only last 7 days
find $BACKUP_DIR -name "mongodb_backup_*.tar.gz" -mtime +7 -delete

# Upload to cloud storage (optional)
aws s3 cp $BACKUP_DIR/mongodb_backup_$DATE.tar.gz s3://your-backup-bucket/
```

#### Redis Backups

```bash
# Redis backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/redis"

# Create Redis backup
redis-cli --rdb $BACKUP_DIR/redis_backup_$DATE.rdb

# Compress backup
gzip $BACKUP_DIR/redis_backup_$DATE.rdb

# Upload to cloud storage
aws s3 cp $BACKUP_DIR/redis_backup_$DATE.rdb.gz s3://your-backup-bucket/
```

### Disaster Recovery

1. **Multi-Region Deployment:**
   - Deploy to multiple AWS regions
   - Use Route 53 for failover
   - Database replication

2. **Recovery Procedures:**
```bash
# Restore MongoDB
mongorestore --host localhost:27017 --db allocai_prod /backups/mongodb/20240120_120000/allocai_prod

# Restore Redis
redis-cli --rdb /backups/redis/redis_backup_20240120_120000.rdb
```

## CI/CD Pipeline

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: |
          docker build -t your-registry/resource-allocation-api ./server
          docker build -t your-registry/resource-allocation-client ./client
      - name: Push to registry
        run: |
          docker push your-registry/resource-allocation-api
          docker push your-registry/resource-allocation-client

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          # SSH into production server
          # Pull latest images
          # Restart services
          # Run health checks
```

## Troubleshooting

### Common Deployment Issues

#### Container Won't Start

**Symptoms:** Container exits immediately

**Solutions:**
```bash
# Check container logs
docker logs container-name

# Check container status
docker ps -a

# Debug with interactive shell
docker run -it --entrypoint /bin/sh your-image

# Check resource limits
docker stats
```

#### Database Connection Issues

**Symptoms:** Application can't connect to database

**Solutions:**
```bash
# Test database connectivity
docker exec -it mongodb-container mongo --eval "db.adminCommand('ismaster')"

# Check network connectivity
docker network ls
docker network inspect network-name

# Verify environment variables
docker exec -it api-container env | grep MONGODB
```

#### Performance Issues

**Symptoms:** Slow response times

**Solutions:**
```bash
# Monitor resource usage
docker stats
top
htop

# Check database performance
db.serverStatus()
db.stats()

# Profile slow queries
db.setProfilingLevel(2)
db.system.profile.find().sort({ts: -1}).limit(5)
```

## Maintenance

### Regular Tasks

1. **Daily:**
   - Check application health
   - Monitor error logs
   - Verify backups

2. **Weekly:**
   - Update dependencies
   - Review security patches
   - Clean up old logs

3. **Monthly:**
   - Database maintenance
   - Performance tuning
   - Security audit

### Update Procedures

1. **Application Updates:**
```bash
# Pull latest code
git pull origin main

# Build new images
docker-compose build

# Restart services
docker-compose up -d

# Run database migrations
docker-compose exec server npm run migrate
```

2. **Database Updates:**
```bash
# Create backup before update
mongodump --host localhost:27017 --db allocai_prod --out /backups/pre-update

# Run migrations
npm run migrate

# Verify data integrity
npm run verify
```

---

For additional deployment support, refer to the [Setup Guide](./setup-guide.md) or contact the development team.
