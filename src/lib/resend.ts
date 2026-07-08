import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResendClient(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error(
        "RESEND_API_KEY δεν έχει οριστεί. Πρόσθεσέ το στο .env (resend.com/api-keys)."
      );
    }
    _resend = new Resend(key);
  }
  return _resend;
}

export const EMAIL_FROM = "Παιδικά Βιβλία <hello@kidleido.com>";
