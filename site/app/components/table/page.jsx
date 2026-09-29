import '@/styles/table.css';
import { Specimen } from '@/components/Specimen';
import { TableDemo } from '@/components/demos/TableDemo';
import { ManagedTable } from '@/components/demos/ManagedTable';
import '@/styles/compare.css';

export const metadata = { title: 'Table', description: 'Dense, scannable rows with a sticky head.' };

export default function TablePage() {
  return (
    <div className="doc">
      <Specimen name="table" />
      <div className="wrap">
        <section>
          <div className="sec-head"><h2>Two kinds of table</h2>
          <p className="sub">The one above is <strong>fixed</strong>: somebody chose the column order and it
          is the same for everyone. The one below is <strong>managed</strong> — the person reading it pins
          the columns they need in view and drags the rest into the order they think in. Everything else is
          the same table underneath: density, zebra, severity, sticky head.</p></div>

          <ManagedTable />

          <div className="note">
            <span className="k">KEYBOARD</span>
            <div>
              <p>Drag is the second way in, never the only one. Tab to a grip and press
              <strong> ← / →</strong> to move that column; the header takes a brand outline while it is
              carried, because there is no cursor to say so. A drag handle with no arrow-key path is a
              keyboard trap under WCAG 2.1.1, and it is the failure almost every reorderable table ships with.</p>
              <p>Focus follows the <em>column</em>, not the slot — otherwise the second arrow press moves
              whatever slid into the position you just left.</p>
            </div>
          </div>

          <div className="note">
            <span className="k">PINNING</span>
            <div>
              <p>Pinned columns are always leftmost, whatever the drag order says. A pinned column floating
              in the middle would stick to the left edge anyway and land on top of whatever is actually
              there.</p>
              <p>The <code className="mono">left</code> offsets cannot live in CSS — which columns are
              pinned changes at runtime — so they are measured from the rendered header and written inline.
              Only the <strong>last</strong> pinned column carries the edge; a rule after every one turns the
              frozen block into a little table of its own.</p>
            </div>
          </div>

          <div className="note">
            <span className="k">QUIET</span>
            <p>The controls appear on hover and on focus. A pin and a grip on all twelve headers at once is a
            toolbar, not a table — but a <em>pinned</em> column keeps its pin visible, because that one is
            state rather than an offer.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>In code</h2>
          <p className="sub">Live and editable. <code className="mono">sort</code> sets{' '}
          <code className="mono">aria-sort</code>, and the arrow is drawn from that attribute — so
          what a screen reader announces and what you can see cannot disagree.</p></div>
          <TableDemo code={`
function SortableTable() {
  const [dir, setDir] = useState('ascending');
  const rows = ['SKU-2288-NVY-S', 'SKU-4417-BLK-M', 'SKU-9120-WHT-L'];
  const sorted = dir === 'ascending' ? rows : [...rows].reverse();
  return (
    <Table.Wrap>
      <Table zebra>
        <Table.Head>
          <Table.Tr>
            <Table.Th sort={dir} onSort={() => setDir(d => d === 'ascending' ? 'descending' : 'ascending')}>
              SKU
            </Table.Th>
            <Table.Th num>On hand</Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {sorted.map((sku, i) => (
            <Table.Tr key={sku}>
              <Table.Td id>{sku}</Table.Td>
              <Table.Td num>{[42, 17, 308][i]}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Body>
      </Table>
    </Table.Wrap>
  );
}
`} />
        </section>
      </div>
    </div>
  );
}
