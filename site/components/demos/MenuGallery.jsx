'use client';

import { useState } from 'react';
import { Menu, Select, MultiSelect, CascadeSelect, TreeSelect } from '@edgistify/design-system/react/Menu';
import { Button } from '@edgistify/design-system/react/Button';

const SUPPLIERS = [
  ['vasanth', 'Vasanth & Co', 'Bengaluru · 12 SKUs'], ['deccan', 'Deccan Supply', 'Hyderabad · 48 SKUs'],
  ['coastal', 'Coastal Foods', 'Mangaluru · 7 SKUs'], ['metro', 'Metro Retail', 'Bengaluru · 130 SKUs'],
  ['lakeview', 'Lakeview Mart', 'Mysuru · 22 SKUs'], ['anand', 'Anand Traders', 'Hubballi · 61 SKUs'],
  ['nilgiri', 'Nilgiri Stores', 'Chennai · 19 SKUs'], ['techdepot', 'TechDepot Pvt Ltd', 'Pune · 204 SKUs'],
].map(([value, label, meta]) => ({ value, label, meta }));

const CHANNELS = [
  ['amazon', 'Amazon'], ['flipkart', 'Flipkart'], ['myntra', 'Myntra'], ['ajio', 'Ajio'],
  ['nykaa', 'Nykaa'], ['shopify', 'Own site (Shopify)'], ['b2b', 'B2B direct'], ['quick', 'Quick commerce'],
].map(([value, label]) => ({ value, label }));

const BINS = [
  { value: 'BLR-01', label: 'BLR-01 · Bommanahalli', children: [
    { value: 'A', label: 'Zone A · Ambient', children: [
      { value: 'A-12', label: 'Aisle A-12', children: [
        { value: 'A-12-01', label: 'A-12-01' }, { value: 'A-12-02', label: 'A-12-02' }, { value: 'A-12-03', label: 'A-12-03' }]},
      { value: 'A-03', label: 'Aisle A-03', children: [
        { value: 'A-03-19', label: 'A-03-19' }, { value: 'A-03-20', label: 'A-03-20' }]}]},
    { value: 'C', label: 'Zone C · Cold', children: [
      { value: 'C-04', label: 'Aisle C-04', children: [
        { value: 'C-04-11', label: 'C-04-11' }, { value: 'C-04-12', label: 'C-04-12' }]}]}]},
  { value: 'HYD-01', label: 'HYD-01 · Medchal', children: [
    { value: 'B', label: 'Zone B · Bulk', children: [
      { value: 'B-21', label: 'Aisle B-21', children: [{ value: 'B-21-07', label: 'B-21-07' }]}]}]},
];

const CATS = [
  { value: 'apparel', label: 'Apparel', children: [
    { value: 'apparel-tops', label: 'Tops', children: [
      { value: 'apparel-tops-tees', label: 'T-shirts', meta: '412' },
      { value: 'apparel-tops-shirts', label: 'Shirts', meta: '188' }]},
    { value: 'apparel-bottoms', label: 'Bottoms', children: [
      { value: 'apparel-bottoms-jeans', label: 'Jeans', meta: '96' }]}]},
  { value: 'grocery', label: 'Grocery', children: [
    { value: 'grocery-snacks', label: 'Snacks', meta: '240' },
    { value: 'grocery-bev', label: 'Beverages', children: [
      { value: 'grocery-bev-hot', label: 'Tea & coffee', meta: '77' },
      { value: 'grocery-bev-cold', label: 'Cold drinks', children: [
        { value: 'grocery-bev-cold-juice', label: 'Juices', meta: '31' }]}]}]},
  { value: 'home', label: 'Home & kitchen', meta: '158' },
];

const MENU_ITEMS = (run) => [
  { label: 'Open order', onSelect: () => run('Open order') },
  { label: 'Split into shipments', hint: '2 available', onSelect: () => run('Split into shipments') },
  { label: 'Reassign picker', shortcut: '⌘R', onSelect: () => run('Reassign picker') },
  { type: 'separator' },
  { label: 'Print pick list', shortcut: '⌘P', onSelect: () => run('Print pick list') },
  { label: 'Export row', shortcut: '⌘E', onSelect: () => run('Export row') },
  { type: 'separator' },
  { label: 'Cancel order', danger: true, onSelect: () => run('Cancel order') },
];

/* The specimen's five demos, driven by the real components. Each one reports
   its value underneath, as the specimen did — the point of the section is
   that the five differ in what an item MEANS, and the value shows it. */
export function MenuGallery() {
  const [ran, setRan] = useState(null);
  const [supplier, setSupplier] = useState();
  const [channels, setChannels] = useState(['amazon', 'flipkart']);
  const [path, setPath] = useState([]);
  const [cat, setCat] = useState(null);

  return (
    <>
      <div className="stage">
        <div className="lbl">Menu — actions</div>
        <Menu trigger={<Button variant="secondary">Row actions</Button>} items={MENU_ITEMS(setRan)} />
        <p className="out">{ran ? <>ran: <b>{ran}</b></> : 'nothing chosen yet'}</p>
      </div>

      <div className="stage">
        <div className="lbl">Single select — searchable</div>
        <Select searchable options={SUPPLIERS} value={supplier} onChange={setSupplier}
                placeholder="Select supplier…" />
        <p className="out">value: <b>{supplier ?? '—'}</b></p>
      </div>

      <div className="stage">
        <div className="lbl">Multi select — chips, then a count</div>
        <MultiSelect searchable maxTokens={3} options={CHANNELS} value={channels}
                     onChange={setChannels} placeholder="Select channels…" />
        <p className="out">value: <b>[{channels.join(', ')}]</b></p>
      </div>

      <div className="stage">
        <div className="lbl">Cascade — the value is a path</div>
        <CascadeSelect leafOnly options={BINS} value={path} onChange={setPath}
                       placeholder="Select bin…" />
        <p className="out">path: <b>{path.length ? `[${path.join(', ')}]` : '—'}</b></p>
      </div>

      <div className="stage">
        <div className="lbl">Tree — one node in a hierarchy</div>
        <TreeSelect options={CATS} value={cat} onChange={setCat}
                    defaultExpanded={['apparel']} placeholder="Select category…" />
        <p className="out">value: <b>{cat ?? '—'}</b></p>
      </div>
    </>
  );
}
