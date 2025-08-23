import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export const ResetPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await resetPassword(values.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Reset password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input className="input-field" type="email" {...register('email')} />
            {errors.email && <p className="text-danger-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
        {isSubmitSuccessful && (
          <p className="text-success-700 text-sm mt-3">If an account exists, a reset link has been sent.</p>
        )}
        <div className="mt-4 text-sm text-gray-600">
          <Link to="/signin" className="text-primary-600 hover:underline">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}; 