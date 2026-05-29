"use client";

import { useEffect, useRef } from "react";

const stacks = ["React", "Next.js", "TypeScript", "Python"];

export default function StackSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let angleY = 0;
    let startTime: number | null = null;
    const expandDuration = 2000;

    function init() {
      const rect = canvas!.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const dpr = window.devicePixelRatio || 1;

      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const R = Math.min(W, H) * 0.5;

      const points = stacks.map((label, i) => {
        const phi = Math.acos(-1 + (2 * i) / stacks.length);
        const theta = Math.sqrt(stacks.length * Math.PI) * phi;
        return {
          label,
          x0: R * Math.cos(theta) * Math.sin(phi),
          y0: R * Math.sin(theta) * Math.sin(phi),
          z0: R * Math.cos(phi),
        };
      });

      cancelAnimationFrame(raf);

      function draw() {
        const elapsed = startTime !== null ? performance.now() - startTime : 0;
        const expandProgress =
          startTime !== null ? Math.min(elapsed / expandDuration, 1) : 0;
        const eased = 1 - Math.pow(1 - expandProgress, 3);

        ctx!.clearRect(0, 0, W, H);

        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        const projected = points.map(({ label, x0, y0, z0 }) => {
          const x = x0 * cosY - z0 * sinY;
          const z = x0 * sinY + z0 * cosY;
          const y = y0;
          const fov = 400;
          const scale = fov / (fov + z + R);

          return {
            label,
            sx: W / 2 + x * scale * eased,
            sy: H / 2 + y * scale * eased,
            z,
            scale,
            fadeAlpha: eased,
          };
        });

        projected.sort((a, b) => a.z - b.z);

        projected.forEach(({ label, sx, sy, z, scale, fadeAlpha }) => {
          const depthAlpha = 0.4 + 0.6 * ((z + R) / (2 * R));
          const alpha = depthAlpha * fadeAlpha;
          const fontSize = Math.round(16 * scale);

          ctx!.font = `${fontSize}px monospace`;
          ctx!.fillStyle = `rgba(180,180,180,${alpha})`;
          ctx!.fillText(label, sx + 5 * scale, sy + 4 * scale);
        });

        angleY += 0.005;
        raf = requestAnimationFrame(draw);
      }

      draw();
    }

    init();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && startTime === null) {
          startTime = performance.now();
        }
      },
      { threshold: 0.3 },
    );
    intersectionObserver.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      startTime = null;
      init();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[320px]" />;
}
