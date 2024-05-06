import { z, ZodString, ZodOptional } from 'zod';
interface CustomZodString extends ZodString {
    matches(regex: RegExp, errorMessage?: string): CustomZodString;
    unique(): CustomZodString;
}
export const CreateUserPayloadSchema = z.object({
    firstName: z.string()
        .trim()
        .min(1, 'First name is required')
        .regex(/^[a-zA-Z]+$/, 'First name must only contain letters' as any), // Alphabetic only
    lastName: z.string()
        .trim()
        .min(1, 'Last name is required')
        .regex(/^[a-zA-Z]+$/, 'Last name must only contain letters'), // Alphabetic only
    email: z.string()
        .email('Invalid email format')
        .trim() as CustomZodString,
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        ) as CustomZodString, // Cast to CustomZodString
    profileImageURL: z.string()
        .optional()
});
