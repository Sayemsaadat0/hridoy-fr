const errorContent = (message: string) => ({
  "application/json": {
    schema: { $ref: "#/components/schemas/ErrorResponse" },
    example: { status: "error", message },
  },
});

const noticeIdParam = {
  name: "id",
  in: "path",
  required: true,
  description: "Notice ObjectId",
  schema: { type: "string", example: "665f1c2e4b3a1a0012ab34cd" },
} as const;

const noticeResponse = (description: string) => ({
  description,
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/NoticeResponse" },
    },
  },
});

export const noticePaths = {
  "/notices": {
    get: {
      tags: ["Notices"],
      summary: "List notices",
      description:
        "Public. Returns published notices, newest `date` first. `status` is derived from `date` (Asia/Dhaka): past = `Expired`, today = `Active`, future = `Upcoming`. Admins (Bearer/cookie) may pass `published=false|all` to see drafts.",
      operationId: "listNotices",
      security: [],
      parameters: [
        { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
        { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 100, default: 20 } },
        { name: "q", in: "query", description: "Case-insensitive search in title and description", schema: { type: "string" } },
        { name: "category", in: "query", schema: { type: "string", example: "পরীক্ষা" } },
        { name: "priority", in: "query", schema: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] } },
        { name: "status", in: "query", schema: { type: "string", enum: ["Active", "Upcoming", "Expired"] } },
        {
          name: "published",
          in: "query",
          description: "Admin only; ignored for the public",
          schema: { type: "string", enum: ["true", "false", "all"], default: "true" },
        },
      ],
      responses: {
        "200": {
          description: "Notice list",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NoticeListResponse" },
            },
          },
        },
        "400": { description: "Invalid query parameters", content: errorContent("Invalid query parameters") },
      },
    },
    post: {
      tags: ["Notices"],
      summary: "Create a notice",
      description: "Admin only.",
      operationId: "createNotice",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateNoticeRequest" },
          },
        },
      },
      responses: {
        "201": noticeResponse("Notice created"),
        "400": { description: "Validation error", content: errorContent("title: Too small: expected string to have >=1 characters") },
        "401": { description: "Not authenticated", content: errorContent("Not authenticated") },
        "403": { description: "Not an admin, or cross-origin request denied", content: errorContent("Forbidden") },
      },
    },
  },
  "/notices/{id}": {
    get: {
      tags: ["Notices"],
      summary: "Get a notice",
      description: "Public for published notices. Drafts return 404 unless the caller is an admin.",
      operationId: "getNotice",
      security: [],
      parameters: [noticeIdParam],
      responses: {
        "200": noticeResponse("Notice"),
        "404": { description: "Not found", content: errorContent("Notice not found") },
      },
    },
    patch: {
      tags: ["Notices"],
      summary: "Update a notice",
      description: "Admin only. Partial update; at least one field required.",
      operationId: "updateNotice",
      parameters: [noticeIdParam],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UpdateNoticeRequest" },
          },
        },
      },
      responses: {
        "200": noticeResponse("Notice updated"),
        "400": { description: "Validation error", content: errorContent("body: At least one field is required") },
        "401": { description: "Not authenticated", content: errorContent("Not authenticated") },
        "403": { description: "Not an admin, or cross-origin request denied", content: errorContent("Forbidden") },
        "404": { description: "Not found", content: errorContent("Notice not found") },
      },
    },
    delete: {
      tags: ["Notices"],
      summary: "Delete a notice",
      description: "Admin only. Permanent.",
      operationId: "deleteNotice",
      parameters: [noticeIdParam],
      responses: {
        "200": {
          description: "Deleted",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { status: "success", message: "Notice deleted" },
            },
          },
        },
        "401": { description: "Not authenticated", content: errorContent("Not authenticated") },
        "403": { description: "Not an admin, or cross-origin request denied", content: errorContent("Forbidden") },
        "404": { description: "Not found", content: errorContent("Notice not found") },
      },
    },
  },
} as const;
