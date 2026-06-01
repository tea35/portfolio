"use client";

import { useEffect, useRef } from "react";

export default function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mx = 0,
      my = 0;
    let prevMx = 0,
      prevMy = 0;
    let cursorWindX = 0,
      cursorWindY = 0;
    let t = 0;
    let raf: number;
    const WIND_RADIUS = 120;

    function init() {
      const rect = canvas!.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { W, H };
    }

    let { W, H } = init();

    const leaves = Array.from({ length: 14 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.15 - Math.random() * 0.2,
      size: 10 + Math.random() * 16,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.008,
      alpha: 0.15 + Math.random() * 0.25,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      prevMx = mx;
      prevMy = my;
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      cursorWindX = (mx - prevMx) * 0.15;
      cursorWindY = (my - prevMy) * 0.15;
    };

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);

    function drawLeaf(
      x: number,
      y: number,
      size: number,
      angle: number,
      alpha: number,
    ) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(angle);
      ctx!.beginPath();
      ctx!.moveTo(0, -size);
      ctx!.bezierCurveTo(
        size * 0.6,
        -size * 0.5,
        size * 0.6,
        size * 0.3,
        0,
        size * 0.5,
      );
      ctx!.bezierCurveTo(
        -size * 0.6,
        size * 0.3,
        -size * 0.6,
        -size * 0.5,
        0,
        -size,
      );
      ctx!.fillStyle = `rgba(168,200,74,${alpha})`;
      ctx!.fill();
      ctx!.beginPath();
      ctx!.moveTo(0, -size);
      ctx!.lineTo(0, size * 0.5);
      ctx!.strokeStyle = `rgba(168,200,74,${alpha * 0.5})`;
      ctx!.lineWidth = 0.5;
      ctx!.stroke();
      ctx!.restore();
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      cursorWindX *= 0.85;
      cursorWindY *= 0.85;

      // 波ライン（マウスに反応しない）
      for (let i = 0; i < 5; i++) {
        ctx!.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y =
            H / 2 +
            Math.sin(x * 0.015 + t + i * 0.9) * 28 +
            Math.sin(x * 0.03 + t * 0.8 + i) * 14;
          x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = `rgba(168,200,74,${0.03 + i * 0.025})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // 葉っぱ
      leaves.forEach((l) => {
        l.sway += l.swaySpeed;

        const dx = l.x - mx;
        const dy = l.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / WIND_RADIUS);
        const smooth = influence * influence;

        l.vx += cursorWindX * smooth * 0.5;
        l.vy += cursorWindY * smooth * 0.5;
        l.vx += Math.sin(l.sway) * 0.015;
        l.vy -= 0.008;
        l.vx *= 0.97;
        l.vy *= 0.97;
        l.x += l.vx;
        l.y += l.vy;
        l.angle += l.rotSpeed + cursorWindX * smooth * 0.004;

        if (l.y < -20) {
          l.y = H + 20;
          l.x = Math.random() * W;
        }
        if (l.x < -20) {
          l.x = W + 20;
        }
        if (l.x > W + 20) {
          l.x = -20;
        }

        drawLeaf(l.x, l.y, l.size, l.angle, l.alpha);
      });

      t += 0.012;
      raf = requestAnimationFrame(draw);
    }

    draw();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      const size = init();
      W = size.W;
      H = size.H;
      draw();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
