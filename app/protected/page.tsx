import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  // Redirect to the main application route
  return redirect('/log');
}
