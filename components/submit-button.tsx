"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  isPending: boolean;
  text: string;
  pendingText?: string;
}

export function SubmitButton({
  isPending,
  text,
  pendingText = "Processing...",
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="w-full"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {pendingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
