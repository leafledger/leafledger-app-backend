/**
 * Centralized Swagger/OpenAPI Path Definitions
 * All API endpoint documentation is defined here to keep route files clean
 */

export const swaggerPaths = {
  // ==================== Authentication Endpoints ====================
  "/api/auth/signup": {
    post: {
      summary: "Register a new user",
      description:
        "Creates a new user account with the provided information. User must provide unique username, email, and contact number.",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SignupDto",
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SignupResponse",
              },
            },
          },
        },
        400: {
          description: "Validation error or user already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ValidationError",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  "/api/auth/login": {
    post: {
      summary: "Authenticate user and get tokens",
      description:
        "Login with email and password to receive access and refresh tokens",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginDto",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful, returns tokens and user information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResponse",
              },
            },
          },
        },
        400: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ValidationError",
              },
            },
          },
        },
        401: {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  // ==================== Catalog Endpoints ====================
  "/api/catalog": {
    get: {
      summary: "Get catalog data (Protected)",
      description:
        "Retrieve catalog information. Requires valid JWT token in Authorization header.",
      tags: ["Catalog"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Catalog data retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "welcome john_doe to the catalog",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized - Invalid or missing token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  // ==================== Token Management Endpoints ====================
  "/refresh": {
    post: {
      summary: "Refresh access token",
      description:
        "Use a valid refresh token to obtain a new access token without re-authenticating",
      tags: ["Token Management"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RefreshTokenRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Access token refreshed successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshTokenResponse",
              },
            },
          },
        },
        400: {
          description: "Refresh token is missing or invalid format",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Refresh token is required",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Invalid or expired refresh token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  "/logout": {
    post: {
      summary: "Logout user and blacklist refresh token",
      description: "Blacklists the provided refresh token to prevent further use",
      tags: ["Token Management"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RefreshTokenRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "User logged out successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Logged out successfully",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Refresh token is required",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        403: {
          description: "Invalid refresh token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
};
