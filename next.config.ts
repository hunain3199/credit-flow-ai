import type { NextConfig } from "next";

// Report-only CSP so the console isn't filled with script-src 'none' violations.
// If you still see those, a stricter policy is being set by your host/CDN—check
// the document response headers (Network tab) and adjust there.
const apiOrigin =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "https://api.creditflowai.io";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              `connect-src 'self' ${apiOrigin}`,
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
