import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const NAV_HEIGHT = 64;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function BookmarkIndicator({ bookmark, onReposition }) {
  const dragRef = useRef(null);
  const frameRef = useRef(null);
  const [indicatorTop, setIndicatorTop] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const motionTop = useMotionValue(0);
  const springTop = useSpring(motionTop, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });

  useEffect(() => {
    if (indicatorTop !== null) {
      motionTop.set(indicatorTop);
    }
  }, [indicatorTop, motionTop]);

  useEffect(() => {
    if (!bookmark || typeof bookmark.position !== 'number') {
      setIndicatorTop(null);
      return undefined;
    }

    const syncIndicator = () => {
      if (dragRef.current) return;

      const min = NAV_HEIGHT + 18;
      const max = window.innerHeight - 44;
      const nextTop = bookmark.position - window.scrollY + NAV_HEIGHT;

      if (nextTop >= min && nextTop <= max) {
        setIndicatorTop(nextTop);
        return;
      }

      setIndicatorTop(null);
    };

    const requestSync = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        syncIndicator();
      });
    };

    syncIndicator();

    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [bookmark]);

  if (!bookmark || typeof bookmark.position !== 'number' || indicatorTop === null) {
    return null;
  }

  const handlePointerDown = (event) => {
    dragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startTop: indicatorTop,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    event.preventDefault();
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

    const min = NAV_HEIGHT + 18;
    const max = window.innerHeight - 44;
    const deltaY = event.clientY - dragRef.current.startY;
    const nextTop = clamp(dragRef.current.startTop + deltaY, min, max);

    motionTop.set(nextTop);
    setIndicatorTop(nextTop);
  };

  const finishDrag = (event) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

    const min = NAV_HEIGHT + 18;
    const max = window.innerHeight - 44;
    const deltaY = event.clientY - dragRef.current.startY;
    const nextTop = clamp(dragRef.current.startTop + deltaY, min, max);

    dragRef.current = null;
    setIsDragging(false);
    onReposition(nextTop);
  };

  return (
    <motion.div
      className={`bookmark-indicator ${isDragging ? 'dragging' : ''}`}
      style={{ top: springTop }}
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      title="Drag to adjust your saved reading spot"
      aria-hidden="true"
    >
      <span className="bookmark-indicator-core" />
    </motion.div>
  );
}
