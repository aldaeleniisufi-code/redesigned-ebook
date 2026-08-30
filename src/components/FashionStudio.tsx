"use client";

import { useRef, useState } from "react";

export type FashionLabels = {
  title: string;
  subtitle: string;
  tabFace: string;
  tabHair: string;
  tabOutfit: string;
  tabShoes: string;
  tabAccessory: string;
  tabBackground: string;
  color: string;
  surprise: string;
  reset: string;
  save: string;
};

const SKIN = ["#F7C9A0", "#E0A878", "#B0764A", "#8A5A34"];
const HAIR_COLORS = ["#3B2A1E", "#111827", "#E8B84B", "#C0432B", "#8B5CF6", "#EC4899"];
const DRESS_COLORS = ["#E86A5A", "#8FD6C2", "#F4C95D", "#2E6DB4", "#8B5CF6", "#EC4899"];
const BACKGROUNDS = [
  { id: "cream", value: "#FFF3D9" },
  { id: "mint", value: "#CDEFE5" },
  { id: "blue", value: "#CFE2F6" },
  { id: "pink", value: "#F8D6E4" },
  { id: "purple", value: "#E5D8F7" },
];

const HAIR_STYLES = ["long", "bob", "ponytail", "curly"] as const;
const OUTFITS = ["dress", "skirt", "romper"] as const;
const SHOES = ["flats", "boots", "sneakers", "bare"] as const;
const ACCESSORIES = ["none", "crown", "wings", "wand", "bow"] as const;

type State = {
  skin: string;
  hairStyle: (typeof HAIR_STYLES)[number];
  hairColor: string;
  outfit: (typeof OUTFITS)[number];
  dressColor: string;
  shoes: (typeof SHOES)[number];
  accessory: (typeof ACCESSORIES)[number];
  bg: string;
};

