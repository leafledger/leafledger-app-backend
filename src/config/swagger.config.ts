import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerPaths } from './swagger.paths';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LeafLedger API Documentation',
      version: '1.0.0',
      description:
        'REST API documentation for LeafLedger backend - A comprehensive platform for managing vendor operations, authentication, and catalog services',
      contact: {
        name: 'LeafLedger Team',
        email: 'support@leafledger.com',
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
      {
        url: process.env.API_BASE_URL || 'http://localhost:8000',
        description: 'Production server',
      },
    ],
    paths: swaggerPaths,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>',
        },
      },
      schemas: {
        // Province Schema
        Province: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              maxLength: 2,
              description: 'Province/Territory code',
              enum: [
                'AB',
                'BC',
                'MB',
                'NB',
                'NL',
                'NS',
                'ON',
                'PE',
                'QC',
                'SK',
                'NT',
                'NU',
                'YT',
              ],
              example: 'ON',
            },
            name: {
              type: 'string',
              description: 'Full province/territory name',
              example: 'Ontario',
            },
          },
        },

        // User Schema
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique user identifier',
            },
            user_name: {
              type: 'string',
              maxLength: 50,
              description: 'Unique username',
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 250,
              description: 'User email address',
            },
            name: {
              type: 'string',
              maxLength: 100,
              description: 'Full name of the user',
            },
            contact_no: {
              type: 'string',
              maxLength: 13,
              description: 'Contact number',
            },
            store: {
              type: 'string',
              maxLength: 100,
              description: 'Store name',
            },
            province_id: {
              type: 'string',
              maxLength: 3,
              description:
                'Province/Territory code (AB, BC, MB, NB, NL, NS, ON, PE, QC, SK, NT, NU, YT)',
              enum: [
                'AB',
                'BC',
                'MB',
                'NB',
                'NL',
                'NS',
                'ON',
                'PE',
                'QC',
                'SK',
                'NT',
                'NU',
                'YT',
              ],
            },
            city: {
              type: 'string',
              maxLength: 50,
              description: 'City name',
            },
            vendor_type: {
              type: 'string',
              enum: ['retailer', 'LP', 'broker', 'agency'],
              description: 'Type of vendor',
            },
            address: {
              type: 'string',
              maxLength: 250,
              description: 'Physical address',
            },
          },
        },

        // Signup DTO Schema
        SignupDto: {
          type: 'object',
          required: ['user_name', 'email', 'password', 'contact_no'],
          properties: {
            user_name: {
              type: 'string',
              maxLength: 50,
              example: 'john_doe',
              description: 'Unique username (required)',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
              description: 'Valid email address (required)',
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 8,
              example: 'SecureP@ss123',
              description: 'Strong password (required)',
            },
            contact_no: {
              type: 'string',
              example: '+1234567890',
              description: 'Contact number (required)',
            },
            name: {
              type: 'string',
              example: 'John Doe',
              description: 'Full name',
            },
            store: {
              type: 'string',
              example: "Doe's Store",
              description: 'Store name',
            },
            province_id: {
              type: 'string',
              example: 'ON',
              description: 'Canadian Province/Territory code',
              enum: [
                'AB',
                'BC',
                'MB',
                'NB',
                'NL',
                'NS',
                'ON',
                'PE',
                'QC',
                'SK',
                'NT',
                'NU',
                'YT',
              ],
            },
            city: {
              type: 'string',
              example: 'Toronto',
              description: 'City name',
            },
            vendor_type: {
              type: 'string',
              enum: ['retailer', 'LP', 'broker', 'agency'],
              example: 'retailer',
              description: 'Type of vendor',
            },
            address: {
              type: 'string',
              example: '123 Main St, Toronto, ON',
              description: 'Physical address',
            },
          },
        },

        // Login DTO Schema
        LoginDto: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
              description: 'User email address',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'SecureP@ss123',
              description: 'User password',
            },
          },
        },

        // Auth Tokens Schema
        AuthTokens: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              description: 'JWT access token for API authentication',
            },
            refreshToken: {
              type: 'string',
              description: 'JWT refresh token to obtain new access tokens',
            },
          },
        },

        // Refresh Token Request Schema
        RefreshTokenRequest: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: 'Valid refresh token',
            },
          },
        },

        // Standard Success Response
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
          },
        },

        // Signup Success Response
        SignupResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Signup successful',
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                    },
                    user_name: {
                      type: 'string',
                    },
                    email: {
                      type: 'string',
                    },
                    contact_no: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },

        // Login Success Response
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Login successful',
            },
            data: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                  description: 'JWT access token',
                },
                refreshToken: {
                  type: 'string',
                  description: 'JWT refresh token',
                },
                user: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },

        // Refresh Token Response
        RefreshTokenResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Token refreshed',
            },
            data: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                  description: 'New JWT access token',
                },
              },
            },
          },
        },

        // Error Response
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'An error occurred',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },

        // Validation Error Response
        ValidationError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Validation failed',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'email',
                  },
                  message: {
                    type: 'string',
                    example: 'Invalid email format',
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and registration endpoints',
      },
      {
        name: 'Token Management',
        description: 'Token refresh and management endpoints',
      },
      {
        name: 'Catalog',
        description: 'Protected catalog and product endpoints',
      },
    ],
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
