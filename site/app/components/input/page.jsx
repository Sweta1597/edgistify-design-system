import '@/styles/input.css';
import { Specimen } from '@/components/Specimen';
import { InputDemo } from '@/components/demos/InputDemo';

export const metadata = { title: 'Input', description: 'Fields that own their label, hint and error.' };

export default function InputPage() {
  return (
    <div className="doc">
      <Specimen name="input" />
      <div className="wrap">
        <section>
          <div className="sec-head"><h2>In code</h2>
          <p className="sub">Live and editable. <code className="mono">Field</code> generates the id,
          points the label at the control and lists the hint and error in{' '}
          <code className="mono">aria-describedby</code> — the only way to get it wrong is not to use it.</p></div>
          <InputDemo code={`
<div style={{ display: 'grid', gap: 'var(--ed-space-4)', width: '100%', maxWidth: 380 }}>
  <Field label="Warehouse" hint="Where this rule applies.">
    <Select>
      <option>BLR-01 Bommanahalli</option>
      <option>DEL-02 Bhiwandi</option>
    </Select>
  </Field>
  <Field label="Minimum days to expiry" error="Must be a whole number of days.">
    <Input defaultValue="12.5" />
  </Field>
  <Checkbox label="Rule active" defaultChecked hint="Inactive rules are kept but never fire." />
</div>
`} />
        </section>
      </div>
    </div>
  );
}
