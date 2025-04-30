export const dynamic = "force-dynamic";

import SignupForm from "@/components/auth/signup-form";
import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
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
          <div className="inline-flex items-center justify-center rounded-lg bg-transparent text-white p-2  mb-4">
            <Link href="/" className="font-bold text-xl">
              <Image
                src="/Qmemm.png"
                width={100}
                height={100}
                alt="Qemem Tech"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-bold">Qemem Cloud</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create a new account
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
