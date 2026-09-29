import '@/styles/type.css';
import { Specimen } from '@/components/Specimen';

export const metadata = { title: 'Type', description: 'Inter for the interface, JetBrains Mono for identifiers.' };

export default function TypePage() {
  return <div className="doc"><Specimen name="type" /></div>;
}
