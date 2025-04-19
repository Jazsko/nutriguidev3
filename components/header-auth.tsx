import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export async function HeaderAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div className="text-sm text-red-500">
        Please update your .env.local file with your Supabase credentials
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex gap-4">
        <Button asChild variant="ghost">
          <a href="/login">Sign in</a>
        </Button>
        <Button asChild>
          <a href="/signup">Sign up</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500">{user.email}</span>
      <form action={signOutAction}>
        <Button type="submit" variant="ghost">
          Sign out
        </Button>
      </form>
    </div>
  );
}

