# 📚 API Documentation

## Overview

The Intelligent Resource Allocation Platform provides a comprehensive RESTful API for managing resources, projects, allocations, and AI-powered optimizations. This document covers all available endpoints, authentication methods, request/response formats, and error handling.

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

### JWT Authentication

The API uses JSON Web Tokens (JWT) for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Types

1. **Access Token**: Short-lived (15 minutes) for API requests
2. **Refresh Token**: Long-lived (7 days) for obtaining new access tokens

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64a1b2c3d4e5f6789012345",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "employee",
      "department": "Engineering",
      "skills": ["JavaScript", "React", "Node.js"],
      "availability": 0.8,
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Register
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "employee",
  "department": "Design",
  "skills": ["UI/UX", "Figma", "Adobe XD"]
}
```

#### Refresh Token
```http
POST /api/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout
```http
POST /api/auth/logout
```

**Headers:** `Authorization: Bearer <token>`

## API Endpoints

### Employees

#### Get All Employees
```http
GET /api/employees
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `department` (string): Filter by department
- `skills` (string): Filter by skills (comma-separated)
- `availability` (number): Minimum availability (0-1)

**Response:**
```json
{
  "success": true,
  "data": {
    "employees": [
      {
        "id": "64a1b2c3d4e5f6789012345",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "employee",
        "department": "Engineering",
        "skills": ["JavaScript", "React", "Node.js"],
        "availability": 0.8,
        "currentProjects": 2,
        "totalHours": 40,
        "utilizationRate": 0.75,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-20T14:22:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### Get Employee by ID
```http
GET /api/employees/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6789012345",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "employee",
    "department": "Engineering",
    "skills": ["JavaScript", "React", "Node.js"],
    "availability": 0.8,
    "currentProjects": [
      {
        "id": "64a1b2c3d4e5f6789012346",
        "name": "Website Redesign",
        "role": "Frontend Developer",
        "allocation": 0.6,
        "startDate": "2024-01-15",
        "endDate": "2024-03-15"
      }
    ],
    "performanceMetrics": {
      "utilizationRate": 0.75,
      "taskCompletionRate": 0.92,
      "averageTaskDuration": "2.5 days",
      "satisfactionScore": 4.5
    }
  }
}
```

#### Create Employee
```http
POST /api/employees
```

**Request Body:**
```json
{
  "email": "newemployee@example.com",
  "password": "password123",
  "firstName": "Alice",
  "lastName": "Johnson",
  "role": "employee",
  "department": "Engineering",
  "skills": ["Python", "Django", "PostgreSQL"],
  "maxHours": 40,
  "costPerHour": 75
}
```

#### Update Employee
```http
PUT /api/employees/:id
```

**Request Body:**
```json
{
  "firstName": "Alice",
  "lastName": "Johnson-Smith",
  "skills": ["Python", "Django", "PostgreSQL", "Redis"],
  "availability": 0.9
}
```

#### Delete Employee
```http
DELETE /api/employees/:id
```

### Projects

#### Get All Projects
```http
GET /api/projects
```

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by status (planning, active, completed, on-hold)
- `priority` (string): Filter by priority (low, medium, high, critical)
- `department` (string): Filter by department

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "64a1b2c3d4e5f6789012346",
        "name": "Website Redesign",
        "description": "Complete redesign of company website",
        "status": "active",
        "priority": "high",
        "department": "Engineering",
        "startDate": "2024-01-15",
        "endDate": "2024-03-15",
        "budget": 50000,
        "progress": 0.65,
        "teamSize": 5,
        "requiredSkills": ["React", "Node.js", "UI/UX"],
        "allocatedResources": [
          {
            "employeeId": "64a1b2c3d4e5f6789012345",
            "name": "John Doe",
            "role": "Frontend Developer",
            "allocation": 0.6
          }
        ],
        "createdAt": "2024-01-10T09:00:00.000Z",
        "updatedAt": "2024-01-20T16:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "pages": 2
    }
  }
}
```

#### Get Project by ID
```http
GET /api/projects/:id
```

#### Create Project
```http
POST /api/projects
```

**Request Body:**
```json
{
  "name": "Mobile App Development",
  "description": "Develop native mobile app for iOS and Android",
  "status": "planning",
  "priority": "high",
  "department": "Engineering",
  "startDate": "2024-02-01",
  "endDate": "2024-06-30",
  "budget": 120000,
  "requiredSkills": ["React Native", "TypeScript", "Node.js"],
  "estimatedHours": 2000
}
```

#### Update Project
```http
PUT /api/projects/:id
```

#### Delete Project
```http
DELETE /api/projects/:id
```

### Allocations

#### Get All Allocations
```http
GET /api/allocations
```

**Query Parameters:**
- `projectId` (string): Filter by project ID
- `employeeId` (string): Filter by employee ID
- `startDate` (string): Filter by start date (YYYY-MM-DD)
- `endDate` (string): Filter by end date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "data": {
    "allocations": [
      {
        "id": "64a1b2c3d4e5f6789012347",
        "projectId": "64a1b2c3d4e5f6789012346",
        "projectName": "Website Redesign",
        "employeeId": "64a1b2c3d4e5f6789012345",
        "employeeName": "John Doe",
        "role": "Frontend Developer",
        "allocation": 0.6,
        "startDate": "2024-01-15",
        "endDate": "2024-03-15",
        "status": "active",
        "utilizationRate": 0.75,
        "performanceScore": 4.2,
        "createdAt": "2024-01-15T10:00:00.000Z"
      }
    ]
  }
}
```

#### Create Allocation
```http
POST /api/allocations
```

**Request Body:**
```json
{
  "projectId": "64a1b2c3d4e5f6789012346",
  "employeeId": "64a1b2c3d4e5f6789012345",
  "role": "Frontend Developer",
  "allocation": 0.6,
  "startDate": "2024-01-15",
  "endDate": "2024-03-15"
}
```

#### Update Allocation
```http
PUT /api/allocations/:id
```

#### Delete Allocation
```http
DELETE /api/allocations/:id
```

### AI & Analytics

#### Get AI Recommendations
```http
POST /api/ai/recommendations
```

**Request Body:**
```json
{
  "type": "resource_allocation",
  "projectId": "64a1b2c3d4e5f6789012346",
  "requirements": {
    "skills": ["React", "Node.js"],
    "experience": "intermediate",
    "availability": 0.5,
    "budget": 30000
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "employeeId": "64a1b2c3d4e5f6789012345",
        "name": "John Doe",
        "matchScore": 0.92,
        "skills": ["React", "Node.js", "TypeScript"],
        "availability": 0.8,
        "costPerHour": 75,
        "estimatedContribution": 0.85,
        "reasons": [
          "Strong React and Node.js skills",
          "High availability (80%)",
          "Previous similar project experience"
        ]
      }
    ],
    "optimizationScore": 0.88,
    "totalCost": 45000,
    "estimatedDuration": "8 weeks"
  }
}
```

#### Optimize Resource Allocation
```http
POST /api/ai/optimize
```

**Request Body:**
```json
{
  "projectId": "64a1b2c3d4e5f6789012346",
  "constraints": {
    "budget": 50000,
    "timeline": "12 weeks",
    "maxTeamSize": 8,
    "requiredSkills": ["React", "Node.js", "UI/UX"]
  },
  "objectives": ["minimize_cost", "maximize_quality", "minimize_timeline"]
}
```

#### Get Analytics Dashboard
```http
GET /api/analytics/dashboard
```

**Query Parameters:**
- `timeRange` (string): 7d, 30d, 90d, 1y
- `department` (string): Filter by department

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalEmployees": 45,
      "activeProjects": 12,
      "averageUtilization": 0.78,
      "totalBudget": 250000,
      "budgetUtilization": 0.65
    },
    "utilizationTrend": [
      { "date": "2024-01-01", "value": 0.72 },
      { "date": "2024-01-02", "value": 0.75 },
      { "date": "2024-01-03", "value": 0.78 }
    ],
    "departmentPerformance": [
      {
        "department": "Engineering",
        "utilization": 0.82,
        "projectCount": 8,
        "budgetUtilization": 0.71
      }
    ],
    "skillGaps": [
      {
        "skill": "DevOps",
        "demand": 5,
        "available": 2,
        "gap": 3
      }
    ]
  }
}
```

#### Get Resource Utilization Report
```http
GET /api/analytics/utilization
```

#### Get Project Performance Metrics
```http
GET /api/analytics/projects/:id/performance
```

### Real-time Events

#### WebSocket Connection

Connect to WebSocket for real-time updates:

```javascript
const socket = io('http://localhost:5000', {
  auth: {
    token: 'your-jwt-token'
  }
});
```

#### Events

**allocation_updated**
```json
{
  "type": "allocation_updated",
  "data": {
    "allocationId": "64a1b2c3d4e5f6789012347",
    "employeeId": "64a1b2c3d4e5f6789012345",
    "projectId": "64a1b2c3d4e5f6789012346",
    "changes": {
      "allocation": 0.6,
      "status": "active"
    },
    "timestamp": "2024-01-20T10:30:00.000Z"
  }
}
```

**project_status_changed**
```json
{
  "type": "project_status_changed",
  "data": {
    "projectId": "64a1b2c3d4e5f6789012346",
    "oldStatus": "planning",
    "newStatus": "active",
    "timestamp": "2024-01-20T10:30:00.000Z"
  }
}
```

**ai_recommendation_ready**
```json
{
  "type": "ai_recommendation_ready",
  "data": {
    "requestId": "req_123456",
    "recommendations": [...],
    "timestamp": "2024-01-20T10:30:00.000Z"
  }
}
```

## Error Handling

### Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ],
    "timestamp": "2024-01-20T10:30:00.000Z",
    "requestId": "req_123456"
  }
}
```

