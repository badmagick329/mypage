"use client";

import { useAvatar } from "@/hooks/home/useAvatar";

export function Avatar({
  size = 100,
  className = "",
  isHovering = false,
}: {
  size?: number;
  className?: string;
  isHovering: boolean;
}) {
  const {
    svgRef,
    isBlinking,
    isVisible,
    setIsVisible,
    leftPupilPos,
    rightPupilPos,
    stars,
    xOffset,
    yOffset,
  } = useAvatar({ isHovering });

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
      style={{
        opacity: isVisible ? 1 : 0,
        transition:
          "opacity 250ms ease-in-out, translate 250ms ease-in-out, transform 250ms ease-in-out",
        translate: isVisible ? "0px 0px" : "5px 10px",
        transform: isVisible ? "scale(1)" : "scale(0.4)",
      }}
      onMouseEnter={() => setIsVisible(false)}
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
      {stars.map((star, i) => (
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
