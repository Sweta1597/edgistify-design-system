import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';

import { SiteNav } from '@/components/SiteNav';
import { ModeToggle } from '@/components/ModeToggle';

export const metadata = {
  title: { default: 'Edgistify Design System', template: '%s · Edgistify Design System' },
  description:
    'One visual language across the seller dashboard, the warehouse apps and the support docs.',
};

export default function RootLayout({ children }) {
  return (
    // Light is stamped in the HTML, not inferred. Dark and warehouse are
    // added by the toggle — never by the operating system.
    <html lang="en" data-theme="light">
      <body>
        <div className="layout">
          <SiteNav />
          <div>
            <header className="topbar"><ModeToggle /></header>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
