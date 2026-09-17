import '@/styles/menu.css';
import { MenuGallery } from '@/components/demos/MenuGallery';
import { MenuDemo } from '@/components/demos/MenuDemo';

export const metadata = {
  title: 'Menu & Select',
  description: 'Five components, one floating panel — every one of them a native popover.',
};

const MATRIX = [
  ['Menu', 'role=menu / menuitem', 'Items are actions. Nothing is “selected” afterwards — the panel closes and something happened.'],
  ['Select', 'role=listbox / option', 'One value. Searchable, because the reason not to use a native select is usually length.'],
  ['MultiSelect', 'listbox + aria-multiselectable', 'Many values. Chips in the trigger, select-all in the footer, a live count.'],
  ['CascadeSelect', 'columns, each a listbox', 'The value is a path. Each column is the chosen parent’s children.'],
  ['TreeSelect', 'role=tree / treeitem', 'One node in a hierarchy, expanded in place with aria-level and aria-expanded.'],
];

export default function MenuPage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Component 06</div>
          <h1>Menu and Select</h1>
          <p className="lede">Five components, one floating panel. They differ in what an item <em>means</em>,
          not in how the panel behaves — and every panel is a native popover, so the browser owns the top
          layer, light dismissal and Escape.</p>
        </header>

        <section>
          <div className="sec-head"><h2>What an item means</h2>
          <p className="sub">The dashboard’s panels sit at <code className="mono">z-20</code>,{' '}
          <code className="mono">z-30</code> and <code className="mono">z-50</code> depending on who wrote them.
          In the top layer there is nothing to sort out.</p></div>
          <div className="matrix" id="matrix">
            {MATRIX.map(([n, r, d]) => (
              <div className="mx" key={n}>
                <div className="n">{n}</div>
                <div className="r">{r}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
          <div className="note">
            <span className="k">RULE 12</span>
            <p><strong>Don’t reach for these when a native <code className="mono">&lt;select&gt;</code> will
            do.</strong> The dashboard has 44 selects holding 88 options between them — under three each.
            Native is smaller, keyboard-complete, and on a phone it opens the OS picker, which beats
            anything we can draw.</p>
            <p>Use <code className="mono">Select</code> here when the list is long enough to need searching,
            or when an option needs more than a line of text. The styled native{' '}
            <code className="mono">&lt;select&gt;</code> shipped with the input family covers the rest.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Try them</h2>
          <p className="sub">All five are live. Open one and use the arrow keys — the highlight is driven by{' '}
          <code className="mono">aria-activedescendant</code>, so the pointer and the keyboard can never light
          up two different rows. Switch Desk/Warehouse at the top to see the rows grow.</p></div>
          <MenuGallery />
        </section>

        <section>
          <div className="sec-head"><h2>Cascade or tree?</h2>
          <p className="sub">Both hold hierarchical data. They answer different questions.</p></div>
          <div className="matrix" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
            <div className="mx"><div className="n">CascadeSelect</div>
              <div className="r">value = ['BLR-01','A','A-12','A-12-03']</div>
              <div className="d">Even depth, and every level is a real choice. Bin locations always have
              exactly four. You are narrowing down, and the path itself is the answer.</div></div>
            <div className="mx"><div className="n">TreeSelect</div>
              <div className="r">value = 'apparel-tops-tees'</div>
              <div className="d">Uneven depth, and only the node matters. A category tree stops where it
              stops. You are locating one thing, and its ancestors are context rather than part of
              the value.</div></div>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>API</h2>
          <p className="sub">Live and editable — this is the component the package ships.</p></div>
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
