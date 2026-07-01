import { z } from 'zod';

export const applicationSchema = z.object({});
export type ApplicationSchema = z.infer<typeof applicationSchema>;
