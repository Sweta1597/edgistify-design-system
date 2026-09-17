import '@/styles/table.css';
import { Specimen } from '@/components/Specimen';
import { TableDemo } from '@/components/demos/TableDemo';

export const metadata = { title: 'Table', description: 'Dense, scannable rows with a sticky head.' };

export default function TablePage() {
  return (
    <div className="doc">
      <Specimen name="table" />
      <div className="wrap">
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
