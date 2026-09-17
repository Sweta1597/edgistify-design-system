import '@/styles/menu.css';
import { Specimen } from '@/components/Specimen';
import { MenuDemo } from '@/components/demos/MenuDemo';

export const metadata = { title: 'Menu & Select', description: 'Five components, one floating panel.' };

export default function MenuPage() {
  return (
    <div className="doc">
      <Specimen name="menu" />
      <div className="wrap">
        <section>
          <div className="sec-head"><h2>In code</h2>
          <p className="sub">Live — open one and use the arrow keys. The highlight is driven by{' '}
          <code className="mono">aria-activedescendant</code>, so the pointer and the keyboard can
          never light up two different rows.</p></div>
          <MenuDemo code={`
function Demo() {
  const [value, setValue] = useState('blr-01');
  return (
    <Select
      searchable
      value={value}
      onChange={setValue}
      options={[
        { value: 'blr-01', label: 'BLR-01 Bommanahalli', meta: '2,140 SKUs' },
        { value: 'del-02', label: 'DEL-02 Bhiwandi', meta: '1,804 SKUs' },
        { value: 'hyd-03', label: 'HYD-03 Medchal', meta: '920 SKUs' },
        { value: 'mum-04', label: 'MUM-04 Panvel', meta: '3,006 SKUs', disabled: true },
      ]}
    />
  );
}
`} noInline={false} />
        </section>
      </div>
    </div>
  );
}
