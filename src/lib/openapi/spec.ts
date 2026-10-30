import { openApiComponents } from "./components";
import { authPaths } from "./paths/auth";
import { noticePaths } from "./paths/notices";
import { contactPaths, faqPaths, galleryPaths, programPaths } from "./paths/content";

/**
 * OpenAPI 3 spec served at GET /api/docs.
 *
 * Adding a new API:
 * 1. Create the route under src/app/api/<resource>/route.ts
 * 2. Add src/lib/openapi/paths/<resource>.ts with the path objects
 * 3. Spread that object into `paths` below
 * 4. Reuse or add schemas in src/lib/openapi/components.ts
 */
export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Ridoy Sir Biology API",
    version: "1.0.0",
    description: [
      "User API for Ridoy Sir Biology.",
      "",
      "**How to test auth here**",
      "1. Open `POST /auth/register` (or `POST /auth/login`) → Try it out.",
      "2. On success the JWT is applied automatically (Authorize). Same-origin cookie is also set.",
      "3. Call `GET /auth/me` or any later protected route.",
      "",
      "Protected routes accept `Authorization: Bearer <token>` or the httpOnly `session` cookie.",
      "Responses use `{ status: \"success\"|\"error\", data|message }`.",
    ].join("\n"),
  },
  servers: [
    {
      url: "/api",
      description: "Current origin",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Register, login, and logout",
    },
    {
      name: "Notices",
      description: "Public notices; writes are admin only",
    },
    { name: "Programs", description: "Courses shown on the site; writes are admin only" },
    { name: "FAQs", description: "Home page FAQs; writes are admin only" },
    { name: "Gallery", description: "Gallery photos; writes are admin only" },
    { name: "Contacts", description: "Public contact form; reading is admin only" },
  ],
  security: [{ bearerAuth: [] }],
  paths: {
    ...authPaths,
    ...noticePaths,
    ...programPaths,
    ...faqPaths,
    ...galleryPaths,
    ...contactPaths,
  },
  components: openApiComponents,
};
