/* Fails when the generated token layer no longer matches the authored CSS.
   The CSS is the source; dist/tokens.js and tokens/resolved.json are
   outputs. Without this check they would drift silently the first time
   somebody edits a colour, and a mobile app would ship last month's
   palette while the web shipped this month's. */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const files = ['dist/tokens.js', 'dist/tokens.d.ts', 'tokens/resolved.json'];
const before = files.map((f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8'));

execFileSync(process.execPath, [new URL('gen-tokens.mjs', import.meta.url).pathname], { stdio: 'pipe' });

const after = files.map((f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8'));
const stale = files.filter((f, i) => before[i] !== after[i]);

if (stale.length) {
  // Put the regenerated content back so the check has no side effect on a
  // dirty tree beyond reporting.
  console.error('STALE generated tokens:\n  ' + stale.join('\n  '));
  console.error('\nThe CSS changed but the generated token layer was not rebuilt.');
  console.error('Run: npm run gen:tokens   and commit the result.');
  process.exit(1);
}
console.log(`${files.length} generated token files are current`);
