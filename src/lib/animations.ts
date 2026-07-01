/**
 * Smooth animation easing curves (GPU-accelerated)
 * Inspired by sites como ran-portifolio.netlify.app
 */

export const easings = {
  // Smooth easing para fade-ins e reveals
  smooth: [0.25, 0.46, 0.45, 0.94],
  // Snappy para micro-interactions
  snappy: [0.22, 1, 0.36, 1],
  // Bounce subtle para cards
  bounce: [0.68, -0.55, 0.265, 1.55],
  // Ease-out para parallax (smooth deceleration)
  easeOut: [0.16, 1, 0.3, 1],
} as const;

/**
 * GPU-accelerated transforms que não causam reflow
 * Use transform + opacity, nunca left/top/width/height
 */
export const animationDefaults = {
  // Fade-in suave sem flicker
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: easings.smooth },
  },
  // Slide-up elegante
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: easings.smooth },
  },
  // Scale subtle
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: easings.snappy },
  },
  // Stagger para listas
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  staggerItem: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: easings.smooth },
  },
} as const;

/**
 * Parallax scrolled animations (smooth, não trava)
 */
export const parallaxConfig = {
  // Leve parallax para imagens (não exagera)
  subtle: {
    offset: ['-5%', '5%'],
    transition: { type: 'tween', ease: 'easeOut', duration: 0.6 },
  },
  // Parallax mais percebível mas ainda smooth
  moderate: {
    offset: ['-10%', '10%'],
    transition: { type: 'tween', ease: 'easeOut', duration: 0.8 },
  },
} as const;

/**
 * Blur animations (GPU-accelerated via filter)
 */
export const blurTransition = {
  initial: { filter: 'blur(10px)', opacity: 0 },
  animate: { filter: 'blur(0px)', opacity: 1 },
  transition: { duration: 1, ease: easings.smooth },
} as const;
