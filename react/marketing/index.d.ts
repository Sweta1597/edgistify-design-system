import * as React from 'react';

type Div = React.HTMLAttributes<HTMLElement> & { as?: React.ElementType };

/* layout */
export declare function Container(props: Div & { narrow?: boolean }): JSX.Element;
export declare function Section(props: Div & {
  tone?: 'default' | 'tint' | 'band';
  tight?: boolean; ruled?: boolean; flushTop?: boolean;
  /** true = standard width, 'narrow' = reading width, false = no container */
  container?: boolean | 'narrow';
}): JSX.Element;
export declare function SectionHead(props: Div & {
  eyebrow?: React.ReactNode; title?: React.ReactNode; lede?: React.ReactNode;
  align?: 'left' | 'center' | 'row'; level?: 1 | 2 | 3;
}): JSX.Element;
export declare function Grid(props: Div & { cols?: 2 | 3 | 4 }): JSX.Element;
export declare function Split(props: Div & { top?: boolean; ratio?: string }): JSX.Element;
export declare function Actions(props: Div & { center?: boolean }): JSX.Element;

/* type */
export declare function Display(props: Div): JSX.Element;
export declare function Lede(props: Div): JSX.Element;
export declare function Eyebrow(props: Div & { plain?: boolean }): JSX.Element;
export declare function Prose(props: Div): JSX.Element;

/* honesty */
/** The honest placeholder: a dashed slot, never an invented figure. */
export declare function Pending(props: Div & { dots?: boolean }): JSX.Element;

/* tile */
export declare function Tile(props: Div & {
  icon?: React.ReactNode; num?: React.ReactNode; title?: React.ReactNode; body?: React.ReactNode;
  list?: React.ReactNode[]; foot?: React.ReactNode; tint?: boolean; link?: boolean; titleAs?: React.ElementType;
}): JSX.Element;
export declare function More(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { cover?: boolean; as?: React.ElementType }): JSX.Element;

/* chip */
export declare function Chip(props: Div & { pressed?: boolean; current?: boolean; href?: string }): JSX.Element;
export declare function Chips(props: Div): JSX.Element;

/* brand */
export declare function Wordmark(props: Div & { size?: 'sm' | 'lg'; href?: string }): JSX.Element;
export declare function UtilityBar(props: { links: { label: string; href: string }[] }): JSX.Element;

/* hero + configurator */
export declare function Hero(props: {
  eyebrow?: React.ReactNode; title: React.ReactNode; lede?: React.ReactNode; actions?: React.ReactNode;
  aside?: React.ReactNode; note?: React.ReactNode; children?: React.ReactNode;
  /** 'bento': copy column stretches to the aside, a LogoMarquee child sits at its foot. */
  variant?: 'bento';
  /** 'center' centres the copy; with no aside the column spans the container. */
  align?: 'center';
  /** The lede's element, e.g. 'h2' when it is the page's second heading. Default p. */
  ledeAs?: keyof JSX.IntrinsicElements;
}): JSX.Element;
export declare function ConfigPanel(props: Div & { title?: React.ReactNode; hint?: React.ReactNode }): JSX.Element;
export declare function ConfigQuestion(props: { label: React.ReactNode; hint?: React.ReactNode; htmlFor?: string; children?: React.ReactNode }): JSX.Element;
export declare function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element;

/* live flow */
export interface FlowEvent { src: string; sys?: boolean; text: React.ReactNode; status?: React.ReactNode }
export declare function Flow(props: Div & { title?: string; live?: string | false; events: FlowEvent[]; note?: React.ReactNode; animate?: boolean }): JSX.Element;

/* setup result */
export declare function SetupCard(props: Div & {
  k?: React.ReactNode; title?: React.ReactNode;
  services?: { name: string; why: React.ReactNode }[]; notes?: React.ReactNode[];
  proof?: React.ReactNode; actions?: React.ReactNode; foot?: React.ReactNode;
}): JSX.Element;

/* proof */
export interface BentoItem { image?: string; alt?: string; label?: React.ReactNode; children?: React.ReactNode }
export declare function BentoTile(props: React.HTMLAttributes<HTMLElement> & BentoItem & { rings?: boolean }): JSX.Element;
export declare function BentoHub(props: { children?: React.ReactNode }): JSX.Element;
export declare function BentoOrbit(props: { items: { name: string; src?: string }[]; slots?: number; duration?: number; label?: string }): JSX.Element | null;
/** Three blocks stacked vertically, joined by moving rings centred on the middle one. Hover the top or bottom block to grow it. */
export declare function Bento(props: Div & { items?: BentoItem[]; orbit?: { name: string; src?: string }[]; /** tiles round the ring (default 12); fewer for a small bento */ orbitSlots?: number; tone?: 'dark' | 'light'; /** ms per block in the auto loop; false stops it */ cycle?: number | false }): JSX.Element;
/** A product-screen frame; without `image`, a dashed slot naming the screenshot. */
export declare function Screen(props: Div & { image?: string; alt?: string; label?: React.ReactNode }): JSX.Element;
/** A system drawn as a small product card: name, line, up to three capabilities as a tree. */
export declare function SystemCard(props: Div & { icon?: React.ReactNode; name: React.ReactNode; line?: React.ReactNode; nodes?: React.ReactNode[] }): JSX.Element;
/** Columns under a small label, each with a hairline on top. */
export declare function RuledColumns(props: Div & { label?: React.ReactNode; items: { title: React.ReactNode; body?: React.ReactNode; href?: string; linkLabel?: React.ReactNode }[] }): JSX.Element;
/** Open loop against closed loop; the closed row draws its return path. */
export declare function LoopCompare(props: Div & { open?: { label: React.ReactNode; steps: React.ReactNode[]; end?: React.ReactNode }; closed?: { label: React.ReactNode; steps: React.ReactNode[]; back?: React.ReactNode } }): JSX.Element;
export declare function LogoMarquee(props: Div & { label?: React.ReactNode; logos: { name: string; src?: string }[]; speed?: number; /** 'strip': Stripe's band — equal cells between hairlines, no fade, no label */ variant?: 'strip' }): JSX.Element | null;
export declare function LogoStrip(props: { logos: { name: string; src?: string; href?: string }[]; note?: React.ReactNode }): JSX.Element;
export declare function StatStrip(props: { stats: { value: React.ReactNode; caption: React.ReactNode; verified?: boolean }[] }): JSX.Element;
export declare function Press(props: { label?: string; items: { name: string; href?: string }[] }): JSX.Element;

