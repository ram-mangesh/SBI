import { z } from 'zod';

export const financialInfoSchema = z.object({});
export type FinancialInfoSchema = z.infer<typeof financialInfoSchema>;
