"use client";

import { useEffect, useRef } from "react";

const stacks = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Supabase",
  "Python",
  "PyTorch",
];

export default function StackSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const R = Math.min(W, H) * 0.5;
    let angleY = 0;
    let raf: number;

    // フィボナッチ球面配置
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

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = points.map(({ label, x0, y0, z0 }) => {
        // Y軸回転
        const x = x0 * cosY - z0 * sinY;
        const z = x0 * sinY + z0 * cosY;
        const y = y0;
        // 透視投影
        const fov = 400;
        const scale = fov / (fov + z + R);
        return {
          label,
          sx: W / 2 + x * scale,
          sy: H / 2 + y * scale,
          z,
          scale,
        };
      });

      // z順でソート（奥から手前）
      projected.sort((a, b) => a.z - b.z);

      projected.forEach(({ label, sx, sy, z, scale }) => {
        const alpha = 0.4 + 0.6 * ((z + R) / (2 * R));
        const fontSize = Math.round(16 * scale);

        // ドット
        ctx!.beginPath();
        ctx!.arc(sx, sy, 2 * scale, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(180,180,180,${alpha})`;
        ctx!.fill();

        // ラベル
        ctx!.font = `${fontSize}px monospace`;
        ctx!.fillStyle = `rgba(180,180,180,${alpha})`;
        ctx!.fillText(label, sx + 5 * scale, sy + 4 * scale);
      });

      angleY += 0.005;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[320px]" />;
}
