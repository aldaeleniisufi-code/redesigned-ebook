import { cookies } from "next/headers";

export type Locale = "el" | "en";

const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "el";

const dictionaries = {
  el: {
    metaTitle: "Παιδικά Βιβλία",
    metaDescription: "Ψηφιακά παραμύθια και ιστορίες για παιδιά",
    brand: "Παιδικά Βιβλία",

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
      heading: "Μαγικές ιστορίες για μικρούς αναγνώστες!",
      subtitle:
        "Ανακάλυψε δεκάδες ψηφιακά παραμύθια, γεμάτα χρώματα, ήρωες και περιπέτειες. Διάβασε, γύρνα σελίδες και ζήσε κάθε ιστορία σαν παιχνίδι!",
      goToLibrary: "Πήγαινε στη Βιβλιοθήκη 📚",
      registerParent: "Εγγραφή Γονέα",
      login: "Είσοδος",
      feature1Title: "Πολύχρωμες ιστορίες",
      feature1Text: "Εικονογραφημένα παραμύθια για κάθε ηλικία.",
      feature2Title: "Προφίλ για κάθε παιδί",
      feature2Text: "Κάθε παιδί έχει το δικό του avatar και πρόοδο.",
      feature3Title: "Διαδραστική ανάγνωση",
      feature3Text: "Γύρισμα σελίδων με ζωντανή κίνηση.",
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

    library: {
      title: "Η Βιβλιοθήκη μας 📚",
      all: "Όλα",
      empty: "Δεν βρέθηκαν βιβλία ακόμα. Έλα ξανά σύντομα! 🌟",
      ages: "Ηλικίες",
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
    },

    coloring: {
      galleryTitle: "Ζωγραφιές 🎨",
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
    },
  },

  en: {
    metaTitle: "Kids Books",
    metaDescription: "Digital fairytales and stories for children",
    brand: "Kids Books",

    nav: {
      login: "Log in",
      register: "Sign up",
      library: "Library",
      coloring: "Coloring",
      parent: "Parent portal",
      profiles: "Profiles",
      admin: "Admin",
      adminColoring: "Coloring",
      logout: "Log out",
    },

    home: {
      heading: "Magical stories for little readers!",
      subtitle:
        "Discover dozens of digital fairytales, full of color, heroes and adventures. Read, turn the pages and live every story like a game!",
      goToLibrary: "Go to the Library 📚",
      registerParent: "Parent sign up",
      login: "Log in",
      feature1Title: "Colorful stories",
      feature1Text: "Illustrated fairytales for every age.",
      feature2Title: "A profile for each child",
      feature2Text: "Every child has their own avatar and progress.",
      feature3Title: "Interactive reading",
      feature3Text: "Page turns with lively animation.",
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

    library: {
      title: "Our Library 📚",
      all: "All",
      empty: "No books yet. Come back soon! 🌟",
      ages: "Ages",
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
    },

    coloring: {
      galleryTitle: "Coloring 🎨",
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
