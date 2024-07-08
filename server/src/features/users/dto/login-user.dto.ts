import { z } from 'zod';

export const loginUserDtoSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
});

export type LoginUserDto = z.infer<typeof loginUserDtoSchema>;
