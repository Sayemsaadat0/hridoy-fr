/**
 * OpenAPI paths and schemas for programs, FAQs, gallery and contact messages.
 * The three ordered-content resources share one shape, so they're generated.
 */

type JsonSchema = Record<string, unknown>;

const errorContent = (message: string) => ({
  "application/json": {
    schema: { $ref: "#/components/schemas/ErrorResponse" },
    example: { status: "error", message },
  },
});

const json = (schema: JsonSchema) => ({ "application/json": { schema } });

const envelope = (data: JsonSchema): JsonSchema => ({
  type: "object",
  required: ["status", "data"],
  properties: { status: { type: "string", enum: ["success"] }, data },
});

const listEnvelope = (item: JsonSchema): JsonSchema =>
  envelope({
    type: "object",
    properties: {
      items: { type: "array", items: item },
      pagination: { $ref: "#/components/schemas/Pagination" },
    },
  });

const deletedResponse = (message: string) => ({
  description: "Deleted",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/MessageResponse" },
      example: { status: "success", message },
    },
  },
});

const adminErrors = (label: string) => ({
  "401": { description: "Not authenticated", content: errorContent("Not authenticated") },
  "403": { description: "Not an admin, or cross-origin request denied", content: errorContent("Forbidden") },
  "404": { description: "Not found", content: errorContent(`${label} not found`) },
});

const idParam = (label: string) => ({
  name: "id",
  in: "path",
  required: true,
  description: `${label} ObjectId`,
  schema: { type: "string", example: "665f1c2e4b3a1a0012ab34cd" },
});

const orderedFields: Record<string, JsonSchema> = {
  order: { type: "integer", minimum: 0, default: 0, description: "Ascending display order" },
  isPublished: { type: "boolean", default: true },
};

const recordMeta: Record<string, JsonSchema> = {
  id: { type: "string" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

interface OrderedResource {
  path: string;
  tag: string;
  label: string;
  operationName: string;
  fields: Record<string, JsonSchema>;
  required: string[];
  /** Record field set from an uploaded `image` file; requests become multipart/form-data. */
  imageField?: string;
}

function orderedResourcePaths({ path, tag, label, operationName, fields, required, imageField }: OrderedResource) {
  const input: JsonSchema = {
    type: "object",
    properties: { ...fields, ...orderedFields, ...(imageField ? { image: imageFile } : {}) },
  };
  const record: JsonSchema = {
    type: "object",
    properties: {
      ...recordMeta,
      ...fields,
      ...(imageField ? { [imageField]: imageUrlOutput } : {}),
      ...orderedFields,
    },
  };
  const body = (schema: JsonSchema) =>
    imageField ? { "multipart/form-data": { schema } } : json(schema);
  const imageErrors = imageField
    ? {
        "413": { description: "Image too large", content: errorContent("image: Must be 5 MB or smaller") },
        "415": { description: "Not an image", content: errorContent("image: Only JPEG, PNG, WebP or GIF images are allowed") },
        "502": { description: "ImageKit failed", content: errorContent("The image service is unavailable right now. Try again in a few minutes.") },
        "504": { description: "ImageKit timed out", content: errorContent("Image upload timed out. Try again.") },
      }
    : {};
  const itemResponse = (description: string) => ({ description, content: json(envelope(record)) });

  return {
    [path]: {
      get: {
        tags: [tag],
        summary: `List ${tag.toLowerCase()}`,
        description: "Public. Published items sorted by `order`. Admins may pass `published=false|all` to see drafts.",
        operationId: `list${operationName}s`,
        security: [],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 100, default: 50 } },
          { name: "q", in: "query", description: "Case-insensitive text search", schema: { type: "string" } },
          {
            name: "published",
            in: "query",
            description: "Admin only; ignored for the public",
            schema: { type: "string", enum: ["true", "false", "all"], default: "true" },
          },
        ],
        responses: {
          "200": { description: `${label} list`, content: json(listEnvelope(record)) },
          "400": { description: "Invalid query parameters", content: errorContent("Invalid query parameters") },
        },
      },
      post: {
        tags: [tag],
        summary: `Create a ${label.toLowerCase()}`,
        description: "Admin only.",
        operationId: `create${operationName}`,
        requestBody: { required: true, content: body({ ...input, required: imageField ? [...required, "image"] : required }) },
        responses: {
          "201": itemResponse(`${label} created`),
          "400": { description: "Validation error", content: errorContent(`${required[0]}: Invalid input`) },
          ...adminErrors(label),
          ...imageErrors,
        },
      },
    },
    [`${path}/{id}`]: {
      get: {
        tags: [tag],
        summary: `Get a ${label.toLowerCase()}`,
        description: "Public when published. Drafts return 404 unless the caller is an admin.",
        operationId: `get${operationName}`,
        security: [],
        parameters: [idParam(label)],
        responses: {
          "200": itemResponse(label),
          "404": { description: "Not found", content: errorContent(`${label} not found`) },
        },
      },
      patch: {
        tags: [tag],
        summary: `Update a ${label.toLowerCase()}`,
        description: "Admin only. Partial update; at least one field required.",
        operationId: `update${operationName}`,
        parameters: [idParam(label)],
        requestBody: { required: true, content: body(input) },
        responses: {
          "200": itemResponse(`${label} updated`),
          "400": { description: "Validation error", content: errorContent("body: At least one field is required") },
          ...adminErrors(label),
          ...imageErrors,
        },
      },
      delete: {
        tags: [tag],
        summary: `Delete a ${label.toLowerCase()}`,
        description: "Admin only. Permanent.",
        operationId: `delete${operationName}`,
        parameters: [idParam(label)],
        responses: { "200": deletedResponse(`${label} deleted`), ...adminErrors(label) },
      },
    },
  };
}

