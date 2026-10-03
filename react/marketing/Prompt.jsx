'use client';

import React, { useEffect, useRef, useState } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

const I = {
  link:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>,
  plus:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>,
  mic:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  x:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>,
};

/**
 * The requirement composer: a brief in a box.
 *
 *   <Prompt
 *     placeholder="Tell us what you sell, where you sell and what's breaking…"
 *     urlPlaceholder="Paste your website URL"
 *     suggestions={['Skincare on Amazon and Blinkit', '…']}
 *     onSubmit={({ text, url, files }) => …}
 *   />
 *
 * Attach opens the file picker (documents and images; the list shows as
 * removable chips). The microphone uses the browser's SpeechRecognition
 * where it exists and is disabled, with a reason, where it does not.
 * Enter submits; Shift+Enter makes a new line. `submit={false}` drops the
 * button and leaves Enter as the only way to send.
 */
export function Prompt({
  placeholder = 'Describe your requirement in a few lines.',
  urlPlaceholder = 'Paste your website URL',
  submitLabel = 'Curate my services',
  hint = null,
  suggestions = [],
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg,.webp',
  attach = true, mic = true, url = true, submit: showSubmit = true,
  defaultText = '', defaultUrl = '', backdrop,
  onSubmit, className = '', ...rest
}) {
  const [text, setText] = useState(defaultText);
  const [site, setSite] = useState(defaultUrl);
  const [files, setFiles] = useState([]);
  const [listening, setListening] = useState(false);
  const [canListen, setCanListen] = useState(false);
  const fileRef = useRef(null);
  const textRef = useRef(null);
  const recRef = useRef(null);

  useEffect(() => {
    setCanListen(typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition));
    return () => { try { recRef.current?.stop(); } catch { /* already stopped */ } };
  }, []);

  /* Grow with the text, up to a point; past that the box scrolls. */
  useEffect(() => {
    const el = textRef.current; if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 320) + 'px';
  }, [text]);

  const submit = () => {
    if (!text.trim() && !site.trim() && !files.length) return;
    onSubmit?.({ text: text.trim(), url: site.trim(), files });
  };

  const toggleMic = () => {
    if (listening) { try { recRef.current?.stop(); } catch { /* ignore */ } setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'en-IN'; rec.interimResults = false; rec.continuous = true;
    rec.onresult = (e) => {
      const said = [...e.results].slice(e.resultIndex).map((r) => r[0].transcript).join(' ');
      setText((t) => (t ? `${t} ${said}` : said).trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    try { rec.start(); setListening(true); } catch { setListening(false); }
  };

  return (
    <div className={cx('ed-mk-promptwrap', className)} {...rest}>
    <div className="ed-mk-promptstage">
    {backdrop && <div className="ed-mk-prompt__backdrop" aria-hidden="true">{backdrop}</div>}
    <div className="ed-mk-prompt">
      <div className="ed-mk-prompt__in">
        <textarea
          ref={textRef} className="ed-mk-prompt__text" value={text} placeholder={placeholder}
          rows={3} aria-label="Your requirement"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
        />
        {files.length > 0 && (
          <div className="ed-mk-prompt__files">
            {files.map((f, i) => (
              <span className="ed-mk-prompt__file" key={i}>
                {f.name}
                <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))}>{I.x}</button>
              </span>
            ))}
          </div>
        )}
        <div className="ed-mk-prompt__bar">
          {url && (
            <label className="ed-mk-prompt__url">
              {I.link}
              <input type="url" inputMode="url" placeholder={urlPlaceholder} value={site} onChange={(e) => setSite(e.target.value)} aria-label={urlPlaceholder} />
            </label>
          )}
          <div className="ed-mk-prompt__tools">
            {attach && (
              <>
                <input ref={fileRef} type="file" accept={accept} multiple hidden
                       onChange={(e) => { setFiles([...files, ...Array.from(e.target.files || [])]); e.target.value = ''; }} />
                <button type="button" className="ed-mk-prompt__icon" aria-label="Attach a document or image" title="Attach a document or image"
                        onClick={() => fileRef.current?.click()}>{I.plus}</button>
              </>
            )}
            {mic && (
              <button type="button" className="ed-mk-prompt__icon" data-on={listening || undefined}
                      aria-pressed={listening} aria-label={listening ? 'Stop listening' : 'Speak your requirement'}
                      title={canListen ? (listening ? 'Stop listening' : 'Speak your requirement') : "Voice input isn't available in this browser"}
                      disabled={!canListen} onClick={toggleMic}>{I.mic}</button>
            )}
            {showSubmit && (
              <button type="button" className="ed-btn ed-btn--brand ed-mk-prompt__submit" onClick={submit}>
                {submitLabel}{I.arrow}
              </button>
            )}
          </div>
        </div>
        {hint && <p className="ed-mk-prompt__hint">{hint}</p>}
      </div>
    </div>
    </div>
      {suggestions.length > 0 && (
        <div className="ed-mk-prompt__suggest">
          {suggestions.map((s) => (
            <button type="button" className="ed-mk-chip" key={s} onClick={() => { setText(s); textRef.current?.focus(); }}>{s}</button>
          ))}
        </div>
      )}
    </div>
  );
}
