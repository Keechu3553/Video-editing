/**
 * Seng Kaniye - Fluid Kinetic Typography Engine (9:16 Vertical 1080x1920)
 * High-performance HTML5 Canvas + Web Audio API + Spring Physics Solver
 */

class Spring {
  constructor(val = 0, stiffness = 0.08, damping = 0.72) {
    this.value = val;
    this.target = val;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  set(target) {
    this.target = target;
  }

  snap(val) {
    this.value = val;
    this.target = val;
    this.velocity = 0;
  }

  update() {
    const force = (this.target - this.value) * this.stiffness;
    this.velocity = (this.velocity + force) * this.damping;
    this.value += this.velocity;
    return this.value;
  }
}

class Particle {
  constructor(w, h, theme) {
    this.reset(w, h, theme, true);
  }

  reset(w, h, theme, initial = false) {
    this.x = Math.random() * w;
    this.y = initial ? Math.random() * h : h + 20;
    this.radius = 1.5 + Math.random() * 4.5;
    this.baseSpeedY = 0.4 + Math.random() * 1.2;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.opacity = 0.2 + Math.random() * 0.7;
    this.pulseSpeed = 0.02 + Math.random() * 0.04;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.colorType = Math.random() > 0.4 ? 'primary' : 'accent';
  }

  update(w, h, audioEnergy = 0) {
    this.pulsePhase += this.pulseSpeed;
    this.y -= this.baseSpeedY * (1 + audioEnergy * 1.5);
    this.x += this.speedX + Math.sin(this.pulsePhase) * 0.5;

    if (this.y < -20 || this.x < -20 || this.x > w + 20) {
      this.reset(w, h, null, false);
    }
  }

  draw(ctx, themeColors) {
    const currentOpacity = Math.max(0.05, Math.min(1, this.opacity + Math.sin(this.pulsePhase) * 0.3));
    const color = this.colorType === 'primary' ? themeColors.particlePrimary : themeColors.particleAccent;

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = color.replace('ALPHA', currentOpacity.toFixed(2));
    ctx.shadowBlur = this.radius * 3;
    ctx.shadowColor = color.replace('ALPHA', '0.6');
    ctx.fill();
    ctx.restore();
  }
}

class KineticEngine {
  constructor(canvas, audioEl) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.audio = audioEl;

    // Fixed Internal Rendering Resolution (Full HD 9:16)
    this.width = 1080;
    this.height = 1920;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Theme definitions
    this.themes = {
      ruby: {
        id: 'ruby',
        name: 'செங்கனியே Ruby Soul',
        bgGradient: ['#09050d', '#180718', '#070207'],
        aurora1: 'rgba(255, 45, 85, 0.22)',
        aurora2: 'rgba(224, 86, 36, 0.16)',
        aurora3: 'rgba(138, 28, 124, 0.2)',
        textNormal: '#e8e6ed',
        textSubtle: 'rgba(232, 230, 237, 0.45)',
        textHero: '#ffffff',
        activeGlow: '#ff2d55',
        activeSecondary: '#ffd166',
        particlePrimary: 'rgba(255, 75, 110, ALPHA)',
        particleAccent: 'rgba(255, 209, 102, ALPHA)'
      },
      cosmic: {
        id: 'cosmic',
        name: 'Cosmic Aurora',
        bgGradient: ['#040612', '#09152b', '#030712'],
        aurora1: 'rgba(0, 240, 255, 0.18)',
        aurora2: 'rgba(123, 44, 191, 0.22)',
        aurora3: 'rgba(58, 12, 163, 0.2)',
        textNormal: '#e0f2fe',
        textSubtle: 'rgba(224, 242, 254, 0.4)',
        textHero: '#ffffff',
        activeGlow: '#00f0ff',
        activeSecondary: '#e0aaff',
        particlePrimary: 'rgba(0, 240, 255, ALPHA)',
        particleAccent: 'rgba(199, 125, 255, ALPHA)'
      },
      sunset: {
        id: 'sunset',
        name: 'Warm Sunset Amber',
        bgGradient: ['#120806', '#260f0a', '#0a0403'],
        aurora1: 'rgba(251, 133, 0, 0.22)',
        aurora2: 'rgba(255, 183, 3, 0.18)',
        aurora3: 'rgba(217, 4, 41, 0.18)',
        textNormal: '#fef3c7',
        textSubtle: 'rgba(254, 243, 199, 0.45)',
        textHero: '#ffffff',
        activeGlow: '#ffb703',
        activeSecondary: '#fb8500',
        particlePrimary: 'rgba(255, 183, 3, ALPHA)',
        particleAccent: 'rgba(251, 133, 0, ALPHA)'
      },
      minimal: {
        id: 'minimal',
        name: 'Noir Studio Editorial',
        bgGradient: ['#050505', '#121212', '#000000'],
        aurora1: 'rgba(255, 255, 255, 0.08)',
        aurora2: 'rgba(160, 160, 160, 0.06)',
        aurora3: 'rgba(80, 80, 80, 0.08)',
        textNormal: '#ffffff',
        textSubtle: 'rgba(255, 255, 255, 0.35)',
        textHero: '#ffffff',
        activeGlow: '#ffffff',
        activeSecondary: '#cccccc',
        particlePrimary: 'rgba(255, 255, 255, ALPHA)',
        particleAccent: 'rgba(180, 180, 180, ALPHA)'
      }
    };

