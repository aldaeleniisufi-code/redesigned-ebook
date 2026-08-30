// Seed content for the Kidleido kids magazine. Each issue is authored here
// (bilingual); add new issues to the array to publish them in the app.

export type LocalizedText = { el: string; en: string };

export type MagazineArticle = {
  id: string;
  emoji: string;
  kicker: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  href?: string;
  cta?: LocalizedText;
  className: string;
};

export type MagazineIssue = {
  id: string;
  number: number;
  season: LocalizedText;
  title: LocalizedText;
  articles: MagazineArticle[];
};

export const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: "issue-1",
    number: 1,
    season: { el: "Τεύχος 1", en: "Issue 1" },
    title: {
      el: "Καλώς ήρθες στους Μαγικούς Κόσμους!",
      en: "Welcome to the Magic Worlds!",
    },
    articles: [
      {
        id: "story",
        emoji: "📖",
        kicker: { el: "Η ιστορία του μήνα", en: "Story of the month" },
        title: {
          el: "Η Πριγκίπισσα και το Αστέρι",
          en: "The Princess and the Star",
        },
        body: {
          el: "Ένα αστεράκι ξέχασε πώς να λάμπει… και μια καλόκαρδη πριγκίπισσα το βοηθά να θυμηθεί. Ένα παραμύθι για την καλοσύνη!",
          en: "A little star forgot how to shine… and a kind princess helps it remember. A tale about kindness!",
        },
        href: "/library",
        cta: { el: "Διάβασέ το", en: "Read it" },
        className: "bg-brand-yellow text-brand-purple",
      },
      {
        id: "fashion",
        emoji: "👗",
        kicker: { el: "Μόδα", en: "Fashion" },
        title: {
          el: "Ντύσε τον χαρακτήρα σου!",
          en: "Dress your character!",
        },
        body: {
          el: "Διάλεξε μαλλιά, φορέματα, χρώματα και αξεσουάρ — και φτιάξε το δικό σου μοναδικό look.",
          en: "Pick hair, dresses, colors and accessories — and create your own unique look.",
        },
        href: "/app/fashion",
        cta: { el: "Παίξε τώρα", en: "Play now" },
        className: "bg-brand-pink text-white",
      },
      {
        id: "craft",
        emoji: "✂️",
        kicker: { el: "Κατασκευή", en: "Craft" },
        title: { el: "Φτιάξε ένα χάρτινο αστέρι", en: "Make a paper star" },
        body: {
          el: "1) Κόψε ένα τετράγωνο χαρτί. 2) Δίπλωσέ το στη μέση δύο φορές. 3) Ζωγράφισε μισό αστέρι στην άκρη. 4) Κόψε και άνοιξέ το — έτοιμο το αστέρι σου! ⭐",
          en: "1) Cut a square of paper. 2) Fold it in half twice. 3) Draw half a star on the edge. 4) Cut and unfold — your star is ready! ⭐",
        },
        className: "bg-brand-teal text-brand-purple",
      },
      {
        id: "fact",
        emoji: "💡",
        kicker: { el: "Ξέρεις ότι…;", en: "Did you know?" },
        title: { el: "Τα αστέρια σχηματίζουν εικόνες!", en: "Stars make pictures!" },
        body: {
          el: "Αν ενώσεις τα αστέρια στον ουρανό, σχηματίζουν σχέδια που λέγονται αστερισμοί — σαν να ζωγραφίζεις με φως!",
          en: "If you connect the stars in the sky, they form shapes called constellations — like drawing with light!",
        },
        className: "bg-brand-blue text-white",
      },
      {
        id: "activity",
        emoji: "🖍️",
        kicker: { el: "Δραστηριότητα", en: "Activity" },
        title: { el: "Ζωγράφισε το όνειρό σου", en: "Draw your dream" },
        body: {
          el: "Άνοιξε τη Δημιουργική γωνιά και ζωγράφισε τον δικό σου μαγικό κόσμο — με αστέρια, κάστρα και ό,τι φαντάζεσαι!",
          en: "Open the Creative corner and draw your own magic world — with stars, castles and anything you imagine!",
        },
        href: "/app/draw",
        cta: { el: "Ζωγράφισε", en: "Draw" },
        className: "bg-white text-brand-purple ring-2 ring-brand-yellow",
      },
    ],
  },
  {
    id: "issue-2",
    number: 2,
    season: { el: "Τεύχος 2 · Φθινόπωρο", en: "Issue 2 · Autumn" },
    title: {
      el: "Φιλίες, δράκοι και φθινοπωρινά χρώματα!",
      en: "Friendships, dragons and autumn colors!",
    },
    articles: [
      {
        id: "story",
        emoji: "🐉",
        kicker: { el: "Η ιστορία του μήνα", en: "Story of the month" },
        title: {
          el: "Ο Πρίγκιπας Λέων και το Δρακάκι",
          en: "Prince Leon and the Little Dragon",
        },
        body: {
          el: "Ο Πρίγκιπας Λέων συναντά ένα δρακάκι που φαίνεται τρομακτικό… μα κρύβει μια μεγάλη έκπληξη. Μια ιστορία για τη φιλία!",
          en: "Prince Leon meets a dragon that looks scary… but hides a big surprise. A story about friendship!",
        },
        href: "/library",
        cta: { el: "Διάβασέ το", en: "Read it" },
        className: "bg-brand-yellow text-brand-purple",
      },
      {
        id: "fashion",
        emoji: "👕",
        kicker: { el: "Μόδα", en: "Fashion" },
        title: {
          el: "Νέο: ρούχα για αγόρια & κορίτσια!",
          en: "New: outfits for boys & girls!",
        },
        body: {
          el: "Το Fashion Studio απέκτησε νέους χαρακτήρες, περισσότερα ρούχα και πολλά νέα χρώματα. Φτιάξε το τέλειο φθινοπωρινό look!",
          en: "The Fashion Studio now has new characters, more outfits and lots of new colors. Make the perfect autumn look!",
        },
        href: "/app/fashion",
        cta: { el: "Παίξε τώρα", en: "Play now" },
        className: "bg-brand-pink text-white",
      },
      {
        id: "craft",
        emoji: "🍁",
        kicker: { el: "Κατασκευή", en: "Craft" },
        title: { el: "Φτιάξε ένα φθινοπωρινό δέντρο", en: "Make an autumn tree" },
        body: {
          el: "1) Ζωγράφισε έναν κορμό. 2) Βούτηξε το δάχτυλό σου σε κόκκινη, πορτοκαλί και κίτρινη μπογιά. 3) Πάτα «φυλλαράκια» γύρω από τα κλαδιά. Έτοιμο το φθινόπωρο! 🍂",
          en: "1) Draw a trunk. 2) Dip your finger in red, orange and yellow paint. 3) Dot 'leaves' around the branches. Autumn is ready! 🍂",
        },
        className: "bg-brand-teal text-brand-purple",
      },
      {
        id: "fact",
        emoji: "💡",
        kicker: { el: "Ξέρεις ότι…;", en: "Did you know?" },
        title: { el: "Γιατί πέφτουν τα φύλλα;", en: "Why do leaves fall?" },
        body: {
          el: "Το φθινόπωρο τα δέντρα «κοιμούνται» για τον χειμώνα. Ρίχνουν τα φύλλα τους για να εξοικονομήσουν νερό και ενέργεια — και το άνοιξη βγάζουν καινούρια!",
          en: "In autumn, trees get ready to 'sleep' for winter. They drop their leaves to save water and energy — and grow new ones in spring!",
        },
        className: "bg-brand-blue text-white",
      },
      {
        id: "activity",
        emoji: "🦋",
        kicker: { el: "Δραστηριότητα", en: "Activity" },
        title: { el: "Ζωγράφισε το αγαπημένο σου ζώο", en: "Draw your favorite animal" },
        body: {
          el: "Άνοιξε τη Δημιουργική γωνιά, διάλεξε χρώματα και ζωγράφισε το αγαπημένο σου ζωάκι — και βάλ' του κι ένα αστεράκι για φίλο!",
          en: "Open the Creative corner, pick your colors and draw your favorite animal — and give it a little star for a friend!",
        },
        href: "/app/draw",
        cta: { el: "Ζωγράφισε", en: "Draw" },
        className: "bg-white text-brand-purple ring-2 ring-brand-yellow",
      },
    ],
  },
];

export function getCurrentIssue(): MagazineIssue {
  return MAGAZINE_ISSUES[MAGAZINE_ISSUES.length - 1];
}

export function getIssueById(id?: string): MagazineIssue {
  return MAGAZINE_ISSUES.find((i) => i.id === id) ?? getCurrentIssue();
}
