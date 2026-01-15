'use client';

import { useEffect, useState, memo } from 'react';
import type { Particle, FloatingParticlesProps } from './types';

/**
 * Generates particles with deterministic pseudo-random distribution
 * @param count - Number of particles to generate
 */
function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      size: 2 + ((i * 7) % 5),
      left: (i * 17) % 100,
      delay: (i * 3) % 5,
      duration: 5 + ((i * 11) % 5),
    });
  }
  return particles;
}

/**
 * FloatingParticles - Animated particles that float upward
 *
 * Creates a decorative particle effect in the background.
 * Particles are generated deterministically based on index to avoid
 * hydration mismatches in SSR environments.
 */
export const FloatingParticles = memo(function FloatingParticles({
  count = 20,
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles on mount to avoid SSR mismatch
    setParticles(generateParticles(count));
  }, [count]);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
});
