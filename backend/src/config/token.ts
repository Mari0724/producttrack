export const JWT_SECRET = process.env.JWT_SECRET as string;
export const TOKEN_EXPIRES_IN = "1d"; // ⏳ Aquí puedes poner "1h", "7d", etc.

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en el archivo .env");
}