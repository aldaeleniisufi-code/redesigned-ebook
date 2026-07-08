import { getResendClient, EMAIL_FROM } from "@/lib/resend";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  try {
    const resend = getResendClient();
    await resend.emails.send({ from: EMAIL_FROM, to, subject, html });
  } catch (error) {
    console.error("Αποτυχία αποστολής email σε", to, error);
  }
}
