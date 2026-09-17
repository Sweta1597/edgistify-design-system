import '@/styles/modal.css';
import { Specimen } from '@/components/Specimen';
import { ModalDemo } from '@/components/demos/ModalDemo';

export const metadata = { title: 'Modal', description: 'A native <dialog>, so the platform does the hard parts.' };

export default function ModalPage() {
  return (
    <div className="doc">
      <Specimen name="modal" />
      <div className="wrap">
        <section>
          <div className="sec-head"><h2>In code</h2>
          <p className="sub">Live — open it, then press Escape or Tab around the edges. The focus trap,
          the top layer, the inertness of everything behind and returning focus on close are all the
          browser's, not ours.</p></div>
          <ModalDemo code={`
function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>New kit order</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="New kit order" ruled>
        <ModalBody>
          <Field label="Warehouse">
            <Select>
              <option>BLR-01 Bommanahalli</option>
              <option>DEL-02 Bhiwandi</option>
            </Select>
          </Field>
          <Field label="Quantity"><Input defaultValue="50" /></Field>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Create order</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
render(<Demo />);
`} />
        </section>
      </div>
    </div>
  );
}
