import { z } from 'zod';

export const personalInfoSchema = z.object({});
export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
