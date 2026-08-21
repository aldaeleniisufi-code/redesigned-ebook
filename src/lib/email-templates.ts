import { formatPrice } from "@/lib/format";

function emailShell(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="el">
  <body style="margin:0;padding:0;background:#fff7e8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7e8;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#173f73;padding:20px 32px;">
                <span style="font-size:20px;font-weight:bold;color:#ffffff;">✨ Kidleido</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#173f73;">
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
      Ο λογαριασμός σου στο <strong>Kidleido</strong> δημιουργήθηκε με επιτυχία.
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
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7e8;border-radius:16px;">
      <tr>
        <td style="padding:16px 20px;font-size:15px;">
          <strong>${bookTitle}</strong>
        </td>
        <td style="padding:16px 20px;font-size:15px;text-align:right;color:#e86a5a;font-weight:bold;">
          ${formatPrice(priceCents)}
        </td>
      </tr>
    </table>
  `);
}
