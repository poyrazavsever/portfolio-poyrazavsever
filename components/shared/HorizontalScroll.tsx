"use client";

import { useRef, useEffect } from "react";

export function HorizontalScroll({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= maxScrollLeft && e.deltaY > 0;

      if (atStart || atEnd) return;

      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
