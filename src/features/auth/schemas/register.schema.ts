import { z } from 'zod';

export const registerSchema = z.object({});
export type RegisterSchema = z.infer<typeof registerSchema>;
