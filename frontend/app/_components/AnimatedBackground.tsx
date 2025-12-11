"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Orb {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  life: number;
  lifeDirection: 1 | -1;
  lifeSpeed: number;
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const animationRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();

  const opacityMultiplier = resolvedTheme === "light" ? 5.0 : 2.5;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const minOrbs = 2;
    const maxOrbs = 4;
    const orbs: Orb[] = [];

    const createOrb = (fadeIn = true): Orb => {
      const element = document.createElement("div");
      const size = 300 + Math.random() * 400;
      const baseOpacity = 0.08 + Math.random() * 0.1;

      element.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
        opacity: 0;
        filter: blur(60px);
        pointer-events: none;
        transition: opacity 0.1s linear;
      `;

      container.appendChild(element);

      return {
        element,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2 + (Math.random() > 0.5 ? 0.5 : -0.5),
        vy: (Math.random() - 0.5) * 2 + (Math.random() > 0.5 ? 0.5 : -0.5),
        size,
        baseOpacity,
        life: fadeIn ? 0 : 1,
        lifeDirection: fadeIn ? 1 : -1,
        lifeSpeed: 0.002 + Math.random() * 0.003,
      };
    };

    const initialCount =
      minOrbs + Math.floor(Math.random() * (maxOrbs - minOrbs + 1));
    for (let i = 0; i < initialCount; i++) {
      const orb = createOrb(true);
      orb.life = Math.random();
      orbs.push(orb);
    }

    orbsRef.current = orbs;

    let time = 0;
    const animate = () => {
      time += 0.008;

      for (let i = orbs.length - 1; i >= 0; i--) {
        const orb = orbs[i];

        orb.life += orb.lifeSpeed * orb.lifeDirection;

        if (orb.life >= 1) {
          orb.life = 1;

          if (Math.random() < 0.001) {
            orb.lifeDirection = -1;
          }
        } else if (orb.life <= 0) {
          orb.element.remove();
          orbs.splice(i, 1);
          continue;
        }

        orb.element.style.opacity = String(
          orb.baseOpacity * orb.life * opacityMultiplier,
        );

        const sineOffset = Math.sin(time * 0.5 + i * 1.5) * 0.02;
        const cosOffset = Math.cos(time * 0.3 + i * 2) * 0.02;

        orb.vx += sineOffset;
        orb.vy += cosOffset;

        orb.vx *= 0.999;
        orb.vy *= 0.999;

        const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);
        const minSpeed = 0.3;
        const maxSpeed = 1.5;

        if (speed < minSpeed) {
          const scale = minSpeed / speed;
          orb.vx *= scale;
          orb.vy *= scale;
        } else if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          orb.vx *= scale;
          orb.vy *= scale;
        }

        orb.x += orb.vx;
        orb.y += orb.vy;

        const padding = orb.size / 2;
        if (orb.x < -padding) orb.x = window.innerWidth + padding;
        if (orb.x > window.innerWidth + padding) orb.x = -padding;
        if (orb.y < -padding) orb.y = window.innerHeight + padding;
        if (orb.y > window.innerHeight + padding) orb.y = -padding;

        orb.element.style.transform = `translate(${orb.x - orb.size / 2}px, ${orb.y - orb.size / 2}px)`;
      }

      if (orbs.length < minOrbs) {
        orbs.push(createOrb(true));
      } else if (orbs.length < maxOrbs && Math.random() < 0.002) {
        orbs.push(createOrb(true));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      orbs.forEach((orb) => {
        orb.x = Math.min(orb.x, window.innerWidth);
        orb.y = Math.min(orb.y, window.innerHeight);
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      orbs.forEach((orb) => orb.element.remove());
    };
  }, [opacityMultiplier]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
