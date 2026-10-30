export const authPaths = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a user",
      description:
        "Creates a `role: user` account. `name` is generated as `{random}{email local-part}`. Sets the `session` cookie and returns a JWT. Role cannot be set by the client.",
      operationId: "register",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RegisterRequest" },
          },
        },
      },
      responses: {
        "201": {
          description: "Registered and signed in",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthResponse" },
            },
          },
        },
        "400": {
          description: "Invalid request body",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { status: "error", message: "Invalid email or password" },
            },
          },
        },
        "409": {
          description: "Email already in use",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { status: "error", message: "Email already in use" },
            },
          },
        },
        "429": {
          description: "Too many registration attempts",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Log in",
      description:
        "Validates credentials for any user (admin or user). Sets an httpOnly `session` cookie and returns the JWT in `data.token`. Rate limited to 5 attempts per 15 minutes per IP+email.",
      operationId: "login",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful",
          headers: {
            "Set-Cookie": {
              schema: { type: "string" },
              description: "httpOnly `session` JWT, 8h expiry",
            },
          },
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthResponse" },
            },
          },
        },
        "400": {
          description: "Invalid request body",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { status: "error", message: "Invalid email or password" },
            },
          },
        },
        "401": {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { status: "error", message: "Invalid credentials" },
            },
          },
        },
        "403": {
          description: "Cross-origin request denied",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "429": {
          description: "Too many login attempts",
          headers: {
            "Retry-After": {
              schema: { type: "string" },
              description: "Seconds until the next attempt is allowed",
            },
          },
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: {
                status: "error",
                message: "Too many login attempts. Try again later.",
              },
            },
          },
        },
      },
    },
  },
  "/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Log out",
      description:
        "Requires a valid session (Bearer token or `session` cookie). Revokes all sessions for this user by bumping `tokenVersion`, then clears the cookie.",
      operationId: "logout",
      responses: {
        "200": {
          description: "Logged out",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { status: "success", message: "Logged out successfully" },
            },
          },
        },
        "401": {
          description: "Not authenticated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { status: "error", message: "Not authenticated" },
            },
          },
        },
        "403": {
          description: "Cross-origin request denied",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/me": {
    get: {
      tags: ["Auth"],
      summary: "Get the current session",
      description:
        "Reads the session from `Authorization: Bearer <token>` (preferred) or the `session` cookie.",
      operationId: "me",
      responses: {
        "200": {
          description: "Authenticated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MeResponse" },
            },
          },
        },
        "401": {
          description: "Not authenticated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { status: "error", message: "Not authenticated" },
            },
          },
        },
      },
    },
  },
} as const;
