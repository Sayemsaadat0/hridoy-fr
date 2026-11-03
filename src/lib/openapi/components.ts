export const openApiComponents = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description:
        "JWT from `POST /auth/login` or `POST /auth/register` (`data.token`). The same token is also stored in the httpOnly `session` cookie. After a successful login/register in this UI, the token is applied automatically.",
    },
  },
  schemas: {
    ErrorResponse: {
      type: "object",
      required: ["status", "message"],
      properties: {
        status: { type: "string", enum: ["error"] },
        message: { type: "string" },
      },
    },
    MessageResponse: {
      type: "object",
      required: ["status", "message"],
      properties: {
        status: { type: "string", enum: ["success"] },
        message: { type: "string" },
      },
    },
    RegisterRequest: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "student@example.com",
        },
        password: {
          type: "string",
          format: "password",
          minLength: 8,
          example: "supersecret",
        },
      },
    },
    LoginRequest: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "student@example.com",
        },
        password: {
          type: "string",
          format: "password",
          minLength: 1,
          example: "supersecret",
        },
      },
    },
    UserProfile: {
      type: "object",
      required: ["id", "email", "name", "role", "createdAt", "updatedAt"],
      properties: {
        id: { type: "string", example: "665f1c2e4b3a1a0012ab34cd" },
        email: { type: "string", format: "email", example: "student@example.com" },
        name: {
          type: "string",
          description: "Auto-generated: random hex + email local-part (before @)",
          example: "a1b2c3student",
        },
        role: { type: "string", enum: ["admin", "user"], example: "user" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
    AuthData: {
      allOf: [
        { $ref: "#/components/schemas/UserProfile" },
        {
          type: "object",
          required: ["token"],
          properties: {
            token: {
              type: "string",
              description: "JWT session token (8 hour expiry)",
            },
          },
        },
      ],
    },
    AuthResponse: {
      type: "object",
      required: ["status", "data"],
      properties: {
        status: { type: "string", enum: ["success"] },
        data: { $ref: "#/components/schemas/AuthData" },
      },
    },
    NoticeFields: {
      type: "object",
      properties: {
        title: { type: "string", maxLength: 200, example: "নবম শ্রেণী – চ্যাপ্টার ফাইনাল পরীক্ষা" },
        description: { type: "string", maxLength: 5000, example: "আগামীকাল শুক্রবার সকাল ৯টা থেকে ১২টার মধ্যে পরীক্ষা অনুষ্ঠিত হবে।" },
        category: { type: "string", maxLength: 60, example: "পরীক্ষা" },
        priority: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"], default: "MEDIUM" },
        date: { type: "string", format: "date", description: "Notice date (ISO date or date-time)", example: "2026-04-24" },
        isPublished: { type: "boolean", default: true },
      },
    },
    CreateNoticeRequest: {
      allOf: [
        { $ref: "#/components/schemas/NoticeFields" },
        { type: "object", required: ["title", "description", "category", "date"] },
      ],
    },
    UpdateNoticeRequest: { $ref: "#/components/schemas/NoticeFields" },
    Notice: {
      type: "object",
      required: ["id", "title", "description", "category", "priority", "date", "status", "isPublished", "createdAt", "updatedAt"],
      properties: {
        id: { type: "string", example: "665f1c2e4b3a1a0012ab34cd" },
        title: { type: "string" },
        description: { type: "string" },
        category: { type: "string" },
        priority: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
        date: { type: "string", format: "date-time" },
        status: { type: "string", enum: ["Active", "Upcoming", "Expired"], description: "Derived from `date` (Asia/Dhaka)" },
        isPublished: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
    NoticeResponse: {
      type: "object",
      required: ["status", "data"],
      properties: {
        status: { type: "string", enum: ["success"] },
        data: { $ref: "#/components/schemas/Notice" },
      },
    },
    NoticeListResponse: {
      type: "object",
      required: ["status", "data"],
      properties: {
        status: { type: "string", enum: ["success"] },
        data: {
          type: "object",
          required: ["items", "pagination"],
          properties: {
            items: { type: "array", items: { $ref: "#/components/schemas/Notice" } },
            pagination: { $ref: "#/components/schemas/Pagination" },
          },
        },
      },
    },
    Pagination: {
      type: "object",
      properties: {
        page: { type: "integer" },
        limit: { type: "integer" },
        total: { type: "integer" },
        totalPages: { type: "integer" },
      },
    },
    MeResponse: {
      type: "object",
      required: ["status", "data"],
      properties: {
        status: { type: "string", enum: ["success"] },
        data: {
          type: "object",
          required: ["id", "email", "name", "role"],
          properties: {
            id: { type: "string" },
            email: { type: "string", format: "email" },
            name: { type: "string" },
            role: { type: "string", enum: ["admin", "user"] },
          },
        },
      },
    },
  },
} as const;
