import { fail } from "@/lib/api-response";
import { isSwaggerEnabled } from "@/lib/swagger";

export const runtime = "nodejs";

const SWAGGER_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>API Docs</title>
    <link rel="stylesheet" href="/docs/assets/swagger-ui.css" />
    <style>
      html, body { margin: 0; background: #fafafa; }
      .topbar { display: none; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="/docs/assets/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function () {
        const ui = SwaggerUIBundle({
          url: "/api/docs",
          dom_id: "#swagger-ui",
          deepLinking: true,
          persistAuthorization: true,
          withCredentials: true,
          displayRequestDuration: true,
          tryItOutEnabled: true,
          filter: true,
          presets: [SwaggerUIBundle.presets.apis],
          layout: "BaseLayout",
          responseInterceptor: function (res) {
            try {
              if (
                (String(res.url).indexOf("/auth/login") !== -1 ||
                  String(res.url).indexOf("/auth/register") !== -1) &&
                res.status >= 200 &&
                res.status < 300 &&
                res.text
              ) {
                const payload = JSON.parse(res.text);
                const token = payload && payload.data && payload.data.token;
                if (token) ui.preauthorizeApiKey("bearerAuth", token);
              }
            } catch (e) {}
            return res;
          }
        });
        window.ui = ui;
      };
    </script>
  </body>
</html>
`;

export function GET() {
  if (!isSwaggerEnabled()) {
    return fail("Not found", 404);
  }

  return new Response(SWAGGER_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
