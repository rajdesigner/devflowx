"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldErrors, Path, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { SignUpSchema, signInSchema } from "@/lib/validations";

interface AuthFormProps {
  formType: "SIGN_IN" | "SIGN_UP";
}

const formConfig = {
  SIGN_IN: {
    schema: signInSchema,
    defaultValues: { email: "", password: "" },
  },
  SIGN_UP: {
    schema: SignUpSchema,
    defaultValues: { username: "", name: "", email: "", password: "" },
  },
} as const;

const AuthForm = ({ formType }: AuthFormProps) => {
  const { schema, defaultValues } = formConfig[formType];
  type FormValues = z.infer<(typeof formConfig)[typeof formType]["schema"]>;
  const fields = Object.keys(defaultValues) as Array<keyof FormValues & string>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues,
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(`${formType} submit`, data);
  };

  const errors = form.formState.errors as FieldErrors<Record<string, unknown>>;

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
      {fields.map((fieldName) => {
        const key = fieldName as Path<FormValues>;
        const error = errors[fieldName];
        const label = key === "email" ? "Email Address" : key.charAt(0).toUpperCase() + key.slice(1);

        return (
          <div key={fieldName} className="flex w-full flex-col gap-2.5">
            <label htmlFor={fieldName} className="paragraph-medium text-dark400_light700">
              {label}
            </label>
            <Input
              id={fieldName}
              type={fieldName === "password" ? "password" : "text"}
              aria-invalid={Boolean(error)}
              className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 rounded-1.5 min-h-12 border"
              {...form.register(key)}
            />
            {error?.message ? <p className="text-sm text-red-500">{String(error.message)}</p> : null}
          </div>
        );
      })}

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full px-4 py-3"
      >
        {form.formState.isSubmitting ? (buttonText === "Sign In" ? "Signing In..." : "Signing Up...") : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
