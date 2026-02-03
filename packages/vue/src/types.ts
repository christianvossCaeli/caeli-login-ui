/**
 * @caeli-wind/login-vue - Type Definitions
 */

/**
 * Particle configuration for floating animation
 */
export interface Particle {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}

/**
 * Props for FloatingParticles component
 */
export interface FloatingParticlesProps {
  /** Number of particles to render (default: 20) */
  count?: number;
}

/**
 * Props for CaeliSpinner component
 */
export interface CaeliSpinnerProps {
  /** Size of the spinner SVG in pixels (default: 70) */
  size?: number;
}

/**
 * Props for LoginLayout component
 */
/**
 * Auth container mode
 */
export type AuthContainerMode = 'credentials' | 'sso' | 'both';

/**
 * Props for AuthContainer component
 */
export interface AuthContainerProps {
  /** Layout mode — controls spacing and alignment */
  mode?: AuthContainerMode;
  /** Optional heading rendered above content */
  title?: string;
  /** Optional description rendered below the title */
  description?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Props for SsoDivider component
 */
export interface SsoDividerProps {
  /** Divider label text (default: "or") */
  text?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Props for LoginLayout component
 */
export interface LoginLayoutProps {
  /** Main title displayed with gradient (default: "CAELI") */
  appTitle?: string;
  /** Subtitle displayed below title (e.g., "QR", "CRAWLER") */
  appSubtitle?: string;
  /** Description text below the title */
  appDescription?: string;
  /** Footer text (default: "© {year} Caeli Wind") */
  footerText?: string;
  /** Number of floating particles (default: 20) */
  particleCount?: number;
}
