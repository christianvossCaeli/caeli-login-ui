/**
 * @caeli-wind/login-react - Type Definitions
 */

import type { ReactNode } from 'react';

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
  /** Content to render inside the login card (form) */
  children: ReactNode;
  /** Custom class name for the container */
  className?: string;
}
