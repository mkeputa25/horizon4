/* Horizon4 AI: control-and-risk knowledge graph (Flow + Network).
   Loads BEFORE the page's inline JSX. Exports via window.H4Graph.

   The graph is an honest architectural representation of how Horizon4
   maps regulation to risk to control to a logged agent action. It is
   not a live demo and must not be described as one. */

const H4Graph = (() => {
  const { useState, useEffect } = React;

  /* ─── REPRESENTATIVE NODES (4 per lane, 16 total) ─────── */
  const NODES = {
    /* Regulation */
    'reg.aia':  { lane: 1, label: 'EU AI Act: human oversight',
                  desc: 'High-risk AI systems must be effectively overseen by people, with explainable decisions.' },
    'reg.dora': { lane: 1, label: 'DORA: third-party ICT risk',
                  desc: 'Financial entities must manage ICT risk arising from third-party providers.' },
    'reg.gdpr': { lane: 1, label: 'GDPR: lawful basis',
                  desc: 'Every personal-data processing activity needs a documented lawful basis.' },
    'reg.iso':  { lane: 1, label: 'ISO 42001: AI controls',
                  desc: 'The international standard for AI management systems and supporting controls.' },

    /* Risk */
    'risk.unlogged': { lane: 2, label: 'Unlogged AI decision',
                       desc: 'An AI decision a regulator could not reconstruct, justify, or audit.' },
    'risk.concentr': { lane: 2, label: 'ICT concentration risk',
                       desc: 'Heavy dependence on a few ICT providers, with cascading failure exposure.' },
    'risk.dp':       { lane: 2, label: 'Data-protection breach',
                       desc: 'Personal data processed unlawfully, exposed, or sent outside its purpose.' },
    'risk.mapping':  { lane: 2, label: 'Control-mapping gap',
                       desc: 'Controls exist, but they are not mapped to specific regulatory requirements.' },

    /* Control */
    'ctrl.hitl':     { lane: 3, label: 'Human-in-the-loop gate',
                       desc: 'A required approval point: a trained human reviews and signs off before action.' },
    'ctrl.audit':    { lane: 3, label: 'Audit trail and evidence',
                       desc: 'A signed record of what the agent read, flagged, approved, when, and why.' },
    'ctrl.runtime':  { lane: 3, label: 'Runtime monitoring',
                       desc: 'Continuous monitoring of agent behavior, with alerts and rollback.' },
    'ctrl.rulebook': { lane: 3, label: 'Control rulebook',
                       desc: 'Machine-readable controls the agent checks every action against.' },

    /* Agent action */
    'act.route': { lane: 4, label: 'Routes to owner',
                   desc: 'Opens a case and sends it to the right owner with full context.' },
    'act.log':   { lane: 4, label: 'Logs evidence',
                   desc: 'Writes the audit-ready record of the step to the evidence layer.' },
    'act.flag':  { lane: 4, label: 'Flags the gap',
                   desc: 'Surfaces a gap or anomaly for human attention.' },
    'act.read':  { lane: 4, label: 'Reads and compares',
                   desc: 'Scans documents and compares them to the control rulebook.' },
  };

  const LANE_LABEL = { 1: 'Regulation', 2: 'Risk', 3: 'Control', 4: 'Agent action' };

  /* Primary chains (4). The first three auto-cycle. */
  const CHAINS = [
    ['reg.aia',  'risk.unlogged', 'ctrl.hitl',     'act.route'],
    ['reg.dora', 'risk.concentr', 'ctrl.audit',    'act.log'],
    ['reg.gdpr', 'risk.dp',       'ctrl.runtime',  'act.flag'],
    ['reg.iso',  'risk.mapping',  'ctrl.rulebook', 'act.read'],
  ];
  const AUTO = [0, 1, 2];

  /* Secondary cross-edges that show the graph is a web, not a pipeline.
     Used only by the Network view. */
  const SECONDARY = [
    ['reg.aia',       'risk.dp'],
    ['reg.gdpr',      'risk.unlogged'],
    ['risk.unlogged', 'ctrl.audit'],
    ['risk.mapping',  'ctrl.audit'],
    ['ctrl.hitl',     'act.log'],
    ['ctrl.runtime',  'act.route'],
  ];

  /* All primary edges across all 4 chains (12). */
  const PRIMARY_EDGES = (() => {
    const seen = new Set(), out = [];
    for (const c of CHAINS) {
      for (let i = 0; i < c.length - 1; i++) {
        const k = `${c[i]}->${c[i+1]}`;
        if (!seen.has(k)) { seen.add(k); out.push([c[i], c[i+1]]); }
      }
    }
    return out;
  })();

  /* Adjacency for "direct connections" highlight in Network view. */
  const NEIGHBORS = (() => {
    const adj = {};
    Object.keys(NODES).forEach(id => { adj[id] = new Set(); });
    [...PRIMARY_EDGES, ...SECONDARY].forEach(([a, b]) => {
      adj[a].add(b); adj[b].add(a);
    });
    return adj;
  })();

  const chainForNode = (id) => CHAINS.find(c => c.includes(id)) || null;

  /* ─── BRAND PALETTE ─────────────────────────────────────── */
  const NAVY    = '#0A1F44';
  const BLUE    = '#0075C9';
  const TEAL    = '#0D9B84';
  const AMBER   = '#B5731A';
  const MUTED   = '#5C6B82';
  const BORDER  = '#D6DCE5';
  const BORDER_FAINT = '#E6EAF0';
  const SURFACE = '#FFFFFF';

  const LANE_ACCENT = { 1: BLUE, 2: AMBER, 3: TEAL, 4: NAVY };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     FLOW VIEW: 4 columns, faint web of primary edges,
     one chain emphasized.
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const FLOW_VB_W = 1120;
  const FLOW_VB_H = 520;
  const FLOW_PAD_X = 60;
  const CHIP_W = 220;
  const CHIP_H = 42;

  const FLOW_LANE_ORDER = {
    1: ['reg.aia',       'reg.dora',      'reg.gdpr',     'reg.iso'],
    2: ['risk.unlogged', 'risk.concentr', 'risk.dp',      'risk.mapping'],
    3: ['ctrl.hitl',     'ctrl.audit',    'ctrl.runtime', 'ctrl.rulebook'],
    4: ['act.route',     'act.log',       'act.flag',     'act.read'],
  };
  const FLOW_COL_GAP =
    (FLOW_VB_W - 2 * FLOW_PAD_X - 4 * CHIP_W) / 3;
  const FLOW_COL_X = (lane) =>
    FLOW_PAD_X + CHIP_W / 2 + (lane - 1) * (CHIP_W + FLOW_COL_GAP);
  const FLOW_ROW_Y = [110, 210, 310, 410];

  const flowPos = {};
  for (const lane of [1, 2, 3, 4]) {
    FLOW_LANE_ORDER[lane].forEach((id, i) => {
      flowPos[id] = { x: FLOW_COL_X(lane), y: FLOW_ROW_Y[i] };
    });
  }

  const FlowView = ({ activeChain, selected, setSelected }) => {
    const active = new Set(activeChain || []);
    const activeEdges = new Set();
    if (activeChain) {
      for (let i = 0; i < activeChain.length - 1; i++) {
        activeEdges.add(`${activeChain[i]}->${activeChain[i+1]}`);
      }
    }
    const hasSel = !!selected;

    const edgePath = (a, b) => {
      const x1 = a.x + CHIP_W / 2;
      const y1 = a.y;
      const x2 = b.x - CHIP_W / 2 - 4;
      const y2 = b.y;
      const dx = (x2 - x1) * 0.55;
      return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    };

    return (
      <svg viewBox={`0 0 ${FLOW_VB_W} ${FLOW_VB_H}`}
           xmlns="http://www.w3.org/2000/svg"
           className="kg-svg"
           role="img"
           aria-label="Flow view: regulation, risk, control, agent action, with the active chain highlighted.">
        <defs>
          <marker id="kg-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={TEAL} />
          </marker>
        </defs>

        {/* Lane headers */}
        {[1, 2, 3, 4].map(lane => (
          <g key={lane}>
            <text x={FLOW_COL_X(lane)} y={38}
                  textAnchor="middle"
                  fontSize={13} fontWeight={600}
                  fill={NAVY}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {LANE_LABEL[lane]}
            </text>
            <line
              x1={FLOW_COL_X(lane) - CHIP_W / 2}
              x2={FLOW_COL_X(lane) + CHIP_W / 2}
              y1={56} y2={56}
              stroke={LANE_ACCENT[lane]}
              strokeWidth={1.5}
              opacity={0.5}/>
          </g>
        ))}

        {/* Faint primary edge web (all 12 edges, very subtle) */}
        {PRIMARY_EDGES.map(([from, to], i) => {
          const a = flowPos[from], b = flowPos[to];
          const isActive = activeEdges.has(`${from}->${to}`);
          if (isActive) return null;  /* drawn separately below, on top */
          return (
            <path key={`fw-${i}`}
                  d={edgePath(a, b)}
                  fill="none"
                  stroke={BORDER}
                  strokeWidth={0.9}
                  opacity={hasSel ? 0.18 : 0.4}/>
          );
        })}

        {/* Active-chain edges, drawn on top, in teal, with arrows */}
        {activeChain && activeChain.slice(0, -1).map((fromId, i) => {
          const toId = activeChain[i + 1];
          const path = edgePath(flowPos[fromId], flowPos[toId]);
          return (
            <path key={`ae-${i}`}
                  d={path}
                  fill="none"
                  stroke={TEAL}
                  strokeWidth={1.9}
                  opacity={0.9}
                  markerEnd="url(#kg-arrow)"/>
          );
        })}

        {/* Nodes */}
        {Object.entries(NODES).map(([id, n]) => {
          const p = flowPos[id];
          const isActive = active.has(id);
          const dim = hasSel && !isActive;
          const accent = LANE_ACCENT[n.lane];
          return (
            <g key={id}
               tabIndex={0}
               role="button"
               aria-label={`${LANE_LABEL[n.lane]}: ${n.label}. ${n.desc}`}
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
              <rect
                x={p.x - CHIP_W / 2}
                y={p.y - CHIP_H / 2}
                width={3}
                height={CHIP_H}
                rx={1.5}
                fill={accent}
                opacity={dim ? 0.4 : (isActive ? 1 : 0.7)}/>
              <text
                x={p.x - CHIP_W / 2 + 14}
                y={p.y + 4}
                fontSize={12}
                fontWeight={isActive ? 600 : 500}
                fill={dim ? MUTED : NAVY}
                opacity={dim ? 0.6 : 1}
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     NETWORK VIEW: four quadrants of chips, edges crisscross
     the middle. Labels live inside chips so they never
     collide or clip.
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const NET_VB_W = 1080;
  const NET_VB_H = 620;
  const NET_CHIP_W = 220;
  const NET_CHIP_H = 38;

  /* Hand-placed positions per node so chips never overlap or clip.
     Quadrants (clockwise from top-left): Regulation, Risk, Control, Action. */
  const netPos = {
    /* TL: Regulation */
    'reg.aia':  { x: 140, y: 80 },
    'reg.dora': { x: 400, y: 80 },
    'reg.gdpr': { x: 140, y: 180 },
    'reg.iso':  { x: 400, y: 180 },
    /* TR: Risk */
    'risk.unlogged': { x: 680, y: 80 },
    'risk.concentr': { x: 940, y: 80 },
    'risk.dp':       { x: 680, y: 180 },
    'risk.mapping':  { x: 940, y: 180 },
    /* BR: Control */
    'ctrl.hitl':     { x: 680, y: 410 },
    'ctrl.audit':    { x: 940, y: 410 },
    'ctrl.rulebook': { x: 680, y: 510 },
    'ctrl.runtime':  { x: 940, y: 510 },
    /* BL: Agent action */
    'act.route': { x: 140, y: 410 },
    'act.log':   { x: 400, y: 410 },
    'act.flag':  { x: 140, y: 510 },
    'act.read':  { x: 400, y: 510 },
  };

  const QUADRANTS = [
    { lane: 1, label: 'Regulation',   x: 270, y: 28 },
    { lane: 2, label: 'Risk',         x: 810, y: 28 },
    { lane: 3, label: 'Control',      x: 810, y: 358 },
    { lane: 4, label: 'Agent action', x: 270, y: 358 },
  ];

  /* Edge endpoint resolution: connect to the nearest side of the chip. */
  const sideAnchor = (from, to) => {
    /* Determine which side of `from` faces `to`, snap to that side's center. */
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const hw = NET_CHIP_W / 2;
    const hh = NET_CHIP_H / 2;
    if (Math.abs(dx) * hh > Math.abs(dy) * hw) {
      /* horizontal-dominant */
      return { x: from.x + Math.sign(dx) * hw, y: from.y };
    }
    return { x: from.x, y: from.y + Math.sign(dy) * hh };
  };

  const netEdgePath = (a, b) => {
    const p1 = sideAnchor(a, b);
    const p2 = sideAnchor(b, a);
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    /* Gentle curve toward the center of the canvas to avoid straight crossings */
    const cx = NET_VB_W / 2, cy = NET_VB_H / 2;
    const tx = mx + (cx - mx) * 0.18;
    const ty = my + (cy - my) * 0.18;
    return `M ${p1.x} ${p1.y} Q ${tx} ${ty} ${p2.x} ${p2.y}`;
  };

  const NetworkView = ({ activeChain, selected, setSelected }) => {
    const allEdges = [...PRIMARY_EDGES, ...SECONDARY];
    const selNeighbors = selected ? NEIGHBORS[selected] : null;

    /* Edges to highlight:
       - If user selected a node: edges touching that node (its direct connections).
       - Else: edges of the auto-cycle chain. */
    const cycleEdges = new Set();
    if (activeChain && !selected) {
      for (let i = 0; i < activeChain.length - 1; i++) {
        cycleEdges.add(`${activeChain[i]}->${activeChain[i+1]}`);
        cycleEdges.add(`${activeChain[i+1]}->${activeChain[i]}`);
      }
    }
    const isEdgeBright = (from, to) => {
      if (selected) {
        return from === selected || to === selected;
      }
      return cycleEdges.has(`${from}->${to}`) || cycleEdges.has(`${to}->${from}`);
    };
    const isNodeBright = (id) => {
      if (selected) return id === selected || selNeighbors.has(id);
      if (activeChain) return activeChain.includes(id);
      return false;
    };
    const hasFocus = !!selected || !!activeChain;

    return (
      <svg viewBox={`0 0 ${NET_VB_W} ${NET_VB_H}`}
           xmlns="http://www.w3.org/2000/svg"
           className="kg-svg"
           role="img"
           aria-label="Network view: four interconnected layers with edges across the middle.">

        {/* Faint quadrant crosshair to frame the four layers */}
        <line x1={540} x2={540} y1={20} y2={NET_VB_H - 20}
              stroke={BORDER_FAINT} strokeWidth={0.8} opacity={0.7}/>
        <line x1={20} x2={NET_VB_W - 20} y1={310} y2={310}
              stroke={BORDER_FAINT} strokeWidth={0.8} opacity={0.7}/>

        {/* Quadrant headers */}
        {QUADRANTS.map(q => (
          <g key={q.lane}>
            <text x={q.x} y={q.y}
                  textAnchor="middle"
                  fontSize={13} fontWeight={600}
                  fill={NAVY}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {q.label}
            </text>
            <line x1={q.x - 60} x2={q.x + 60} y1={q.y + 8} y2={q.y + 8}
                  stroke={LANE_ACCENT[q.lane]} strokeWidth={1.5} opacity={0.5}/>
          </g>
        ))}

        {/* All edges. Faint by default, brightened by selection or cycle. */}
        {allEdges.map(([from, to], i) => {
          const bright = isEdgeBright(from, to);
          return (
            <path key={`e-${i}`}
                  d={netEdgePath(netPos[from], netPos[to])}
                  fill="none"
                  stroke={bright ? TEAL : BORDER}
                  strokeWidth={bright ? 1.6 : 0.8}
                  opacity={bright ? 0.85 : (hasFocus ? 0.18 : 0.45)}/>
          );
        })}

        {/* Nodes (chips with labels inside) */}
        {Object.entries(NODES).map(([id, n]) => {
          const p = netPos[id];
          const bright = isNodeBright(id);
          const dim = hasFocus && !bright;
          const accent = LANE_ACCENT[n.lane];
          return (
            <g key={id}
               tabIndex={0}
               role="button"
               aria-label={`${LANE_LABEL[n.lane]}: ${n.label}. ${n.desc}`}
               onMouseEnter={() => setSelected(id)}
               onFocus={() => setSelected(id)}
               onClick={() => setSelected(s => (s === id ? null : id))}
               style={{ cursor: 'pointer', outline: 'none' }}>
              <rect
                x={p.x - NET_CHIP_W / 2}
                y={p.y - NET_CHIP_H / 2}
                width={NET_CHIP_W}
                height={NET_CHIP_H}
                rx={6} ry={6}
                fill={SURFACE}
                stroke={bright ? TEAL : BORDER}
                strokeWidth={bright ? 1.8 : 1}
                opacity={dim ? 0.4 : 1}/>
              <rect
                x={p.x - NET_CHIP_W / 2}
                y={p.y - NET_CHIP_H / 2}
                width={3}
                height={NET_CHIP_H}
                rx={1.5}
                fill={accent}
                opacity={dim ? 0.4 : (bright ? 1 : 0.7)}/>
              <text
                x={p.x - NET_CHIP_W / 2 + 14}
                y={p.y + 4}
                fontSize={12}
                fontWeight={bright ? 600 : 500}
                fill={dim ? MUTED : NAVY}
                opacity={dim ? 0.6 : 1}
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     MOBILE: one chain at a time, vertical flow.
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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
            {AUTO.map(i => (
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

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     MAIN
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const KnowledgeGraph = () => {
    const [view, setView]                   = useState('flow');   /* 'flow' | 'network' */
    const [cycleIdx, setCycleIdx]           = useState(0);
    const [selected, setSelected]           = useState(null);
    const [paused, setPaused]               = useState(false);
    const [isMobile, setIsMobile]           = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [mobileIdx, setMobileIdx]         = useState(0);

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

    useEffect(() => {
      if (isMobile || reducedMotion || paused) return;
      const id = setInterval(() => {
        setCycleIdx(i => AUTO[(AUTO.indexOf(i) + 1) % AUTO.length]);
      }, 4200);
      return () => clearInterval(id);
    }, [isMobile, reducedMotion, paused]);

    let activeChain;
    if (selected) activeChain = chainForNode(selected);
    else if (reducedMotion) activeChain = CHAINS[0];
    else activeChain = CHAINS[cycleIdx];

    const pause  = () => setPaused(true);
    const resume = () => { setPaused(false); setSelected(null); };

    const hintNode = selected ? NODES[selected] : null;

    return (
      <div className="kg-wrap">
        <p className="kg-legend">
          Regulations create risks. Controls mitigate those risks. The agent
          acts within those controls, and every step is logged as evidence.
        </p>

        {!isMobile && (
          <div className="kg-toggle" role="tablist" aria-label="Graph view">
            <button type="button" role="tab"
                    aria-selected={view === 'flow'}
                    className={view === 'flow' ? 'on' : ''}
                    onClick={() => { setView('flow'); setSelected(null); }}>
              Flow
            </button>
            <button type="button" role="tab"
                    aria-selected={view === 'network'}
                    className={view === 'network' ? 'on' : ''}
                    onClick={() => { setView('network'); setSelected(null); }}>
              Network
            </button>
          </div>
        )}

        <div className="kg-stage"
             onMouseEnter={pause}
             onMouseLeave={resume}
             onFocus={pause}
             onBlur={resume}>
          {isMobile ? (
            <MobileChain chainIdx={mobileIdx}
                         setChainIdx={setMobileIdx}
                         totalAuto={AUTO.length}/>
          ) : view === 'flow' ? (
            <FlowView activeChain={activeChain}
                      selected={selected}
                      setSelected={setSelected}/>
          ) : (
            <NetworkView activeChain={activeChain}
                         selected={selected}
                         setSelected={setSelected}/>
          )}
        </div>

        {!isMobile && (
          <div className="kg-hint">
            {hintNode ? (
              <span>
                <strong>{hintNode.label}.</strong> {hintNode.desc}
              </span>
            ) : reducedMotion ? (
              <span>Hover or focus any chip to learn what it means and trace its chain.</span>
            ) : view === 'flow' ? (
              <span>Tracing chain {AUTO.indexOf(cycleIdx) + 1} of {AUTO.length}. Hover any chip to inspect.</span>
            ) : (
              <span>Hover any chip to see its direct connections across the four layers.</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return { KnowledgeGraph };
})();

window.H4Graph = H4Graph;
