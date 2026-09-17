import createMDX from '@next/mdx';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],

  // Without this Turbopack walks up looking for a lockfile and lands on
  // ~/Documents, which is itself an unrelated git repo. Pin the root.
  turbopack: { root: here },

  // The design system is a workspace sibling rather than a published package,
  // and it ships untranspiled JSX. Next has to compile it like app code.
  transpilePackages: ['@edgistify/design-system'],

  async headers() {
    return [{
      source: '/:path*',
      headers: [
        // Public by design — anyone with the link reads it, no login.
        // Not indexed: this is public by convenience, not for search.
        // Drop this header the day you want it found by Google.
        { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      ],
    }];
  },
};

// GFM gives us tables — the "when to use which variant" tables are the most
// useful thing on a component page, and plain MDX renders them as pipes.
// Named as a string, not imported: Turbopack serialises loader options and
// cannot carry a function across that boundary.
export default createMDX({
  options: { remarkPlugins: [['remark-gfm', {}]] },
})(nextConfig);
