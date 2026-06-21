/* Horizon4 AI: control-and-risk knowledge graph (shared component)
   Loads BEFORE the page's inline JSX. Exports via window.H4Graph.

   The graph is an honest architectural representation of how Horizon4
   maps regulation to risk to control to a logged agent action. It is
   not a live demo and must not be described as one. */

const H4Graph = (() => {
  const { useState, useEffect } = React;

  /* ─── NODES (real frameworks only) ──────────────────────── */
  const NODES = {
    /* Layer 1: Regulation */
    'reg.dora.ict':        { layer: 1, label: 'DORA: ICT risk management' },
    'reg.dora.incident':   { layer: 1, label: 'DORA: incident reporting' },
    'reg.dora.thirdparty': { layer: 1, label: 'DORA: third-party ICT risk' },
    'reg.aia.oversight':   { layer: 1, label: 'EU AI Act: human oversight' },
    'reg.aia.records':     { layer: 1, label: 'EU AI Act: record-keeping' },
    'reg.gdpr':            { layer: 1, label: 'GDPR: lawful basis, data minimization' },
    'reg.iso42001':        { layer: 1, label: 'ISO/IEC 42001: AI management' },
    'reg.nist':            { layer: 1, label: 'NIST AI RMF: Govern, Map, Measure, Manage' },

    /* Layer 2: Risk */
    'risk.opres':       { layer: 2, label: 'Operational resilience gap' },
    'risk.thirdparty':  { layer: 2, label: 'ICT third-party concentration risk' },
    'risk.model':       { layer: 2, label: 'Model risk' },
    'risk.dp':          { layer: 2, label: 'Data-protection breach' },
    'risk.unlogged':    { layer: 2, label: 'Unlogged or unexplained AI decision' },
    'risk.mapping':     { layer: 2, label: 'Control-mapping gap' },

    /* Layer 3: Control */
    'ctrl.rulebook': { layer: 3, label: 'Control rulebook' },
    'ctrl.hitl':     { layer: 3, label: 'Human-in-the-loop approval gate' },
    'ctrl.audit':    { layer: 3, label: 'Audit trail and evidence layer' },
    'ctrl.perm':     { layer: 3, label: 'Permission mirroring' },
    'ctrl.runtime':  { layer: 3, label: 'Runtime monitoring' },

    /* Layer 4: Agent action */
    'act.read':  { layer: 4, label: 'Reads and compares against the rulebook' },
    'act.flag':  { layer: 4, label: 'Flags the gap' },
    'act.route': { layer: 4, label: 'Opens a case and routes to the owner' },
    'act.human': { layer: 4, label: 'Human approves' },
    'act.log':   { layer: 4, label: 'Logs the evidence' },
  };

  /* Chains: [Regulation, Risk, Control, Action]. Every node appears in at least one chain. */
  const CHAINS = [
    ['reg.dora.ict',        'risk.opres',      'ctrl.rulebook', 'act.read'],
    ['reg.dora.ict',        'risk.opres',      'ctrl.runtime',  'act.flag'],
    ['reg.dora.incident',   'risk.unlogged',   'ctrl.audit',    'act.log'],
    ['reg.dora.thirdparty', 'risk.thirdparty', 'ctrl.perm',     'act.route'],
    ['reg.aia.oversight',   'risk.unlogged',   'ctrl.hitl',     'act.human'],
    ['reg.aia.records',     'risk.mapping',    'ctrl.audit',    'act.log'],
    ['reg.gdpr',            'risk.dp',         'ctrl.perm',     'act.read'],
    ['reg.iso42001',        'risk.model',      'ctrl.rulebook', 'act.read'],
    ['reg.nist',            'risk.mapping',    'ctrl.runtime',  'act.flag'],
  ];

  /* ─── BRAND PALETTE ─────────────────────────────────────── */
  const NAVY      = '#0A1F44';
  const BLUE      = '#0075C9';
  const TEAL      = '#0D9B84';
  const PURPLE    = '#5A4FCF';   /* risk-layer accent; brand-adjacent, no gradients */
  const INK_MUTED = '#5C6B82';
  const BORDER    = '#D6DCE5';
  const SURFACE   = '#FFFFFF';

  const LAYER_COLOR = { 1: BLUE, 2: PURPLE, 3: TEAL, 4: NAVY };
  const LAYER_LABEL = { 1: 'Regulation', 2: 'Risk', 3: 'Control', 4: 'Agent action' };

  /* ─── UNIQUE EDGES across all chains ────────────────────── */
  const EDGES = (() => {
    const seen = new Set(), out = [];
    for (const c of CHAINS) {
      for (let i = 0; i < c.length - 1; i++) {
        const k = `${c[i]}->${c[i+1]}`;
        if (!seen.has(k)) { seen.add(k); out.push({ from: c[i], to: c[i+1] }); }
      }
    }
    return out;
  })();

  const activeFromSelected = (selected) => {
    if (!selected) return { chains: [], nodes: new Set(), edges: new Set() };
    const chains = CHAINS.filter(c => c.includes(selected));
    const nodes  = new Set();
    const edges  = new Set();
    chains.forEach(c => {
      c.forEach(n => nodes.add(n));
      for (let i = 0; i < c.length - 1; i++) edges.add(`${c[i]}->${c[i+1]}`);
    });
    return { chains, nodes, edges };
  };

  /* ─── TREATMENT A: HORIZONTAL FLOW ──────────────────────── */
  const TreatmentA = ({ selected, setSelected, reducedMotion }) => {
    const VB_W = 1200, VB_H = 600;
    const colX = [120, 430, 740, 1050];
    const chipW = 230, chipH = 38;
    const padY = 70;

    const layerNodes = { 1: [], 2: [], 3: [], 4: [] };
    Object.entries(NODES).forEach(([id, n]) => layerNodes[n.layer].push(id));

    const pos = {};
    for (const lyr of [1, 2, 3, 4]) {
      const ids = layerNodes[lyr];
      const usable = VB_H - 2 * padY;
      ids.forEach((id, i) => {
        const y = ids.length > 1 ? padY + i * (usable / (ids.length - 1)) : VB_H / 2;
        pos[id] = { x: colX[lyr - 1], y };
      });
    }

    const { nodes: aN, edges: aE, chains } = activeFromSelected(selected);
    const hasSel = chains.length > 0;

    return (
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`}
           xmlns="http://www.w3.org/2000/svg"
           className="kg-svg"
           role="img"
           aria-label="Control and risk knowledge graph: regulation, risk, control, agent action">
        {/* Column headers */}
        {[1, 2, 3, 4].map((lyr, i) => (
          <g key={lyr}>
            <text x={colX[i]} y={30} textAnchor="middle"
                  fontSize={11} fontWeight={600}
                  fill={INK_MUTED} style={{ letterSpacing: '0.18em' }}>
              {LAYER_LABEL[lyr].toUpperCase()}
            </text>
            <line x1={colX[i] - 80} y1={42} x2={colX[i] + 80} y2={42}
                  stroke={LAYER_COLOR[lyr]} strokeWidth={1.2} opacity={0.4}/>
          </g>
        ))}

        {/* Edges */}
        {EDGES.map((e, i) => {
          const a = pos[e.from], b = pos[e.to];
          const x1 = a.x + chipW / 2, y1 = a.y;
          const x2 = b.x - chipW / 2, y2 = b.y;
          const dx = (x2 - x1) * 0.45;
          const path = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
          const isActive = aE.has(`${e.from}->${e.to}`);
          const dim = hasSel && !isActive;
          return (
            <g key={i}>
              <path d={path} fill="none"
                    stroke={isActive ? TEAL : BORDER}
                    strokeWidth={isActive ? 1.6 : 1}
                    opacity={dim ? 0.15 : (isActive ? 0.85 : 0.55)}/>
              {!reducedMotion && (
                <circle r={isActive ? 3 : 2}
                        fill={isActive ? TEAL : BLUE}
                        opacity={dim ? 0 : (isActive ? 1 : 0.55)}>
                  <animateMotion dur={isActive ? '2.4s' : '5s'}
                                 repeatCount="indefinite"
                                 path={path}
                                 begin={`${(i * 0.45) % 5}s`}/>
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {Object.entries(NODES).map(([id, n]) => {
          const p = pos[id];
          const isActive = aN.has(id);
          const dim = hasSel && !isActive;
          const accent = LAYER_COLOR[n.layer];
          return (
            <g key={id}
               tabIndex={0}
               role="button"
               aria-label={`${LAYER_LABEL[n.layer]}: ${n.label}`}
               onMouseEnter={() => setSelected(id)}
               onFocus={() => setSelected(id)}
               onClick={() => setSelected(s => (s === id ? null : id))}
               style={{ cursor: 'pointer', outline: 'none' }}>
              <rect x={p.x - chipW / 2} y={p.y - chipH / 2}
                    width={chipW} height={chipH} rx={5} ry={5}
                    fill={SURFACE}
                    stroke={isActive ? accent : BORDER}
                    strokeWidth={isActive ? 1.6 : 1}
                    opacity={dim ? 0.45 : 1}/>
              {isActive && (
                <rect x={p.x - chipW / 2} y={p.y - chipH / 2}
                      width={3} height={chipH} rx={1.5} fill={accent}/>
              )}
              <text x={p.x - chipW / 2 + (isActive ? 14 : 12)} y={p.y + 4}
                    fontSize={11.5} fontWeight={500}
                    fill={dim ? INK_MUTED : NAVY}
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

  /* ─── TREATMENT B: RADIAL NETWORK ───────────────────────── */
  const TreatmentB = ({ selected, setSelected, reducedMotion }) => {
    const VB = 780;
    const cx = VB / 2, cy = VB / 2;
    const RING = { 3: 110, 2: 200, 1: 290, 4: 350 };
    const NODE_R = { 3: 28, 2: 22, 1: 22, 4: 22 };

    const layerNodes = { 1: [], 2: [], 3: [], 4: [] };
    Object.entries(NODES).forEach(([id, n]) => layerNodes[n.layer].push(id));

    const pos = {};
    for (const lyr of [1, 2, 3, 4]) {
      const ids = layerNodes[lyr];
      const r = RING[lyr];
      const offset = lyr === 4 ? 0 : (lyr === 3 ? -Math.PI / 2 : -Math.PI / 2);
      ids.forEach((id, i) => {
        const angle = offset + (i / ids.length) * Math.PI * 2;
        pos[id] = {
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
          angle,
          layer: lyr,
        };
      });
    }

    const { nodes: aN, edges: aE, chains } = activeFromSelected(selected);
    const hasSel = chains.length > 0;

    return (
      <svg viewBox={`0 0 ${VB} ${VB}`}
           xmlns="http://www.w3.org/2000/svg"
           className="kg-svg"
           role="img"
           aria-label="Control and risk knowledge graph (radial layout)">
        {/* Subtle guide rings */}
        {[RING[3], RING[2], RING[1], RING[4]].map((r, i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
                  fill="none" stroke={BORDER} strokeWidth={0.5} opacity={0.45}/>
        ))}

        {/* Center label */}
        <text x={cx} y={cy - RING[3] - 18} textAnchor="middle"
              fontSize={11} fontWeight={600}
              fill={INK_MUTED} style={{ letterSpacing: '0.2em' }}>
          CONTROL PLANE
        </text>

        {/* Edges */}
        {EDGES.map((e, i) => {
          const a = pos[e.from], b = pos[e.to];
          const isActive = aE.has(`${e.from}->${e.to}`);
          const dim = hasSel && !isActive;
          /* Quadratic curve, control point pulled toward the center for a gentle bow. */
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const tx = mx + (cx - mx) * 0.2, ty = my + (cy - my) * 0.2;
          const path = `M ${a.x} ${a.y} Q ${tx} ${ty} ${b.x} ${b.y}`;
          return (
            <g key={i}>
              <path d={path} fill="none"
                    stroke={isActive ? TEAL : BORDER}
                    strokeWidth={isActive ? 1.4 : 0.8}
                    opacity={dim ? 0.1 : (isActive ? 0.85 : 0.55)}/>
              {!reducedMotion && (
                <circle r={isActive ? 3 : 1.8}
                        fill={isActive ? TEAL : BLUE}
                        opacity={dim ? 0 : (isActive ? 1 : 0.45)}>
                  <animateMotion dur={isActive ? '2.6s' : '5.5s'}
                                 repeatCount="indefinite"
                                 path={path}
                                 begin={`${(i * 0.5) % 5}s`}/>
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {Object.entries(NODES).map(([id, n]) => {
          const p = pos[id];
          const isActive = aN.has(id);
          const dim = hasSel && !isActive;
          const accent = LAYER_COLOR[n.layer];
          const radius = NODE_R[n.layer];
          /* Label position outside the node, projected along its angle */
          const lOffset = radius + 8;
          const lx = p.x + lOffset * Math.cos(p.angle);
          const ly = p.y + lOffset * Math.sin(p.angle);
          const anchor =
            Math.cos(p.angle) > 0.25 ? 'start'
            : Math.cos(p.angle) < -0.25 ? 'end'
            : 'middle';
          return (
            <g key={id}
               tabIndex={0}
               role="button"
               aria-label={`${LAYER_LABEL[n.layer]}: ${n.label}`}
               onMouseEnter={() => setSelected(id)}
               onFocus={() => setSelected(id)}
               onClick={() => setSelected(s => (s === id ? null : id))}
               style={{ cursor: 'pointer', outline: 'none' }}>
              <circle cx={p.x} cy={p.y} r={radius}
                      fill={SURFACE}
                      stroke={isActive ? accent : BORDER}
                      strokeWidth={isActive ? 1.8 : 1}
                      opacity={dim ? 0.4 : 1}/>
              <circle cx={p.x} cy={p.y} r={3}
                      fill={accent} opacity={dim ? 0.45 : 0.9}/>
              <text x={lx} y={ly + 4} textAnchor={anchor}
                    fontSize={10.5} fontWeight={500}
                    fill={dim ? INK_MUTED : NAVY}
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

  /* ─── MOBILE: vertical stack with tap-to-expand chains ── */
  const MobileStack = ({ selected, setSelected }) => {
    const layerNodes = { 1: [], 2: [], 3: [], 4: [] };
    Object.entries(NODES).forEach(([id, n]) => layerNodes[n.layer].push(id));

    const { nodes: aN, chains } = activeFromSelected(selected);
    const hasSel = chains.length > 0;

    return (
      <div className="kg-mobile">
        {[1, 2, 3, 4].map(lyr => (
          <div key={lyr} className="kg-mobile-group">
            <div className="kg-mobile-label" style={{ color: LAYER_COLOR[lyr] }}>
              {LAYER_LABEL[lyr].toUpperCase()}
            </div>
            <div className="kg-mobile-chips">
              {layerNodes[lyr].map(id => {
                const isActive = aN.has(id);
                const dim = hasSel && !isActive;
                return (
                  <button key={id}
                          type="button"
                          className={`kg-chip ${isActive ? 'is-active' : ''} ${dim ? 'is-dim' : ''}`}
                          style={{ borderColor: isActive ? LAYER_COLOR[lyr] : undefined }}
                          onClick={() => setSelected(s => (s === id ? null : id))}>
                    {NODES[id].label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ─── MAIN WRAPPER ──────────────────────────────────────── */
  const KnowledgeGraph = ({ defaultTreatment = 'A', showToggle = true, caption = null, sublabel = null }) => {
    const [treatment, setTreatment]       = useState(defaultTreatment);
    const [selected, setSelected]         = useState(null);
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

    return (
      <div className="kg-wrap">
        {caption && <p className="kg-caption">{caption}</p>}
        {sublabel && <p className="kg-sublabel">{sublabel}</p>}

        {showToggle && !isMobile && (
          <div className="kg-toggle" role="tablist" aria-label="Graph layout">
            <button type="button" role="tab"
                    aria-selected={treatment === 'A'}
                    className={treatment === 'A' ? 'on' : ''}
                    onClick={() => setTreatment('A')}>Flow</button>
            <button type="button" role="tab"
                    aria-selected={treatment === 'B'}
                    className={treatment === 'B' ? 'on' : ''}
                    onClick={() => setTreatment('B')}>Network</button>
          </div>
        )}

        <div className="kg-stage"
             onMouseLeave={() => setSelected(null)}>
          {isMobile ? (
            <MobileStack selected={selected} setSelected={setSelected}/>
          ) : treatment === 'A' ? (
            <TreatmentA selected={selected} setSelected={setSelected} reducedMotion={reducedMotion}/>
          ) : (
            <TreatmentB selected={selected} setSelected={setSelected} reducedMotion={reducedMotion}/>
          )}
        </div>

        <p className="kg-hint">
          {selected
            ? <span>Showing the chain through <strong>{NODES[selected].label}</strong>.</span>
            : <span>Hover or tap any node to trace its full chain, from regulation to action.</span>}
        </p>
      </div>
    );
  };

  return { KnowledgeGraph };
})();

window.H4Graph = H4Graph;
