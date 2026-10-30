import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  Audio,
} from 'remotion';

// =========================================================================
// 1. DATA TYPES & SCENE CONFIGURATION
// Red Cat Motion + 3D Kinetic Typography Architecture
// Adapted for a Medium-Paced Romantic Love Song (IJAS — SENGANIYE)
// =========================================================================
export type SceneLayout =
  | 'LOCKUP_MONUMENTAL_CENTER' // Massive 3D hero center (200px-320px) with depth extrusion
  | 'LOCKUP_DIAGONAL_TRACK'    // Tilted 3D dynamic slash with speed lines & massive slabs
  | 'LOCKUP_HORIZONTAL_SPLIT'  // Full-width hero spanning top with dividing laser rule
  | 'LOCKUP_VERTICAL_STACK'    // Architectural skyscraper typography wall
  | 'LOCKUP_MASKED_PANEL'      // 3D dual-plane folding billboard with floor compass
  | 'LOCKUP_COSMIC_WAYPOINT';  // Deep Z-axis space fly-through with orbiting satellites

export interface WordItem {
  text: string;
  startFrame: number;
  endFrame: number;
  isHero?: boolean;
  isTag?: boolean;
}

export interface LyricScene {
  id: string;
  sceneIndex: string; // e.g. "01/20"
  startFrame: number;
  endFrame: number;
  layout: SceneLayout;
  fontFamily: 'anton' | 'bebas' | 'archivo' | 'spartan' | 'sora' | 'montserrat';
  lines: WordItem[][];
  translation: string;
  cameraMovement: {
    panX: [number, number];
    panY: [number, number];
    zoom: [number, number];
    rotZ: [number, number];
    rotX?: [number, number];
    rotY?: [number, number];
  };
  graphicMotif: 'CROSSHAIRS' | 'BRACKETS' | 'COMPASS_ARCS' | 'NAVIGATION_LINES' | 'RIPPLE_RETICLE' | 'COSMIC_ORBITS';
  bgGradient: [string, string, string]; // [Center/Top, Mid, Base]
}

// =========================================================================
// 2. DYNAMIC BACKGROUND & ROMANTIC ENVIRONMENT SYSTEM
// =========================================================================
interface DynamicBackgroundProps {
  frame: number;
  fps: number;
  currentScene: LyricScene;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  frame,
  fps,
  currentScene,
}) => {
  const t = frame / fps;
  const [colStart, colMid, colEnd] = currentScene.bgGradient;

  // Slow organic Lissajous drift for ambient spotlight
  const spotX = 50 + Math.sin(t * 0.35) * 15;
  const spotY = 50 + Math.cos(t * 0.28) * 12;
  const spotRadius = 70 + Math.sin(t * 0.5) * 10;

  // Deterministic floating starlight dust particles
  const particles = [
    { x: 10, ySeed: 0.12, speed: 0.7, r: 2.5, alpha: 0.35 },
    { x: 22, ySeed: 0.45, speed: 1.1, r: 1.8, alpha: 0.25 },
    { x: 35, ySeed: 0.88, speed: 0.8, r: 3.2, alpha: 0.4 },
    { x: 48, ySeed: 0.23, speed: 1.3, r: 2.0, alpha: 0.3 },
    { x: 60, ySeed: 0.67, speed: 0.9, r: 2.8, alpha: 0.35 },
    { x: 72, ySeed: 0.34, speed: 1.2, r: 1.6, alpha: 0.25 },
    { x: 84, ySeed: 0.91, speed: 0.75, r: 3.0, alpha: 0.4 },
    { x: 92, ySeed: 0.52, speed: 1.0, r: 2.2, alpha: 0.3 },
    { x: 16, ySeed: 0.78, speed: 0.65, r: 2.0, alpha: 0.2 },
    { x: 30, ySeed: 0.19, speed: 1.15, r: 2.6, alpha: 0.35 },
    { x: 52, ySeed: 0.82, speed: 0.85, r: 3.4, alpha: 0.3 },
    { x: 66, ySeed: 0.15, speed: 1.05, r: 1.9, alpha: 0.25 },
    { x: 80, ySeed: 0.61, speed: 0.95, r: 2.7, alpha: 0.35 },
    { x: 6, ySeed: 0.42, speed: 0.7, r: 1.8, alpha: 0.2 },
    { x: 44, ySeed: 0.39, speed: 1.2, r: 2.4, alpha: 0.3 },
    { x: 94, ySeed: 0.27, speed: 0.8, r: 3.1, alpha: 0.35 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Primary Dynamic Radial Mesh Background */}
      <div
        style={{
          background: `radial-gradient(circle at ${spotX}% ${spotY}%, ${colStart} 0%, ${colMid} ${spotRadius}%, ${colEnd} 100%)`,
        }}
        className="absolute inset-0 w-full h-full transition-colors duration-1000"
      />

      {/* 2. Topography Contour Wave Lines (Red Cat Motion signature) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M -200 ${540 + Math.sin(t * 0.4) * 80} Q 480 ${420 + Math.cos(t * 0.3) * 60} 960 ${540 + Math.sin(t * 0.35) * 90} T 2120 ${540 + Math.cos(t * 0.4) * 70}`}
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="8 12"
        />
        <path
          d={`M -200 ${680 + Math.cos(t * 0.35) * 90} Q 480 ${560 + Math.sin(t * 0.4) * 70} 960 ${680 + Math.cos(t * 0.3) * 80} T 2120 ${680 + Math.sin(t * 0.35) * 80}`}
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <path
          d={`M -200 ${380 + Math.sin(t * 0.3) * 70} Q 480 ${260 + Math.cos(t * 0.4) * 80} 960 ${380 + Math.sin(t * 0.35) * 60} T 2120 ${380 + Math.cos(t * 0.3) * 90}`}
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeDasharray="12 16"
        />
      </svg>

      {/* 3. Subtle Technical Grid Matrix */}
      <div
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: `${(t * 8) % 48}px ${(t * 4) % 48}px`,
        }}
        className="absolute inset-0 opacity-20"
      />

      {/* 4. Floating Bokeh / Starlight Dust Particles */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {particles.map((p, i) => {
          const y = 110 - ((p.ySeed * 100 + t * p.speed * 8) % 120);
          const waveX = p.x + Math.sin(t * 1.2 + i) * 1.5;
          return (
            <circle
              key={`particle-${i}`}
              cx={waveX}
              cy={y}
              r={p.r * 0.12}
              fill="#FFFFFF"
              opacity={p.alpha * (0.6 + Math.sin(t * 2 + i) * 0.4)}
            />
          );
        })}
      </svg>
    </div>
  );
};

// =========================================================================
// 3. VECTOR GRAPHIC CONNECTORS & RED CAT MOTION HUD OVERLAYS
// =========================================================================
interface GraphicOverlayProps {
  motif: LyricScene['graphicMotif'];
  sceneIndex: string;
  frame: number;
  localFrame: number;
  fps: number;
}

