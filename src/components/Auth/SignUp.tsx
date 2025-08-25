import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await signUp(values.name, values.email, values.password);
      navigate("/");
    } catch (e) {
      alert("Cannot signup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white">
            <LogIn className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Sign up</h1>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          Access your Botaye dashboard
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className="input-field"
              type="text"
              placeholder="John Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="input-field"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                className="input-field pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
          >
            {isSubmitting ? "Signing Up..." : "Sign up"}
          </button>
        </form>

        <div className="mt-3 text-xs text-gray-600">
          <Link to="/signin" className="text-primary-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
