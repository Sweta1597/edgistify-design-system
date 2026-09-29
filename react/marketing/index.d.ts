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
}): JSX.Element;
