import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

export interface BentoCardProps {
  color?: string;
  glowColor?: string;
  title?: string;
  description?: string;
  label?: string;
  icon?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export interface BentoProps {
  cards?: BentoCardProps[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  className?: string;
  gridCols?: string;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '50, 100, 255';
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
  { color: '#1a0505', glowColor: '255, 50, 50', title: 'Analytics', description: 'Track user behavior', label: 'Insights' },
  { color: '#050a1a', glowColor: '50, 100, 255', title: 'Dashboard', description: 'Centralized data view', label: 'Overview' },
  { color: '#1a0505', glowColor: '255, 50, 50', title: 'Collaboration', description: 'Work together seamlessly', label: 'Teamwork' },
  { color: '#050a1a', glowColor: '50, 100, 255', title: 'Automation', description: 'Streamline workflows', label: 'Efficiency' },
  { color: '#1a0505', glowColor: '255, 50, 50', title: 'Integration', description: 'Connect favorite tools', label: 'Connectivity' },
  { color: '#050a1a', glowColor: '50, 100, 255', title: 'Security', description: 'Enterprise-grade protection', label: 'Protection' },
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 5px rgba(${color}, 0.5);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--glow-x', `${((mouseX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--glow-y', `${((mouseY - rect.top) / rect.height) * 100}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

// ─── Card inner content ────────────────────────────────────────────────────────

const CardContent: React.FC<{
  card: BentoCardProps;
  textAutoHide: boolean;
  glowColor: string;
}> = ({ card, textAutoHide, glowColor }) => (
  <>
    {/* Top row — label pill + icon */}
    <div className="flex items-start justify-between gap-2">
      {card.label && (
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] border"
          style={{
            color: `rgba(${glowColor}, 0.9)`,
            borderColor: `rgba(${glowColor}, 0.2)`,
            backgroundColor: `rgba(${glowColor}, 0.07)`,
          }}
        >
          {card.label}
        </span>
      )}
      {card.icon && (
        <span
          className="material-symbols-outlined text-[1.4rem] leading-none mt-0.5 shrink-0"
          style={{ color: `rgba(${glowColor}, 0.6)` }}
        >
          {card.icon}
        </span>
      )}
    </div>

    {/* Bottom — title + description */}
    <div className="mt-auto pt-8 space-y-2">
      {card.title && (
        <h3
          className={`font-bold leading-tight m-0 ${card.textAutoHide ?? textAutoHide ? 'text-clamp-1' : ''} ${card.titleClassName || 'text-base'}`}
        >
          {card.title}
        </h3>
      )}
      {card.description && (
        <p
          className={`leading-relaxed m-0 ${card.textAutoHide ?? textAutoHide ? 'text-clamp-2' : ''} ${card.descriptionClassName || 'text-xs opacity-60'}`}
        >
          {card.description}
        </p>
      )}
    </div>
  </>
);

// ─── ParticleCard ──────────────────────────────────────────────────────────────

export const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef<HTMLDivElement[]>([]);
    const particlesInitialized = useRef(false);
    const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

    const initializeParticles = useCallback(() => {
      if (particlesInitialized.current || !cardRef.current) return;
      const { width, height } = cardRef.current.getBoundingClientRect();
      memoizedParticles.current = Array.from({ length: particleCount }, () =>
        createParticleElement(Math.random() * width, Math.random() * height, glowColor)
      );
      particlesInitialized.current = true;
    }, [particleCount, glowColor]);

    const clearAllParticles = useCallback(() => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      magnetismAnimationRef.current?.kill();
      particlesRef.current.forEach(particle => {
        gsap.to(particle, {
          scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
          onComplete: () => { particle.parentNode?.removeChild(particle); },
        });
      });
      particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
      if (!cardRef.current || !isHoveredRef.current) return;
      if (!particlesInitialized.current) initializeParticles();

      memoizedParticles.current.forEach((particle, index) => {
        const timeoutId = setTimeout(() => {
          if (!isHoveredRef.current || !cardRef.current) return;
          const clone = particle.cloneNode(true) as HTMLDivElement;
          cardRef.current.appendChild(clone);
          particlesRef.current.push(clone);
          gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
          gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
          gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
        }, index * 100);
        timeoutsRef.current.push(timeoutId);
      });
    }, [initializeParticles]);

    useEffect(() => {
      if (disableAnimations || !cardRef.current) return;
      const el = cardRef.current;

      const handleMouseEnter = () => {
        isHoveredRef.current = true;
        animateParticles();
        if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
      };

      const handleMouseLeave = () => {
        isHoveredRef.current = false;
        clearAllParticles();
        if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
        if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableTilt && !enableMagnetism) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -10, rotateY: ((x - cx) / cx) * 10, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
        if (enableMagnetism) { magnetismAnimationRef.current = gsap.to(el, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: 'power2.out' }); }
      };

      const handleClick = (e: MouseEvent) => {
        if (!clickEffect) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const maxD = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
        const ripple = document.createElement('div');
        ripple.style.cssText = `position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x - maxD}px;top:${y - maxD}px;pointer-events:none;z-index:1000;`;
        el.appendChild(ripple);
        gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => { ripple.remove(); } });
      };

      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('click', handleClick);

      return () => {
        isHoveredRef.current = false;
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('click', handleClick);
        clearAllParticles();
      };
    }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

    return (
      <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    );
  };

// ─── Global spotlight ──────────────────────────────────────────────────────────

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.15) 0%,rgba(${glowColor},0.08) 15%,rgba(${glowColor},0.04) 25%,rgba(${glowColor},0.02) 40%,rgba(${glowColor},0.01) 65%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll('.card');

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(c => (c as HTMLElement).style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDist = Infinity;

      cards.forEach(c => {
        const el = c as HTMLElement;
        const r = el.getBoundingClientRect();
        const dist = Math.max(0, Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) - Math.max(r.width, r.height) / 2);
        minDist = Math.min(minDist, dist);
        const intensity = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0;
        updateCardGlowProperties(el, e.clientX, e.clientY, intensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const targetOpacity = minDist <= proximity ? 0.8 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll('.card').forEach(c => (c as HTMLElement).style.setProperty('--glow-intensity', '0'));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// ─── BentoCardGrid ─────────────────────────────────────────────────────────────

export const BentoCardGrid: React.FC<{
  children: React.ReactNode;
  gridRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}> = ({ children, gridRef, className = '' }) => (
  <div
    className={`bento-section select-none relative ${className}`}
    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// ─── MagicBento ───────────────────────────────────────────────────────────────

const MagicBento: React.FC<BentoProps> = ({
  cards,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  className = '',
  gridCols,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisable = disableAnimations || isMobile;
  const finalCards = cards || cardData;

  const baseCardClass = (card: BentoCardProps) =>
    `card flex flex-col relative min-h-[200px] w-full max-w-full p-5 sm:p-6 rounded-2xl border border-solid overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 ${enableBorderGlow ? 'card--border-glow' : ''} ${card.className || ''}`;

  const baseCardStyle = (card: BentoCardProps) => ({
    backgroundColor: card.color || 'var(--background-dark)',
    borderColor: 'var(--border-color)',
    color: 'var(--white)',
    '--glow-x': '50%',
    '--glow-y': '50%',
    '--glow-intensity': '0',
    '--glow-radius': '200px',
    '--card-glow-color': card.glowColor || glowColor,
  } as React.CSSProperties);

  return (
    <>
      <style>{`
        .bento-section {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
          --glow-color: ${glowColor};
          --border-color: #1e293b;
          --background-dark: #020617;
          --white: hsl(0, 0%, 100%);
        }

        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(var(--card-glow-color, ${glowColor}), calc(var(--glow-intensity) * 0.8)) 0%,
            rgba(var(--card-glow-color, ${glowColor}), calc(var(--glow-intensity) * 0.4)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        .card--border-glow:hover {
          box-shadow: 0 4px 24px rgba(0,0,0,0.12), 0 0 28px rgba(var(--card-glow-color, ${glowColor}), 0.15);
        }

        .text-clamp-1 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .text-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisable}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef} className={className}>
        <div className={`grid gap-4 ${gridCols || (cards ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4')}`}>
          {finalCards.map((card, index) =>
            enableStars ? (
              <ParticleCard
                key={index}
                className={baseCardClass(card)}
                style={baseCardStyle(card)}
                disableAnimations={shouldDisable}
                particleCount={particleCount}
                glowColor={card.glowColor || glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                <CardContent card={card} textAutoHide={textAutoHide} glowColor={card.glowColor || glowColor} />
              </ParticleCard>
            ) : (
              <div
                key={index}
                className={baseCardClass(card)}
                style={baseCardStyle(card)}
                ref={el => {
                  if (!el || shouldDisable) return;

                  const onMove = (e: MouseEvent) => {
                    const r = el.getBoundingClientRect();
                    const x = e.clientX - r.left, y = e.clientY - r.top;
                    const cx = r.width / 2, cy = r.height / 2;
                    if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -10, rotateY: ((x - cx) / cx) * 10, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
                    if (enableMagnetism) gsap.to(el, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: 'power2.out' });
                  };

                  const onLeave = () => {
                    if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
                    if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
                  };

                  const onClick = (e: MouseEvent) => {
                    if (!clickEffect) return;
                    const r = el.getBoundingClientRect();
                    const x = e.clientX - r.left, y = e.clientY - r.top;
                    const d = Math.max(Math.hypot(x, y), Math.hypot(x - r.width, y), Math.hypot(x, y - r.height), Math.hypot(x - r.width, y - r.height));
                    const rpl = document.createElement('div');
                    rpl.style.cssText = `position:absolute;width:${d * 2}px;height:${d * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${card.glowColor || glowColor},0.4) 0%,rgba(${card.glowColor || glowColor},0.2) 30%,transparent 70%);left:${x - d}px;top:${y - d}px;pointer-events:none;z-index:1000;`;
                    el.appendChild(rpl);
                    gsap.fromTo(rpl, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => { rpl.remove(); } });
                  };

                  el.addEventListener('mousemove', onMove);
                  el.addEventListener('mouseleave', onLeave);
                  el.addEventListener('click', onClick);
                }}
              >
                <CardContent card={card} textAutoHide={textAutoHide} glowColor={card.glowColor || glowColor} />
              </div>
            )
          )}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;