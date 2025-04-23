import SignupForm from "@/components/auth/signup-form";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white p-2 w-12 h-12 mb-4">
            <Link href="/">
              <span className="font-bold text-xl">QD</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold">Qemem Tech</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create a new account
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
