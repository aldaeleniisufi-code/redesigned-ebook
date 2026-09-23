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
  {
    id: "issue-3",
    number: 3,
    season: { el: "Τεύχος 3", en: "Issue 3" },
    title: {
      el: "Η Άρια, η φύση και ο μαγικός σπόρος!",
      en: "Aria, nature and the magic seed!",
    },
    articles: [
      {
        id: "story",
        emoji: "🌱",
        kicker: { el: "Η ιστορία του μήνα", en: "Story of the month" },
        title: {
          el: "Η Άρια και ο Χρυσός Σπόρος",
          en: "Aria and the Golden Seed",
        },
        body: {
          el: "Η Άρια βρίσκει έναν μικρό χρυσό σπόρο. Με υπομονή, αγάπη και καλοσύνη, τον φροντίζει κάθε μέρα — μέχρι που συμβαίνει κάτι μαγικό! Μια ιστορία για την ελπίδα.",
          en: "Aria finds a tiny golden seed. With patience, love and kindness she cares for it every day — until something magical happens! A story about hope.",
        },
        href: "/library",
        cta: { el: "Διάβασέ το", en: "Read it" },
        className: "bg-brand-yellow text-brand-purple",
      },
      {
        id: "coloring",
        emoji: "🎨",
        kicker: { el: "Ζωγραφική", en: "Coloring" },
        title: {
          el: "Χρωμάτισε την Άρια!",
          en: "Color Aria!",
        },
        body: {
          el: "Δώσε χρώμα στην Άρια, στον αετό της και στον μαγικό κήπο — online ή τυπωμένο. Διάλεξε τα δικά σου χρώματα!",
          en: "Bring Aria, her eagle and the magic garden to life — online or printed. Pick your own colors!",
        },
        href: "/coloring",
        cta: { el: "Χρωμάτισε", en: "Color now" },
        className: "bg-brand-pink text-white",
      },
      {
        id: "craft",
        emoji: "🌻",
        kicker: { el: "Κατασκευή", en: "Craft" },
        title: { el: "Φύτεψε τον δικό σου σπόρο", en: "Plant your own seed" },
        body: {
          el: "1) Βάλε χώμα σε ένα ποτηράκι. 2) Φύτεψε έναν σπόρο (π.χ. φασόλι). 3) Πότισέ τον λίγο κάθε μέρα και βάλ' τον στον ήλιο. 4) Δες τον να μεγαλώνει! 🌿",
          en: "1) Fill a cup with soil. 2) Plant a seed (like a bean). 3) Water it a little each day and keep it in the sun. 4) Watch it grow! 🌿",
        },
        className: "bg-brand-teal text-brand-purple",
      },
      {
        id: "fact",
        emoji: "💡",
        kicker: { el: "Ξέρεις ότι…;", en: "Did you know?" },
        title: { el: "Τι χρειάζεται ένας σπόρος;", en: "What does a seed need?" },
        body: {
          el: "Ένας σπόρος θέλει τρία πράγματα για να μεγαλώσει: χώμα, νερό και ήλιο. Με λίγη υπομονή, γίνεται ένα ολόκληρο φυτό — σαν μαγεία της φύσης!",
          en: "A seed needs three things to grow: soil, water and sunlight. With a little patience it becomes a whole plant — like nature's magic!",
        },
        className: "bg-brand-blue text-white",
      },
      {
        id: "activity",
        emoji: "🖍️",
        kicker: { el: "Δραστηριότητα", en: "Activity" },
        title: { el: "Ζωγράφισε τον δικό σου κήπο", en: "Draw your own garden" },
        body: {
          el: "Άνοιξε τη Δημιουργική γωνιά και ζωγράφισε έναν κήπο γεμάτο λουλούδια, δέντρα και πεταλούδες — τον πιο όμορφο κήπο του κόσμου!",
          en: "Open the Creative corner and draw a garden full of flowers, trees and butterflies — the most beautiful garden in the world!",
        },
        href: "/app/draw",
        cta: { el: "Ζωγράφισε", en: "Draw" },
        className: "bg-white text-brand-purple ring-2 ring-brand-yellow",
      },
    ],
  },
  {
    id: "issue-4",
    number: 4,
    season: { el: "Τεύχος 4 · Φθινόπωρο", en: "Issue 4 · Autumn" },
    title: {
      el: "Παραμύθια πριν τον ύπνο & φθινοπωρινή μαγεία!",
      en: "Bedtime tales & autumn magic!",
    },
    articles: [
      {
        id: "story",
        emoji: "🌙",
        kicker: { el: "Η ιστορία του μήνα", en: "Story of the month" },
        title: {
          el: "Παραμύθια για γλυκά όνειρα",
          en: "Tales for sweet dreams",
        },
        body: {
          el: "Ήρθε το φθινόπωρο και τα βράδια είναι πιο μεγάλα — ιδανικά για ένα ζεστό παραμύθι πριν τον ύπνο! Χώσου στην κουβέρτα, άναψε ένα φως και ταξίδεψε με τους ήρωές μας σε μαγικούς κόσμους. 💫",
          en: "Autumn is here and the evenings are longer — perfect for a cozy bedtime story! Snuggle under a blanket, turn on a soft light and travel with our heroes to magical worlds. 💫",
        },
        href: "/library",
        cta: { el: "Διάβασέ το", en: "Read it" },
        className: "bg-brand-yellow text-brand-purple",
      },
      {
        id: "coloring",
        emoji: "🎨",
        kicker: { el: "Ζωγραφική", en: "Coloring" },
        title: {
          el: "Χρωμάτισε ένα μαγικό βράδυ",
          en: "Color a magical night",
        },
        body: {
          el: "Δώσε χρώμα σε φεγγάρια, αστέρια και ονειρεμένα τοπία της νύχτας — online ή τυπωμένο. Διάλεξε απαλά χρώματα για γλυκά όνειρα!",
          en: "Bring moons, stars and dreamy night scenes to life — online or printed. Pick soft colors for sweet dreams!",
        },
        href: "/coloring",
        cta: { el: "Χρωμάτισε", en: "Color now" },
        className: "bg-brand-pink text-white",
      },
      {
        id: "craft",
        emoji: "🏮",
        kicker: { el: "Κατασκευή", en: "Craft" },
        title: { el: "Φτιάξε ένα φαναράκι ονείρων", en: "Make a dream lantern" },
        body: {
          el: "1) Πάρε ένα άδειο βαζάκι. 2) Κόλλησε γύρω-γύρω χαρτόνι με τρυπούλες σε σχήμα αστεριού. 3) Βάλε μέσα ένα φωτάκι LED. 4) Σβήσε τα φώτα και δες τα αστέρια να λάμπουν! ✨",
          en: "1) Take an empty jar. 2) Wrap it with paper punched with little star holes. 3) Put an LED light inside. 4) Turn off the lights and watch the stars glow! ✨",
        },
        className: "bg-brand-teal text-brand-purple",
      },
      {
        id: "fact",
        emoji: "💡",
        kicker: { el: "Ξέρεις ότι…;", en: "Did you know?" },
        title: { el: "Γιατί βλέπουμε όνειρα;", en: "Why do we dream?" },
        body: {
          el: "Όταν κοιμόμαστε, το μυαλό μας «ταξιδεύει» και ταξινομεί όσα έμαθε μέσα στη μέρα — και μερικές φορές φτιάχνει όνειρα! Γι' αυτό ο ύπνος μάς κάνει πιο έξυπνους και χαρούμενους. 🌛",
          en: "When we sleep, our brain 'travels' and sorts everything we learned during the day — and sometimes it makes dreams! That's why sleep makes us smarter and happier. 🌛",
        },
        className: "bg-brand-blue text-white",
      },
      {
        id: "activity",
        emoji: "🖍️",
        kicker: { el: "Δραστηριότητα", en: "Activity" },
        title: { el: "Ζωγράφισε τον νυχτερινό ουρανό", en: "Draw the night sky" },
        body: {
          el: "Άνοιξε τη Δημιουργική γωνιά και ζωγράφισε έναν μαγικό νυχτερινό ουρανό — με φεγγάρι, αστέρια, σύννεφα και ό,τι ονειρεύεσαι!",
          en: "Open the Creative corner and draw a magical night sky — with a moon, stars, clouds and anything you dream of!",
        },
        href: "/app/draw",
        cta: { el: "Ζωγράφισε", en: "Draw" },
        className: "bg-white text-brand-purple ring-2 ring-brand-yellow",
      },
    ],
  },
  {
    id: "issue-5",
    number: 5,
    season: { el: "Τεύχος 5", en: "Issue 5" },
    title: {
      el: "Καλοσύνη & Φιλία — η πιο μεγάλη μαγεία!",
      en: "Kindness & Friendship — the greatest magic!",
    },
    articles: [
      {
        id: "story",
        emoji: "💛",
        kicker: { el: "Η ιστορία του μήνα", en: "Story of the month" },
        title: {
          el: "Η δύναμη της καλοσύνης",
          en: "The power of kindness",
        },
        body: {
          el: "Ο Πρίγκιπας, η Πριγκίπισσα και η Άρια μαθαίνουν ότι η πιο μεγάλη μαγεία δεν είναι τα ξόρκια… αλλά μια καλή πράξη! Όταν βοηθάμε έναν φίλο, όλος ο κόσμος γίνεται πιο όμορφος. 🤝",
          en: "The Prince, the Princess and Aria discover that the greatest magic isn't spells… it's a kind act! When we help a friend, the whole world becomes more beautiful. 🤝",
        },
        href: "/library",
        cta: { el: "Διάβασέ το", en: "Read it" },
        className: "bg-brand-yellow text-brand-purple",
      },
      {
        id: "coloring",
        emoji: "🎨",
        kicker: { el: "Ζωγραφική", en: "Coloring" },
        title: {
          el: "Χρωμάτισε τους φίλους",
          en: "Color the friends",
        },
        body: {
          el: "Δώσε χρώμα στους ήρωες και τους φίλους τους, καθώς παίζουν και βοηθούν ο ένας τον άλλον — online ή τυπωμένο!",
          en: "Bring the heroes and their friends to life as they play and help each other — online or printed!",
        },
        href: "/coloring",
        cta: { el: "Χρωμάτισε", en: "Color now" },
        className: "bg-brand-pink text-white",
      },
      {
        id: "craft",
        emoji: "💌",
        kicker: { el: "Κατασκευή", en: "Craft" },
        title: { el: "Φτιάξε μια κάρτα φιλίας", en: "Make a friendship card" },
        body: {
          el: "1) Δίπλωσε ένα χαρτί στη μέση. 2) Ζωγράφισε μια καρδιά ή τον φίλο σου. 3) Γράψε κάτι γλυκό μέσα. 4) Δώσ' την σε κάποιον που αγαπάς — και δες το χαμόγελό του! 💕",
          en: "1) Fold a paper in half. 2) Draw a heart or your friend. 3) Write something sweet inside. 4) Give it to someone you love — and watch them smile! 💕",
        },
        className: "bg-brand-teal text-brand-purple",
      },
      {
        id: "fact",
        emoji: "💡",
        kicker: { el: "Ξέρεις ότι…;", en: "Did you know?" },
        title: { el: "Η καλοσύνη… κολλάει!", en: "Kindness is contagious!" },
        body: {
          el: "Όταν κάνεις κάτι καλό, αυτός που το δέχεται νιώθει τόσο ωραία που θέλει κι εκείνος να κάνει κάτι καλό σε άλλον! Έτσι μια μικρή καλοσύνη ταξιδεύει σε όλο τον κόσμο. 🌍",
          en: "When you do something kind, the person who receives it feels so good that they want to be kind to someone else too! That's how one small kindness travels around the whole world. 🌍",
        },
        className: "bg-brand-blue text-white",
      },
      {
        id: "activity",
        emoji: "🖍️",
        kicker: { el: "Δραστηριότητα", en: "Activity" },
        title: { el: "Ζωγράφισε εσένα & τον καλύτερό σου φίλο", en: "Draw you & your best friend" },
        body: {
          el: "Άνοιξε τη Δημιουργική γωνιά και ζωγράφισε εσένα μαζί με τον καλύτερό σου φίλο — να κάνετε παρέα, να παίζετε και να γελάτε!",
          en: "Open the Creative corner and draw you together with your best friend — hanging out, playing and laughing!",
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
