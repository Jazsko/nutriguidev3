"use client";

import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export function SmtpMessage() {
  if (process.env.NEXT_PUBLIC_SMTP_DISABLED === "true") {
    return (
      <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-md text-sm">
        <p>
          SMTP is disabled. Password reset emails will not be sent. Please contact
          the administrator to reset your password.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-muted/50 px-5 py-3 border rounded-md flex gap-4">
      <InfoIcon size={16} className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-secondary-foreground">
          <strong> Note:</strong> Emails are rate limited. Enable Custom SMTP to
          increase the rate limit.
        </small>
        <div>
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1"
          >
            Learn more <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
