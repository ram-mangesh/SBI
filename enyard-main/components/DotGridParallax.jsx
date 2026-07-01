"use client";

import { useEffect, useRef } from "react";

export default function DotGridParallax() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let frameId;

    // Configuration
    const SPACING = 28;
    const MOUSE_RADIUS = 150; // How far the mouse repels
    const REPEL_FORCE = 0.4;  // Max push distance multiplier
    const SPRING = 0.05;      // How fast dots return to start
    const FLOAT_SPEED = 0.0005;
    const FLOAT_SIZE = 8;     // Max px it will drift natively

    let mouse = { x: -9999, y: -9999 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const initGrid = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.documentElement.scrollHeight; // Cover whole scrolled page

      particles = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            ox: i * SPACING,
            oy: j * SPACING,
            x: i * SPACING,
            y: j * SPACING,
            // Random offset for organic floating
            floatOffsetAngle: Math.random() * Math.PI * 2,
            floatSpeedMult: 0.5 + Math.random() * 0.5,
          });
        }
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Use the theme's muted dot color (works on dark and light)
      ctx.fillStyle = "rgba(65, 72, 104, 0.4)"; 

      // Adjust mouse Y for scroll position
      const scrollY = window.scrollY;
      const actualMouseY = mouse.y + scrollY;

      particles.forEach((p) => {
        // 1. Natural floating
        const floatX = Math.sin(time * FLOAT_SPEED * p.floatSpeedMult + p.floatOffsetAngle) * FLOAT_SIZE;
        const floatY = Math.cos(time * FLOAT_SPEED * p.floatSpeedMult + p.floatOffsetAngle) * FLOAT_SIZE;
        
        const targetX = p.ox + floatX;
        const targetY = p.oy + floatY;

        // 2. Mouse Repel
        const dx = mouse.x - p.x;
        const dy = actualMouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          // Push away
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const pushX = (dx / dist) * force * REPEL_FORCE * MOUSE_RADIUS;
          const pushY = (dy / dist) * force * REPEL_FORCE * MOUSE_RADIUS;

          // Instead of instantly moving, add to position
          p.x -= pushX * 0.1;
          p.y -= pushY * 0.1;
        }

        // 3. Spring back to target
        p.x += (targetX - p.x) * SPRING;
        p.y += (targetY - p.y) * SPRING;

        // Render dot
        // Optimization: only render if roughly visible on screen
        if (p.y > scrollY - 50 && p.y < scrollY + window.innerHeight + 50) {
          ctx.fillRect(p.x, p.y, 2, 2);
        }
      });

      frameId = requestAnimationFrame(draw);
    };

    initGrid();
    draw(0);

    window.addEventListener("resize", initGrid);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle document height changes (like expanding accordions)
    const ro = new ResizeObserver(initGrid);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("resize", initGrid);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,         // Behind content, above base bg
        opacity: 0.5,      // Blend smoothly
      }}
    />
  );
}
