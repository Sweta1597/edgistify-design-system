import '@/styles/card.css';
import { Specimen } from '@/components/Specimen';
import { CardDemo } from '@/components/demos/CardDemo';

export const metadata = { title: 'Card', description: 'A surface that groups things.' };

export default function CardPage() {
  return (
    <div className="doc">
      <Specimen name="card" />
      <div className="wrap">
        <section>
          <div className="sec-head"><h2>In code</h2>
          <p className="sub">Live and editable — this renders the component the package ships.</p></div>
          <CardDemo code={`
<Card style={{ maxWidth: 420 }}>
  <Card.Header
    title="Batch allocation"
    subtitle="BLR-01 Bommanahalli"
    actions={<Button size="sm" variant="ghost">Edit</Button>}
  />
  <Card.Body>
    Orders are allocated FEFO within the shelf-life constraint.
  </Card.Body>
  <Card.Footer spread>
    <span style={{ color: 'var(--ed-text-muted)', fontSize: 'var(--ed-text-sm)' }}>
      Updated 4 minutes ago
    </span>
    <Button size="sm">Run dry-run</Button>
  </Card.Footer>
</Card>
`} />
        </section>
      </div>
    </div>
  );
}
