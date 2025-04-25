import React, { useEffect, useRef, useState } from "react";

type AnimatedPopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorPoint?: { x: number; y: number };
  children: React.ReactNode;
  width?: number | string;
  className?: string;
};

export const AnimatedPopover: React.FC<AnimatedPopoverProps> = ({
  open,
  onOpenChange,
  anchorPoint,
  children,
  width = 448,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(open);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Store the last anchorPoint for closing animation
  const [lastAnchorPoint, setLastAnchorPoint] = useState<{ x: number; y: number } | undefined>(anchorPoint);

  // When anchorPoint changes on open, update it (but keep it during close).
  useEffect(() => {
    if (open && anchorPoint) setLastAnchorPoint(anchorPoint);
  }, [open, anchorPoint]);

  // Show when open becomes true, play out animation when false
  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else if (isVisible) {
      setIsAnimatingOut(true);
    }
  }, [open]);

  // Supply the custom CSS vars for pointer animation
  useEffect(() => {
    if ((open || isAnimatingOut) && ref.current && lastAnchorPoint) {
      const { x, y } = lastAnchorPoint;
      const container = ref.current;
      container.style.setProperty("--popover-origin-x", `${x}px`);
      container.style.setProperty("--popover-origin-y", `${y}px`);
    }
  }, [open, isAnimatingOut, lastAnchorPoint]);

  // When closing animation ends, unmount
  const handleAnimationEnd = () => {
    if (isAnimatingOut) {
      setIsVisible(false);
      setIsAnimatingOut(false);
      // Only call onOpenChange if not already closed by parent
    }
  };

  // Click overlay to close (don't call onOpenChange if already closing)
  const handleOverlayClick = () => {
    if (!isAnimatingOut && open) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        onOpenChange(false);
      }, 250); // should match the animation duration
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
      <div
        ref={ref}
        className={`${
          isAnimatingOut ? "animate-popupFromPointer-reverse" : "animate-popupFromPointer"
        } bg-white rounded-xl border shadow-lg p-6 relative ${className}`}
        style={{
          width,
          transformOrigin: "var(--popover-origin-x, 50%) var(--popover-origin-y, 0%)",
          animationDuration: "0.25s",
        }}
        onClick={e => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 transition hover:opacity-100 focus:outline-none bg-gray-100 p-1"
          onClick={() => {
            if (!isAnimatingOut) {
              setIsAnimatingOut(true);
              setTimeout(() => onOpenChange(false), 250);
            }
          }}
        >
          <span className="sr-only">Close</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
    </div>
  );
};
