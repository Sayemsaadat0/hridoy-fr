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
  get nodeEnv() {
    return process.env.NODE_ENV ?? "development";
  },
};
