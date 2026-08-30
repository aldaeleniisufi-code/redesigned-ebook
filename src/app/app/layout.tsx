import { getDict } from "@/lib/i18n";
import TimeGuard from "@/components/TimeGuard";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const d = await getDict();
  return (
    <>
      {children}
      <TimeGuard
        labels={{
          title: d.timeguard.title,
          text: d.timeguard.text,
          extend: d.timeguard.extend,
          prompt: d.timeguard.prompt,
          error: d.timeguard.error,
          button: d.timeguard.button,
        }}
      />
    </>
  );
}
