import { z } from 'zod';
import { RoleType } from '../dto/user.dto';

export const UserSchema = z.object({
    username: z.string().min(2).max(100),
    name: z.string().min(2).max(100),
    lastname: z.string().min(2).max(100),
    email: z.string().email().max(100),
    password: z.string()
        .min(6).max(20)
        .regex(/^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/, 'Formato de password inválido'),
    city: z.string().min(2).max(100),
    province: z.string().min(2).max(100),
    role: z.enum(RoleType).default(RoleType.USER)
});

export type UserType = z.infer<typeof UserSchema>;
