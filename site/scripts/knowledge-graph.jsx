/* Horizon4 AI: control-and-risk knowledge graph (canonical layered flow).
   Loads BEFORE the page's inline JSX. Exports via window.H4Graph.

   The graph is an honest architectural representation of how Horizon4
   maps regulation to risk to control to a logged agent action. It is
   not a live demo and must not be described as one. */

const H4Graph = (() => {
  const { useState, useEffect, useRef } = React;

  /* ─── REPRESENTATIVE NODES (4 per lane, 16 total) ─────── */
  const NODES = {
    /* Regulation */
    'reg.aia':        { lane: 1, label: 'EU AI Act: human oversight' },
    'reg.dora':       { lane: 1, label: 'DORA: third-party ICT risk' },
    'reg.gdpr':       { lane: 1, label: 'GDPR: lawful basis' },
    'reg.iso':        { lane: 1, label: 'ISO 42001: AI controls' },

    /* Risk */
    'risk.unlogged':  { lane: 2, label: 'Unlogged AI decision' },
    'risk.concentr':  { lane: 2, label: 'ICT concentration risk' },
    'risk.dp':        { lane: 2, label: 'Data-protection breach' },
    'risk.mapping':   { lane: 2, label: 'Control-mapping gap' },

    /* Control */
    'ctrl.hitl':      { lane: 3, label: 'Human-in-the-loop gate' },
    'ctrl.audit':     { lane: 3, label: 'Audit trail and evidence' },
    'ctrl.runtime':   { lane: 3, label: 'Runtime monitoring' },
    'ctrl.rulebook':  { lane: 3, label: 'Control rulebook' },

    /* Agent action */
    'act.route':      { lane: 4, label: 'Routes to owner' },
    'act.log':        { lane: 4, label: 'Logs evidence' },
    'act.flag':       { lane: 4, label: 'Flags the gap' },
    'act.read':       { lane: 4, label: 'Reads and compares' },
  };

  /* Lane order within each column. Pinned so the 3 animated chains
     read cleanly with the least edge-crossing. */
  const LANE_ORDER = {
    1: ['reg.aia',       'reg.dora',      'reg.gdpr',     'reg.iso'],
    2: ['risk.unlogged', 'risk.concentr', 'risk.dp',      'risk.mapping'],
    3: ['ctrl.hitl',     'ctrl.audit',    'ctrl.runtime', 'ctrl.rulebook'],
    4: ['act.route',     'act.log',       'act.flag',     'act.read'],
  };

  const LANE_LABEL = { 1: 'Regulation', 2: 'Risk', 3: 'Control', 4: 'Agent action' };

  /* Chains. First 3 are auto-cycled (one per second tier of orphans). */
  const CHAINS = [
    ['reg.aia',  'risk.unlogged', 'ctrl.hitl',     'act.route'],
    ['reg.dora', 'risk.concentr', 'ctrl.audit',    'act.log'],
    ['reg.gdpr', 'risk.dp',       'ctrl.runtime',  'act.flag'],
    ['reg.iso',  'risk.mapping',  'ctrl.rulebook', 'act.read'],
  ];
  const AUTO_INDICES = [0, 1, 2];

  const chainForNode = (id) => CHAINS.find(c => c.includes(id)) || null;

  /* ─── BRAND PALETTE ─────────────────────────────────────── */
  const NAVY   = '#0A1F44';
  const BLUE   = '#0075C9';
  const TEAL   = '#0D9B84';
  const AMBER  = '#B5731A';   /* muted amber for the Risk lane accent */
  const MUTED  = '#5C6B82';
  const BORDER = '#D6DCE5';
  const SURFACE = '#FFFFFF';

  const LANE_ACCENT = { 1: BLUE, 2: AMBER, 3: TEAL, 4: NAVY };

  /* ─── DESKTOP / TABLET CANVAS ───────────────────────────── */
  const VB_W = 1120;
  const VB_H = 520;
  const PAD_X = 60;
  const CHIP_W = 220;
  const CHIP_H = 44;
  const COL_GAP = (VB_W - 2 * PAD_X - 4 * CHIP_W) / 3;
  const COL_X_CENTER = (col) =>
    PAD_X + CHIP_W / 2 + (col - 1) * (CHIP_W + COL_GAP);
  const ROW_Y = [110, 210, 310, 410];   /* 4 rows */
  const HEADER_Y = 38;
  const HEADER_RULE_Y = 56;

  const nodePos = {};
  for (const lane of [1, 2, 3, 4]) {
    LANE_ORDER[lane].forEach((id, i) => {
      nodePos[id] = { x: COL_X_CENTER(lane), y: ROW_Y[i], lane };
    });
  }

  const LayeredFlow = ({ activeChain, selected, setSelected }) => {
    const activeNodes = new Set(activeChain || []);
    const hasSel = !!selected;
    const dimRest = hasSel; /* on hover/focus we dim the rest; auto-cycle keeps full contrast */

    return (
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`}
           xmlns="http://www.w3.org/2000/svg"
           className="kg-svg"
           role="img"
           aria-label="Knowledge graph: regulation flows to risk, to control, to agent action.">
        <defs>
          <marker id="kg-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={TEAL} />
          </marker>
        </defs>

        {/* Lane headers */}
        {[1, 2, 3, 4].map(lane => (
          <g key={lane}>
            <text x={COL_X_CENTER(lane)} y={HEADER_Y}
                  textAnchor="middle"
                  fontSize={13} fontWeight={600}
                  fill={NAVY}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {LANE_LABEL[lane]}
            </text>
            <line
              x1={COL_X_CENTER(lane) - CHIP_W / 2}
              x2={COL_X_CENTER(lane) + CHIP_W / 2}
              y1={HEADER_RULE_Y} y2={HEADER_RULE_Y}
              stroke={LANE_ACCENT[lane]}
              strokeWidth={1.5}
              opacity={0.5}/>
          </g>
        ))}

        {/* Active-chain edges (only the active chain is drawn) */}
        {activeChain && activeChain.slice(0, -1).map((fromId, i) => {
          const toId = activeChain[i + 1];
          const a = nodePos[fromId], b = nodePos[toId];
          const x1 = a.x + CHIP_W / 2;
          const y1 = a.y;
          const x2 = b.x - CHIP_W / 2 - 4; /* leave room for arrow head */
          const y2 = b.y;
          const dx = (x2 - x1) * 0.55;
          const path = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
          return (
            <path key={`e-${i}`}
                  d={path}
                  fill="none"
                  stroke={TEAL}
                  strokeWidth={1.8}
                  opacity={0.85}
                  markerEnd="url(#kg-arrow)"/>
          );
        })}

        {/* Nodes (chips with labels inside) */}
        {Object.entries(NODES).map(([id, n]) => {
          const p = nodePos[id];
          const isActive = activeNodes.has(id);
          const dim = dimRest && !isActive;
          const accent = LANE_ACCENT[n.lane];
          return (
            <g key={id}
               tabIndex={0}
               role="button"
               aria-label={`${LANE_LABEL[n.lane]}: ${n.label}`}
               aria-pressed={isActive}
               onMouseEnter={() => setSelected(id)}
               onFocus={() => setSelected(id)}
               onClick={() => setSelected(s => (s === id ? null : id))}
               style={{ cursor: 'pointer', outline: 'none' }}>
              <rect
                x={p.x - CHIP_W / 2}
                y={p.y - CHIP_H / 2}
                width={CHIP_W}
                height={CHIP_H}
                rx={6} ry={6}
                fill={SURFACE}
                stroke={isActive ? TEAL : BORDER}
                strokeWidth={isActive ? 1.8 : 1}
                opacity={dim ? 0.4 : 1}/>
              {/* Left lane-color tab on every chip, brighter when active */}
              <rect
                x={p.x - CHIP_W / 2}
                y={p.y - CHIP_H / 2}
                width={3}
                height={CHIP_H}
                rx={1.5}
                fill={accent}
                opacity={dim ? 0.4 : (isActive ? 1 : 0.65)}/>
              <text
                x={p.x - CHIP_W / 2 + 14}
                y={p.y + 4}
                fontSize={12}
                fontWeight={isActive ? 600 : 500}
                fill={dim ? MUTED : NAVY}
                opacity={dim ? 0.55 : 1}
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  /* ─── MOBILE: one chain at a time, vertical flow ───────── */
  const MobileChain = ({ chainIdx, setChainIdx, totalAuto }) => {
    const chain = CHAINS[chainIdx];
    return (
      <div className="kg-m">
        <ol className="kg-m-list" aria-label="Chain from regulation to agent action">
          {chain.map((id, i) => {
            const n = NODES[id];
            const accent = LANE_ACCENT[n.lane];
            return (
              <li key={id} className="kg-m-step">
                <div className="kg-m-lane" style={{ color: accent }}>
                  {LANE_LABEL[n.lane]}
                </div>
                <div className="kg-m-chip" style={{ borderColor: i === 0 ? accent : BORDER }}>
                  <span className="kg-m-tab" style={{ background: accent }}/>
                  <span className="kg-m-label">{n.label}</span>
                </div>
                {i < chain.length - 1 && (
                  <svg className="kg-m-arrow" width="14" height="20" viewBox="0 0 14 20" aria-hidden="true">
                    <line x1="7" y1="0" x2="7" y2="14" stroke={TEAL} strokeWidth="1.6"/>
                    <path d="M 2 12 L 7 18 L 12 12" fill="none" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
        <div className="kg-m-foot">
          <div className="kg-m-dots" role="tablist" aria-label="Choose chain">
            {AUTO_INDICES.map(i => (
              <button key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === chainIdx}
                      aria-label={`Chain ${i + 1} of ${totalAuto}`}
                      className={`kg-m-dot ${i === chainIdx ? 'on' : ''}`}
                      onClick={() => setChainIdx(i)}/>
            ))}
          </div>
          <button type="button"
                  className="kg-m-next"
                  onClick={() => setChainIdx((chainIdx + 1) % totalAuto)}>
            Next chain
          </button>
        </div>
      </div>
    );
  };

  /* ─── MAIN ──────────────────────────────────────────────── */
  const KnowledgeGraph = () => {
    const [cycleIdx, setCycleIdx]         = useState(0);
    const [selected, setSelected]         = useState(null);
    const [paused, setPaused]             = useState(false);
    const [isMobile, setIsMobile]         = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
      const mq = window.matchMedia('(max-width: 720px)');
      const onM = () => setIsMobile(mq.matches);
      onM();
      mq.addEventListener ? mq.addEventListener('change', onM) : mq.addListener(onM);

      const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onR = () => setReducedMotion(rmq.matches);
      onR();
      rmq.addEventListener ? rmq.addEventListener('change', onR) : rmq.addListener(onR);

      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', onM) : mq.removeListener(onM);
        rmq.removeEventListener ? rmq.removeEventListener('change', onR) : rmq.removeListener(onR);
      };
    }, []);

    /* Desktop auto-advance through chains 0..2 */
    useEffect(() => {
      if (isMobile) return;
      if (reducedMotion) return;
      if (paused) return;
      const id = setInterval(() => {
        setCycleIdx(i => AUTO_INDICES[(AUTO_INDICES.indexOf(i) + 1) % AUTO_INDICES.length]);
      }, 4200);
      return () => clearInterval(id);
    }, [isMobile, reducedMotion, paused]);

    /* Mobile: tap-to-step; no auto-advance to avoid surprise on touch. */
    const [mobileIdx, setMobileIdx] = useState(0);

    /* Resolve active chain.
       Selected node (hover, focus, click) takes priority. Otherwise the
       cycle index drives. Reduced motion keeps chain 0 emphasized. */
    let activeChain;
    if (selected) {
      activeChain = chainForNode(selected);
    } else if (reducedMotion) {
      activeChain = CHAINS[0];
    } else {
      activeChain = CHAINS[cycleIdx];
    }

    const pause   = () => setPaused(true);
    const resume  = () => { setPaused(false); setSelected(null); };

    return (
      <div className="kg-wrap">
        <div className="kg-stage"
             onMouseEnter={pause}
             onMouseLeave={resume}
             onFocus={pause}
             onBlur={resume}>
          {isMobile ? (
            <MobileChain chainIdx={mobileIdx}
                         setChainIdx={setMobileIdx}
                         totalAuto={AUTO_INDICES.length}/>
          ) : (
            <LayeredFlow activeChain={activeChain}
                         selected={selected}
                         setSelected={setSelected}/>
          )}
        </div>

        {!isMobile && (
          <p className="kg-hint">
            {selected
              ? <span>Showing the chain through <strong>{NODES[selected].label}</strong>.</span>
              : reducedMotion
                ? <span>Hover or focus any node to trace its full chain, from regulation to action.</span>
                : <span>Tracing chain {AUTO_INDICES.indexOf(cycleIdx) + 1} of {AUTO_INDICES.length}. Hover any node to inspect.</span>}
          </p>
        )}
      </div>
    );
  };

  return { KnowledgeGraph };
})();

window.H4Graph = H4Graph;
