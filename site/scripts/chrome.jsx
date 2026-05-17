/* Horizon4 AI — shared chrome (Nav, Footer, ComputedSun, pulse helpers)
   Loads BEFORE the page's inline JSX. Exports via window.H4Chrome. */

const H4Chrome = (() => {
  const { useState, useEffect, useRef } = React;

  const route = (h) => h;

  /* ─── MEGA MENU ────────────────────────────── */
  const MEGA = {
    Academy: [
      { l: 'Overview',                h: '/academy' },
      { l: 'Public Administration AI', h: '/academy#public-administration' },
      { l: 'Teachers & Education',    h: '/academy#teachers' },
      { l: 'Business Teams',          h: '/academy#business-teams' },
      { divider: true },
      { l: 'Course Catalog',          h: '/academy/catalog' },
      { l: 'Private Training',        h: '/academy/private' },
    ],
    Advisory: [
      { l: 'AI Readiness Audit',  h: '/audit' },
      { l: 'Executive Briefing',  h: '/executive-briefing' },
      { l: 'StrategyAI',          h: '/strategyai' },
      { l: 'Donor / EU Programs', h: '/donor-programs' },
    ],
    Solutions: [
      { l: 'GovAI',      h: '/govai' },
      { l: 'EduAI',      h: '/eduai' },
      { l: 'BusinessAI', h: '/businessai' },
      { l: 'Agentic AI', h: '/agentic-ai' },
    ],
    Research: [
      { l: 'Publications', h: '/research/publications' },
      { l: 'Frameworks',   h: '/research/frameworks' },
      { l: 'Insights',     h: '/research/insights' },
    ],
    About: [
      { l: 'About Horizon4', h: '/about' },
      { l: 'Team',           h: '/team' },
      { l: 'Contact',        h: '/contact' },
    ],
  };

  /* ─── NAV ─────────────────────────────────── */
  const Nav = () => {
    const [open, setOpen]         = useState(null);
    const [drawer, setDrawer]     = useState(false);
    const [lang, setLang]         = useState('EN');
    const [scrolled, setScrolled] = useState(false);
    const closeTimer              = useRef(null);
    const onEnter = (k) => { clearTimeout(closeTimer.current); setOpen(k); };
    const onLeave = ()  => { closeTimer.current = setTimeout(() => setOpen(null), 120); };
    const toggle  = (k) => setOpen(o => (o === k ? null : k));
    useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : ''; }, [drawer]);
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    useEffect(() => {
      const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); setDrawer(false); } };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
      <React.Fragment>
        <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-inner">
            <a href={route('/')} className="nav-brand" aria-label="Horizon4 AI home">Horizon<span className="four">4</span>&nbsp;AI</a>
            <div className="nav-center">
              {Object.keys(MEGA).map(k => (
                <div key={k}
                     className={`nav-item ${open === k ? 'open' : ''}`}
                     onMouseEnter={() => onEnter(k)} onMouseLeave={onLeave}>
                  <button className="nav-trigger" aria-haspopup="true" aria-expanded={open === k}
                          onClick={() => toggle(k)}>
                    {k}<span className="chev" aria-hidden="true"></span>
                  </button>
                  <div className="mega" role="menu">
                    {MEGA[k].map((item, i) => (
                      item.divider
                        ? <div key={`d${i}`} className="mega-divider" role="separator"></div>
                        : <a key={item.l} href={route(item.h)} role="menuitem">{item.l}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="nav-right">
              <div className="nav-lang" role="group" aria-label="Language">
                <button className={lang === 'EN' ? 'on' : ''} aria-pressed={lang === 'EN'} onClick={() => setLang('EN')}>EN</button>
                <span className="div" aria-hidden="true">|</span>
                <button className={lang === 'SQ' ? 'on' : ''} aria-pressed={lang === 'SQ'} onClick={() => setLang('SQ')}>SQ</button>
              </div>
              <a href={route('/executive-briefing')} className="nav-cta">Book an AI Briefing</a>
              <button className="nav-burger" aria-label="Open menu" aria-expanded={drawer}
                      aria-controls="nav-drawer" onClick={() => setDrawer(true)}>
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </nav>
        <div className={`drawer-overlay ${drawer ? 'open' : ''}`} onClick={() => setDrawer(false)}></div>
        <aside id="nav-drawer" className={`drawer ${drawer ? 'open' : ''}`} aria-hidden={!drawer} aria-label="Site menu">
          <div className="drawer-head">
            <a href={route('/')} className="nav-brand">Horizon<span className="four">4</span>&nbsp;AI</a>
            <button className="drawer-close" onClick={() => setDrawer(false)} aria-label="Close menu">×</button>
          </div>
          <div className="drawer-body">
            {Object.keys(MEGA).map(k => (
              <details key={k} className="drawer-group">
                <summary>{k}</summary>
                <div className="drawer-sub">
                  {MEGA[k].map((item) => (
                    item.divider ? null : <a key={item.l} href={route(item.h)} onClick={() => setDrawer(false)}>{item.l}</a>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <div className="drawer-foot">
            <a href={route('/executive-briefing')} className="btn btn-primary" onClick={() => setDrawer(false)}>Book an AI Briefing</a>
            <a href={route('/academy')} className="btn btn-secondary" style={{ marginTop: 10 }} onClick={() => setDrawer(false)}>Explore Academy</a>
          </div>
        </aside>
      </React.Fragment>
    );
  };

  /* ─── LINKEDIN ICON ────────────────────────── */
  const LinkedInIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5 1.11 1 2.5 1s2.48 1.119 2.48 2.5zM.22 8h4.56v14H.22V8zm7.5 0h4.36v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.44h-4.56v-6.59c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V22H7.72V8z"/>
    </svg>
  );

  /* ─── FOOTER ──────────────────────────────── */
  const Footer = () => (
    <footer className="foot" data-screen-label="Footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand foot-col">
            <div className="wm">Horizon<span className="four">4</span>&nbsp;AI</div>
            <p className="tag">Building AI-ready capability across strategy, skilling, agents, and governance.</p>
            <div className="meta">
              <span>Tirana, Albania · Europe-ready</span>
              <span><a href="mailto:mario@horizon4.ai" style={{ color: 'inherit' }}>mario@horizon4.ai</a></span>
            </div>
          </div>
          <div className="foot-col">
            <div className="head">Academy</div>
            <a href={route('/academy')}>Overview</a>
            <a href={route('/academy#public-administration')}>Public Administration AI</a>
            <a href={route('/academy#teachers')}>Teachers & Education</a>
            <a href={route('/academy/catalog')}>Course Catalog</a>
            <a href={route('/academy/private')}>Private Training</a>
          </div>
          <div className="foot-col">
            <div className="head">Advisory</div>
            <a href={route('/audit')}>AI Readiness Audit</a>
            <a href={route('/executive-briefing')}>Executive Briefing</a>
            <a href={route('/strategyai')}>StrategyAI</a>
            <a href={route('/donor-programs')}>Donor / EU Programs</a>
          </div>
          <div className="foot-col">
            <div className="head">Solutions</div>
            <a href={route('/govai')}>GovAI</a>
            <a href={route('/eduai')}>EduAI</a>
            <a href={route('/businessai')}>BusinessAI</a>
            <a href={route('/agentic-ai')}>Agentic AI</a>
          </div>
          <div className="foot-col">
            <div className="head">Research & About</div>
            <a href={route('/research/publications')}>Publications</a>
            <a href={route('/research/insights')}>Insights</a>
            <a href={route('/team')}>Team</a>
            <a href={route('/about')}>About</a>
            <a href={route('/contact')}>Contact</a>
          </div>
        </div>
        <div className="foot-bar">
          <span>© 2026 Horizon4 AI</span>
          <span className="center">Based in Tirana. Built for Albania's AI era.</span>
          <span className="right">Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );

  /* ─── PULSE SCHEDULE (matches homepage) ────── */
  const pulseTimeForN = (n) => {
    const noise = ((Math.sin(n * 12.9898) * 43758.5453) % 1 + 1) % 1;
    return 1.2 + n * 5.5 + noise * 0.6;
  };
  const activePulses = (now) => {
    const result = [];
    const approxN = Math.floor((now - 1.2) / 5.5);
    for (let n = Math.max(0, approxN - 2); n <= approxN + 1; n++) {
      const t = pulseTimeForN(n);
      if (now - t >= 0 && now - t <= 5) result.push(t);
    }
    return result.slice(-3);
  };

  /* ─── COMPUTED SUN (no page-level rings) ───── */
  const ComputedSun = ({ scale = 0.92, maxWidth = 560 }) => {
    const mountRef = useRef(null);
    useEffect(() => {
      const THREE = window.THREE;
      const mount = mountRef.current;
      if (!THREE || !mount) return;
      const w = () => mount.clientWidth  || 1;
      const h = () => mount.clientHeight || 1;
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, w()/h(), 0.1, 100);
      camera.position.set(0, 0, 3.2);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w(), h());
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      group.rotation.z = 15 * Math.PI / 180;
      group.scale.setScalar(scale);
      scene.add(group);

      // Point cloud
      const N = 1800;
      const positions  = new Float32Array(N * 3);
      const baseColors = new Float32Array(N * 3);
      const phi = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const th = phi * i;
        positions[i*3]   = Math.cos(th) * r;
        positions[i*3+1] = y;
        positions[i*3+2] = Math.sin(th) * r;
        const roll = Math.random();
        let cr, cg, cb;
        if (roll < 0.65)      { cr = 0.051; cg = 0.608; cb = 0.518; }
        else if (roll < 0.90) { cr = 0.373; cg = 0.522; cb = 0.937; }
        else                  { cr = 1;     cg = 1;     cb = 1;     }
        const br = 0.36 + Math.random() * 0.64;
        baseColors[i*3]   = cr * br;
        baseColors[i*3+1] = cg * br;
        baseColors[i*3+2] = cb * br;
      }
      const ptGeom = new THREE.BufferGeometry();
      ptGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      ptGeom.setAttribute('color',    new THREE.BufferAttribute(baseColors, 3));
      const ptMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 }, uSphereR: { value: scale },
          uPixelRatio: { value: renderer.getPixelRatio() },
          uP0: { value: -10 }, uP1: { value: -10 }, uP2: { value: -10 },
        },
        vertexShader: [
          'attribute vec3 color;',
          'uniform float uTime; uniform float uSphereR; uniform float uPixelRatio;',
          'uniform float uP0; uniform float uP1; uniform float uP2;',
          'varying vec3 vColor; varying float vBoost;',
          'float pulseBoost(float t0, float screenR) {',
          '  if (t0 < 0.0) return 0.0;',
          '  float e = uTime - t0;',
          '  if (e < 0.0 || e > 2.3) return 0.0;',
          '  float waveR = (e / 2.0) * uSphereR;',
          '  float band  = 0.10 * uSphereR;',
          '  float dist  = abs(screenR - waveR);',
          '  float intensity = max(0.0, 1.0 - dist / band);',
          '  float endFade  = 1.0 - smoothstep(2.0, 2.3, e);',
          '  return intensity * endFade;',
          '}',
          'void main() {',
          '  vec4 worldPos = modelMatrix * vec4(position, 1.0);',
          '  vec4 viewPos  = viewMatrix  * worldPos;',
          '  gl_Position   = projectionMatrix * viewPos;',
          '  gl_PointSize  = 2.6 * uPixelRatio * (220.0 / -viewPos.z);',
          '  float screenR = length(worldPos.xy);',
          '  float b = max(pulseBoost(uP0, screenR), max(pulseBoost(uP1, screenR), pulseBoost(uP2, screenR)));',
          '  vBoost = b; vColor = color;',
          '}'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vColor; varying float vBoost;',
          'void main() {',
          '  vec2 d = gl_PointCoord - 0.5;',
          '  if (dot(d, d) > 0.25) discard;',
          '  vec3 tint = vec3(0.75, 1.0, 0.92);',
          '  vec3 c = mix(vColor, tint, vBoost * 0.85);',
          '  c += vBoost * 0.18;',
          '  gl_FragColor = vec4(c, 1.0);',
          '}'
        ].join('\n'),
        transparent: true,
      });
      group.add(new THREE.Points(ptGeom, ptMat));

      // Structure lines
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 });
      const seg = 96;
      for (let i = 1; i <= 8; i++) {
        const theta = (i / 9) * Math.PI;
        const r = Math.sin(theta), yy = Math.cos(theta);
        const arr = new Float32Array((seg + 1) * 3);
        for (let j = 0; j <= seg; j++) {
          const a = (j / seg) * Math.PI * 2;
          arr[j*3] = Math.cos(a) * r; arr[j*3+1] = yy; arr[j*3+2] = Math.sin(a) * r;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        group.add(new THREE.Line(g, lineMat));
      }
      for (let i = 0; i < 12; i++) {
        const ph2 = (i / 12) * Math.PI * 2;
        const arr = new Float32Array((seg + 1) * 3);
        for (let j = 0; j <= seg; j++) {
          const a = (j / seg) * Math.PI * 2;
          arr[j*3] = Math.cos(a) * Math.cos(ph2); arr[j*3+1] = Math.sin(a); arr[j*3+2] = Math.cos(a) * Math.sin(ph2);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        group.add(new THREE.Line(g, lineMat));
      }

      // Streams (2, slow)
      const STREAM_N = 2, streamSegs = 28;
      const randUnit = () => {
        const u = Math.random()*2-1, tt = Math.random()*Math.PI*2, s = Math.sqrt(1-u*u);
        return new THREE.Vector3(s*Math.cos(tt), u, s*Math.sin(tt));
      };
      const slerp = (a, b, t) => {
        const dot = Math.max(-1, Math.min(1, a.dot(b)));
        const omega = Math.acos(dot), so = Math.sin(omega);
        if (so < 1e-5) return a.clone();
        const w1 = Math.sin((1-t)*omega)/so, w2 = Math.sin(t*omega)/so;
        return new THREE.Vector3(a.x*w1+b.x*w2, a.y*w1+b.y*w2, a.z*w1+b.z*w2).normalize().multiplyScalar(1.008);
      };
      const streams = [];
      for (let i = 0; i < STREAM_N; i++) {
        const s = { start: randUnit(), end: randUnit(), t0: -Math.random()*4, dur: 3.0 + Math.random()*1.0,
                    pos: new Float32Array(streamSegs*3), col: new Float32Array(streamSegs*3) };
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(s.pos, 3));
        g.setAttribute('color',    new THREE.BufferAttribute(s.col, 3));
        s.line = new THREE.Line(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true }));
        group.add(s.line); streams.push(s);
      }
      const updateStream = (s, now) => {
        const cycle = s.dur + 1.5;
        if (now - s.t0 > cycle) { s.start = randUnit(); s.end = randUnit(); s.t0 = now; s.dur = 3.0 + Math.random()*1.0; }
        const e = now - s.t0, head = Math.min(e / s.dur, 1);
        const fade = e > s.dur ? Math.max(0, 1 - (e - s.dur) / 0.5) : 1;
        for (let j = 0; j < streamSegs; j++) {
          const u = j / (streamSegs-1), t = Math.max(0, head - (1 - u) * 0.30);
          const p = slerp(s.start, s.end, t);
          s.pos[j*3] = p.x; s.pos[j*3+1] = p.y; s.pos[j*3+2] = p.z;
          const b = u * fade;
          s.col[j*3] = 0.07*b; s.col[j*3+1] = 0.62*b; s.col[j*3+2] = 0.52*b;
        }
        s.line.geometry.attributes.position.needsUpdate = true;
        s.line.geometry.attributes.color.needsUpdate = true;
      };

      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let raf;
      const start = performance.now();
      const tick = () => {
        const now = (performance.now() - start) / 1000;
        if (!reduced) {
          group.rotation.y = (now / 60) * Math.PI * 2;
          const recent = activePulses(now);
          ptMat.uniforms.uTime.value = now;
          ptMat.uniforms.uP0.value = recent[0] !== undefined ? recent[0] : -10;
          ptMat.uniforms.uP1.value = recent[1] !== undefined ? recent[1] : -10;
          ptMat.uniforms.uP2.value = recent[2] !== undefined ? recent[2] : -10;
          for (let i = 0; i < streams.length; i++) updateStream(streams[i], now);
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      if (reduced) renderer.render(scene, camera); else tick();

      const onResize = () => {
        if (!mount) return;
        renderer.setSize(w(), h());
        camera.aspect = w()/h();
        camera.updateProjectionMatrix();
        ptMat.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      };
      window.addEventListener('resize', onResize);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        try { mount.removeChild(renderer.domElement); } catch (e) {}
        renderer.dispose(); ptGeom.dispose(); ptMat.dispose();
      };
    }, [scale]);

    return (
      <div className="hero-sphere" style={{ maxWidth: `${maxWidth}px` }} aria-hidden="true">
        <div className="sphere-vignette"></div>
        <div className="sphere-aura"></div>
        <div className="sphere-h4">H4</div>
        <div ref={mountRef} className="sphere-canvas"></div>
      </div>
    );
  };

  return { Nav, Footer, ComputedSun, LinkedInIcon, route };
})();

window.H4Chrome = H4Chrome;
