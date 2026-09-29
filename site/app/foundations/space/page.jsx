import '@/styles/space.css';
import { Specimen } from '@/components/Specimen';

export const metadata = { title: 'Space', description: 'A 4px grid, control heights sized for gloves.' };

export default function SpacePage() {
  return <div className="doc"><Specimen name="space" /></div>;
}
