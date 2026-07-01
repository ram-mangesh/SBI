import { z } from 'zod';

export const loginSchema = z.object({});
export type LoginSchema = z.infer<typeof loginSchema>;