const GraphicConnectors: React.FC<GraphicOverlayProps> = ({
  motif,
  sceneIndex,
  frame,
  localFrame,
  fps,
}) => {
  const t = localFrame / fps;
  const globalTime = frame / fps;

  const lineProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const lineWidth = interpolate(lineProgress, [0, 1], [0, 100]);
  const rotation = (t * 8) % 360;

  // Timecode calculation
  const totalSeconds = Math.floor(frame / fps);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const frameSub = String(frame % fps).padStart(2, '0');

  // Equalizer frequencies simulation (8 bars)
  const eqBars = [0.4, 0.7, 0.95, 0.6, 0.85, 0.5, 0.75, 0.35];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* ─── TOP LEFT: METADATA & RECORDING STATUS ─── */}
      <div className="absolute top-8 left-12 flex items-center gap-3 text-xs font-mono font-semibold tracking-[0.25em] text-white/50">
        <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
        <span className="text-white/80 font-bold">REC ● {minutes}:{seconds}:{frameSub}</span>
        <span className="opacity-30">|</span>
        <span>SEC {sceneIndex}</span>
        <span className="opacity-30">|</span>
        <span className="text-white/60">78 BPM • ROMANTIC KINETIC</span>
      </div>

      {/* ─── TOP RIGHT: TECHNICAL RETICLE & RESOLUTION ─── */}
      <div className="absolute top-8 right-12 flex items-center gap-3 text-xs font-mono text-white/40 tracking-widest">
        <span>[ 1920 × 1080 • 30FPS ]</span>
        <div className="relative w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
          <div
            style={{ transform: `rotate(${rotation * 4}deg)` }}
            className="absolute inset-0 border-t border-white/80 rounded-full"
          />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
        </div>
      </div>

      {/* ─── LEFT FLANK: AUDIO EQUALIZER FREQUENCY BARS ─── */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 items-start">
        <span className="text-[9px] font-mono tracking-widest text-white/30 mb-1">FREQ // EQ</span>
        <div className="flex items-end gap-1 h-12">
          {eqBars.map((baseH, idx) => {
            const dynamicH = Math.max(
              4,
              Math.min(
                44,
                baseH * 40 + Math.sin(globalTime * 6 + idx * 1.1) * 16 + Math.cos(globalTime * 9 + idx) * 8
              )
            );
            return (
              <div
                key={`eq-${idx}`}
                style={{ height: `${dynamicH}px` }}
                className="w-1 bg-white/40 rounded-t-sm transition-all duration-75"
              />
            );
          })}
        </div>
        <span className="text-[8px] font-mono tracking-widest text-white/30 mt-1">44.1 kHz STEREO</span>
      </div>

      {/* ─── RIGHT FLANK: COMPASS WAYPOINT & AXIS COORDINATES ─── */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1 text-[10px] font-mono text-white/35 tracking-wider">
        <span>LAT // 13.0827° N</span>
        <span>LONG // 80.2707° E</span>
        <div className="w-16 h-px bg-white/20 my-1" />
        <span>AXIS: 3D SPACE</span>
        <span className="text-white/60 font-bold">RCM // TYPO</span>
      </div>

      {/* ─── MOTIF A: BRACKETS [ ] Framing the active typography block ─── */}
      {motif === 'BRACKETS' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[1720px] h-[860px] relative border border-white/10 rounded-2xl">
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-white/70">
              <span className="absolute -top-4 left-0 text-[9px] font-mono text-white/40">01</span>
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-white/70">
              <span className="absolute -top-4 right-0 text-[9px] font-mono text-white/40">02</span>
            </div>
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-white/70">
              <span className="absolute -bottom-4 left-0 text-[9px] font-mono text-white/40">03</span>
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-white/70">
              <span className="absolute -bottom-4 right-0 text-[9px] font-mono text-white/40">04</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── MOTIF B: NAVIGATION LINES ─── */}
      {motif === 'NAVIGATION_LINES' && (
        <div className="absolute inset-0 flex flex-col justify-between py-20 px-12">
          <div className="w-full flex items-center gap-4">
            <span className="text-[10px] font-mono text-white/40 tracking-wider">DIR // 01</span>
            <div
              style={{ width: `${lineWidth}%` }}
              className="h-px bg-gradient-to-r from-white/70 via-white/40 to-transparent transition-all"
            />
            <span className="text-sm font-mono text-white/70">▶</span>
          </div>

          <div className="w-full flex items-center justify-end gap-4">
            <span className="text-sm font-mono text-white/70">◀</span>
            <div
              style={{ width: `${lineWidth}%` }}
              className="h-px bg-gradient-to-l from-white/70 via-white/40 to-transparent transition-all"
            />
            <span className="text-[10px] font-mono text-white/40 tracking-wider">PATH // VECTOR</span>
          </div>
        </div>
      )}

      {/* ─── MOTIF C: CROSSHAIRS (+) Precision grid marks ─── */}
      {motif === 'CROSSHAIRS' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[1700px] h-[840px] relative">
            <div className="absolute top-0 left-0 text-white/50 font-mono text-2xl font-bold">+</div>
            <div className="absolute top-0 right-0 text-white/50 font-mono text-2xl font-bold">+</div>
            <div className="absolute bottom-0 left-0 text-white/50 font-mono text-2xl font-bold">+</div>
            <div className="absolute bottom-0 right-0 text-white/50 font-mono text-2xl font-bold">+</div>
            <div className="absolute top-1/2 left-8 -translate-y-1/2 text-white/30 font-mono text-xs">|───+───|</div>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 text-white/30 font-mono text-xs">|───+───|</div>
          </div>
        </div>
      )}

      {/* ─── MOTIF D: COMPASS ARCS ─── */}
      {motif === 'COMPASS_ARCS' && (
        <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 1920 1080">
          <g transform={`translate(960, 540) rotate(${rotation})`}>
            <circle cx="0" cy="0" r="480" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="16 24" />
            <circle cx="0" cy="0" r="620" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 30" />
            <line x1="-700" y1="0" x2="700" y2="0" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="8 8" />
            <line x1="0" y1="-520" x2="0" y2="520" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="8 8" />
            <text x="0" y="-490" fill="#FFFFFF" fontSize="11" fontFamily="monospace" textAnchor="middle" opacity="0.6">0° N</text>
            <text x="490" y="5" fill="#FFFFFF" fontSize="11" fontFamily="monospace" textAnchor="middle" opacity="0.6">90° E</text>
            <text x="0" y="500" fill="#FFFFFF" fontSize="11" fontFamily="monospace" textAnchor="middle" opacity="0.6">180° S</text>
            <text x="-490" y="5" fill="#FFFFFF" fontSize="11" fontFamily="monospace" textAnchor="middle" opacity="0.6">270° W</text>
          </g>
        </svg>
      )}

      {/* ─── MOTIF E: RIPPLE RETICLE ─── */}
      {motif === 'RIPPLE_RETICLE' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[320, 560, 840].map((radius, i) => (
            <div
              key={`reticle-${i}`}
              style={{
                width: radius,
                height: radius,
                transform: `scale(${1 + Math.sin(t * 2 + i) * 0.04})`,
              }}
              className="absolute rounded-full border border-white/20"
            />
          ))}
          <div className="w-3 h-3 bg-white/60 rounded-full animate-ping" />
        </div>
      )}

      {/* ─── MOTIF F: COSMIC ORBITS ─── */}
      {motif === 'COSMIC_ORBITS' && (
        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 1920 1080">
          <g transform="translate(960, 540)">
            <ellipse
              cx="0"
              cy="0"
              rx="760"
              ry="320"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeDasharray="12 18"
              transform={`rotate(-18)`}
            />
            <circle
              cx={760 * Math.cos(t * 0.8)}
              cy={320 * Math.sin(t * 0.8)}
              r="5.5"
              fill="#FFFFFF"
              transform={`rotate(-18)`}
            />
            <ellipse
              cx="0"
              cy="0"
              rx="560"
              ry="230"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeDasharray="6 20"
              transform={`rotate(28)`}
            />
            <circle
              cx={560 * Math.cos(-t * 0.9 + 2)}
              cy={230 * Math.sin(-t * 0.9 + 2)}
              r="4.5"
              fill="#FFFFFF"
              transform={`rotate(28)`}
            />
          </g>
        </svg>
      )}

      {/* ─── BOTTOM CENTER: AUDIO PROGRESS TRACK ─── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <span className="text-[10px] font-mono text-white/50 tracking-wider">AUDIO SYNC // {minutes}:{seconds}</span>
        <div className="w-72 h-1.5 bg-white/15 rounded-full overflow-hidden p-[1px]">
          <div
            style={{ width: `${(frame / 7095) * 100}%` }}
            className="h-full bg-gradient-to-r from-white/60 via-white/90 to-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]"
          />
        </div>
        <span className="text-[10px] font-mono text-white/50 tracking-wider">03:56</span>
      </div>
    </div>
  );
};

// =========================================================================
// 4. COMPLETE THANGLISH SCENE TIMELINE (20 ART-DIRECTED SCENES)
// =========================================================================
export const lyricScenes: LyricScene[] = [
  // 1. INTRO
  {
    id: 'intro',
    sceneIndex: '01/20',
    startFrame: 300,
    endFrame: 580,
    layout: 'LOCKUP_MONUMENTAL_CENTER',
    fontFamily: 'sora',
    graphicMotif: 'RIPPLE_RETICLE',
    bgGradient: ['#4A0014', '#30000D', '#1A0007'],
    cameraMovement: { panX: [0, 0], panY: [20, -10], zoom: [0.95, 1.05], rotZ: [0, 1], rotX: [12, 0] },
    lines: [
      [
        { text: 'Mmm...', startFrame: 300, endFrame: 435, isHero: true },
        { text: 'Hmmm...', startFrame: 445, endFrame: 580, isHero: true },
      ],
    ],
    translation: 'Soulful Humming',
  },

  // 2. VERSE 1, LINE 1: Un aagaaya anbukku / Naan enna seivadhu?
  {
    id: 'v1-1',
    sceneIndex: '02/20',
    startFrame: 600,
    endFrame: 775,
    layout: 'LOCKUP_HORIZONTAL_SPLIT',
    fontFamily: 'spartan',
    graphicMotif: 'NAVIGATION_LINES',
    bgGradient: ['#B8001F', '#8A0017', '#52000E'],
    cameraMovement: { panX: [-30, 20], panY: [0, 0], zoom: [0.96, 1.04], rotZ: [-1, 0.5], rotX: [10, -5] },
    lines: [
      [
        { text: 'UN', startFrame: 600, endFrame: 618, isTag: true },
        { text: 'AAGAAYA', startFrame: 618, endFrame: 660, isHero: true },
      ],
      [
        { text: 'ANBUKKU', startFrame: 660, endFrame: 696, isHero: true },
        { text: 'Naan', startFrame: 699, endFrame: 717 },
        { text: 'enna', startFrame: 717, endFrame: 741 },
        { text: 'seivadhu?', startFrame: 741, endFrame: 774 },
      ],
    ],
    translation: 'For your sky-like infinite love, what shall I do?',
  },

  // 3. VERSE 1, LINE 2: Un puyal koba gunathukku / Naan engu povadhu?
  {
    id: 'v1-2',
    sceneIndex: '03/20',
    startFrame: 780,
    endFrame: 985,
    layout: 'LOCKUP_DIAGONAL_TRACK',
    fontFamily: 'archivo',
    graphicMotif: 'CROSSHAIRS',
    bgGradient: ['#8A0017', '#5E0010', '#36000A'],
    cameraMovement: { panX: [50, -25], panY: [-20, 15], zoom: [1.02, 0.98], rotZ: [2, -1], rotY: [15, -8] },
    lines: [
      [
        { text: 'UN', startFrame: 785, endFrame: 805, isTag: true },
        { text: 'PUYAL', startFrame: 805, endFrame: 835, isHero: true },
        { text: 'KOBA', startFrame: 835, endFrame: 855 },
      ],
      [
        { text: 'GUNATHUKKU', startFrame: 855, endFrame: 885, isHero: true },
      ],
      [
        { text: 'Naan engu povadhu?', startFrame: 885, endFrame: 975 },
      ],
    ],
    translation: 'For your stormy fiery anger, where shall I go?',
  },

  // 4. VERSE 1, LINE 3: Un mae Kaaththu sirippukku / Naan enna tharuvadhu?
  {
    id: 'v1-3',
    sceneIndex: '04/20',
    startFrame: 990,
    endFrame: 1280,
    layout: 'LOCKUP_MASKED_PANEL',
    fontFamily: 'montserrat',
    graphicMotif: 'COMPASS_ARCS',
    bgGradient: ['#C21838', '#990022', '#610016'],
    cameraMovement: { panX: [0, 0], panY: [30, -15], zoom: [0.97, 1.03], rotZ: [0, -1], rotX: [12, -8] },
    lines: [
      [
        { text: 'UN', startFrame: 1000, endFrame: 1025, isTag: true },
        { text: 'MAE KAATHTHU', startFrame: 1025, endFrame: 1075, isHero: true },
      ],
      [
        { text: 'SIRIPPUKKU', startFrame: 1075, endFrame: 1115, isHero: true },
      ],
      [
        { text: 'Naan enna tharuvadhu?', startFrame: 1115, endFrame: 1260 },
      ],
    ],
    translation: 'For your cloud-breeze smile, what shall I give?',
  },

  // 5. VERSE 1, LINE 4: Un May maadha sandaikku / Naan enna aavadhu?
  {
    id: 'v1-4',
    sceneIndex: '05/20',
    startFrame: 1380,
    endFrame: 1650,
    layout: 'LOCKUP_VERTICAL_STACK',
    fontFamily: 'anton',
    graphicMotif: 'BRACKETS',
    bgGradient: ['#B81414', '#8C0808', '#4F0404'],
    cameraMovement: { panX: [25, -15], panY: [20, -10], zoom: [0.94, 1.05], rotZ: [-1.5, 1], rotX: [8, -4] },
    lines: [
      [
        { text: 'UN MAY MAADHA', startFrame: 1395, endFrame: 1470, isHero: true },
      ],
      [
        { text: 'SANDAIKKU', startFrame: 1470, endFrame: 1515, isHero: true },
      ],
      [
        { text: 'Naan enna aavadhu?', startFrame: 1515, endFrame: 1640 },
      ],
    ],
    translation: 'For your scorching May-month quarrels, what will become of me?',
  },

  // 6. VERSE 2, LINE 1: Dhegaththai aadaikkul
  {
    id: 'v2-1',
    sceneIndex: '06/20',
    startFrame: 1680,
    endFrame: 1980,
    layout: 'LOCKUP_HORIZONTAL_SPLIT',
    fontFamily: 'montserrat',
    graphicMotif: 'NAVIGATION_LINES',
    bgGradient: ['#4A0012', '#33000C', '#1F0008'],
    cameraMovement: { panX: [-25, 20], panY: [-10, 10], zoom: [1.02, 0.98], rotZ: [0.8, -0.4], rotY: [-10, 8] },
    lines: [
      [
        { text: 'DHEGATHTHAI', startFrame: 1695, endFrame: 1755, isHero: true },
      ],
      [
        { text: 'AADAIKKUL', startFrame: 1755, endFrame: 1824, isHero: true },
        { text: 'Adai kaaththu vaiththaalum', startFrame: 1824, endFrame: 1970 },
      ],
    ],
    translation: 'Even if you shelter your body close within clothing...',
  },

  // 7. VERSE 2, LINE 2: Unarvugalil asaivugalil
  {
    id: 'v2-2',
    sceneIndex: '07/20',
    startFrame: 1995,
    endFrame: 2310,
    layout: 'LOCKUP_MASKED_PANEL',
    fontFamily: 'sora',
    graphicMotif: 'COMPASS_ARCS',
    bgGradient: ['#59001A', '#3D0012', '#24000B'],
    cameraMovement: { panX: [15, -15], panY: [20, -15], zoom: [0.97, 1.03], rotZ: [-1, 1], rotX: [-10, 10] },
    lines: [
      [
        { text: 'UNARVUGALIL', startFrame: 2025, endFrame: 2100, isHero: true },
        { text: 'ASAIVUGALIL', startFrame: 2100, endFrame: 2175, isHero: true },
      ],
      [
        { text: 'Venduvadhai velippaduththum.', startFrame: 2175, endFrame: 2300 },
      ],
    ],
    translation: '...in feelings and tender gestures, it reveals all it desires.',
  },

  // 8. VERSE 2, LINE 3: Mogaththai kaadhal vida
  {
    id: 'v2-3',
    sceneIndex: '08/20',
    startFrame: 2325,
    endFrame: 2595,
    layout: 'LOCKUP_VERTICAL_STACK',
    fontFamily: 'spartan',
    graphicMotif: 'CROSSHAIRS',
    bgGradient: ['#6E0026', '#4A001A', '#2E0010'],
    cameraMovement: { panX: [-30, 20], panY: [0, 0], zoom: [1.03, 0.97], rotZ: [1.2, -0.6], rotY: [12, -6] },
    lines: [
      [
        { text: 'MOGATHTHAI', startFrame: 2355, endFrame: 2415, isHero: true },
        { text: 'KAADHAL VIDA', startFrame: 2415, endFrame: 2475, isHero: true },
      ],
      [
        { text: 'Oru padi mel vaiththirundhaal', startFrame: 2475, endFrame: 2590 },
      ],
    ],
    translation: 'If passion is held one step above love...',
  },

  // 9. VERSE 2, LINE 4: Nimmadhiye kaikittum
  {
    id: 'v2-4',
    sceneIndex: '09/20',
    startFrame: 2610,
    endFrame: 2865,
    layout: 'LOCKUP_MONUMENTAL_CENTER',
    fontFamily: 'sora',
    graphicMotif: 'RIPPLE_RETICLE',
    bgGradient: ['#8A0022', '#590016', '#33000C'],
    cameraMovement: { panX: [0, 0], panY: [-15, 10], zoom: [0.96, 1.02], rotZ: [0, 0.5], rotX: [8, -4] },
    lines: [
      [
        { text: 'Vaazhvukkum udambukkum', startFrame: 2625, endFrame: 2745 },
      ],
      [
        { text: 'NIMMADHIYE', startFrame: 2745, endFrame: 2796, isHero: true },
        { text: 'KAIKITTUM.', startFrame: 2796, endFrame: 2855, isHero: true },
      ],
    ],
    translation: '...peace will be within reach for both life and body.',
  },

  // 10. CHORUS 1: SENGANIYE — VAA ARUGE (THE ICONIC HOOK)
  {
    id: 'ch1-1',
    sceneIndex: '10/20',
    startFrame: 2880,
    endFrame: 3255,
    layout: 'LOCKUP_MONUMENTAL_CENTER',
    fontFamily: 'anton',
    graphicMotif: 'BRACKETS',
    bgGradient: ['#D90429', '#A3001C', '#6B0012'],
    cameraMovement: { panX: [0, 0], panY: [25, -15], zoom: [0.92, 1.06], rotZ: [-0.8, 0.8], rotX: [14, -6] },
    lines: [
      [{ text: 'SENGANIYE', startFrame: 2880, endFrame: 3075, isHero: true }],
      [
        { text: 'VAA..', startFrame: 3075, endFrame: 3135 },
        { text: 'ARUGE.....', startFrame: 3135, endFrame: 3245, isHero: true },
      ],
    ],
    translation: 'My sweet beloved... come closer to me...',
  },

  // 11. CHORUS 1, PART B: SENGANIYE
  {
    id: 'ch1-2',
    sceneIndex: '11/20',
    startFrame: 3270,
    endFrame: 3660,
    layout: 'LOCKUP_MONUMENTAL_CENTER',
    fontFamily: 'bebas',
    graphicMotif: 'RIPPLE_RETICLE',
    bgGradient: ['#BA0020', '#850017', '#54000E'],
    cameraMovement: { panX: [25, -25], panY: [0, 0], zoom: [1.04, 0.96], rotZ: [1, -1], rotY: [-10, 10] },
    lines: [
      [{ text: 'SENGANIYE', startFrame: 3285, endFrame: 3465, isHero: true }],
      [
        { text: 'VAA..', startFrame: 3465, endFrame: 3525 },
        { text: 'ARUGE....', startFrame: 3525, endFrame: 3645, isHero: true },
      ],
    ],
    translation: 'My sweet red fruit... come closer...',
  },

  // 12. ACOUSTIC GUITAR INTERLUDE
  {
    id: 'interlude',
    sceneIndex: '12/20',
    startFrame: 3660,
    endFrame: 4365,
    layout: 'LOCKUP_MONUMENTAL_CENTER',
    fontFamily: 'montserrat',
    graphicMotif: 'COMPASS_ARCS',
    bgGradient: ['#540014', '#38000D', '#210008'],
    cameraMovement: { panX: [0, 0], panY: [15, -15], zoom: [0.95, 1.05], rotZ: [-2, 2], rotX: [10, -10] },
    lines: [
      [
        { text: 'ACOUSTIC', startFrame: 3750, endFrame: 4000, isHero: true },
        { text: 'GUITAR', startFrame: 4000, endFrame: 4180, isHero: true },
        { text: 'SOLO', startFrame: 4180, endFrame: 4360, isHero: true },
      ],
    ],
    translation: '♪ Intimate Acoustic Guitar Melody ♪',
  },

  // 13. BRIDGE, LINE 1: Puvi illaamal ponaalo / Kolgal vinnodu noorundu
  {
    id: 'br-1',
    sceneIndex: '13/20',
    startFrame: 4380,
    endFrame: 4725,
    layout: 'LOCKUP_COSMIC_WAYPOINT',
    fontFamily: 'bebas',
    graphicMotif: 'COSMIC_ORBITS',
    bgGradient: ['#3B002B', '#24001A', '#14000F'],
    cameraMovement: { panX: [-40, 30], panY: [20, -15], zoom: [0.94, 1.06], rotZ: [1.5, -1], rotY: [-14, 14] },
    lines: [
      [
        { text: 'PUVI', startFrame: 4395, endFrame: 4440 },
        { text: 'ILLAAMAL', startFrame: 4440, endFrame: 4500 },
        { text: 'PONAALO', startFrame: 4500, endFrame: 4550 },
      ],
      [
        { text: 'KOLGAL', startFrame: 4550, endFrame: 4614, isHero: true },
        { text: 'VINNODU', startFrame: 4614, endFrame: 4674, isHero: true },
        { text: 'NOORUNDU.', startFrame: 4674, endFrame: 4715 },
      ],
    ],
    translation: 'Even if the Earth ceases to exist, a hundred planets orbit the heavens.',
  },

  // 14. BRIDGE, LINE 2: Uyir boomikkul illainnaalum / Vinnil engavathu vaayppundu
  {
    id: 'br-2',
    sceneIndex: '14/20',
    startFrame: 4740,
    endFrame: 5145,
    layout: 'LOCKUP_COSMIC_WAYPOINT',
    fontFamily: 'sora',
    graphicMotif: 'COMPASS_ARCS',
    bgGradient: ['#4A0835', '#2E0021', '#1A0013'],
    cameraMovement: { panX: [35, -25], panY: [-15, 12], zoom: [1.02, 0.98], rotZ: [-1, 1], rotX: [10, -6] },
    lines: [
      [
        { text: 'UYIR', startFrame: 4776, endFrame: 4836 },
        { text: 'BOOMIKKUL', startFrame: 4836, endFrame: 4896 },
        { text: 'ILLAINNAALUM', startFrame: 4896, endFrame: 4965 },
      ],
      [
        { text: 'VINNIL', startFrame: 4965, endFrame: 5025, isHero: true },
        { text: 'ENGAVATHU', startFrame: 5025, endFrame: 5076 },
        { text: 'VAAPPUNDU.', startFrame: 5076, endFrame: 5135 },
      ],
    ],
    translation: 'Even if life is not found on Earth, in space there is always hope.',
  },

  // 15. BRIDGE, LINE 3: Nilam illaadha tharaiyaanaalum / Angum uyirvaazha vazhiyundu
  {
    id: 'br-3',
    sceneIndex: '15/20',
    startFrame: 5160,
    endFrame: 5535,
    layout: 'LOCKUP_HORIZONTAL_SPLIT',
    fontFamily: 'montserrat',
    graphicMotif: 'CROSSHAIRS',
    bgGradient: ['#540026', '#38001A', '#1F000E'],
    cameraMovement: { panX: [-25, 25], panY: [15, -10], zoom: [0.97, 1.03], rotZ: [0.5, -0.5], rotY: [10, -10] },
    lines: [
      [
        { text: 'NILAM', startFrame: 5190, endFrame: 5244 },
        { text: 'ILLAADHA', startFrame: 5244, endFrame: 5304, isHero: true },
        { text: 'THARAIYAANAALUM', startFrame: 5304, endFrame: 5370, isHero: true },
      ],
      [
        { text: 'Angum uyirvaazha vazhiyundu.', startFrame: 5370, endFrame: 5525 },
      ],
    ],
    translation: 'Even on landless terrain, there is still a way to survive.',
  },

  // 16. BRIDGE, LINE 4: Nee illaadha vaazhkaiyile / Naan vaazhnthaalum viruppamillai
  {
    id: 'br-4',
    sceneIndex: '16/20',
    startFrame: 5550,
    endFrame: 5925,
    layout: 'LOCKUP_VERTICAL_STACK',
    fontFamily: 'archivo',
    graphicMotif: 'BRACKETS',
    bgGradient: ['#29000E', '#1C0009', '#0D0004'],
    cameraMovement: { panX: [0, 0], panY: [-25, 15], zoom: [0.94, 1.05], rotZ: [-1, 0.8], rotX: [12, -4] },
    lines: [
      [
        { text: 'NEE', startFrame: 5565, endFrame: 5610, isHero: true },
        { text: 'ILLAADHA', startFrame: 5610, endFrame: 5670, isHero: true },
      ],
      [
        { text: 'VAAZHKAIYILE', startFrame: 5670, endFrame: 5730, isHero: true },
      ],
      [
        { text: 'Naan vaazhnthaalum', startFrame: 5730, endFrame: 5844 },
        { text: 'VIRUPPAMILLAI..', startFrame: 5844, endFrame: 5915, isHero: true },
      ],
    ],
    translation: 'Yet in a life without you, even if I lived, I have no desire to...',
  },

  // 17. FINAL CHORUS, PART A: SENGANIYE — VAA ARUGE
  {
    id: 'ch2-1',
    sceneIndex: '17/20',
    startFrame: 5940,
    endFrame: 6315,
    layout: 'LOCKUP_MONUMENTAL_CENTER',
    fontFamily: 'anton',
    graphicMotif: 'BRACKETS',
    bgGradient: ['#E6002B', '#B8001F', '#7A0015'],
    cameraMovement: { panX: [0, 0], panY: [25, -15], zoom: [0.92, 1.06], rotZ: [-0.8, 0.8], rotX: [14, -6] },
    lines: [
      [{ text: 'SENGANIYE', startFrame: 5940, endFrame: 6120, isHero: true }],
      [
        { text: 'VAA..', startFrame: 6120, endFrame: 6180 },
        { text: 'ARUGE.....', startFrame: 6180, endFrame: 6300, isHero: true },
      ],
    ],
    translation: 'My sweet beloved... come closer...',
  },

  // 18. FINAL CHORUS, PART B: SENGANIYE
  {
    id: 'ch2-2',
    sceneIndex: '18/20',
    startFrame: 6330,
    endFrame: 6645,
    layout: 'LOCKUP_HORIZONTAL_SPLIT',
    fontFamily: 'bebas',
    graphicMotif: 'RIPPLE_RETICLE',
    bgGradient: ['#D40026', '#9E001A', '#660010'],
    cameraMovement: { panX: [20, -20], panY: [-10, 10], zoom: [1.03, 0.97], rotZ: [1, -1], rotY: [-10, 10] },
    lines: [
      [{ text: 'SENGANIYE', startFrame: 6345, endFrame: 6495, isHero: true }],
      [
        { text: 'VAA..', startFrame: 6495, endFrame: 6555 },
        { text: 'ARUGE....', startFrame: 6555, endFrame: 6635, isHero: true },
      ],
    ],
    translation: 'My sweet red fruit... stay by my side...',
  },

  // 19. FINAL CHORUS, PART C: Grand Musical Climax
  {
    id: 'ch2-3',
    sceneIndex: '19/20',
    startFrame: 6660,
    endFrame: 7020,
    layout: 'LOCKUP_MONUMENTAL_CENTER',
    fontFamily: 'spartan',
    graphicMotif: 'NAVIGATION_LINES',
    bgGradient: ['#B8001F', '#8A0017', '#52000E'],
    cameraMovement: { panX: [0, 0], panY: [15, -10], zoom: [0.95, 1.03], rotZ: [-0.5, 0.5], rotX: [8, -4] },
    lines: [
      [{ text: 'SENGANIYE', startFrame: 6660, endFrame: 6825, isHero: true }],
      [
        { text: 'VAA..', startFrame: 6825, endFrame: 6885 },
        { text: 'ARUGE.....', startFrame: 6885, endFrame: 7000, isHero: true },
      ],
    ],
    translation: 'Forever close to me.',
  },

  // 20. OUTRO: Fade to Silence
  {
    id: 'outro',
    sceneIndex: '20/20',
    startFrame: 7020,
    endFrame: 7095,
    layout: 'LOCKUP_MONUMENTAL_CENTER',
    fontFamily: 'montserrat',
    graphicMotif: 'RIPPLE_RETICLE',
    bgGradient: ['#3D0010', '#24000A', '#0F0004'],
    cameraMovement: { panX: [0, 0], panY: [0, 0], zoom: [1, 0.95], rotZ: [0, 0] },
    lines: [
      [
        { text: '✦', startFrame: 7020, endFrame: 7040, isHero: true },
        { text: '✦', startFrame: 7040, endFrame: 7060, isHero: true },
        { text: '✦', startFrame: 7060, endFrame: 7085, isHero: true },
      ],
    ],
    translation: 'Fade to Silence',
  },
];

// =========================================================================
// 5. BESPOKE 3D TYPOGRAPHY RENDERERS (ONE FOR EACH LAYOUT TYPE)
// =========================================================================

interface LayoutProps {
  scene: LyricScene;
  frame: number;
  fps: number;
  activeFont: string;
}

// ─────────────────────────────────────────────────────────────────────────
// A. DIAGONAL TRACK LOCKUP (e.g. Scene 3: UN PUYAL KOBA GUNATHUKKU)
// Tilted 3D dynamic slash, massive 260px words, directional slashes
// ─────────────────────────────────────────────────────────────────────────
const DiagonalTrackLayout: React.FC<LayoutProps> = ({ scene, frame, fps, activeFont }) => {
  const localFrame = frame - scene.startFrame;
  const t = localFrame / fps;

  // Flatten lines
  const allWords = scene.lines.flat();
  const unWord = allWords.find((w) => w.text === 'UN');
  const puyalWord = allWords.find((w) => w.text === 'PUYAL');
  const kobaWord = allWords.find((w) => w.text === 'KOBA');
  const gunaWord = allWords.find((w) => w.text === 'GUNATHUKKU');
  const restWords = allWords.filter(
    (w) => w.text !== 'UN' && w.text !== 'PUYAL' && w.text !== 'KOBA' && w.text !== 'GUNATHUKKU'
  );

  const puyalSpring = spring({
    frame: puyalWord ? frame - puyalWord.startFrame : 0,
    fps,
    config: { damping: 13, stiffness: 160, mass: 0.6 },
  });

  const gunaSpring = spring({
    frame: gunaWord ? frame - gunaWord.startFrame : 0,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.6 },
  });

  const puyalTranslateY = interpolate(puyalSpring, [0, 1], [-80, 0]);
  const puyalScale = interpolate(puyalSpring, [0, 1], [0.8, 1.0]);
  const puyalOpacity = puyalWord && frame >= puyalWord.startFrame ? interpolate(puyalSpring, [0, 0.3], [0, 1]) : 0;

  const gunaTranslateX = interpolate(gunaSpring, [0, 1], [100, 0]);
  const gunaOpacity = gunaWord && frame >= gunaWord.startFrame ? interpolate(gunaSpring, [0, 0.3], [0, 1]) : 0;

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateZ(-8deg) rotateY(12deg) rotateX(6deg)`,
      }}
      className={`relative w-full max-w-7xl h-full flex flex-col justify-center items-center preserve-3d select-none ${activeFont}`}
    >
      {/* 1. TOP HERO ROW: [UN] + [PUYAL] + [KOBA] */}
      <div className="relative flex items-baseline justify-center gap-6 w-full px-6 preserve-3d">
        {/* UN Technical Stamp */}
        {unWord && (
          <div
            style={{
              opacity: frame >= unWord.startFrame ? 1 : 0,
              transform: 'translateY(-20px)',
            }}
            className="flex flex-col items-center border border-white/40 px-3 py-1 rounded bg-black/20"
          >
            <span className="text-xs font-mono tracking-widest text-white/50">TAG // 03</span>
            <span className="text-3xl font-mono font-bold text-white tracking-widest">UN</span>
          </div>
        )}

        {/* MASSIVE PUYAL (STORM) - 260px COLOSSUS */}
        {puyalWord && (
          <div className="relative inline-flex items-center justify-center">
            {/* Outlined 3D Ghost Echo behind PUYAL */}
            <span
              style={{
                transform: `scale(${puyalScale * 1.18 + Math.sin(t * 2) * 0.03}) translateZ(-60px)`,
                opacity: puyalOpacity * 0.25,
              }}
              className="absolute inset-0 flex items-center justify-center font-black text-outline-hero text-[13rem] md:text-[17rem] lg:text-[20rem] leading-none tracking-tight select-none pointer-events-none"
            >
              PUYAL
            </span>

            {/* Solid Foreground PUYAL */}
            <span
              style={{
                transform: `translateY(${puyalTranslateY}px) scale(${puyalScale}) translateZ(40px)`,
                opacity: puyalOpacity,
              }}
              className="relative font-black text-white text-[13rem] md:text-[17rem] lg:text-[20rem] leading-none tracking-tight select-none text-shadow-3d-red drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
            >
              PUYAL
            </span>
          </div>
        )}

        {/* KOBA Angled Tag */}
        {kobaWord && (
          <div
            style={{
              opacity: frame >= kobaWord.startFrame ? 1 : 0,
              transform: 'translateY(-15px) translateZ(20px)',
            }}
            className="flex items-center gap-2"
          >
            <span className="text-5xl md:text-6xl font-black text-white/90 tracking-widest border-b-4 border-red-500 pb-1">
              KOBA
            </span>
          </div>
        )}
      </div>

      {/* 2. MIDDLE ROW: MASSIVE GUNATHUKKU SLAB */}
      {gunaWord && (
        <div className="relative w-full flex items-center justify-center mt-1 px-4 preserve-3d overflow-visible">
          <span
            style={{
              transform: `translateX(${interpolate(gunaSpring, [0, 1], [40, 0])}px) translateZ(60px)`,
              opacity: gunaOpacity,
            }}
            className="relative font-black text-white text-[7.5rem] md:text-[9.5rem] lg:text-[11.2rem] leading-none tracking-tight text-shadow-3d-dark drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
          >
            GUNATHUKKU
          </span>
        </div>
      )}

      {/* 3. BOTTOM ROW: "Naan engu povadhu?" Justified Sub-block */}
      {restWords.length > 0 && (
        <div className="mt-8 flex items-center gap-4 bg-black/30 backdrop-blur-sm border-l-4 border-white px-8 py-3 rounded-r-xl">
          <span className="text-3xl md:text-4xl font-montserrat font-bold text-white tracking-wide">
            {restWords.map((w) => w.text).join(' ')}
          </span>
        </div>
      )}

      {/* Secondary Translation Subtitle */}
      {scene.translation && (
        <div className="mt-6 text-2xl font-montserrat font-medium text-[#FFF3E3] tracking-wide text-center">
          {scene.translation}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// B. MONUMENTAL CENTER LOCKUP (e.g. SENGANIYE HOOK & CLIMAX)
// Colossal 300px+ Anton/Bebas with 3D extrusion, camera push-in, brackets
// ─────────────────────────────────────────────────────────────────────────
const MonumentalCenterLayout: React.FC<LayoutProps> = ({ scene, frame, fps, activeFont }) => {
  const localFrame = frame - scene.startFrame;
  const t = localFrame / fps;

  return (
    <div
      style={{
        transform: `perspective(1200px) rotateX(${10 + Math.sin(t * 0.8) * 4}deg) rotateY(${Math.cos(t * 0.7) * 4}deg)`,
      }}
      className={`relative w-full max-w-7xl h-full flex flex-col justify-center items-center preserve-3d select-none px-6 ${activeFont}`}
    >
      {scene.lines.map((lineWords, lIdx) => {
        return (
          <div
            key={`monumental-line-${lIdx}`}
            className="relative flex flex-wrap items-center justify-center gap-6 my-2 preserve-3d w-full"
          >
            {lineWords.map((word) => {
              const wordLocal = frame - word.startFrame;
              const hasBegun = frame >= word.startFrame;
              const isSung = frame >= word.startFrame && frame <= word.endFrame;

              const wordSpring = spring({
                frame: wordLocal,
                fps,
                config: { damping: 14, stiffness: 140, mass: 0.6 },
              });

              const scale = interpolate(wordSpring, [0, 1], [0.82, 1.0]);
              const activeScale = isSung ? 1.06 : 1.0;
              const opacity = hasBegun ? interpolate(wordSpring, [0, 0.3], [0, 1]) : 0;

              let sizeClass = 'text-7xl md:text-9xl lg:text-[11rem] leading-none';
              if (word.isHero) {
                sizeClass =
                  scene.fontFamily === 'anton' || scene.fontFamily === 'bebas'
                    ? 'text-[13rem] md:text-[17rem] lg:text-[22rem] leading-[0.82] tracking-tight'
                    : 'text-[11rem] md:text-[14rem] lg:text-[17rem] leading-[0.88]';
              }

              return (
                <div key={`word-${word.text}-${word.startFrame}`} className="relative inline-flex items-center justify-center">
                  {/* 3D Ghost Echo Layer */}
                  {word.isHero && hasBegun && (
                    <span
                      style={{
                        transform: `scale(${scale * 1.2 + Math.sin(t * 2) * 0.02}) translateZ(-80px)`,
                        opacity: isSung ? 0.3 : 0.12,
                      }}
                      className={`absolute inset-0 flex items-center justify-center font-black text-outline-hero tracking-wider select-none pointer-events-none ${sizeClass}`}
                    >
                      {word.text}
                    </span>
                  )}

                  {/* Solid Hero Text with 3D Extrusion Shadow */}
                  <span
                    style={{
                      transform: `scale(${scale * activeScale}) translateZ(50px)`,
                      opacity,
                    }}
                    className={`relative font-black text-white select-none text-shadow-3d-red drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] ${sizeClass}`}
                  >
                    {word.text}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Subtitle Translation */}
      {scene.translation && (
        <div className="mt-12 text-2xl md:text-3xl font-montserrat font-semibold text-[#FFF3E3] tracking-wide text-center max-w-4xl px-8 drop-shadow-md">
          {scene.translation}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// C. HORIZONTAL SPLIT LOCKUP (e.g. Scene 2: UN AAGAAYA ANBUKKU)
// Massive hero across the top, full-width dividing laser rule, justified lower block
// ─────────────────────────────────────────────────────────────────────────
const HorizontalSplitLayout: React.FC<LayoutProps> = ({ scene, frame, fps, activeFont }) => {
  const localFrame = frame - scene.startFrame;
  const t = localFrame / fps;

  const lineProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });
  const laserWidth = interpolate(lineProgress, [0, 1], [0, 100]);

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateX(${8 + Math.sin(t * 0.7) * 3}deg)`,
      }}
      className={`relative w-full max-w-7xl h-full flex flex-col justify-center items-center preserve-3d select-none px-6 ${activeFont}`}
    >
      {/* 1. TOP ROW: HERO WORD SPANNING SCREEN WIDTH */}
      {scene.lines[0] && (
        <div className="relative flex flex-wrap items-baseline justify-center gap-8 w-full preserve-3d">
          {scene.lines[0].map((word) => {
            const wordLocal = frame - word.startFrame;
            const hasBegun = frame >= word.startFrame;
            const isSung = frame >= word.startFrame && frame <= word.endFrame;

            const wSpring = spring({
              frame: wordLocal,
              fps,
              config: { damping: 14, stiffness: 140, mass: 0.55 },
            });

            const scale = interpolate(wSpring, [0, 1], [0.85, 1.0]);
            const opacity = hasBegun ? interpolate(wSpring, [0, 0.3], [0, 1]) : 0;

            const sizeClass = word.isHero
              ? 'text-[12rem] md:text-[15rem] lg:text-[18rem] leading-[0.85]'
              : 'text-4xl md:text-5xl font-mono text-white/70 tracking-widest';

            return (
              <div key={`h-top-${word.text}`} className="relative inline-flex items-center justify-center">
                {word.isHero && hasBegun && (
                  <span
                    style={{
                      transform: `scale(${scale * 1.15 + Math.sin(t * 2) * 0.02}) translateZ(-60px)`,
                      opacity: isSung ? 0.25 : 0.1,
                    }}
                    className={`absolute inset-0 flex items-center justify-center font-black text-outline-hero tracking-wider select-none pointer-events-none ${sizeClass}`}
                  >
                    {word.text}
                  </span>
                )}
                <span
                  style={{
                    transform: `scale(${scale}) translateZ(40px)`,
                    opacity,
                  }}
                  className={`relative font-black text-white select-none text-shadow-3d-red drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] ${sizeClass}`}
                >
                  {word.text}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. FULL-WIDTH DIVIDING LASER RULE */}
      <div className="w-full my-6 flex items-center justify-center">
        <div
          style={{ width: `${laserWidth}%` }}
          className="h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all"
        />
      </div>

      {/* 3. BOTTOM ROW: JUSTIFIED SECONDARY PHRASES */}
      {scene.lines[1] && (
        <div className="relative flex flex-wrap items-center justify-center gap-6 w-full preserve-3d">
          {scene.lines[1].map((word) => {
            const wordLocal = frame - word.startFrame;
            const hasBegun = frame >= word.startFrame;

            const wSpring = spring({
              frame: wordLocal,
              fps,
              config: { damping: 14, stiffness: 140, mass: 0.55 },
            });

            const scale = interpolate(wSpring, [0, 1], [0.85, 1.0]);
            const opacity = hasBegun ? interpolate(wSpring, [0, 0.3], [0, 1]) : 0;

            const sizeClass = word.isHero
              ? 'text-8xl md:text-9xl lg:text-[11rem] leading-none'
              : 'text-5xl md:text-6xl font-medium text-white/90';

            return (
              <span
                key={`h-bot-${word.text}`}
                style={{
                  transform: `scale(${scale}) translateZ(30px)`,
                  opacity,
                }}
                className={`relative font-black text-white select-none ${sizeClass}`}
              >
                {word.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Subtitle Translation */}
      {scene.translation && (
        <div className="mt-10 text-2xl font-montserrat font-medium text-[#FFF3E3] tracking-wide text-center">
          {scene.translation}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// D. VERTICAL STACK LOCKUP (e.g. Scene 5: MAY MAADHA SANDAIKKU & Scene 16: NEE ILLAADHA)
// Architectural skyscraper typography wall
// ─────────────────────────────────────────────────────────────────────────
const VerticalStackLayout: React.FC<LayoutProps> = ({ scene, frame, fps, activeFont }) => {
  const localFrame = frame - scene.startFrame;
  const t = localFrame / fps;

  return (
    <div
      style={{
        transform: `perspective(1100px) rotateY(${Math.sin(t * 0.8) * 6}deg) rotateX(${6 + Math.cos(t * 0.7) * 4}deg)`,
      }}
      className={`relative w-full max-w-6xl h-full flex flex-col justify-center items-center preserve-3d select-none px-6 ${activeFont}`}
    >
      {scene.lines.map((lineWords, lIdx) => {
        return (
          <div
            key={`vstack-line-${lIdx}`}
            className="relative flex flex-wrap items-center justify-center gap-6 my-1 preserve-3d w-full"
          >
            {lineWords.map((word) => {
              const wordLocal = frame - word.startFrame;
              const hasBegun = frame >= word.startFrame;
              const isSung = frame >= word.startFrame && frame <= word.endFrame;

              const wSpring = spring({
                frame: wordLocal,
                fps,
                config: { damping: 14, stiffness: 140, mass: 0.6 },
              });

              const scale = interpolate(wSpring, [0, 1], [0.85, 1.0]);
              const opacity = hasBegun ? interpolate(wSpring, [0, 0.3], [0, 1]) : 0;

              let sizeClass = 'text-6xl md:text-8xl lg:text-[10rem] leading-none';
              if (word.isHero) {
                sizeClass =
                  scene.fontFamily === 'anton' || scene.fontFamily === 'bebas'
                    ? 'text-[11rem] md:text-[15rem] lg:text-[18rem] leading-[0.82] tracking-tight'
                    : 'text-[9rem] md:text-[12rem] lg:text-[15rem] leading-[0.88]';
              }

              return (
                <div key={`vstack-word-${word.text}`} className="relative inline-flex items-center justify-center">
                  {word.isHero && hasBegun && (
                    <span
                      style={{
                        transform: `scale(${scale * 1.18 + Math.sin(t * 2) * 0.02}) translateZ(-60px)`,
                        opacity: isSung ? 0.25 : 0.1,
                      }}
                      className={`absolute inset-0 flex items-center justify-center font-black text-outline-hero tracking-wider select-none pointer-events-none ${sizeClass}`}
                    >
                      {word.text}
                    </span>
                  )}
                  <span
                    style={{
                      transform: `scale(${scale}) translateZ(40px)`,
                      opacity,
                    }}
                    className={`relative font-black text-white select-none text-shadow-3d-red drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] ${sizeClass}`}
                  >
                    {word.text}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Subtitle Translation */}
      {scene.translation && (
        <div className="mt-8 text-2xl font-montserrat font-medium text-[#FFF3E3] tracking-wide text-center">
          {scene.translation}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// E. MASKED PANEL LOCKUP (e.g. Scene 4: MAE KAATHTHU SIRIPPUKKU)
// 3D Dual-plane folding billboard with floor compass
// ─────────────────────────────────────────────────────────────────────────
const MaskedPanelLayout: React.FC<LayoutProps> = ({ scene, frame, fps, activeFont }) => {
  const localFrame = frame - scene.startFrame;
  const t = localFrame / fps;

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateX(${10 + Math.sin(t * 0.8) * 4}deg)`,
      }}
      className={`relative w-full max-w-7xl h-full flex flex-col justify-center items-center preserve-3d select-none px-6 ${activeFont}`}
    >
      {scene.lines.map((lineWords, lIdx) => {
        const tiltX = lIdx === 0 ? 12 : lIdx === 1 ? -8 : 0;
        return (
          <div
            key={`panel-line-${lIdx}`}
            style={{ transform: `rotateX(${tiltX}deg) translateZ(${lIdx * 30}px)` }}
            className="relative flex flex-wrap items-center justify-center gap-6 my-2 preserve-3d w-full"
          >
            {lineWords.map((word) => {
              const wordLocal = frame - word.startFrame;
              const hasBegun = frame >= word.startFrame;

              const wSpring = spring({
                frame: wordLocal,
                fps,
                config: { damping: 14, stiffness: 140, mass: 0.55 },
              });

              const scale = interpolate(wSpring, [0, 1], [0.85, 1.0]);
              const opacity = hasBegun ? interpolate(wSpring, [0, 0.3], [0, 1]) : 0;

              const sizeClass = word.isHero
                ? 'text-[10rem] md:text-[14rem] lg:text-[17rem] leading-none'
                : 'text-5xl md:text-7xl font-bold text-white/90 leading-none';

              return (
                <span
                  key={`panel-word-${word.text}`}
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                  }}
                  className={`relative font-black text-white select-none text-shadow-3d-red drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] ${sizeClass}`}
                >
                  {word.text}
                </span>
              );
            })}
          </div>
        );
      })}

      {/* Subtitle Translation */}
      {scene.translation && (
        <div className="mt-10 text-2xl font-montserrat font-medium text-[#FFF3E3] tracking-wide text-center">
          {scene.translation}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// F. COSMIC WAYPOINT LOCKUP (e.g. Scene 13: PUVI ILLAAMAL / KOLGAL VINNODU)
// Deep Z-axis space fly-through with orbiting satellites
// ─────────────────────────────────────────────────────────────────────────
const CosmicWaypointLayout: React.FC<LayoutProps> = ({ scene, frame, fps, activeFont }) => {
  const localFrame = frame - scene.startFrame;
  const t = localFrame / fps;

  return (
    <div
      style={{
        transform: `perspective(1200px) rotateY(${Math.sin(t * 0.7) * 8}deg) rotateX(${8 + Math.cos(t * 0.8) * 5}deg)`,
      }}
      className={`relative w-full max-w-7xl h-full flex flex-col justify-center items-center preserve-3d select-none px-6 ${activeFont}`}
    >
      {scene.lines.map((lineWords, lIdx) => {
        return (
          <div
            key={`cosmic-line-${lIdx}`}
            className="relative flex flex-wrap items-center justify-center gap-8 my-2 preserve-3d w-full"
          >
            {lineWords.map((word) => {
              const wordLocal = frame - word.startFrame;
              const hasBegun = frame >= word.startFrame;

              const wSpring = spring({
                frame: wordLocal,
                fps,
                config: { damping: 13, stiffness: 150, mass: 0.6 },
              });

              // Deep Z fly-through
              const translateZ = interpolate(wSpring, [0, 1], [-300, 40]);
              const scale = interpolate(wSpring, [0, 1], [0.6, 1.0]);
              const opacity = hasBegun ? interpolate(wSpring, [0, 0.3], [0, 1]) : 0;

              const sizeClass = word.isHero
                ? 'text-[11rem] md:text-[14rem] lg:text-[17rem] leading-none tracking-wider'
                : 'text-5xl md:text-7xl font-bold text-white/90 leading-none';

              return (
                <span
                  key={`cosmic-word-${word.text}`}
                  style={{
                    transform: `translateZ(${translateZ}px) scale(${scale})`,
                    opacity,
                  }}
                  className={`relative font-black text-white select-none text-shadow-3d-dark drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] ${sizeClass}`}
                >
                  {word.text}
                </span>
              );
            })}
          </div>
        );
      })}

      {/* Subtitle Translation */}
      {scene.translation && (
        <div className="mt-10 text-2xl font-montserrat font-medium text-[#FFF3E3] tracking-wide text-center">
          {scene.translation}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 6. SCENE CHOREOGRAPHY & MASTER DISPATCHER
// =========================================================================
interface SceneProps {
  scene: LyricScene;
  frame: number;
  fps: number;
}

const KineticLockupScene: React.FC<SceneProps> = ({ scene, frame, fps }) => {
  const localFrame = frame - scene.startFrame;
  const duration = scene.endFrame - scene.startFrame;
  const sceneProgress = Math.min(1, Math.max(0, localFrame / duration));

  // Continuous Camera Movement (Pan, Zoom, Tilt, 3D Rotation)
  const camX = interpolate(sceneProgress, [0, 1], scene.cameraMovement.panX);
  const camY = interpolate(sceneProgress, [0, 1], scene.cameraMovement.panY);
  const camZoom = interpolate(sceneProgress, [0, 1], scene.cameraMovement.zoom);
  const camRotZ = interpolate(sceneProgress, [0, 1], scene.cameraMovement.rotZ);

  // Smooth scene exit fade
  const framesFromEnd = scene.endFrame - frame;
  const exitDuration = 12;
  const sceneExit = interpolate(
    framesFromEnd,
    [0, exitDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const fontClassMap = {
    anton: 'font-anton uppercase',
    bebas: 'font-bebas uppercase',
    archivo: 'font-archivo uppercase',
    spartan: 'font-spartan uppercase',
    sora: 'font-sora',
    montserrat: 'font-montserrat',
  };
  const activeFont = fontClassMap[scene.fontFamily] || 'font-spartan';

  // Dispatch layout
  const renderLayout = () => {
    const layoutProps: LayoutProps = { scene, frame, fps, activeFont };
    switch (scene.layout) {
      case 'LOCKUP_DIAGONAL_TRACK':
        return <DiagonalTrackLayout {...layoutProps} />;
      case 'LOCKUP_HORIZONTAL_SPLIT':
        return <HorizontalSplitLayout {...layoutProps} />;
      case 'LOCKUP_VERTICAL_STACK':
        return <VerticalStackLayout {...layoutProps} />;
      case 'LOCKUP_MASKED_PANEL':
        return <MaskedPanelLayout {...layoutProps} />;
      case 'LOCKUP_COSMIC_WAYPOINT':
        return <CosmicWaypointLayout {...layoutProps} />;
      case 'LOCKUP_MONUMENTAL_CENTER':
      default:
        return <MonumentalCenterLayout {...layoutProps} />;
    }
  };

  return (
    <div
      style={{
        opacity: sceneExit,
        transform: `translate(${camX}px, ${camY}px) scale(${camZoom}) rotate(${camRotZ}deg)`,
      }}
      className="relative z-10 w-full h-full flex flex-col items-center justify-center select-none preserve-3d"
    >
      {/* GRAPHIC MOTIF & CONNECTING VECTOR OVERLAY */}
      <GraphicConnectors
        motif={scene.graphicMotif}
        sceneIndex={scene.sceneIndex}
        frame={frame}
        localFrame={localFrame}
        fps={fps}
      />

      {/* BESPOKE 3D TYPOGRAPHY STAGE */}
      <div className="z-10 w-full h-full flex items-center justify-center preserve-3d">
        {renderLayout()}
      </div>
    </div>
  );
};

// =========================================================================
// 7. MASTER REMOTION COMPOSITION: SENGANIYE KINETIC TYPOGRAPHY
// =========================================================================
export const LyricVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Find currently active scene
  const activeScene =
    lyricScenes.find(
      (scene) => frame >= scene.startFrame && frame <= scene.endFrame
    ) || lyricScenes[0];

  return (
    <div
      style={{ width, height }}
      className="relative flex items-center justify-center overflow-hidden font-sans select-none bg-[#B8001F]"
    >
      {/* 1. MASTER AUDIO ELEMENT (Loads public/audio.mp3) */}
      <Audio src={staticFile('audio.mp3')} />

      {/* 2. DYNAMIC AMBIENT SPOTLIGHT & ROMANTIC ENVIRONMENT SYSTEM */}
      <DynamicBackground
        frame={frame}
        fps={fps}
        currentScene={activeScene}
      />

      {/* 3. RED CAT MOTION ART-DIRECTED KINETIC TYPOGRAPHY STAGE */}
      <main className="w-full h-full flex items-center justify-center z-10">
        <KineticLockupScene
          key={activeScene.id}
          scene={activeScene}
          frame={frame}
          fps={fps}
        />
      </main>
    </div>
  );
};