### HTTP Status Codes

| Status Code | Meaning | Description |
|-------------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict |
| 422 | Unprocessable Entity | Validation errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

### Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| AUTHENTICATION_FAILED | 401 | Invalid credentials |
| AUTHORIZATION_FAILED | 403 | Insufficient permissions |
| RESOURCE_NOT_FOUND | 404 | Resource does not exist |
| DUPLICATE_RESOURCE | 409 | Resource already exists |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Internal server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Standard endpoints**: 100 requests per minute
- **AI endpoints**: 20 requests per minute
- **WebSocket connections**: 10 connections per minute

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642694400
```

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)

**Response Headers:**
```
X-Total-Count: 250
X-Page-Count: 25
X-Current-Page: 1
```

## Filtering & Sorting

### Filtering

Most list endpoints support filtering:

```
GET /api/employees?department=Engineering&skills=React,Node.js&availability=0.5
```

### Sorting

Add `sort` parameter for sorting:

```
GET /api/employees?sort=firstName:asc,lastName:desc
```

**Supported sort fields:**
- Employees: `firstName`, `lastName`, `email`, `availability`, `createdAt`
- Projects: `name`, `status`, `priority`, `startDate`, `endDate`
- Allocations: `startDate`, `endDate`, `allocation`, `createdAt`

## SDK Examples

### JavaScript/TypeScript

```typescript
import axios from 'axios';

