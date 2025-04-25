
import React, { useEffect, useRef } from "react";

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
  width = 448, // typical dialog width
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Set --popover-origin-x/y CSS custom props for transform-origin
  useEffect(() => {
    if (open && ref.current && anchorPoint) {
      const { x, y } = anchorPoint;
      const container = ref.current;
      // Calculate position relative to viewport/dialog
      // Simple placement: center the popover, but transform origin to pointer
      container.style.setProperty("--popover-origin-x", `${x}px`);
      container.style.setProperty("--popover-origin-y", `${y}px`);
    }
  }, [open, anchorPoint]);

  // Center the popover, but use custom transform-origin for animation
  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => onOpenChange(false)}>
      <div
        ref={ref}
        className={`animate-popupFromPointer bg-white rounded-xl border shadow-lg p-6 relative ${className}`}
        style={{
          width,
          transformOrigin: "var(--popover-origin-x, 50%) var(--popover-origin-y, 0%)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
        {/* Close button (top right corner) */}
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 transition hover:opacity-100 focus:outline-none bg-gray-100 p-1"
          onClick={() => onOpenChange(false)}
        >
          <span className="sr-only">Close</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
    </div>
  ) : null;
};
