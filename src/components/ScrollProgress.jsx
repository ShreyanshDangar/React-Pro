import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress" />;
}