const imageFile: JsonSchema = {
  type: "string",
  format: "binary",
  description: "JPEG, PNG, WebP or GIF up to 5 MB. Uploaded to ImageKit by the server. Required on create; optional on update.",
};

const imageUrlOutput: JsonSchema = {
  type: "string",
  readOnly: true,
  description: "ImageKit URL set by the server from the uploaded `image`; not accepted as input.",
  example: "https://ik.imagekit.io/your_id/hridoy-fr/gallery/photo_AbC123.jpg",
};

export const programPaths = orderedResourcePaths({
  path: "/programs",
  tag: "Programs",
  label: "Program",
  operationName: "Program",
  required: ["title", "description", "duration"],
  imageField: "thumbnail",
  fields: {
    title: { type: "string", maxLength: 200, example: "রিদয় স্যার বায়োলজি - ফ্রি ক্লাস ২০২৬" },
    description: { type: "string", maxLength: 1000 },
    level: { type: "string", enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    duration: { type: "string", maxLength: 60, example: "২ সপ্তাহ" },
    enrollmentCount: { type: "string", nullable: true, maxLength: 20, example: "২.৫K" },
  },
});

export const faqPaths = orderedResourcePaths({
  path: "/faqs",
  tag: "FAQs",
  label: "FAQ",
  operationName: "Faq",
  required: ["question", "answer"],
  fields: {
    question: { type: "string", maxLength: 300 },
    answer: { type: "string", maxLength: 3000 },
  },
});

export const galleryPaths = orderedResourcePaths({
  path: "/gallery",
  tag: "Gallery",
  label: "Gallery item",
  operationName: "GalleryItem",
  required: ["title"],
  imageField: "imageUrl",
  fields: {
    title: { type: "string", maxLength: 120 },
    description: { type: "string", nullable: true, maxLength: 500 },
  },
});

const contactInput: Record<string, JsonSchema> = {
  firstName: { type: "string", maxLength: 60 },
  lastName: { type: "string", maxLength: 60 },
  email: { type: "string", format: "email" },
  phone: {
    type: "string",
    description: "Bangladeshi mobile; Bangla digits, spaces, dashes and +88 are accepted and normalized",
    example: "01518390674",
  },
  subject: { type: "string", maxLength: 200 },
  details: { type: "string", maxLength: 5000 },
};
const contactStatus: JsonSchema = { type: "string", enum: ["NEW", "READ", "ARCHIVED"] };
const contactRecord: JsonSchema = {
  type: "object",
  properties: { ...recordMeta, ...contactInput, status: contactStatus },
};

export const contactPaths = {
  "/contacts": {
    get: {
      tags: ["Contacts"],
      summary: "List contact messages",
      description: "Admin only. Newest first.",
      operationId: "listContactMessages",
      parameters: [
        { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
        { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 100, default: 20 } },
        { name: "q", in: "query", description: "Search name, email, phone, subject and message", schema: { type: "string" } },
        { name: "status", in: "query", schema: contactStatus },
      ],
      responses: {
        "200": { description: "Message list", content: json(listEnvelope(contactRecord)) },
        "400": { description: "Invalid query parameters", content: errorContent("Invalid query parameters") },
        "401": { description: "Not authenticated", content: errorContent("Not authenticated") },
        "403": { description: "Not an admin", content: errorContent("Forbidden") },
      },
    },
    post: {
      tags: ["Contacts"],
      summary: "Submit the contact form",
      description: "Public. Same-origin only; limited to 5 messages per IP every 15 minutes.",
      operationId: "createContactMessage",
      security: [],
      requestBody: {
        required: true,
        content: json({ type: "object", required: Object.keys(contactInput), properties: contactInput }),
      },
      responses: {
        "201": {
          description: "Message received",
          content: json(envelope({ type: "object", properties: { id: { type: "string" } } })),
        },
        "400": { description: "Validation error", content: errorContent("phone: Must be a Bangladeshi mobile number like 01XXXXXXXXX") },
        "403": { description: "Cross-origin request denied", content: errorContent("Cross-origin request denied") },
        "429": { description: "Rate limited", content: errorContent("Too many messages. Try again later.") },
      },
    },
  },
  "/contacts/{id}": {
    get: {
      tags: ["Contacts"],
      summary: "Get a contact message",
      description: "Admin only.",
      operationId: "getContactMessage",
      parameters: [idParam("Message")],
      responses: {
        "200": { description: "Message", content: json(envelope(contactRecord)) },
        ...adminErrors("Message"),
      },
    },
    patch: {
      tags: ["Contacts"],
      summary: "Change a message's status",
      description: "Admin only. Only `status` can change; the submitted content is kept as received.",
      operationId: "updateContactMessage",
      parameters: [idParam("Message")],
      requestBody: {
        required: true,
        content: json({ type: "object", required: ["status"], properties: { status: contactStatus } }),
      },
      responses: {
        "200": { description: "Message updated", content: json(envelope(contactRecord)) },
        "400": { description: "Validation error", content: errorContent("status: Invalid option") },
        ...adminErrors("Message"),
      },
    },
    delete: {
      tags: ["Contacts"],
      summary: "Delete a contact message",
      description: "Admin only. Permanent.",
      operationId: "deleteContactMessage",
      parameters: [idParam("Message")],
      responses: { "200": deletedResponse("Message deleted"), ...adminErrors("Message") },
    },
  },
};

