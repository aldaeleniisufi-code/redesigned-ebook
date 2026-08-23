import { cookies } from "next/headers";

export type Locale = "el" | "en";

const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "el";

const dictionaries = {
  el: {
    metaTitle: "Kidleido — Μαγικοί Κόσμοι",
    metaDescription:
      "Μαγικοί κόσμοι γεμάτοι παραμύθια, ήρωες και φύλλα ζωγραφικής για παιδιά.",
    brand: "Kidleido",

    nav: {
      login: "Σύνδεση",
      register: "Εγγραφή",
      library: "Βιβλιοθήκη",
      coloring: "Ζωγραφιές",
      parent: "Γονική Πύλη",
      profiles: "Προφίλ",
      admin: "Διαχείριση",
      adminColoring: "Ζωγραφιές",
      logout: "Αποσύνδεση",
    },

    home: {
      welcome: "Καλώς ήρθατε στο Kidleido",
      tagline: "Μαγικοί Κόσμοι",
      intro1:
        "Έναν κόσμο όπου οι ιστορίες ζωντανεύουν, η φαντασία δεν έχει όρια και κάθε παιδί μπορεί να γίνει μέρος της περιπέτειας.",
      intro2:
        "Στο Kidleido δημιουργούμε μαγικούς κόσμους γεμάτους παραμύθια, αγαπημένους ήρωες, δημιουργικές δραστηριότητες και φύλλα ζωγραφικής που τα παιδιά μπορούν να απολαύσουν στο σπίτι, να εκτυπώσουν ή να χρησιμοποιήσουν ψηφιακά.",
      intro3:
        "Κάθε ιστορία είναι μια νέα πόρτα στη φαντασία — ένας τρόπος για τα παιδιά να ανακαλύψουν τη φιλία, την καλοσύνη, το θάρρος, τη δημιουργικότητα και τη χαρά του παιχνιδιού.",
      cta: "Διάλεξε έναν κόσμο. Άνοιξε μια ιστορία. Και άσε τη μαγεία να ξεκινήσει.",
      goToLibrary: "Πήγαινε στη Βιβλιοθήκη 📚",
      registerParent: "Εγγραφή Γονέα",
      login: "Είσοδος",
    },

    login: {
      title: "Είσοδος 👋",
      wrongCredentials: "Λάθος email ή κωδικός. Δοκίμασε ξανά.",
      email: "Email",
      password: "Κωδικός",
      submit: "Σύνδεση",
      noAccount: "Δεν έχεις λογαριασμό;",
      signUpHere: "Εγγράψου εδώ",
    },

    register: {
      title: "Εγγραφή Γονέα 👨‍👩‍👧",
      haveAccount: "Έχεις ήδη λογαριασμό;",
      loginHere: "Συνδέσου εδώ",
      name: "Όνομα",
      email: "Email",
      password: "Κωδικός (τουλάχιστον 6 χαρακτήρες)",
      creating: "Δημιουργία...",
      submit: "Δημιουργία λογαριασμού",
      errorFields:
        "Συμπλήρωσε όνομα, email και κωδικό (τουλάχιστον 6 χαρακτήρες).",
      errorExists: "Υπάρχει ήδη λογαριασμός με αυτό το email.",
    },

    profiles: {
      title: "Ποιος διαβάζει; 🧒",
      newProfile: "➕ Νέο παιδικό προφίλ",
      childName: "Όνομα παιδιού",
      createProfile: "Δημιουργία προφίλ",
    },

    profile: {
      title: "Το προφίλ μου 👤",
      history: "Ιστορικό αγορών",
      books: "Βιβλία",
      coloring: "Ζωγραφιές",
      empty: "Δεν έχεις αγοράσει τίποτα ακόμα.",
      open: "Άνοιξε",
    },

    library: {
      title: "Η Βιβλιοθήκη μας 📚",
      all: "Όλα",
      empty: "Δεν βρέθηκαν βιβλία ακόμα. Έλα ξανά σύντομα! 🌟",
      ages: "Ηλικίες",
      free: "Δωρεάν",
    },

    paywall: {
      note:
        "Αγόρασε αυτό το βιβλίο για να το διαβάσεις — η αγορά ισχύει για όλα τα παιδικά προφίλ του λογαριασμού σου.",
      buy: "Αγόρασε 🛒",
    },

    reader: {
      page: "σελίδα",
      back: "⬅ Πίσω",
      next: "Μπρος ➡",
      finish: "Τέλος 🎉",
      pageLabel: "Σελίδα",
      of: "/",
    },

    parent: {
      title: "Γονική Πύλη 👨‍👩‍👧",
      newChild: "➕ Νέο προφίλ παιδιού",
      noChildren: "Δεν έχεις δημιουργήσει ακόμα κανένα παιδικό προφίλ.",
      deleteProfile: "Διαγραφή προφίλ",
      noBooks: "Δεν έχει διαβάσει ακόμα κανένα βιβλίο.",
      completed: "✅ Ολοκληρώθηκε",
      pageProgress: "Σελίδα",
    },

    admin: {
      title: "Διαχείριση Βιβλίων 🛠️",
      newBook: "➕ Νέο βιβλίο",
      pages: "σελίδες",
      published: "Δημοσιευμένο",
      draft: "Πρόχειρο",
      edit: "Επεξεργασία",
      unpublish: "Απόσυρση",
      publish: "Δημοσίευση",
      delete: "Διαγραφή",
      newBookTitle: "Νέο Βιβλίο 📖",
      errorTitleCover: "Συμπλήρωσε τίτλο και ανέβασε εξώφυλλο.",
      fieldTitle: "Τίτλος",
      fieldAuthor: "Συγγραφέας",
      fieldDescription: "Περιγραφή",
      fieldCategory: "Κατηγορία",
      fieldAgeMin: "Ελάχιστη ηλικία",
      fieldAgeMax: "Μέγιστη ηλικία",
      fieldPrice: "Τιμή (€)",
      fieldCover: "Εξώφυλλο (εικόνα)",
      fieldCoverNew: "Νέο εξώφυλλο (προαιρετικό)",
      createAddPages: "Δημιουργία & προσθήκη σελίδων",
      editTitle: "Επεξεργασία:",
      status: "Κατάσταση:",
      publishHint: "Το βιβλίο δεν είναι ορατό στη βιβλιοθήκη μέχρι να το δημοσιεύσεις.",
      bookDetails: "Στοιχεία βιβλίου",
      save: "Αποθήκευση",
      pagesCount: "Σελίδες",
      order: "Σειρά",
      deletePage: "Διαγραφή σελίδας",
      newPage: "➕ Νέα σελίδα",
      errorPageImage: "Χρειάζεται εικόνα για τη σελίδα.",
      pageText: "Κείμενο σελίδας",
      pageImage: "Εικόνα σελίδας",
      addPage: "Προσθήκη σελίδας",
      titleEn: "Τίτλος (Αγγλικά)",
      authorEn: "Συγγραφέας (Αγγλικά)",
      descriptionEn: "Περιγραφή (Αγγλικά)",
      categoryEn: "Κατηγορία (Αγγλικά)",
      pageTextEn: "Κείμενο σελίδας (Αγγλικά)",
      enHint: "Προαιρετικό — αν το αφήσεις κενό, εμφανίζεται το αρχικό.",
    },

    coloring: {
      galleryTitle: "Ζωγραφιές 🎨",
      untitled: "Ζωγραφιά",
      free: "Δωρεάν",
      empty: "Δεν υπάρχουν ζωγραφιές ακόμα. Έλα ξανά σύντομα! 🌈",
      note:
        "Αγόρασε αυτή τη ζωγραφιά — η αγορά ισχύει για όλα τα παιδικά προφίλ του λογαριασμού σου.",
      buy: "Αγόρασε 🛒",
      sheet: "Σελίδα",
      download: "⬇ Κατέβασμα",
      print: "🖨 Εκτύπωση",
      colorDigitally: "🖌 Χρωμάτισε ψηφιακά",
      close: "Κλείσιμο",
      brush: "Πινέλο",
      eraser: "Σβήστρα",
      clear: "Καθάρισμα",
      downloadDrawing: "⬇ Κατέβασε τη ζωγραφιά μου",
      downloadsRemaining: "Απομένουν {n} κατεβάσματα",
      limitReached: "Έφτασες το όριο κατεβασμάτων (μπορείς πάντα να το βλέπεις και να το εκτυπώνεις online)",
    },

    adminColoring: {
      title: "Διαχείριση Ζωγραφιών 🎨",
      newPack: "➕ Νέα ζωγραφιά",
      newPackTitle: "Νέα Ζωγραφιά 🎨",
      errorTitleCover: "Συμπλήρωσε τίτλο και ανέβασε την εικόνα.",
      createAddPages: "Δημιουργία",
      editTitle: "Επεξεργασία:",
      packDetails: "Στοιχεία ζωγραφιάς",
      sheetImage: "Εικόνα ζωγραφικής (ασπρόμαυρη)",
      sheetImageNew: "Νέα εικόνα (προαιρετικό)",
      titleEn: "Τίτλος (Αγγλικά)",
      descriptionEn: "Περιγραφή (Αγγλικά)",
    },
  },

  en: {
    metaTitle: "Kidleido — Magic Worlds",
    metaDescription:
      "Magic worlds full of fairytales, heroes and coloring sheets for children.",
    brand: "Kidleido",

    nav: {
      login: "Log in",
      register: "Sign up",
      library: "Library",
      coloring: "Coloring",
      parent: "Parent portal",
      profiles: "Profile",
      admin: "Admin",
      adminColoring: "Coloring",
      logout: "Log out",
    },

    home: {
      welcome: "Welcome to Kidleido",
      tagline: "Magic Worlds",
      intro1:
        "A world where stories come alive, imagination has no limits, and every child can become part of the adventure.",
      intro2:
        "At Kidleido we create magic worlds full of fairytales, beloved heroes, creative activities and coloring sheets that children can enjoy at home, print, or use digitally.",
      intro3:
        "Every story is a new door into imagination — a way for children to discover friendship, kindness, courage, creativity and the joy of play.",
      cta: "Pick a world. Open a story. And let the magic begin.",
      goToLibrary: "Go to the Library 📚",
      registerParent: "Parent sign up",
      login: "Log in",
    },

    login: {
      title: "Log in 👋",
      wrongCredentials: "Wrong email or password. Try again.",
      email: "Email",
      password: "Password",
      submit: "Log in",
      noAccount: "Don't have an account?",
      signUpHere: "Sign up here",
    },

    register: {
      title: "Parent sign up 👨‍👩‍👧",
      haveAccount: "Already have an account?",
      loginHere: "Log in here",
      name: "Name",
      email: "Email",
      password: "Password (at least 6 characters)",
      creating: "Creating...",
      submit: "Create account",
      errorFields: "Fill in name, email and a password (at least 6 characters).",
      errorExists: "An account with this email already exists.",
    },

    profiles: {
      title: "Who's reading? 🧒",
      newProfile: "➕ New child profile",
      childName: "Child's name",
      createProfile: "Create profile",
    },

    profile: {
      title: "My profile 👤",
      history: "Purchase history",
      books: "Books",
      coloring: "Coloring",
      empty: "You haven't bought anything yet.",
      open: "Open",
    },

    library: {
      title: "Our Library 📚",
      all: "All",
      empty: "No books yet. Come back soon! 🌟",
      ages: "Ages",
      free: "Free",
    },

    paywall: {
      note:
        "Buy this book to read it — the purchase works for all the child profiles on your account.",
      buy: "Buy 🛒",
    },

    reader: {
      page: "page",
      back: "⬅ Back",
      next: "Next ➡",
      finish: "The End 🎉",
      pageLabel: "Page",
      of: "/",
    },

    parent: {
      title: "Parent portal 👨‍👩‍👧",
      newChild: "➕ New child profile",
      noChildren: "You haven't created any child profiles yet.",
      deleteProfile: "Delete profile",
      noBooks: "Hasn't read any book yet.",
      completed: "✅ Completed",
      pageProgress: "Page",
    },

    admin: {
      title: "Manage Books 🛠️",
      newBook: "➕ New book",
      pages: "pages",
      published: "Published",
      draft: "Draft",
      edit: "Edit",
      unpublish: "Unpublish",
      publish: "Publish",
      delete: "Delete",
      newBookTitle: "New Book 📖",
      errorTitleCover: "Fill in a title and upload a cover.",
      fieldTitle: "Title",
      fieldAuthor: "Author",
      fieldDescription: "Description",
      fieldCategory: "Category",
      fieldAgeMin: "Minimum age",
      fieldAgeMax: "Maximum age",
      fieldPrice: "Price (€)",
      fieldCover: "Cover (image)",
      fieldCoverNew: "New cover (optional)",
      createAddPages: "Create & add pages",
      editTitle: "Edit:",
      status: "Status:",
      publishHint: "The book is not visible in the library until you publish it.",
      bookDetails: "Book details",
      save: "Save",
      pagesCount: "Pages",
      order: "Order",
      deletePage: "Delete page",
      newPage: "➕ New page",
      errorPageImage: "An image is required for the page.",
      pageText: "Page text",
      pageImage: "Page image",
      addPage: "Add page",
      titleEn: "Title (English)",
      authorEn: "Author (English)",
      descriptionEn: "Description (English)",
      categoryEn: "Category (English)",
      pageTextEn: "Page text (English)",
      enHint: "Optional — if left empty, the original is shown.",
    },

    coloring: {
      galleryTitle: "Coloring 🎨",
      untitled: "Coloring page",
      free: "Free",
      empty: "No coloring sheets yet. Come back soon! 🌈",
      note:
        "Buy this coloring page — the purchase works for all the child profiles on your account.",
      buy: "Buy 🛒",
      sheet: "Sheet",
      download: "⬇ Download",
      print: "🖨 Print",
      colorDigitally: "🖌 Color online",
      close: "Close",
      brush: "Brush",
      eraser: "Eraser",
      clear: "Clear",
      downloadDrawing: "⬇ Download my drawing",
      downloadsRemaining: "{n} downloads left",
      limitReached: "You've reached the download limit (you can always view and print it online)",
    },

    adminColoring: {
      title: "Manage Coloring 🎨",
      newPack: "➕ New coloring page",
      newPackTitle: "New Coloring Page 🎨",
      errorTitleCover: "Fill in a title and upload the image.",
      createAddPages: "Create",
      editTitle: "Edit:",
      packDetails: "Coloring page details",
      sheetImage: "Coloring image (black & white)",
      sheetImageNew: "New image (optional)",
      titleEn: "Title (English)",
      descriptionEn: "Description (English)",
    },
  },
} as const;

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

export type Dict = DeepString<(typeof dictionaries)["el"]>;

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return value === "en" || value === "el" ? value : DEFAULT_LOCALE;
}

export async function setLocale(locale: Locale) {
  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function getDict(): Promise<Dict> {
  return dictionaries[await getLocale()] as Dict;
}

// Επιλέγει το κείμενο περιεχομένου ανά γλώσσα. Αν λείπει η μετάφραση (en κενό),
// επιστρέφει την αρχική γλώσσα (base).
export function pickText(
  locale: Locale,
  base: string,
  alt?: string | null
): string {
  if (locale === "en" && alt && alt.trim()) return alt;
  return base;
}
