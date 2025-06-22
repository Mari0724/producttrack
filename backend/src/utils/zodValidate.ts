import { ZodSchema, ZodError } from "zod";

export const zodValidate = <T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: ZodError<T> } => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  return { success: true, data: result.data };
};
