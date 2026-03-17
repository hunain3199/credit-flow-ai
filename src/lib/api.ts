/**
 * API base URL for the backend. Uses NEXT_PUBLIC_API_URL from the environment.
 * In Next.js, NEXT_PUBLIC_* vars are inlined at build time—set NEXT_PUBLIC_API_URL
 * in your build/deploy environment (e.g. Vercel, Docker build-arg) so the deployed
 * app uses the correct API. Fallback avoids "undefined" in URLs when the env
 * is missing at build time.
 */
export const API_BASE =
  typeof process.env.NEXT_PUBLIC_API_URL === "string" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "https://api.creditflowai.io";
