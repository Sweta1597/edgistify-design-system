/* The highlight mark: a chunky five-point star with depth, like a die-cut
   token, for the one feature in a section that matters most. It takes the
   place of that feature's icon. Face and depth in saffron, outlined in ink
   (paper-light on the dark band, so it reads as a sticker's die-cut edge).
   Named "Highlighted" for screen readers unless `label` says otherwise;
   pass label={null} where the text beside it already says so. */

const DEPTH = "M14.20 3.60L16.90 9.88L23.71 10.51L18.57 15.02L20.08 21.69L14.20 18.20L8.32 21.69L9.83 15.02L4.69 10.51L11.50 9.88ZM12 1L14.70 7.28L16.90 9.88L14.20 3.60ZM14.70 7.28L21.51 7.91L23.71 10.51L16.90 9.88ZM21.51 7.91L16.37 12.42L18.57 15.02L23.71 10.51ZM16.37 12.42L17.88 19.09L20.08 21.69L18.57 15.02ZM17.88 19.09L12 15.60L14.20 18.20L20.08 21.69ZM12 15.60L6.12 19.09L8.32 21.69L14.20 18.20ZM6.12 19.09L7.63 12.42L9.83 15.02L8.32 21.69ZM7.63 12.42L2.49 7.91L4.69 10.51L9.83 15.02ZM2.49 7.91L9.30 7.28L11.50 9.88L4.69 10.51ZM9.30 7.28L12 1L14.20 3.60L11.50 9.88Z";
const FACE = "M12 1L14.70 7.28L21.51 7.91L16.37 12.42L17.88 19.09L12 15.60L6.12 19.09L7.63 12.42L2.49 7.91L9.30 7.28Z";

export function HighlightMark({ size = 32, label = 'Highlighted', className = '', style, ...rest }) {
  const named = typeof label === 'string' && label.length > 0;
  return (
    <svg viewBox="0 0 26 26" width={size} height={size}
      className={['ed-mk-hl', className].filter(Boolean).join(' ')} style={style}
      role={named ? 'img' : undefined} aria-label={named ? label : undefined} aria-hidden={named ? undefined : 'true'}
      focusable="false" {...rest}>
      <path className="ed-mk-hl__depth" d={DEPTH} />
      <path className="ed-mk-hl__face" d={FACE} />
    </svg>
  );
}

export default HighlightMark;