class ResourceAllocationAPI {
  private baseURL: string;
  private token: string;

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getEmployees(params?: {
    page?: number;
    limit?: number;
    department?: string;
    skills?: string;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/employees?${query}`);
  }

  async createEmployee(data: {
    email: string;
    firstName: string;
    lastName: string;
    department: string;
    skills: string[];
  }) {
    return this.request('/employees', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAIRecommendations(projectId: string, requirements: any) {
    return this.request('/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify({
        type: 'resource_allocation',
        projectId,
        requirements,
      }),
    });
  }
}

// Usage
const api = new ResourceAllocationAPI('http://localhost:5000/api', 'your-token');
const employees = await api.getEmployees({ department: 'Engineering' });
```

### Python

```python
import requests
from typing import Optional, Dict, Any

class ResourceAllocationAPI:
    def __init__(self, base_url: str, token: str):
        self.base_url = base_url
        self.token = token
        self.headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        }

    def _request(self, endpoint: str, method: str = 'GET', data: Optional[Dict] = None) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"
        
        if method == 'GET':
            response = requests.get(url, headers=self.headers, params=data)
        elif method == 'POST':
            response = requests.post(url, headers=self.headers, json=data)
        elif method == 'PUT':
            response = requests.put(url, headers=self.headers, json=data)
        elif method == 'DELETE':
            response = requests.delete(url, headers=self.headers)
        
        response.raise_for_status()
        return response.json()

    def get_employees(self, **params):
        return self._request('/employees', params=params)

    def create_employee(self, data):
        return self._request('/employees', method='POST', data=data)

    def get_ai_recommendations(self, project_id: str, requirements: Dict):
        data = {
            'type': 'resource_allocation',
            'projectId': project_id,
            'requirements': requirements
        }
        return self._request('/ai/recommendations', method='POST', data=data)

# Usage
api = ResourceAllocationAPI('http://localhost:5000/api', 'your-token')
employees = api.get_employees(department='Engineering')
```

## Testing

### Postman Collection

A Postman collection is available with all API endpoints pre-configured:

[Download Postman Collection](./postman-collection.json)

### API Testing Examples

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get employees
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Project","description":"Project description","status":"planning"}'
```

## Changelog

### v1.0.0 (2024-01-20)
- Initial API release
- Authentication endpoints
- Employee and project management
- Resource allocation
- AI-powered recommendations
- Real-time WebSocket events
- Analytics and reporting

---

For additional support or questions, please refer to the [main documentation](../README.md) or open an issue on GitHub.
