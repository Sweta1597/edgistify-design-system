/* Nav icons drawn to docs/icon-brief.md: 960 grid, y −960..0, 800 live area.
   Body = currentColor, accent = --ed-icon-accent on its own path.
   In every one the accent forms part of the OUTER silhouette — a roof, an
   awning, a lid, a cargo box — so its edges read against the surface rather
   than against the white body. An accent fully enclosed by the body would
   have to clear white at 2.38:1, which teal-400 does not. */
export const NAV_DUO = {
  Dashboard: {
    accent: 'M480-880 860-580H100l380-300Z',
    body:   'M200-540h560v360q0 40-40 40H570v-190q0-20-20-20H410q-20 0-20 20v190H240q-40 0-40-40v-360Z',
  },
  B2C: {
    accent: 'M330-800h330v150H330v-150Z',
    body:   'M100-880h120l44 130h596l-118 330H360l-26 80h470v80H300q-46 0-67-37t-4-78l40-107-124-318h-45v-80Zm270 700q-29 0-49.5-20.5T300-250q0-29 20.5-49.5T370-320q29 0 49.5 20.5T440-250q0 29-20.5 49.5T370-180Zm340 0q-29 0-49.5-20.5T640-250q0-29 20.5-49.5T710-320q29 0 49.5 20.5T780-250q0 29-20.5 49.5T710-180Z',
  },
  'B2C Outward': {
    accent: 'M100-740h380v380H100v-380Z',
    body:   'M520-620h150q16 0 27 11l130 140q8 9 8 21v128H520v-300ZM80-300h800v-70H80v70Zm180 40q-33 0-56.5 23.5T180-180q0 33 23.5 56.5T260-100q33 0 56.5-23.5T340-180q0-33-23.5-56.5T260-260Zm420 0q-33 0-56.5 23.5T600-180q0 33 23.5 56.5T680-100q33 0 56.5-23.5T760-180q0-33-23.5-56.5T680-260Z',
  },
  B2B: {
    accent: 'M120-860h720l60 200H60l60-200Z',
    body:   'M160-620h640v420q0 40-40 40H600v-260H360v260H200q-40 0-40-40v-420Z',
  },
  Purchase: {
    accent: 'M100-820h760v160H100v-160Z',
    body:   'M160-620h640v420q0 40-40 40H200q-40 0-40-40v-420Z',
  },
  Kitting: {
    accent: 'M520-860h340v340H520v-340Z',
    body:   'M100-860h340v340H100v-340Zm0 420h340v340H100v-340Zm420 0h340v340H520v-340Z',
  },
  Inventory: {
    accent: 'M360-680h240v100H360v-100Z',
    body:   'M120-860h720v90H120v-90Zm0 280h720v90H120v-90Zm0 280h720v90H120v-90Zm0 280h720v90H120v-90Z',
  },
  'Master Edit': {
    accent: 'M420-880h120v270l-60-62-60 62v-270Z',
    body:   'M120-800h280q20 0 20 20v640q0 20-20 20H140q-20 0-20-20v-660Zm420 0h300q20 0 20 20v640q0 20-20 20H560q-20 0-20-20v-640q0-20 0-20Z',
  },
  Reports: {
    accent: 'M420-760h140v620H420v-620Z',
    body:   'M140-520h140v380H140v-380Zm560 200h140v180H700v-180Z',
  },
};
