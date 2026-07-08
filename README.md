# Παιδικά Βιβλία 📚

Site με ψηφιακά παιδικά βιβλία: γονείς δημιουργούν λογαριασμό, φτιάχνουν προφίλ για τα παιδιά τους και διαβάζουν εικονογραφημένα παραμύθια με animation γυρίσματος σελίδας. Ένας admin διαχειρίζεται τον κατάλογο βιβλίων.

Χτισμένο με Next.js 16 (App Router), React 19, Tailwind CSS v4, Prisma 7 + Postgres, Auth.js (NextAuth v5) και framer-motion.

## Εκκίνηση

Χρειάζεσαι ένα Postgres database (τοπικό ή hosted — π.χ. το ίδιο production Postgres, ή ένα δωρεάν Neon/Vercel Postgres instance).

```bash
npm install
# βάλε το DATABASE_URL σου στο .env πρώτα (βλ. .env.example)
npx prisma migrate deploy   # δημιουργεί τους πίνακες
npx prisma db seed          # γεμίζει με 3 demo βιβλία + λογαριασμούς δοκιμής
npm run dev
```

Άνοιξε [http://localhost:3000](http://localhost:3000).

Αντίγραψε το `.env.example` σε `.env` και συμπλήρωσε `DATABASE_URL` και δική σου τιμή για `AUTH_SECRET` (`openssl rand -base64 32`).

## Λογαριασμοί δοκιμής (από το seed)

| Ρόλος  | Email                       | Κωδικός     |
|--------|------------------------------|-------------|
| Admin  | admin@paidika-vivlia.gr      | Admin123!   |
| Γονέας | goneas@example.com           | Goneas123!  |

## Δομή

- `/` — landing page
- `/register`, `/login` — εγγραφή/είσοδος γονέα
- `/profiles` — επιλογή/δημιουργία παιδικού προφίλ ("Ποιος διαβάζει;")
- `/library` — βιβλιοθήκη με φίλτρα κατηγορίας
- `/books/[id]` — αν δεν έχει αγοραστεί το βιβλίο δείχνει paywall (Stripe Checkout)· αλλιώς αναγνώστης με page-flip animation, αποθηκεύει πρόοδο ανά παιδικό προφίλ
- `/parent` — διαχείριση παιδικών προφίλ και πρόοδος ανάγνωσης
- `/admin` — CRUD βιβλίων/σελίδων (μόνο για ADMIN), με upload εικόνων και ορισμό τιμής

Οι εικόνες βιβλίων αποθηκεύονται στο Vercel Blob όταν υπάρχει `BLOB_READ_WRITE_TOKEN`, αλλιώς τοπικά στο `public/uploads/` (fallback για ανάπτυξη χωρίς Blob).

## Πληρωμές (Stripe)

Κάθε βιβλίο έχει τιμή· η αγορά γίνεται μέσω Stripe Checkout και ισχύει για όλα τα παιδικά προφίλ του λογαριασμού του γονέα.

1. Δημιούργησε δωρεάν λογαριασμό στο [stripe.com](https://stripe.com) (test mode, δεν χρειάζεται πραγματική επιχείρηση).
2. Πάρε το test secret key από [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys) και βάλε το στο `.env`:
   ```
   STRIPE_SECRET_KEY="sk_test_..."
   ```
3. Δοκίμασε μια αγορά με την test κάρτα `4242 4242 4242 4242`, οποιαδήποτε μελλοντική ημερομηνία λήξης και CVC.
4. (Προαιρετικό) Για το webhook (`/api/webhooks/stripe`) σε production, πρόσθεσε και `STRIPE_WEBHOOK_SECRET`. Η κύρια επιβεβαίωση πληρωμής γίνεται όμως ήδη στο `/books/[id]` όταν επιστρέφεις από το Stripe, οπότε το webhook δεν είναι απαραίτητο για τοπική ανάπτυξη.

Χωρίς `STRIPE_SECRET_KEY` η εφαρμογή τρέχει κανονικά (build/paywall λειτουργούν), απλά το κουμπί "Αγόρασε" θα δείξει σφάλμα μέχρι να προστεθεί το κλειδί.

## Χρήσιμες εντολές

```bash
npx prisma studio   # γραφικό περιβάλλον για τη βάση
npm run build        # production build
```

## Deployment στο Vercel

1. Push το repo στο GitHub, μετά "Import Project" στο [vercel.com](https://vercel.com).
2. Storage tab στο Vercel dashboard → δημιούργησε **Postgres** database → σου δίνει αυτόματα `DATABASE_URL` env var.
3. Storage tab → δημιούργησε **Blob** store → σου δίνει αυτόματα `BLOB_READ_WRITE_TOKEN`.
4. Πρόσθεσε στο Vercel project τα υπόλοιπα env vars: νέο (διαφορετικό από το dev) `AUTH_SECRET`, `APP_URL` (το πραγματικό domain), `STRIPE_SECRET_KEY` (live key όταν είσαι έτοιμος).
5. Τοπικά, με το `DATABASE_URL` να δείχνει στο production Postgres: `npx prisma migrate deploy && npx prisma db seed`.
6. Deploy (αυτόματο σε κάθε `git push`, ή `vercel --prod`).
7. (Προαιρετικό) Stripe dashboard → Webhooks → νέο endpoint `https://<domain>/api/webhooks/stripe` για το event `checkout.session.completed` → πρόσθεσε το `STRIPE_WEBHOOK_SECRET` στο Vercel.

Το `postinstall` script (`prisma generate`) τρέχει αυτόματα σε κάθε Vercel build.
