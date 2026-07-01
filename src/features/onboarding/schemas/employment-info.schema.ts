import { z } from 'zod';

export const employmentInfoSchema = z.object({});
export type EmploymentInfoSchema = z.infer<typeof employmentInfoSchema>;
