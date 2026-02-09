// MongoDB initialization script
db = db.getSiblingDB('allocai');

// Create application user
db.createUser({
  user: 'allocai_user',
  pwd: 'allocai_password',
  roles: [
    {
      role: 'readWrite',
      db: 'allocai'
    }
  ]
});

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'firstName', 'lastName', 'role'],
      properties: {
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        },
        firstName: {
          bsonType: 'string',
          minLength: 2
        },
        lastName: {
          bsonType: 'string',
          minLength: 2
        },
        role: {
          enum: ['admin', 'manager', 'employee']
        }
      }
    }
  }
});

db.createCollection('projects', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'status', 'priority'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 1
        },
        status: {
          enum: ['planning', 'active', 'completed', 'on-hold', 'cancelled']
        },
        priority: {
          enum: ['low', 'medium', 'high', 'critical']
        }
      }
    }
  }
});

db.createCollection('allocations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['projectId', 'employeeId', 'allocation'],
      properties: {
        projectId: {
          bsonType: 'objectId'
        },
        employeeId: {
          bsonType: 'objectId'
        },
        allocation: {
          bsonType: 'double',
          minimum: 0,
          maximum: 1
        }
      }
    }
  }
});

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ department: 1 });
db.users.createIndex({ skills: 1 });
db.users.createIndex({ availability: -1 });

db.projects.createIndex({ status: 1 });
db.projects.createIndex({ priority: -1 });
db.projects.createIndex({ startDate: 1 });
db.projects.createIndex({ department: 1 });

db.allocations.createIndex({ projectId: 1 });
db.allocations.createIndex({ employeeId: 1 });
db.allocations.createIndex({ startDate: 1, endDate: 1 });
db.allocations.createIndex({ projectId: 1, employeeId: 1 }, { unique: true });

print('Database initialized successfully');