/* services */
export declare function ServiceStack(props: { children?: React.ReactNode; platform?: React.ReactNode }): JSX.Element;
export declare function ServiceCard(props: Div & {
  icon?: React.ReactNode; name: string; outcome?: React.ReactNode; bullets?: React.ReactNode[];
  metric?: { value: React.ReactNode; caption: React.ReactNode }; href?: string; exploreLabel?: string;
  cta?: React.ReactNode; recommended?: boolean; dim?: boolean;
}): JSX.Element;
export declare function Platform(props: {
  badge?: React.ReactNode; title: React.ReactNode; body?: React.ReactNode;
  modules?: { name: string; note?: string }[];
  apex?: { eyebrow: React.ReactNode; body: React.ReactNode; link?: React.ReactNode };
  link?: React.ReactNode;
}): JSX.Element;

/* argument */
export declare function LoopDiagram(props: {
  open: { who: string; chain: string[]; stop?: string };
  closed: { who: string; chain: string[]; back?: string };
}): JSX.Element;
export declare function Definition(props: { term: React.ReactNode; id?: string; children?: React.ReactNode }): JSX.Element;

/* results */
export declare function ResultCard(props: { who: React.ReactNode; value?: React.ReactNode; verified?: boolean; caption?: React.ReactNode; href?: string; linkLabel?: string }): JSX.Element;
export declare function VideoPlaceholder(props: { title: string; note?: React.ReactNode }): JSX.Element;

/* network */
export declare function Network(props: { cities: { name: string; count?: React.ReactNode; verified?: boolean }[]; mapLabel?: string; children?: React.ReactNode }): JSX.Element;

/* steps, pricing, faq */
export declare function Steps(props: { steps: { title: string; body: React.ReactNode; duration?: React.ReactNode }[] }): JSX.Element;
export declare function PricingCard(props: { audience: React.ReactNode; title: React.ReactNode; body: React.ReactNode }): JSX.Element;
export declare function PricingRule(props: { children?: React.ReactNode }): JSX.Element;
export declare function Faq(props: { items: { q: React.ReactNode; a: React.ReactNode; open?: boolean }[] }): JSX.Element;

/* closing */
export declare function CtaBand(props: { eyebrow?: React.ReactNode; title: React.ReactNode; lede?: React.ReactNode; actions?: React.ReactNode; note?: React.ReactNode }): JSX.Element;
export declare function Doors(props: { doors: { k: React.ReactNode; title: React.ReactNode; body: React.ReactNode; href: string }[] }): JSX.Element;
export declare function Footer(props: {
  description?: React.ReactNode;
  columns: { title: string; links: { label: string; href: string; tag?: string }[] }[];
  legal?: { legalName: string; address: string; phone?: string; email?: string; grievance?: string };
  links?: { label: string; href: string }[];
  copyright?: React.ReactNode;
  /** A visual under the brand description, e.g. a compact <Bento className="ed-mk-bento--footer" />. */
  art?: React.ReactNode;
  /** light (default) | ink, for a page that is dark to the bottom. */
  tone?: 'light' | 'ink';
}): JSX.Element;

/* backdrop */
/** A wireframe wave surface in teal for a `.ed-mk-glow` section. Deterministic inline SVG. */
export declare function WaveMesh(props: React.SVGAttributes<SVGSVGElement> & { lines?: number; width?: number; height?: number }): JSX.Element;

/* explorer */
export declare function Explorer(props: Div): JSX.Element;
export declare function ExplorerNav(props: {
  label?: string;
  groups: { label?: string; items: { id: string; title: string }[] }[];
  current?: string;
  onSelect?: (id: string) => void;
  /** Render items as links (crawlable); onSelect still intercepts the click. */
  hrefFor?: (item: { id: string; title: string }) => string;
}): JSX.Element;
export declare function ExplorerPanel(props: Div & { eyebrow?: React.ReactNode; title?: React.ReactNode; lede?: React.ReactNode; cols?: 2 | 3 }): JSX.Element;
/** Wrap several ExplorerPanels in a div.ed-mk-explorer__stream to stack them beside a fixed list. */
export declare function FeatureCard(props: Div & { title?: React.ReactNode; body?: React.ReactNode; figure?: React.ReactNode }): JSX.Element;

/** Image on top, title and a line below; lifts and lights up on hover when it is a link. */
export declare function ShowcaseCard(props: Div & { title: React.ReactNode; body?: React.ReactNode; image?: string; alt?: string; /** Replaces the image with any node (an illustration, a live figure) on a dark ground. */ media?: React.ReactNode; href?: string }): JSX.Element;
/** Pointer handler that makes the ShowcaseCard's edge light follow the cursor. */
export declare function spotlight(e: React.PointerEvent<HTMLElement>): void;
