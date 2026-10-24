// Seed content for the Kidleido kids magazine. Each issue is authored here
// (bilingual); add new issues to the array to publish them in the app.

export type LocalizedText = { el: string; en: string };
export type LocalizedParagraphs = { el: string[]; en: string[] };

export type MagazineArticle = {
  id: string;
  emoji: string;
  kicker: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  href?: string;
  cta?: LocalizedText;
  className: string;
  // Optional full story text, shown on /app/magazine/story/[issueId].
  fullStory?: LocalizedParagraphs;
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
  {
    id: "issue-6",
    number: 6,
    season: { el: "Τεύχος 6", en: "Issue 6" },
    title: {
      el: "Σεβασμός — η ομορφιά του να νοιάζεσαι!",
      en: "Respect — the beauty of caring!",
    },
    articles: [
      {
        id: "story",
        emoji: "🙏",
        kicker: { el: "Η ιστορία του μήνα", en: "Story of the month" },
        title: {
          el: "Ο σεβασμός κάνει θαύματα",
          en: "Respect works wonders",
        },
        body: {
          el: "Οι ήρωές μας μαθαίνουν ότι ο σεβασμός σημαίνει να ακούμε τους άλλους, να λέμε «σ' ευχαριστώ» και «παρακαλώ», και να φροντίζουμε τους μεγάλους, τους φίλους και τη φύση. Έτσι όλοι νιώθουν πολύτιμοι! 💖",
          en: "Our heroes learn that respect means listening to others, saying \"thank you\" and \"please\", and caring for elders, friends and nature. That way everyone feels valued! 💖",
        },
        href: "/app/magazine/story/issue-6",
        cta: { el: "Διάβασέ το", en: "Read it" },
        className: "bg-brand-yellow text-brand-purple",
        fullStory: {
          el: [
            "Στο μικρό χωριό κάτω από τα δέντρα, ζούσε ένα κορίτσι που το έλεγαν Άρια. Ήταν γεμάτη ενέργεια και πάντα βιαζόταν — τόσο πολύ, που καμιά φορά ξεχνούσε να πει «καλημέρα».",
            "Ένα πρωί, η Άρια πέρασε τρέχοντας δίπλα από τον γερο-κηπουρό χωρίς να τον χαιρετήσει. «Τι βιασύνη είναι αυτή!» γέλασε εκείνος και συνέχισε να ποτίζει τα λουλούδια του.",
            "Στο σχολείο, η Άρια άρπαξε την μπογιά από τον φίλο της τον Λέοντα χωρίς να ρωτήσει. Ο Λέων στεναχωρήθηκε και η ζωγραφιά τους έμεινε στη μέση.",
            "Το βράδυ, η γιαγιά της κάθισε δίπλα της και της είπε: «Άρια μου, ξέρεις ποια είναι η πιο μαγική λέξη στον κόσμο;» «Το “αβρακατάμπρα”;» ρώτησε η Άρια. Η γιαγιά χαμογέλασε: «Όχι… είναι ο σεβασμός.»",
            "«Ο σεβασμός», συνέχισε η γιαγιά, «σημαίνει να ακούς τους άλλους, να λες “παρακαλώ” και “σ’ ευχαριστώ”, και να φροντίζεις όσους αγαπάς — τους μεγάλους, τους φίλους, ακόμα και τη φύση.»",
            "Την άλλη μέρα, η Άρια δοκίμασε. Χαιρέτησε τον κηπουρό με ένα μεγάλο «Καλημέρα!» — κι εκείνος της χάρισε ένα τριαντάφυλλο. Ζήτησε ευγενικά την μπογιά από τον Λέοντα — κι εκείνος χαμογέλασε και τη μοιράστηκε.",
            "Το απόγευμα, μάζεψε τα σκουπίδια από το ρυάκι, για να μείνει καθαρό για τα ψαράκια. Ένιωσε την καρδιά της να γίνεται ζεστή σαν τον ήλιο.",
            "«Είχες δίκιο, γιαγιά!» είπε. «Ο σεβασμός κάνει θαύματα — όλοι γύρω μου χαμογελούν!» Και η γιαγιά την αγκάλιασε σφιχτά.",
            "Κι εσύ; Σε ποιον θα πεις σήμερα ένα ευγενικό «σ’ ευχαριστώ»; 💖",
          ],
          en: [
            "In a little village beneath the trees lived a girl named Aria. She was full of energy and always in a hurry — so much so that sometimes she forgot to say “good morning”.",
            "One morning, Aria rushed past the old gardener without a word. “What a hurry!” he chuckled, and kept watering his flowers.",
            "At school, Aria grabbed the paint from her friend Leo without asking. Leo felt sad, and their drawing was left unfinished.",
            "That evening, her grandmother sat beside her and said, “Aria, do you know the most magical word in the world?” “Abracadabra?” Aria asked. Grandma smiled: “No… it's respect.”",
            "“Respect,” Grandma went on, “means listening to others, saying ‘please’ and ‘thank you’, and caring for the ones you love — grown-ups, friends, even nature.”",
            "The next day, Aria gave it a try. She greeted the gardener with a big “Good morning!” — and he gave her a rose. She kindly asked Leo for the paint — and he smiled and shared it.",
            "In the afternoon, she picked up the litter by the stream, so it would stay clean for the little fish. She felt her heart grow warm like the sun.",
            "“You were right, Grandma!” she said. “Respect works wonders — everyone around me is smiling!” And Grandma hugged her tight.",
            "And you? Who will you say a kind “thank you” to today? 💖",
          ],
        },
      },
      {
        id: "coloring",
        emoji: "🎨",
        kicker: { el: "Ζωγραφική", en: "Coloring" },
        title: {
          el: "Χρωμάτισε μια πράξη σεβασμού",
          en: "Color an act of respect",
        },
        body: {
          el: "Δώσε χρώμα σε σκηνές όπου οι ήρωες βοηθούν, μοιράζονται και φροντίζουν ο ένας τον άλλον — online ή τυπωμένο!",
          en: "Bring to life scenes where the heroes help, share and care for one another — online or printed!",
        },
        href: "/coloring",
        cta: { el: "Χρωμάτισε", en: "Color now" },
        className: "bg-brand-pink text-white",
      },
      {
        id: "craft",
        emoji: "🫙",
        kicker: { el: "Κατασκευή", en: "Craft" },
        title: { el: "Το βαζάκι με τις ευγενικές λέξεις", en: "The kind-words jar" },
        body: {
          el: "1) Βρες ένα βαζάκι. 2) Κόψε χαρτάκια. 3) Σε κάθε χαρτάκι γράψε μια ευγενική λέξη ή φράση («σ' ευχαριστώ», «μπράβο!», «σ' αγαπώ»). 4) Κάθε μέρα τράβα ένα και πες το σε κάποιον! 💌",
          en: "1) Find a jar. 2) Cut little papers. 3) On each, write a kind word or phrase (\"thank you\", \"well done!\", \"I love you\"). 4) Each day pull one and say it to someone! 💌",
        },
        className: "bg-brand-teal text-brand-purple",
      },
      {
        id: "fact",
        emoji: "💡",
        kicker: { el: "Ξέρεις ότι…;", en: "Did you know?" },
        title: { el: "Οι «μαγικές λέξεις»", en: "The \"magic words\"" },
        body: {
          el: "Το «παρακαλώ», το «σ' ευχαριστώ» και το «συγγνώμη» λέγονται «μαγικές λέξεις» — γιατί κάνουν τους άλλους να χαμογελούν και δείχνουν σεβασμό. Δοκίμασέ τες σήμερα! ✨",
          en: "\"Please\", \"thank you\" and \"sorry\" are called the \"magic words\" — because they make others smile and show respect. Try them today! ✨",
        },
        className: "bg-brand-blue text-white",
      },
      {
        id: "activity",
        emoji: "🖍️",
        kicker: { el: "Δραστηριότητα", en: "Activity" },
        title: { el: "Ζωγράφισε κάποιον που σέβεσαι", en: "Draw someone you respect" },
        body: {
          el: "Άνοιξε τη Δημιουργική γωνιά και ζωγράφισε κάποιον που σέβεσαι και αγαπάς — τη γιαγιά, τον δάσκαλο, έναν φίλο — και πες του γιατί είναι σημαντικός για σένα!",
          en: "Open the Creative corner and draw someone you respect and love — a grandparent, a teacher, a friend — and tell them why they matter to you!",
        },
        href: "/app/draw",
        cta: { el: "Ζωγράφισε", en: "Draw" },
        className: "bg-white text-brand-purple ring-2 ring-brand-yellow",
      },
    ],
  },
  {
    id: "issue-7",
    number: 7,
    season: { el: "Τεύχος 7", en: "Issue 7" },
    title: {
      el: "Καθαριότητα — μισή αρχοντιά!",
      en: "Cleanliness — happy & healthy!",
    },
    articles: [
      {
        id: "story",
        emoji: "🧼",
        kicker: { el: "Η ιστορία του μήνα", en: "Story of the month" },
        title: {
          el: "Η μαγική δύναμη του σαπουνιού",
          en: "The magic power of soap",
        },
        body: {
          el: "Οι ήρωές μας ανακαλύπτουν ότι, πλένοντας τα χεράκια τους, διώχνουν τα μικρόβια και μένουν υγιείς και χαρούμενοι. Η καθαριότητα κάνει το σώμα, το σπίτι και τη φύση να λάμπουν! 💧",
          en: "Our heroes discover that washing their hands chases away germs and keeps them healthy and happy. Cleanliness makes your body, your home and nature sparkle! 💧",
        },
        href: "/app/magazine/story/issue-7",
        cta: { el: "Διάβασέ το", en: "Read it" },
        className: "bg-brand-yellow text-brand-purple",
        fullStory: {
          el: [
            "Ήταν ένα ηλιόλουστο πρωινό όταν ο μικρός Λέων γύρισε από το πάρκο με τα χέρια του γεμάτα χώμα και τα μάγουλά του κατακόκκινα από το παιχνίδι.",
            "«Ελάτε όλοι για φαγητό!» φώναξε η γιαγιά. Ο Λέων έτρεξε στο τραπέζι, μα η γιαγιά χαμογέλασε και είπε: «Πρώτα τα χεράκια μας, μικρέ μου ιππότη.»",
            "Ο Λέων γκρίνιαξε λιγάκι. «Μα δεν φαίνονται βρόμικα!» Η γιαγιά πήρε ένα σαπουνάκι που έλαμπε σαν μικρό αστέρι και του ψιθύρισε: «Αυτό εδώ έχει μαγική δύναμη. Δες…»",
            "Μόλις το σαπούνι άγγιξε το νερό, γέμισε φυσαλίδες που σπιθοβολούσαν! Μέσα σε κάθε φυσαλίδα, ο Λέων νόμιζε πως έβλεπε χιλιάδες μικροσκοπικά μικρόβια να τρέχουν να κρυφτούν.",
            "«Τα μικρόβια είναι τόσο μικρά που δεν τα βλέπουμε», εξήγησε η γιαγιά, «μα δεν τους αρέσει καθόλου το σαπούνι! Όταν τρίβεις τα χεράκια σου για είκοσι δευτερόλεπτα, φεύγουν όλα μακριά.»",
            "Ο Λέων έτριψε και ξανάτριψε, τραγουδώντας δύο φορές τα «Χρόνια Πολλά», όπως του είπε η γιαγιά. Οι φυσαλίδες χόρευαν στα δάχτυλά του σαν μικρά αστέρια.",
            "Όταν ξέπλυνε τα χέρια του, ήταν καθαρά, μυρωδάτα και λαμπερά. «Νιώθω σαν αληθινός ιππότης!» γέλασε.",
            "Από εκείνη τη μέρα, ο Λέων ήξερε το μυστικό: η καθαριότητα δεν είναι αγγαρεία — είναι μια μικρή μαγική συνήθεια που μας κρατά υγιείς και χαρούμενους. ✨",
            "Κι εσύ; Θυμάσαι να πλένεις τα χεράκια σου πριν το φαγητό; 💧",
          ],
          en: [
            "It was a sunny morning when little Leo came back from the park, his hands covered in dirt and his cheeks rosy from playing.",
            "“Come to the table, everyone!” called Grandma. Leo ran over, but Grandma smiled and said, “Hands first, my little knight.”",
            "Leo grumbled a little. “But they don't even look dirty!” Grandma picked up a bar of soap that shimmered like a tiny star and whispered, “This one has a magic power. Watch…”",
            "The moment the soap touched the water, it burst into sparkling bubbles! Inside each bubble, Leo thought he could see thousands of tiny germs running away to hide.",
            "“Germs are so small we can't see them,” Grandma explained, “but they do not like soap one bit! When you rub your hands for twenty seconds, they all wash away.”",
            "Leo scrubbed and scrubbed, singing “Happy Birthday” twice, just as Grandma said. The bubbles danced on his fingers like little stars.",
            "When he rinsed his hands, they were clean, sweet-smelling and bright. “I feel like a real knight!” he laughed.",
            "From that day on, Leo knew the secret: cleanliness isn't a chore — it's a little magic habit that keeps us healthy and happy. ✨",
            "And you? Do you remember to wash your hands before you eat? 💧",
          ],
        },
      },
      {
        id: "coloring",
        emoji: "🎨",
        kicker: { el: "Ζωγραφική", en: "Coloring" },
        title: {
          el: "Χρωμάτισε μια καθαρή, λαμπερή μέρα",
          en: "Color a clean, bright day",
        },
        body: {
          el: "Δώσε χρώμα σε σκηνές όπου οι ήρωες πλένουν χέρια, τακτοποιούν τα παιχνίδια και φροντίζουν τον χώρο τους — online ή τυπωμένο!",
          en: "Bring to life scenes where the heroes wash up, tidy their toys and care for their space — online or printed!",
        },
        href: "/coloring",
        cta: { el: "Χρωμάτισε", en: "Color now" },
        className: "bg-brand-pink text-white",
      },
      {
        id: "craft",
        emoji: "🧽",
        kicker: { el: "Κατασκευή", en: "Craft" },
        title: { el: "Ο πίνακας των καθαρών συνηθειών", en: "The clean-habits chart" },
        body: {
          el: "1) Πάρε ένα χαρτόνι. 2) Ζωγράφισε κουτάκια για κάθε μέρα. 3) Βάλε συνήθειες: «πλένω χέρια», «βουρτσίζω δόντια», «τακτοποιώ παιχνίδια». 4) Κάθε φορά που το κάνεις, κόλλα ένα αστεράκι! ⭐",
          en: "1) Take some cardboard. 2) Draw boxes for each day. 3) Add habits: \"wash hands\", \"brush teeth\", \"tidy toys\". 4) Each time you do one, stick on a star! ⭐",
        },
        className: "bg-brand-teal text-brand-purple",
      },
      {
        id: "fact",
        emoji: "💡",
        kicker: { el: "Ξέρεις ότι…;", en: "Did you know?" },
        title: { el: "20 δευτερόλεπτα μαγείας", en: "20 seconds of magic" },
        body: {
          el: "Για να φύγουν τα μικρόβια, πλένουμε τα χέρια μας για 20 δευτερόλεπτα — όσο να τραγουδήσεις δύο φορές το «Χρόνια Πολλά»! Δοκίμασέ το σήμερα! 🎵",
          en: "To wash the germs away, we scrub our hands for 20 seconds — about as long as singing \"Happy Birthday\" twice! Try it today! 🎵",
        },
        className: "bg-brand-blue text-white",
      },
      {
        id: "activity",
        emoji: "🖍️",
        kicker: { el: "Δραστηριότητα", en: "Activity" },
        title: { el: "Ζωγράφισε τη σούπερ-ρουτίνα σου", en: "Draw your super routine" },
        body: {
          el: "Άνοιξε τη Δημιουργική γωνιά και ζωγράφισε τη δική σου καθημερινή ρουτίνα καθαριότητας — από το πρωινό πλύσιμο μέχρι το βραδινό βούρτσισμα των δοντιών!",
          en: "Open the Creative corner and draw your own daily clean-up routine — from your morning wash to brushing your teeth at night!",
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