    this.currentTheme = this.themes.ruby;
    this.lyricsData = LYRICS_DATA;
    this.meta = SONG_METADATA;

    // Web Audio Analyzer state
    this.audioContext = null;
    this.analyser = null;
    this.audioSource = null;
    this.freqData = null;
    this.audioEnergy = {
      bass: 0,
      vocal: 0,
      treble: 0,
      overall: 0
    };

    // Camera springs
    this.cameraZoom = new Spring(1.0, 0.05, 0.85);
    this.cameraShakeX = new Spring(0, 0.15, 0.65);
    this.cameraShakeY = new Spring(0, 0.15, 0.65);
    this.cameraTargetZoom = 1.0;

    // Word springs map (wordKey -> { scale, yOffset, opacity, glow })
    this.wordSprings = new Map();

    // Visual options
    this.showSafeZone = false;
    this.showWaveform = true;
    this.particlesEnabled = true;
    this.particleCount = 65;
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.width, this.height, this.currentTheme));
    }

    // Light rings for chorus bloom
    this.lightRings = [];

    // Aurora blob phases
    this.auroraPhase = 0;

    // MediaRecorder export state
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.isRecording = false;

    // Bind loop
    this.render = this.render.bind(this);
    this.animId = null;
  }

  initAudioContext() {
    if (this.audioContext) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.82;
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

      this.audioSource = this.audioContext.createMediaElementSource(this.audio);
      this.audioSource.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } catch (e) {
      console.warn("AudioContext setup deferred or restricted:", e);
    }
  }

  setTheme(themeId) {
    if (this.themes[themeId]) {
      this.currentTheme = this.themes[themeId];
    }
  }

  updateAudioEnergy() {
    if (!this.analyser || !this.freqData) {
      // Fallback synthetic subtle beat based on BPM
      const t = this.audio.currentTime;
      const beat = (Math.sin(t * (this.meta.bpm / 60) * Math.PI * 2) + 1) * 0.5;
      this.audioEnergy.bass = Math.pow(beat, 3) * 0.35;
      this.audioEnergy.vocal = 0.2;
      this.audioEnergy.overall = this.audioEnergy.bass * 0.6;
      return;
    }

    this.analyser.getByteFrequencyData(this.freqData);

    let bassSum = 0;
    for (let i = 1; i <= 6; i++) bassSum += this.freqData[i];
    this.audioEnergy.bass = (bassSum / (6 * 255));

    let vocalSum = 0;
    for (let i = 8; i <= 24; i++) vocalSum += this.freqData[i];
    this.audioEnergy.vocal = (vocalSum / (17 * 255));

    let trebleSum = 0;
    for (let i = 25; i <= 60; i++) trebleSum += this.freqData[i];
    this.audioEnergy.treble = (trebleSum / (36 * 255));

    this.audioEnergy.overall = (this.audioEnergy.bass * 0.5 + this.audioEnergy.vocal * 0.35 + this.audioEnergy.treble * 0.15);
  }

  triggerHeroBurst(x, y, color) {
    for (let i = 0; i < 3; i++) {
      this.lightRings.push({
        x: x,
        y: y,
        radius: 40 + i * 35,
        maxRadius: 550 + i * 150,
        opacity: 0.9,
        color: color || this.currentTheme.activeGlow,
        speed: 6.5 + i * 2.2
      });
    }
  }

  updateLightRings() {
    for (let i = this.lightRings.length - 1; i >= 0; i--) {
      const ring = this.lightRings[i];
      ring.radius += ring.speed;
      ring.opacity *= 0.94;
      if (ring.opacity < 0.02 || ring.radius > ring.maxRadius) {
        this.lightRings.splice(i, 1);
      }
    }
  }

  drawLightRings() {
    for (const ring of this.lightRings) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = ring.color;
      this.ctx.lineWidth = 4 * (ring.opacity);
      this.ctx.globalAlpha = ring.opacity;
      this.ctx.shadowBlur = 25;
      this.ctx.shadowColor = ring.color;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  drawBackground(time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.currentTheme;

    // 1. Deep Space Base Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, theme.bgGradient[0]);
    bgGrad.addColorStop(0.5, theme.bgGradient[1]);
    bgGrad.addColorStop(1, theme.bgGradient[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Liquid Aurora Mesh Blobs (Breathing & moving with music)
    this.auroraPhase += 0.008 + this.audioEnergy.bass * 0.02;
    const pulse1 = Math.sin(this.auroraPhase) * 120;
    const pulse2 = Math.cos(this.auroraPhase * 1.3) * 100;
    const bassScale = 1 + this.audioEnergy.bass * 0.45;

    // Aurora blob 1 - Top right
    const r1 = 450 * bassScale;
    const g1 = ctx.createRadialGradient(w * 0.75 + pulse1, h * 0.28 + pulse2, 10, w * 0.75 + pulse1, h * 0.28 + pulse2, r1);
    g1.addColorStop(0, theme.aurora1);
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g1;
    ctx.beginPath();
    ctx.arc(w * 0.75 + pulse1, h * 0.28 + pulse2, r1, 0, Math.PI * 2);
    ctx.fill();

    // Aurora blob 2 - Center / Left
    const r2 = 520 * bassScale;
    const g2 = ctx.createRadialGradient(w * 0.25 - pulse2, h * 0.55 - pulse1, 10, w * 0.25 - pulse2, h * 0.55 - pulse1, r2);
    g2.addColorStop(0, theme.aurora2);
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(w * 0.25 - pulse2, h * 0.55 - pulse1, r2, 0, Math.PI * 2);
    ctx.fill();

    // Aurora blob 3 - Bottom center (Warm ground reflection)
    const r3 = 480 * bassScale;
    const g3 = ctx.createRadialGradient(w * 0.5 + pulse2 * 0.5, h * 0.82, 10, w * 0.5 + pulse2 * 0.5, h * 0.82, r3);
    g3.addColorStop(0, theme.aurora3);
    g3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g3;
    ctx.beginPath();
    ctx.arc(w * 0.5 + pulse2 * 0.5, h * 0.82, r3, 0, Math.PI * 2);
    ctx.fill();

    // 3. Floating Celestial Particles
    if (this.particlesEnabled) {
      for (const p of this.particles) {
        p.update(w, h, this.audioEnergy.overall);
        p.draw(ctx, theme);
      }
    }

    // 4. Subtle Radial Vignette
    const vignette = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.28, w * 0.5, h * 0.5, h * 0.75);
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
  }

  drawAudioWaveform(time) {
    if (!this.showWaveform) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.currentTheme;

    ctx.save();
    const waveY = h * 0.87;
    const barCount = 48;
    const barWidth = 6;
    const spacing = 12;
    const startX = (w - (barCount * spacing)) / 2;

    for (let i = 0; i < barCount; i++) {
      let amp = 0;
      if (this.freqData) {
        const bin = Math.floor((i / barCount) * (this.freqData.length * 0.75));
        amp = (this.freqData[bin] || 0) / 255;
      } else {
        amp = Math.sin(time * 3 + i * 0.25) * 0.3 + 0.35;
      }

      const barHeight = Math.max(6, amp * 95);
      const x = startX + i * spacing;

      const grad = ctx.createLinearGradient(0, waveY - barHeight / 2, 0, waveY + barHeight / 2);
      grad.addColorStop(0, theme.activeGlow);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.2)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, waveY - barHeight / 2, barWidth, barHeight, 3);
      ctx.fill();
    }
    ctx.restore();
  }

  drawSafeZoneGuide() {
    if (!this.showSafeZone) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.strokeStyle = 'rgba(0, 255, 204, 0.5)';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);

    // Top safe zone (above 220px: profile, status bar, search)
    ctx.strokeRect(60, 220, w - 120, h - 560);

    // Right action buttons safe area (Reels / TikTok icons)
    ctx.fillStyle = 'rgba(255, 0, 80, 0.15)';
    ctx.fillRect(w - 180, h * 0.45, 140, 420);

    // Bottom caption / audio title area
    ctx.fillStyle = 'rgba(255, 200, 0, 0.15)';
    ctx.fillRect(60, h - 320, w - 240, 240);

    // Safe zone label
    ctx.font = '600 24px "Noto Sans Tamil", sans-serif';
    ctx.fillStyle = '#00ffcc';
    ctx.textAlign = 'center';
    ctx.fillText('9:16 SOCIAL MEDIA SAFE ZONE (TikTok / Reels / Shorts)', w / 2, 190);
    ctx.fillText('Right Buttons Safe Zone', w - 110, h * 0.45 - 20);
    ctx.fillText('Bottom Caption Safe Zone', w / 2, h - 335);

    ctx.restore();
  }

  getOrCreateWordSprings(wordKey) {
    if (!this.wordSprings.has(wordKey)) {
      this.wordSprings.set(wordKey, {
        scale: new Spring(0.7, 0.09, 0.68),
        yOffset: new Spring(60, 0.08, 0.65),
        opacity: new Spring(0, 0.12, 0.72),
        glow: new Spring(0, 0.1, 0.7)
      });
    }
    return this.wordSprings.get(wordKey);
  }

  drawLyrics(time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.currentTheme;

    // Find active lyric block
    let activeIndex = -1;
    for (let i = 0; i < this.lyricsData.length; i++) {
      const item = this.lyricsData[i];
      if (time >= item.start && time <= item.end) {
        activeIndex = i;
        break;
      }
    }

    if (activeIndex === -1) {
      // Find closest
      for (let i = this.lyricsData.length - 1; i >= 0; i--) {
        if (time >= this.lyricsData[i].start) {
          activeIndex = i;
          break;
        }
      }
    }

    if (activeIndex === -1) activeIndex = 0;
    const activeItem = this.lyricsData[activeIndex];

    // Smooth camera zoom
    const targetZoom = activeItem.cameraZoom || 1.1;
    this.cameraZoom.set(targetZoom + (this.audioEnergy.bass * 0.06));
    const currentZoom = this.cameraZoom.update();

    ctx.save();
    // Center camera zoom
    ctx.translate(w / 2, h / 2);
    ctx.scale(currentZoom, currentZoom);
    ctx.translate(-w / 2, -h / 2);

    // Section Pill (Top)
    const sectionProgress = Math.min(1, Math.max(0, (time - activeItem.start) / (activeItem.end - activeItem.start)));
    this.drawSectionHeader(activeItem, sectionProgress);

    // Render based on style
    if (activeItem.style === 'intro' || activeItem.style === 'outro-fade') {
      this.drawIntroState(activeItem, time);
    } else if (activeItem.style === 'hero-ruby-bloom') {
      this.drawHeroRubyBloom(activeItem, time);
    } else if (activeItem.style === 'editorial-cascade') {
      this.drawEditorialCascade(activeItem, time);
    } else if (activeItem.style === 'cosmic-orbit') {
      this.drawCosmicOrbit(activeItem, time);
    } else {
      this.drawFluidFloating(activeItem, time);
    }

    ctx.restore();
  }

  drawSectionHeader(item, progress) {
    const ctx = this.ctx;
    const w = this.width;
    const theme = this.currentTheme;

    ctx.save();
    const pillY = 280;

    // Category / Song Title Pill
    ctx.textAlign = 'center';
    ctx.font = '700 24px "Noto Sans Tamil", sans-serif';
    ctx.fillStyle = theme.textSubtle;
    ctx.letterSpacing = '6px';
    ctx.fillText((item.section || 'SENG KANIYE').toUpperCase(), w / 2, pillY);

    // Subtitle progress bar
    const barWidth = 140;
    const barY = pillY + 16;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect((w - barWidth) / 2, barY, barWidth, 3, 2);
    ctx.fill();

    ctx.fillStyle = theme.activeGlow;
    ctx.shadowBlur = 10;
    ctx.shadowColor = theme.activeGlow;
    ctx.beginPath();
    ctx.roundRect((w - barWidth) / 2, barY, barWidth * progress, 3, 2);
    ctx.fill();

    ctx.restore();
  }

  drawIntroState(item, time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.currentTheme;

    ctx.save();
    const centerY = h * 0.48;

    // Gentle pulsing musical note or symbol
    const pulse = Math.sin(time * 2.5) * 0.15 + 1.0;
    ctx.textAlign = 'center';
    ctx.font = `800 ${84 * pulse}px "Mukta Malar", "Noto Sans Tamil", sans-serif`;
    ctx.fillStyle = theme.textHero;
    ctx.shadowBlur = 35;
    ctx.shadowColor = theme.activeGlow;
    ctx.fillText(item.text, w / 2, centerY);

    if (item.subtext) {
      ctx.font = '500 32px "Noto Sans Tamil", sans-serif';
      ctx.fillStyle = theme.textSubtle;
      ctx.shadowBlur = 0;
      ctx.fillText(item.subtext, w / 2, centerY + 90);
    }
    ctx.restore();
  }

  /**
   * FLUID FLOATING KINETIC TYPOGRAPHY
   * Words float with spring inertia, active word radiates light & scales smoothly
   */
  drawFluidFloating(item, time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.currentTheme;

    ctx.save();
    const lines = item.lines || [item.text];
    const totalWords = item.words || [];

    const baseCenterY = h * 0.46;
    const lineHeight = 115;
    const startY = baseCenterY - ((lines.length - 1) * lineHeight) / 2;

    let wordGlobalIndex = 0;

    lines.forEach((lineText, lineIdx) => {
      const lineY = startY + lineIdx * lineHeight;

      // Extract words for this line
      const lineWords = lineText.split(' ').filter(Boolean);

      // Measure total width of line to center it
      ctx.font = '800 64px "Mukta Malar", "Noto Sans Tamil", sans-serif';
      const wordSpacings = 24;
      let totalLineWidth = 0;
      const measurements = lineWords.map(wrd => {
        const width = ctx.measureText(wrd).width;
        totalLineWidth += width;
        return { text: wrd, width };
      });
      totalLineWidth += (lineWords.length - 1) * wordSpacings;

      let currentX = (w - totalLineWidth) / 2;

      lineWords.forEach((wordStr) => {
        // Find word data
        const matchedWordData = totalWords[wordGlobalIndex] || { start: item.start, end: item.end };
        const wordKey = `${item.id}-${wordGlobalIndex}-${wordStr}`;
        const springs = this.getOrCreateWordSprings(wordKey);

        const isWordActive = time >= matchedWordData.start && time <= matchedWordData.end;
        const hasPassed = time > matchedWordData.end;
        const isUpcoming = time < matchedWordData.start;

        if (isWordActive) {
          springs.scale.set(1.22);
          springs.yOffset.set(-8);
          springs.opacity.set(1.0);
          springs.glow.set(1.0);
        } else if (hasPassed) {
          springs.scale.set(1.0);
          springs.yOffset.set(-18);
          springs.opacity.set(0.68);
          springs.glow.set(0.15);
        } else {
          springs.scale.set(0.88);
          springs.yOffset.set(30);
          springs.opacity.set(0.3);
          springs.glow.set(0);
        }

        const scaleVal = springs.scale.update();
        const yOff = springs.yOffset.update();
        const opVal = springs.opacity.update();
        const glowVal = springs.glow.update();

        // Wave float motion (organic breathing)
        const wave = Math.sin(time * 2.2 + wordGlobalIndex * 0.7) * 5;

        ctx.save();
        ctx.translate(currentX + (measurements[wordGlobalIndex % measurements.length].width / 2), lineY + yOff + wave);
        ctx.scale(scaleVal, scaleVal);

        ctx.font = '800 66px "Mukta Malar", "Noto Sans Tamil", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (glowVal > 0.3) {
          ctx.shadowBlur = 30 * glowVal;
          ctx.shadowColor = matchedWordData.highlight ? theme.activeGlow : theme.activeSecondary;
          ctx.fillStyle = theme.textHero;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = isWordActive ? theme.textHero : (hasPassed ? theme.textNormal : theme.textSubtle);
        }

        ctx.globalAlpha = Math.max(0.1, Math.min(1, opVal));
        ctx.fillText(wordStr, 0, 0);

        // Active accent underline or particle spark
        if (isWordActive && matchedWordData.highlight) {
          const uWidth = measurements[wordGlobalIndex % measurements.length].width * 0.9;
          ctx.fillStyle = theme.activeGlow;
          ctx.beginPath();
          ctx.roundRect(-uWidth / 2, 44, uWidth, 5, 3);
          ctx.fill();
        }

        ctx.restore();

        currentX += measurements[wordGlobalIndex % measurements.length].width + wordSpacings;
        wordGlobalIndex++;
      });
    });

    // Translation subtitle (Intimate poetic context)
    if (item.translation) {
      ctx.textAlign = 'center';
      ctx.font = 'italic 500 28px "Noto Sans Tamil", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
      ctx.fillText(`"${item.translation}"`, w / 2, startY + lines.length * lineHeight + 55);
    }

    ctx.restore();
  }

  /**
   * HERO CHORUS: "செங்கனியே... வா.. அருகே..."
   * Explosive, majestic, cinematic hero typography with blooming light rings and chromatic aura
   */
  drawHeroRubyBloom(item, time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.currentTheme;

    ctx.save();
    const centerY = h * 0.45;

    // Check words
    const words = item.words || [];
    const mainWord = words[0]; // "செங்கனியே....."
    const subWords = words.slice(1); // "வா..", "அருகே...."

    const isMainActive = mainWord && time >= mainWord.start && time <= mainWord.end;
    const isSubActive = subWords.some(sw => time >= sw.start && time <= sw.end);

    // Trigger ring burst on main word start
    if (isMainActive && Math.abs(time - mainWord.start) < 0.15 && Math.random() < 0.3) {
      this.triggerHeroBurst(w / 2, centerY - 40, theme.activeGlow);
    }

    // 1. Draw light rings behind hero text
    this.updateLightRings();
    this.drawLightRings();

    // 2. HERO WORD: "செங்கனியே"
    const heroSpring = this.getOrCreateWordSprings(`${item.id}-hero`);
    if (isMainActive) {
      heroSpring.scale.set(1.28 + this.audioEnergy.bass * 0.15);
      heroSpring.opacity.set(1.0);
      heroSpring.glow.set(1.0);
    } else {
      heroSpring.scale.set(1.08);
      heroSpring.opacity.set(0.85);
      heroSpring.glow.set(0.4);
    }

    const heroScale = heroSpring.scale.update();
    const heroGlow = heroSpring.glow.update();

    ctx.save();
    ctx.translate(w / 2, centerY - 50);
    ctx.scale(heroScale, heroScale);

    // Chromatic Aberration Red/Cyan aura on beat
    if (this.audioEnergy.bass > 0.4) {
      ctx.font = '900 112px "Mukta Malar", "Noto Sans Tamil", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 45, 85, 0.6)';
      ctx.fillText(mainWord ? mainWord.text : "செங்கனியே", -4, 0);

      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.fillText(mainWord ? mainWord.text : "செங்கனியே", 4, 0);
    }

    ctx.font = '900 114px "Mukta Malar", "Noto Sans Tamil", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 55 * heroGlow;
    ctx.shadowColor = theme.activeGlow;
    ctx.fillStyle = theme.textHero;
    ctx.fillText(mainWord ? mainWord.text : "செங்கனியே", 0, 0);
    ctx.restore();

    // 3. SUB WORDS: "வா.. அருகே...." (Float & glide towards user)
    const subSpring = this.getOrCreateWordSprings(`${item.id}-sub`);
    if (isSubActive) {
      subSpring.scale.set(1.18);
      subSpring.yOffset.set(0);
      subSpring.opacity.set(1.0);
    } else {
      subSpring.scale.set(0.95);
      subSpring.yOffset.set(15);
      subSpring.opacity.set(0.5);
    }

    const sScale = subSpring.scale.update();
    const sYOff = subSpring.yOffset.update();
    const sOp = subSpring.opacity.update();

    ctx.save();
    ctx.translate(w / 2, centerY + 110 + sYOff);
    ctx.scale(sScale, sScale);

    ctx.font = '800 68px "Mukta Malar", "Noto Sans Tamil", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isSubActive ? theme.activeSecondary : theme.textNormal;
    ctx.shadowBlur = isSubActive ? 30 : 5;
    ctx.shadowColor = theme.activeSecondary;
    ctx.globalAlpha = Math.max(0.2, sOp);

    const subText = subWords.map(s => s.text).join(' ');
    ctx.fillText(subText, 0, 0);
    ctx.restore();

    // Intimate translation
    ctx.textAlign = 'center';
    ctx.font = 'italic 500 30px "Noto Sans Tamil", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText(`"${item.translation}"`, w / 2, centerY + 240);

    ctx.restore();
  }

  /**
   * EDITORIAL CASCADE: Staggered, modern diagonal rhythm
   */
  drawEditorialCascade(item, time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.currentTheme;

    ctx.save();
    const lines = item.lines || [item.text];
    const centerY = h * 0.44;
    const lineSpacing = 130;

    lines.forEach((lineText, idx) => {
      const lineY = centerY + (idx === 0 ? -60 : 70);
      const isFirst = idx === 0;

      // Staggered horizontal alignment (Left vs Right editorial offset)
      const targetX = isFirst ? w * 0.42 : w * 0.58;
      const align = isFirst ? 'right' : 'left';

      ctx.save();
      ctx.textAlign = align;
      ctx.textBaseline = 'middle';

      // Check if current line has active words
      const lineWords = item.words ? item.words.filter(wrd => lineText.includes(wrd.text)) : [];
      const hasActive = lineWords.some(wrd => time >= wrd.start && time <= wrd.end);

      ctx.font = isFirst ? '800 66px "Mukta Malar", sans-serif' : '700 62px "Mukta Malar", sans-serif';

      if (hasActive) {
        ctx.fillStyle = theme.textHero;
        ctx.shadowBlur = 30;
        ctx.shadowColor = theme.activeGlow;
        ctx.globalAlpha = 1.0;
      } else {
        ctx.fillStyle = theme.textNormal;
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.55;
      }

      ctx.fillText(lineText, targetX, lineY);

      // Editorial accent dash
      ctx.fillStyle = theme.activeGlow;
      const dashX = isFirst ? targetX + 25 : targetX - 45;
      ctx.fillRect(dashX, lineY - 3, 20, 6);

      ctx.restore();
    });

    if (item.translation) {
      ctx.textAlign = 'center';
      ctx.font = 'italic 500 28px "Noto Sans Tamil", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillText(`"${item.translation}"`, w / 2, centerY + 230);
    }

    ctx.restore();
  }

  /**
   * COSMIC ORBIT: Words arranged like stars in space
   */
  drawCosmicOrbit(item, time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.currentTheme;

    ctx.save();
    const centerY = h * 0.46;

    // Cosmic orbit ring
    ctx.beginPath();
    ctx.ellipse(w / 2, centerY, 380, 180, Math.PI / 12, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]);
    ctx.stroke();

    // Render lines in cosmic center
    this.drawFluidFloating(item, time);
    ctx.restore();
  }

  render() {
    const time = this.audio ? this.audio.currentTime : 0;
    this.updateAudioEnergy();

    // 1. Draw dynamic background & particles
    this.drawBackground(time);

    // 2. Draw active lyrics
    this.drawLyrics(time);

    // 3. Draw audio waveform
    this.drawAudioWaveform(time);

    // 4. Draw social safe zone overlay (if toggled)
    this.drawSafeZoneGuide();

    this.animId = requestAnimationFrame(this.render);
  }

  start() {
    if (!this.animId) {
      this.animId = requestAnimationFrame(this.render);
    }
  }

  stop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  /**
   * HIGH QUALITY 9:16 VIDEO EXPORT (MediaRecorder)
   */
  async startRecording(onProgress, onFinish) {
    if (this.isRecording) return;
    this.initAudioContext();

    this.recordedChunks = [];
    this.isRecording = true;

    // Stream from canvas
    const canvasStream = this.canvas.captureStream(60); // 60 FPS

    // Audio stream from AudioContext
    let finalStream = canvasStream;
    if (this.audioContext && this.audioSource) {
      const dest = this.audioContext.createMediaStreamDestination();
      this.audioSource.connect(dest);
      const audioTrack = dest.stream.getAudioTracks()[0];
      if (audioTrack) {
        finalStream = new MediaStream([
          ...canvasStream.getVideoTracks(),
          audioTrack
        ]);
      }
    }

    const options = {
      mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : 'video/webm'
    };

    try {
      this.mediaRecorder = new MediaRecorder(finalStream, options);
    } catch (e) {
      console.warn("Falling back to default mimeType", e);
      this.mediaRecorder = new MediaRecorder(finalStream);
    }

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      this.isRecording = false;
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      if (onFinish) onFinish(url, blob);
    };

    this.mediaRecorder.start(250); // Record chunks every 250ms
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
  }
}

if (typeof window !== 'undefined') {
  window.KineticEngine = KineticEngine;
}

