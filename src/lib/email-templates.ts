import { formatPrice } from "@/lib/format";

function emailShell(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="el">
  <body style="margin:0;padding:0;background:#fff8ec;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8ec;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#7c3aed;padding:20px 32px;">
                <span style="font-size:20px;font-weight:bold;color:#ffffff;">📚 Παιδικά Βιβλία</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#3b2f63;">
                ${bodyHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function confirmationEmailHtml({ name }: { name: string }): string {
  return emailShell(`
    <h1 style="font-size:22px;margin:0 0 16px;">Καλωσόρισες, ${name}! 👋</h1>
    <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">
      Ο λογαριασμός σου στα <strong>Παιδικά Βιβλία</strong> δημιουργήθηκε με επιτυχία.
      Μπορείς τώρα να φτιάξεις προφίλ για τα παιδιά σου και να ξεκινήσετε να διαβάζετε
      μαζί υπέροχες ιστορίες!
    </p>
    <p style="font-size:15px;line-height:1.6;margin:0;">
      Καλή ανάγνωση! 🦁📖
    </p>
  `);
}

export function receiptEmailHtml({
  name,
  bookTitle,
  priceCents,
}: {
  name: string;
  bookTitle: string;
  priceCents: number;
}): string {
  return emailShell(`
    <h1 style="font-size:22px;margin:0 0 16px;">Ευχαριστούμε για την αγορά, ${name}! 🎉</h1>
    <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">
      Η αγορά σου ολοκληρώθηκε με επιτυχία. Το βιβλίο είναι πλέον διαθέσιμο για ανάγνωση
      από όλα τα παιδικά προφίλ του λογαριασμού σου.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8ec;border-radius:16px;">
      <tr>
        <td style="padding:16px 20px;font-size:15px;">
          <strong>${bookTitle}</strong>
        </td>
        <td style="padding:16px 20px;font-size:15px;text-align:right;color:#fb923c;font-weight:bold;">
          ${formatPrice(priceCents)}
        </td>
      </tr>
    </table>
  `);
}
