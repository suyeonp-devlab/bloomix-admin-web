"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LoginRequest } from "../auth.type";
import { useLoginMutation } from "../auth.queries";
import { loginSchema } from "../auth.schema";

type LoginFormProps = {
  redirectTo: string;
};

/** 로그인 폼 */
export function LoginForm({ redirectTo }: LoginFormProps) {

  const router = useRouter();
  const { mutateAsync: login, isPending, isSuccess } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { adminId: "", password: "" },
  });

  // 로그인
  const handleLogin = async (values: LoginRequest) => {
    await login(values);
    router.replace(redirectTo);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} noValidate className="flex flex-col gap-4">
      <FormField label="아이디" htmlFor="adminId" error={errors.adminId?.message}>
        <Input
          id="adminId"
          size="lg"
          autoComplete="username"
          autoFocus
          invalid={!!errors.adminId}
          {...register("adminId")}
        />
      </FormField>
      <FormField label="비밀번호" htmlFor="password" error={errors.password?.message}>
        <div className="relative">
          <Input
            id="password"
            size="lg"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            invalid={!!errors.password}
            className="pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-sm text-fg-muted hover:text-fg focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:outline-none"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </FormField>
      <Button type="submit" variant="primary" size="lg" disabled={isPending || isSuccess} className="mt-2 w-full">
        로그인
      </Button>
    </form>
  );
}
