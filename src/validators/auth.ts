import { z } from 'zod';

export const RegisterSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name too short').max(24, 'Name too long').trim(),
    email: z.email('Invalid email address').trim(),
    password: z.string().min(8, 'Password must be at least 8 characters long')
  })
});

export const VerifySchema = z.object({
  body: z.object({
    otp: z.string().length(6, 'OTP must be 6 digits')
  })
});

export const SignInSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address').trim(),
    password: z.string().min(8, 'Password must be at least 8 characters long')
  })
});