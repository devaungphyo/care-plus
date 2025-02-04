import mmphone from 'mm-mobile-tool';
import { z } from 'zod';

export const signinDtoSchema = z.object({
  phone: z
    .string({ message: 'Phone number is required!' })
    .min(11, { message: 'Please enter a valid phone number' })
    // .max(11, { message: 'Phone number must be at most 11 numbers' })
    .refine((value) => mmphone.isValid(value), {
      message: 'Please enter a valid phone number',
    }),
  password: z
    .string({ message: 'Password is required!' })
    .min(6, { message: 'Password is must be at least 6 characters' })
    .max(12, { message: 'Password is must be at most 12 characters' }),
});

export type SignUpDto = z.infer<typeof signinDtoSchema>;
