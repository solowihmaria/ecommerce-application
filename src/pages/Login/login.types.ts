import type { InferType } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type { loginSchema } from '../../features/auth/login/login.validation';

export type LoginFormData = InferType<typeof loginSchema>;
export type LoginSubmitHandler = SubmitHandler<LoginFormData>;
