import { z } from 'zod';

export const financialProfileSchema = z.object({});
export type FinancialProfileSchema = z.infer<typeof financialProfileSchema>;
