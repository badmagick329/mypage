import { useEffect, useMemo, useRef, useState, RefObject } from "react";

const blinkInterval = 5000;
const blinkJitter = 1500;
const xOffset = 130;
const yOffset = 175;

interface UseAvatarOptions {
  isHovering: boolean;
}

interface UseAvatarReturn {
  svgRef: RefObject<SVGSVGElement | null>;
  isBlinking: boolean;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  leftPupilPos: { x: number; y: number };
  rightPupilPos: { x: number; y: number };
  stars: { x: number; y: number }[];
  xOffset: number;
  yOffset: number;
}

export function useAvatar({ isHovering }: UseAvatarOptions): UseAvatarReturn {
  const [isBlinking, setIsBlinking] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

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
    const scheduleBlink = () => {
      blinkTimeoutRef.current = setTimeout(
        () => {
          setIsBlinking(true);
          blinkCloseTimeoutRef.current = setTimeout(
            () => setIsBlinking(false),
            50,
          );
          scheduleBlink();
        },
        blinkInterval + Math.random() * blinkJitter,
      );
    };

    scheduleBlink();

    return () => {
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
      if (blinkCloseTimeoutRef.current)
        clearTimeout(blinkCloseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        if (!svgRef.current) {
          rafRef.current = null;
          return;
        }

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

        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (isHovering && !isVisible) setIsVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering]);

  const stars = useMemo(
    () => [
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
    ],
    [],
  );

  const leftPupilPos = calculatePupilPos(xOffset - 30, yOffset - 10);
  const rightPupilPos = calculatePupilPos(xOffset + 30, yOffset - 10);

  return {
    svgRef,
    isBlinking,
    isVisible,
    setIsVisible,
    leftPupilPos,
    rightPupilPos,
    stars,
    xOffset,
    yOffset,
  };
}
