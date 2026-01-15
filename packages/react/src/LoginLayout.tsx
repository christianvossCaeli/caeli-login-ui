'use client';

import { useEffect, useState, memo } from 'react';
import type { LoginLayoutProps } from './types';
import { FloatingParticles } from './FloatingParticles';
import { CaeliSpinner } from './CaeliSpinner';

/**
 * LoginLayout - Complete login page layout with Caeli branding
 *
 * Provides a full-page layout with:
 * - Animated gradient background
 * - Floating particles
 * - Animated logo with glow rings
 * - Glassmorphism login card
 * - Footer
 *
 * @example
 * ```tsx
 * <LoginLayout
 *   appTitle="CAELI"
 *   appSubtitle="QR"
 *   appDescription="QR-Code Management System"
 * >
 *   <LoginForm />
 * </LoginLayout>
 * ```
 */
export const LoginLayout = memo(function LoginLayout({
  appTitle = 'CAELI',
  appSubtitle,
  appDescription,
  footerText,
  particleCount = 20,
  children,
  className = '',
}: LoginLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const currentYear = new Date().getFullYear();
  const footer = footerText ?? `© ${currentYear} Caeli Wind`;

  return (
    <div className={`login-container ${className}`.trim()}>
      {/* Animated Background */}
      <div className="background-layer" aria-hidden="true">
        <div className="gradient-bg" />
        <div className="gradient-overlay" />
        <FloatingParticles count={particleCount} />
      </div>

      {/* Main Content */}
      <div className="content-layer">
        <div className="login-wrapper">
          {/* Logo Section */}
          <div
            className={`logo-section ${isLoaded ? 'animate-in' : ''}`}
            role="banner"
          >
            {/* Glow rings */}
            <div className="glow-rings" aria-hidden="true">
              <div className="glow-ring ring-1" />
              <div className="glow-ring ring-2" />
              <div className="glow-ring ring-3" />
            </div>
            {/* Animated Spinner */}
            <CaeliSpinner />
          </div>

          {/* Title Section */}
          <div className={`title-section ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="app-title">{appTitle}</h1>
            {appSubtitle && <span className="app-subtitle">{appSubtitle}</span>}
            {appDescription && (
              <p className="app-description">{appDescription}</p>
            )}
          </div>

          {/* Login Card */}
          <main
            className={`login-card ${isLoaded ? 'animate-in' : ''}`}
            role="main"
          >
            {children}
          </main>

          {/* Footer */}
          <footer className={`footer ${isLoaded ? 'animate-in' : ''}`}>
            <span>{footer}</span>
          </footer>
        </div>
      </div>
    </div>
  );
});