const DEFAULT: State = {
  skin: SKIN[0],
  hairStyle: "long",
  hairColor: HAIR_COLORS[0],
  outfit: "dress",
  dressColor: DRESS_COLORS[0],
  shoes: "flats",
  accessory: "crown",
  bg: BACKGROUNDS[0].value,
};

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// darken a hex color by mixing toward black
function shade(hex: string, amt = 0.18) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * (1 - amt));
  const g = Math.round(((n >> 8) & 255) * (1 - amt));
  const b = Math.round((n & 255) * (1 - amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

type Tab = "face" | "hair" | "outfit" | "shoes" | "accessory" | "bg";

export default function FashionStudio({ labels }: { labels: FashionLabels }) {
  const [s, setS] = useState<State>(DEFAULT);
  const [tab, setTab] = useState<Tab>("hair");
  const svgRef = useRef<SVGSVGElement>(null);

  const set = (patch: Partial<State>) => setS((prev) => ({ ...prev, ...patch }));

  function surprise() {
    setS({
      skin: pick(SKIN),
      hairStyle: pick(HAIR_STYLES),
      hairColor: pick(HAIR_COLORS),
      outfit: pick(OUTFITS),
      dressColor: pick(DRESS_COLORS),
      shoes: pick(SHOES),
      accessory: pick(ACCESSORIES),
      bg: pick(BACKGROUNDS).value,
    });
  }

  function save() {
    const svg = svgRef.current;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 600, 800);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "kidleido-look.png";
      a.click();
    };
    img.src = url;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-brand-purple sm:text-3xl">
          {labels.title}
        </h1>
        <p className="text-foreground/70">{labels.subtitle}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_320px]">
        {/* ---------- Character ---------- */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-sm overflow-hidden rounded-3xl shadow-lg">
            <Doll ref={svgRef} s={s} />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={surprise}
              className="rounded-full bg-brand-pink px-5 py-2.5 text-sm font-bold text-white shadow transition hover:brightness-110"
            >
              {labels.surprise}
            </button>
            <button
              onClick={() => setS(DEFAULT)}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-purple shadow ring-1 ring-brand-purple/15 transition hover:bg-brand-purple/5"
            >
              {labels.reset}
            </button>
            <button
              onClick={save}
              className="rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-purple shadow transition hover:brightness-105"
            >
              {labels.save}
            </button>
          </div>
        </div>

        {/* ---------- Controls ---------- */}
        <div className="rounded-3xl bg-white p-4 shadow-md">
          {/* tabs */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {(
              [
                ["hair", "💇", labels.tabHair],
                ["outfit", "👗", labels.tabOutfit],
                ["shoes", "👟", labels.tabShoes],
                ["accessory", "👑", labels.tabAccessory],
                ["face", "😊", labels.tabFace],
                ["bg", "🌈", labels.tabBackground],
              ] as [Tab, string, string][]
            ).map(([id, emoji, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  tab === id
                    ? "bg-brand-purple text-white"
                    : "bg-brand-purple/8 text-brand-purple hover:bg-brand-purple/15"
                }`}
              >
                <span>{emoji}</span>
                {label}
              </button>
            ))}
          </div>

          {tab === "hair" && (
            <>
              <OptionRow
                options={HAIR_STYLES.map((id) => ({ id, node: <HairIcon style={id} color={s.hairColor} /> }))}
                selected={s.hairStyle}
                onSelect={(id) => set({ hairStyle: id })}
              />
              <Swatches
                label={labels.color}
                colors={HAIR_COLORS}
                selected={s.hairColor}
                onSelect={(c) => set({ hairColor: c })}
              />
            </>
          )}

          {tab === "outfit" && (
            <>
              <OptionRow
                options={OUTFITS.map((id) => ({ id, node: <OutfitIcon outfit={id} color={s.dressColor} /> }))}
                selected={s.outfit}
                onSelect={(id) => set({ outfit: id })}
              />
              <Swatches
                label={labels.color}
                colors={DRESS_COLORS}
                selected={s.dressColor}
                onSelect={(c) => set({ dressColor: c })}
              />
            </>
          )}

          {tab === "shoes" && (
            <OptionRow
              options={SHOES.map((id) => ({ id, node: <ShoeIcon shoes={id} color={s.dressColor} /> }))}
              selected={s.shoes}
              onSelect={(id) => set({ shoes: id })}
            />
          )}

          {tab === "accessory" && (
            <OptionRow
              options={ACCESSORIES.map((id) => ({ id, node: <AccessoryIcon accessory={id} /> }))}
              selected={s.accessory}
              onSelect={(id) => set({ accessory: id })}
            />
          )}

          {tab === "face" && (
            <Swatches
              label=""
              colors={SKIN}
              selected={s.skin}
              onSelect={(c) => set({ skin: c })}
              big
            />
          )}

          {tab === "bg" && (
            <Swatches
              label=""
              colors={BACKGROUNDS.map((b) => b.value)}
              selected={s.bg}
              onSelect={(c) => set({ bg: c })}
              big
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Controls ---------------- */

function OptionRow<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: { id: T; node: React.ReactNode }[];
  selected: T;
  onSelect: (id: T) => void;
}) {
  return (
    <div className="mb-3 grid grid-cols-4 gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onSelect(o.id)}
          className={`flex aspect-square items-center justify-center rounded-2xl bg-brand-purple/5 p-1.5 transition ${
            selected === o.id
              ? "ring-2 ring-brand-pink"
              : "ring-1 ring-transparent hover:bg-brand-purple/10"
          }`}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {o.node}
          </svg>
        </button>
      ))}
    </div>
  );
}

function Swatches({
  label,
  colors,
  selected,
  onSelect,
  big,
}: {
  label: string;
  colors: string[];
  selected: string;
  onSelect: (c: string) => void;
  big?: boolean;
}) {
  return (
    <div>
      {label && (
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-foreground/50">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            aria-label={c}
            className={`rounded-full transition ${big ? "h-11 w-11" : "h-9 w-9"} ${
              selected === c
                ? "ring-4 ring-brand-pink/40 scale-110"
                : "ring-2 ring-white hover:scale-105"
            }`}
            style={{ backgroundColor: c, boxShadow: "0 0 0 1px rgba(0,0,0,0.08)" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Icons (mini previews) ---------------- */

function HairIcon({ style, color }: { style: string; color: string }) {
  return (
    <>
      <circle cx="50" cy="52" r="24" fill="#F7C9A0" />
      {style === "long" && <path d="M24 46a26 26 0 0152 0v34H62V50a12 12 0 00-24 0v30H24z" fill={color} />}
      {style === "bob" && <path d="M24 48a26 26 0 0152 0v20H62V48a12 12 0 00-24 0v20H24z" fill={color} />}
      {style === "ponytail" && (
        <>
          <path d="M26 48a24 24 0 0148 0v6H26z" fill={color} />
          <ellipse cx="80" cy="60" rx="9" ry="18" fill={color} />
        </>
      )}
      {style === "curly" && (
        <>
          <circle cx="34" cy="40" r="12" fill={color} />
          <circle cx="50" cy="32" r="13" fill={color} />
          <circle cx="66" cy="40" r="12" fill={color} />
          <circle cx="30" cy="56" r="9" fill={color} />
          <circle cx="70" cy="56" r="9" fill={color} />
        </>
      )}
    </>
  );
}

function OutfitIcon({ outfit, color }: { outfit: string; color: string }) {
  if (outfit === "dress")
    return <path d="M38 28h24l14 50H24z" fill={color} />;
  if (outfit === "skirt")
    return (
      <>
        <rect x="38" y="28" width="24" height="26" rx="4" fill={color} />
        <path d="M34 54h32l8 28H26z" fill={shade(color)} />
      </>
    );
  return (
    <>
      <rect x="36" y="28" width="28" height="30" rx="6" fill={color} />
      <rect x="38" y="56" width="10" height="22" rx="4" fill={shade(color)} />
      <rect x="52" y="56" width="10" height="22" rx="4" fill={shade(color)} />
    </>
  );
}

function ShoeIcon({ shoes, color }: { shoes: string; color: string }) {
  if (shoes === "bare") return <text x="50" y="60" textAnchor="middle" fontSize="34">🦶</text>;
  const c = shoes === "sneakers" ? "#ffffff" : shade(color, 0.3);
  return (
    <>
      <path d="M28 58h20v8a4 4 0 01-4 4H28z" fill={c} stroke="#0002" />
      <path d="M52 58h20v12H56a4 4 0 01-4-4z" fill={c} stroke="#0002" />
      {shoes === "boots" && (
        <>
          <rect x="30" y="40" width="14" height="20" fill={c} />
          <rect x="56" y="40" width="14" height="20" fill={c} />
        </>
      )}
    </>
  );
}

function AccessoryIcon({ accessory }: { accessory: string }) {
  if (accessory === "none") return <text x="50" y="62" textAnchor="middle" fontSize="30">🚫</text>;
  if (accessory === "crown") return <text x="50" y="64" textAnchor="middle" fontSize="44">👑</text>;
  if (accessory === "wings") return <text x="50" y="64" textAnchor="middle" fontSize="44">🧚</text>;
  if (accessory === "wand") return <text x="50" y="64" textAnchor="middle" fontSize="42">🪄</text>;
  return <text x="50" y="64" textAnchor="middle" fontSize="42">🎀</text>;
}

/* ---------------- The Doll ---------------- */

const Doll = ({ ref, s }: { ref: React.Ref<SVGSVGElement>; s: State }) => {
  const skin = s.skin;
  const skinDark = shade(skin, 0.12);
  const dress = s.dressColor;
  const dressDark = shade(dress);
  const hair = s.hairColor;

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-full"
    >
      {/* background */}
      <rect width="300" height="400" fill={s.bg} />
      <g fill="#ffffff" opacity="0.5">
        <path d="M40 50l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" />
        <path d="M255 70l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" />
        <path d="M260 300l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" />
        <path d="M35 320l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" />
      </g>

      {/* wings (behind body) */}
      {s.accessory === "wings" && (
        <g fill="#ffffff" opacity="0.75" stroke="#8FD6C2" strokeWidth="3">
          <path d="M150 210C110 170 70 175 70 220s40 55 80 30z" />
          <path d="M150 210c40-40 80-35 80 10s-40 55-80 30z" />
        </g>
      )}

      {/* hair back */}
      {s.hairStyle === "long" && (
        <path d="M100 120C100 70 200 70 200 120v150h-28V130a22 22 0 00-44 0v140h-28z" fill={hair} />
      )}
      {s.hairStyle === "curly" && (
        <g fill={hair}>
          <circle cx="105" cy="120" r="26" />
          <circle cx="195" cy="120" r="26" />
          <circle cx="110" cy="180" r="20" />
          <circle cx="190" cy="180" r="20" />
        </g>
      )}
      {s.hairStyle === "ponytail" && (
        <ellipse cx="212" cy="150" rx="18" ry="40" fill={hair} />
      )}

      {/* legs */}
      <rect x="132" y="298" width="16" height="80" rx="8" fill={skin} />
      <rect x="152" y="298" width="16" height="80" rx="8" fill={skin} />

      {/* shoes */}
      {s.shoes !== "bare" && (
        <>
          <ShoeOnDoll x={140} color={s.shoes === "sneakers" ? "#ffffff" : dressDark} type={s.shoes} />
          <ShoeOnDoll x={160} color={s.shoes === "sneakers" ? "#ffffff" : dressDark} type={s.shoes} />
        </>
      )}

      {/* outfit */}
      {s.outfit === "dress" && (
        <path d="M118 175h64l26 130H92z" fill={dress} />
      )}
      {s.outfit === "skirt" && (
        <>
          <rect x="120" y="172" width="60" height="52" rx="10" fill={dress} />
          <path d="M108 220h84l16 85H92z" fill={dressDark} />
        </>
      )}
      {s.outfit === "romper" && (
        <>
          <rect x="116" y="172" width="68" height="70" rx="14" fill={dress} />
          <path d="M118 236h30l-4 44h-26z" fill={dressDark} />
          <path d="M152 236h30l4 44h-26z" fill={dressDark} />
        </>
      )}

      {/* arms */}
      <rect x="96" y="178" width="16" height="78" rx="8" fill={skin} transform="rotate(9 104 178)" />
      <rect x="188" y="178" width="16" height="78" rx="8" fill={skin} transform="rotate(-9 196 178)" />
      <circle cx="92" cy="256" r="9" fill={skin} />
      <circle cx="208" cy="256" r="9" fill={skin} />

      {/* wand in hand */}
      {s.accessory === "wand" && (
        <g>
          <rect x="205" y="200" width="6" height="58" rx="3" fill="#8B5A2B" transform="rotate(20 208 230)" />
          <text x="223" y="205" fontSize="30" textAnchor="middle">⭐</text>
        </g>
      )}

      {/* neck + head */}
      <rect x="141" y="150" width="18" height="20" fill={skinDark} />
      <circle cx="150" cy="120" r="48" fill={skin} />
      <circle cx="104" cy="122" r="8" fill={skin} />
      <circle cx="196" cy="122" r="8" fill={skin} />

      {/* face */}
      <circle cx="135" cy="118" r="5.5" fill="#2b2b2b" />
      <circle cx="165" cy="118" r="5.5" fill="#2b2b2b" />
      <circle cx="133" cy="116" r="1.8" fill="#fff" />
      <circle cx="163" cy="116" r="1.8" fill="#fff" />
      <circle cx="120" cy="132" r="7" fill="#E86A5A" opacity="0.35" />
      <circle cx="180" cy="132" r="7" fill="#E86A5A" opacity="0.35" />
      <path d="M138 138q12 12 24 0" stroke="#B04A3A" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* hair front / top */}
      {s.hairStyle === "long" && (
        <path d="M100 122C100 66 200 66 200 122c0-20-16-26-24-20-8-10-52-10-52 8-6-8-24-6-24 12z" fill={hair} />
      )}
      {s.hairStyle === "bob" && (
        <path d="M100 124C100 68 200 68 200 124v20h-14V118a36 36 0 00-72 0v26h-14z" fill={hair} />
      )}
      {s.hairStyle === "ponytail" && (
        <path d="M104 118C104 70 196 70 196 118c-8-14-30-18-46-18s-38 4-46 18z" fill={hair} />
      )}
      {s.hairStyle === "curly" && (
        <g fill={hair}>
          <circle cx="118" cy="92" r="18" />
          <circle cx="150" cy="82" r="20" />
          <circle cx="182" cy="92" r="18" />
        </g>
      )}

      {/* accessories on head */}
      {s.accessory === "crown" && (
        <path d="M120 84l10 14 20-22 20 22 10-14 4 20h-68z" fill="#F4C95D" stroke="#C9982E" strokeWidth="2" />
      )}
      {s.accessory === "bow" && (
        <g fill="#EC4899">
          <path d="M150 78l-22-12v24z" />
          <path d="M150 78l22-12v24z" />
          <circle cx="150" cy="78" r="7" />
        </g>
      )}
    </svg>
  );
};

function ShoeOnDoll({ x, color, type }: { x: number; color: string; type: string }) {
  return (
    <g>
      <path d={`M${x - 8} 372h16v${type === "boots" ? "-26" : "10"}h-16z`} fill={color} opacity="0.001" />
      <path d={`M${x - 9} 374h18a4 4 0 014 4v4h-26v-4a4 4 0 014-4z`} fill={color} stroke="#0003" />
      {type === "boots" && <rect x={x - 8} y="348" width="16" height="28" rx="4" fill={color} />}
    </g>
  );
}
