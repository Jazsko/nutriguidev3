"use client";

import { useState } from "react";
import { resetPasswordAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { FormInput } from "@/components/form-input";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success" | "info"; text: string }>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);

    const result = await resetPasswordAction(formData);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({
        type: "success",
        text: "Check your email for a password reset link",
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <FormMessage message={message} />
          
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={setEmail}
          />

          <SubmitButton
            isPending={false}
            text="Send Reset Link"
          />
        </form>
      </div>
      <SmtpMessage />
    </div>
  );
}
