import Link from "next/link";
import RegisterForm from "./RegisterForm";
import { getDict } from "@/lib/i18n";

export default async function RegisterPage() {
  const d = await getDict();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-3xl font-bold text-brand-purple">
        {d.register.title}
      </h1>
      <RegisterForm
        labels={{
          name: d.register.name,
          email: d.register.email,
          password: d.register.password,
          creating: d.register.creating,
          submit: d.register.submit,
        }}
      />
      <p className="text-center text-sm text-foreground/70">
        {d.register.haveAccount}{" "}
        <Link href="/login" className="font-semibold text-brand-purple underline">
          {d.register.loginHere}
        </Link>
      </p>
    </div>
  );
}
