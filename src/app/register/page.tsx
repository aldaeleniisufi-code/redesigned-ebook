import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-3xl font-bold text-brand-purple">
        Εγγραφή Γονέα 👨‍👩‍👧
      </h1>
      <RegisterForm />
      <p className="text-center text-sm text-foreground/70">
        Έχεις ήδη λογαριασμό;{" "}
        <Link href="/login" className="font-semibold text-brand-purple underline">
          Συνδέσου εδώ
        </Link>
      </p>
    </div>
  );
}
