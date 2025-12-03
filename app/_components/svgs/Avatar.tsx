"use client";

import { useEffect, useRef, useState } from "react";

const blinkInterval = 5000;
const blinkJitter = 1500;

export function Avatar({
  size = 100,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const yOffset = 175;
  const xOffset = 130;
  const [isBlinking, setIsBlinking] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const calculatePupilPos = (eyeX: number, eyeY: number) => {
    const dx = mousePos.x - xOffset;
    const dy = mousePos.y - yOffset;
    const mouseDistance = Math.sqrt(dx * dx + dy * dy);

    const maxDistance = 2000;

    if (mouseDistance > maxDistance) {
      return { x: eyeX, y: eyeY };
    }

    const angle = Math.atan2(mousePos.y - eyeY, mousePos.x - eyeX);
    const distance = 6;
    return {
      x: eyeX + Math.cos(angle) * distance,
      y: eyeY + Math.sin(angle) * distance,
    };
  };

  useEffect(() => {
    const timeout = setTimeout(function blink() {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 50);
      setTimeout(blink, blinkInterval + Math.random() * blinkJitter);
    });
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;

      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const viewBox = svg.viewBox.baseVal;
      const scaleX = viewBox.width / rect.width;
      const scaleY = viewBox.height / rect.height;

      setMousePos({
        x: clientX * scaleX + viewBox.x,
        y: clientY * scaleY + viewBox.y,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const leftPupilPos = calculatePupilPos(xOffset - 30, yOffset - 10);
  const rightPupilPos = calculatePupilPos(xOffset + 30, yOffset - 10);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* face */}
      <ellipse
        cx={xOffset}
        cy={yOffset}
        rx="80"
        ry="100"
        className="text-amber-200"
        fill="currentColor"
      />
      {/* left ear */}
      <ellipse
        cx={xOffset - 80}
        cy={yOffset - 15}
        rx="12"
        ry="22"
        className="text-amber-200"
        fill="currentColor"
      />
      {/* right ear */}
      <ellipse
        cx={xOffset + 80}
        cy={yOffset - 15}
        rx="12"
        ry="22"
        className="text-amber-200"
        fill="currentColor"
      />
      {/* left eyebrow */}
      <path
        d={`
            M ${xOffset - 45} ${yOffset - 35}
            Q ${xOffset - 30} ${yOffset - 45} ${xOffset - 15} ${yOffset - 35}
          `}
        stroke="currentColor"
        strokeWidth="2"
        className="text-gray-800"
        fill="none"
        strokeLinecap="round"
      />
      {/* right eyebrow */}
      <path
        d={`
            M ${xOffset + 15} ${yOffset - 35}
            Q ${xOffset + 30} ${yOffset - 45} ${xOffset + 45} ${yOffset - 35}
          `}
        stroke="currentColor"
        strokeWidth="2"
        className="text-gray-800"
        fill="none"
        strokeLinecap="round"
      />
      {/* left eye */}
      <circle
        cx={xOffset - 30}
        cy={yOffset - 10}
        r="18"
        fill={isBlinking ? "oklch(92.4% 0.12 95.746)" : "white"}
        className="text-background-lighter"
        stroke="currentColor"
      />
      {!isBlinking && (
        <circle
          cx={leftPupilPos.x}
          cy={leftPupilPos.y}
          r="8"
          fill="black"
          className="text-background-lighter"
          stroke="currentColor"
        />
      )}
      {/* right eye */}
      <circle
        cx={xOffset + 30}
        cy={yOffset - 10}
        r="18"
        fill={isBlinking ? "oklch(92.4% 0.12 95.746)" : "white"}
        className="text-background-lighter"
        stroke="currentColor"
      />
      {!isBlinking && (
        <circle
          cx={rightPupilPos.x}
          cy={rightPupilPos.y}
          r="8"
          fill="black"
          className="text-background-lighter"
          stroke="currentColor"
        />
      )}
      {/* hat */}
      <path
        d={`
            M ${xOffset - 90} ${yOffset - 70}
            L ${xOffset - 35}  ${yOffset - 150}
            L ${xOffset} ${yOffset - 170}
            L ${xOffset + 35} ${yOffset - 150}
            L ${xOffset + 90} ${yOffset - 70}
            L ${xOffset + 120} ${yOffset - 45}
            L ${xOffset - 120} ${yOffset - 45}
            Z
          `}
        className="text-purple-900"
        fill="currentColor"
      />
      {/* hat brim */}
      <path
        d={`
            M ${xOffset - 90} ${yOffset - 70}
            L ${xOffset + 90} ${yOffset - 70}
            L ${xOffset + 120} ${yOffset - 45}
            L ${xOffset - 120} ${yOffset - 45}
            Z
          `}
        className="text-purple-950"
        fill="currentColor"
      />
      {/* stars on hat */}
      {[
        { x: xOffset - 30, y: yOffset - 130 },
        { x: xOffset + 40, y: yOffset - 130 },
        { x: xOffset - 10, y: yOffset - 150 },
        { x: xOffset + 20, y: yOffset - 140 },
        { x: xOffset, y: yOffset - 110 },
        { x: xOffset - 30, y: yOffset - 90 },
        { x: xOffset - 38, y: yOffset - 110 },
        { x: xOffset - 55, y: yOffset - 85 },
        { x: xOffset + 55, y: yOffset - 85 },
        { x: xOffset + 45, y: yOffset - 110 },
        { x: xOffset + 10, y: yOffset - 80 },
      ].map((star, i) => (
        <circle
          key={i}
          cx={star.x}
          cy={star.y}
          r="4"
          className="animate-pulse text-blue-300"
          fill="currentColor"
        />
      ))}
      {/* beard */}
      <path
        d={`
          M ${xOffset - 50} ${yOffset + 50}
          Q ${xOffset - 65} ${yOffset + 75} ${xOffset - 35} ${yOffset + 105}
          Q ${xOffset} ${yOffset + 155} ${xOffset + 35} ${yOffset + 105}
          Q ${xOffset + 65} ${yOffset + 75} ${xOffset + 50} ${yOffset + 50}
          Q ${xOffset} ${yOffset + 70} ${xOffset - 50} ${yOffset + 50}
          Z
        `}
        className="text-gray-300"
        fill="currentColor"
      />
      {/* mouth */}
      <path
        d={`
          M ${xOffset - 10} ${yOffset + 70}
          Q ${xOffset} ${yOffset + 80} ${xOffset + 10} ${yOffset + 70}
        `}
        stroke="currentColor"
        strokeWidth="2"
        className="text-gray-800"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
