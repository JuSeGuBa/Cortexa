"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const GRID_SIZE = 48;
    const DOT_RADIUS = 1;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / GRID_SIZE) + 1;
      const rows = Math.ceil(canvas.height / GRID_SIZE) + 1;

      // Draw grid lines
      ctx.strokeStyle = "rgba(99,102,241,0.06)";
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
      }

      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * GRID_SIZE);
        ctx.lineTo(canvas.width, j * GRID_SIZE);
        ctx.stroke();
      }

      // Draw pulsing dots at intersections
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GRID_SIZE;
          const y = j * GRID_SIZE;

          // Wave effect based on position and time
          const wave = Math.sin(time * 0.8 + i * 0.4 + j * 0.3) * 0.5 + 0.5;
          const wave2 = Math.sin(time * 0.5 + i * 0.2 - j * 0.4) * 0.5 + 0.5;
          const combined = wave * wave2;

          if (combined > 0.6) {
            const alpha = (combined - 0.6) * 2.5;
            const radius = DOT_RADIUS + combined * 2.5;

            // Glow
            const gradient = ctx.createRadialGradient(
              x,
              y,
              0,
              x,
              y,
              radius * 4,
            );
            gradient.addColorStop(0, `rgba(99,102,241,${alpha * 0.6})`);
            gradient.addColorStop(1, "rgba(99,102,241,0)");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
            ctx.fill();

            // Core dot
            ctx.fillStyle = `rgba(139,92,246,${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Static dim dot
            ctx.fillStyle = "rgba(99,102,241,0.15)";
            ctx.beginPath();
            ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Occasional bright flash on random intersections
      const flashX =
        Math.floor((Math.sin(time * 0.3) * 0.5 + 0.5) * cols) * GRID_SIZE;
      const flashY =
        Math.floor((Math.cos(time * 0.2) * 0.5 + 0.5) * rows) * GRID_SIZE;
      const flashAlpha = Math.max(0, Math.sin(time * 2) * 0.5 + 0.3);

      const flashGrad = ctx.createRadialGradient(
        flashX,
        flashY,
        0,
        flashX,
        flashY,
        30,
      );
      flashGrad.addColorStop(0, `rgba(165,180,252,${flashAlpha})`);
      flashGrad.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = flashGrad;
      ctx.beginPath();
      ctx.arc(flashX, flashY, 30, 0, Math.PI * 2);
      ctx.fill();

      time += 0.015;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.8,
      }}
    />
  );
}
