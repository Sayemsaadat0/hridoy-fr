function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get mongoUri() {
    const user = requireEnv("DB_USER_NAME");
    const password = requireEnv("DB_PASSWORD");
    const dbName = requireEnv("DB_NAME");
    return `mongodb+srv://${user}:${password}@cluster0.njebycd.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  },
  get jwtSecret() {
    return requireEnv("JWT_SECRET");
  },
  /** Server-only; used as the Basic-auth username for ImageKit upload and delete calls. */
  get imagekitPrivateKey() {
    return requireEnv("IMAGEKIT_PRIVATE_KEY");
  },
  /** e.g. https://ik.imagekit.io/your_id (no trailing slash). */
  get imagekitUrlEndpoint() {
    return requireEnv("IMAGEKIT_URL_ENDPOINT").replace(/\/+$/, "");
  },
  get nodeEnv() {
    return process.env.NODE_ENV ?? "development";
  },
};
