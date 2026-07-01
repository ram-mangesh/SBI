import { z } from 'zod';

export const otpSchema = z.object({});
export type OtpSchema = z.infer<typeof otpSchema>;
