'use client';

import { useEffect, useRef, useState } from 'react';

type Bubble =
  | { side: 'in'; text: string }
  | { side: 'out'; text: string; options?: { id: string; title: string }[]; kind: 'text' | 'buttons' | 'list' };

interface State {
  flow: string | null;
  currentStep: string | null;
  data: Record<string, string>;
  humanHandoff: string;
}

function toBubble(p: any): Bubble {
  if (p.type === 'text') return { side: 'out', text: p.text.body, kind: 'text' };
  const i = p.interactive;
  if (i?.type === 'button') {
    return {
      side: 'out',
      text: i.body.text,
      kind: 'buttons',
      options: i.action.buttons.map((b: any) => b.reply),
    };
  }
  if (i?.type === 'list') {
    return {
      side: 'out',
      text: i.body.text,
      kind: 'list',
      options: i.action.sections[0].rows,
    };
  }
  return { side: 'out', text: JSON.stringify(p), kind: 'text' };
}

export default function Simulator() {
  const [from, setFrom] = useState('923001234567');
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [input, setInput] = useState('');
  const [state, setState] = useState<State | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [bubbles]);

  async function post(payload: Record<string, unknown>) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/dev/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, ...payload }),
      });
      const json = await res.json();
      if (!json.ok) { setError(json.error ?? 'request failed'); return; }
      setState(json.state);
      setBubbles((b) => [...b, ...(json.messages ?? []).map(toBubble)]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  function sendText(text: string) {
    if (!text.trim()) return;
    setBubbles((b) => [...b, { side: 'in', text }]);
    setInput('');
    void post({ text });
  }

  function tap(opt: { id: string; title: string }) {
    setBubbles((b) => [...b, { side: 'in', text: opt.title }]);
    void post({ replyId: opt.id });
  }

  function sendMedia() {
    setBubbles((b) => [...b, { side: 'in', text: '[photo]' }]);
    void post({ media: true });
  }

  async function reset(hard: boolean) {
    await post(hard ? { hardReset: true } : { reset: true });
    setBubbles([]);
    setState(null);
  }

  const last = [...bubbles].reverse().find((b) => b.side === 'out') as Bubble | undefined;
  const options = last && last.side === 'out' ? last.options : undefined;

  return (
    <div style={{ display: 'flex', gap: 24, padding: 24, fontFamily: 'system-ui', alignItems: 'flex-start' }}>
      <div style={{ width: 420 }}>
        <h2 style={{ margin: '0 0 12px' }}>WhatsApp Simulator</h2>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 6 }}
          />
          <button onClick={() => reset(false)} style={btn}>Reset</button>
          <button onClick={() => reset(true)} style={btn}>Hard reset</button>
        </div>

        <div style={{
          height: 480, overflowY: 'auto', border: '1px solid #ddd', borderRadius: 8,
          padding: 12, background: '#ECE5DD',
        }}>
          {bubbles.map((b, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: b.side === 'in' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
              <div style={{
                maxWidth: '78%', padding: '8px 12px', borderRadius: 8, whiteSpace: 'pre-wrap',
                background: b.side === 'in' ? '#DCF8C6' : '#fff', fontSize: 14,
              }}>
                {b.text}
                {b.side === 'out' && b.kind !== 'text' && (
                  <div style={{ marginTop: 6, fontSize: 11, color: '#888' }}>
                    [{b.kind}] {b.options?.length} option{b.options?.length === 1 ? '' : 's'}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {options && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {options.map((o) => (
              <button key={o.id} onClick={() => tap(o)} disabled={busy} style={{ ...btn, background: '#25D366', color: '#fff', borderColor: '#25D366' }}>
                {o.title}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendText(input); }}
            placeholder='Type a message, or "menu"'
            disabled={busy}
            style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 6 }}
          />
          <button onClick={() => sendText(input)} disabled={busy} style={btn}>Send</button>
          <button onClick={sendMedia} disabled={busy} style={btn} title="Simulate a photo">Photo</button>
        </div>

        {error && <div style={{ color: '#b00', marginTop: 8, fontSize: 13 }}>{error}</div>}
      </div>

      <div style={{ width: 300 }}>
        <h3 style={{ margin: '0 0 12px' }}>Conversation state</h3>
        <pre style={{
          background: '#111', color: '#0f0', padding: 12, borderRadius: 8,
          fontSize: 12, whiteSpace: 'pre-wrap', minHeight: 200,
        }}>
          {state ? JSON.stringify(state, null, 2) : 'no conversation row'}
        </pre>
        <p style={{ fontSize: 12, color: '#666' }}>
          Reset clears the conversation and message log. Hard reset also deletes the
          customer, their leads and their complaints.
        </p>
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6,
  background: '#fff', cursor: 'pointer', fontSize: 14,
};