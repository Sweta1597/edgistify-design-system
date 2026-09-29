/* Four icons drawn to docs/icon-brief.md, to test that the brief is
   actually drawable and to preview the two-colour treatment.
   960 grid, y −960..0, 800 live area, 80 stroke, 80 radii.
   Two paths each: body (currentColor) then accent (--ed-icon-accent). */
export const DUO = {
  home: {
    /* Solid roof, so the accent is a real 22% of the drawn area rather
       than a sliver that disappears at 14px. */
    body:   'M220-500h520v300q0 33-23.5 56.5T660-120H540v-180q0-25-17.5-42.5T480-360q-25 0-42.5 17.5T420-300v180H300q-33 0-56.5-23.5T220-200v-300Z',
    accent: 'M446-872q14-11 34-11t34 11l332 266q19 15 8 38t-36 23H142q-25 0-36-23t8-38l332-266Z',
  },
  package: {
    /* Lid band reads as a carton; the accent is the tape down the seam. */
    body:   'M140-700h680v100H140v-100Zm40 140h600v360q0 33-23.5 56.5T700-140H260q-33 0-56.5-23.5T180-200v-360Z',
    accent: 'M420-700h120v560H420v-560Z',
  },
  scan: {
    body:   'M120-880h240v80H200v160h-80v-240Zm480 0h240v240h-80v-160H600v-80ZM120-320h80v160h160v80H120v-240Zm640 0h80v240H600v-80h160v-160Z',
    accent: 'M120-520h720v80H120v-80Z',
  },
  check: {
    /* The disc is the ACCENT and the tick is the BODY, not the other way
       round. Drawn the other way the tick sits on a white body, where
       teal-300 measures 1.85:1 and disappears. Rule 6 in the brief. */
    accentFirst: true,
    body:   'M429-321 254-496l57-57 118 118 244-244 57 57-301 301Z',
    accent: 'M480-880q166 0 283 117t117 283q0 166-117 283T480-80Q314-80 197-197T80-480q0-166 117-283t283-117Z',
  },
};
