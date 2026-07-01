"use client";

import { useEffect, useRef } from "react";

export default function DotCanvas({ 
  dotColor = "rgba(65, 72, 104, 0.4)",
  dotSize = 1 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    const SPACING = 28;
    const MOUSE_RADIUS = 120;
    const REPEL_FORCE = 15;

    let mouse = { x: -9999, y: -9999 };
    let frameId;
    let isVisible = false;

    // Track mouse over this element
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const initGrid = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      
      particles = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          particles.push({
            ox: i * SPACING,
            oy: j * SPACING,
            x: i * SPACING,
            y: j * SPACING,
            vx: 0,
            vy: 0
          });
        }
      }
    };

    const draw = () => {
      if (!isVisible) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;

      particles.forEach((p) => {
        // Distance from mouse
        const dx = mouse.x - p.ox;
        const dy = mouse.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel from mouse
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const pushX = (dx / dist) * force * REPEL_FORCE;
          const pushY = (dy / dist) * force * REPEL_FORCE;
          
          p.x = p.ox - pushX;
          p.y = p.oy - pushY;
        } else {
          // Return to origin (spring)
          p.x += (p.ox - p.x) * 0.1;
          p.y += (p.oy - p.y) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    initGrid();
    draw();

    window.addEventListener("resize", initGrid);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // Only render when inside viewport
    const observer = new IntersectionObserver(([ent]) => {
      isVisible = ent.isIntersecting;
    }, { threshold: 0 });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", initGrid);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };

  }, [dotColor, dotSize]);

  return (
    <div 
      ref={containerRef} 
      style={{ position: 'absolute', inset: -40, zIndex: 0, pointerEvents: 'none' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'auto' // mouse events fire on canvas
        }}
      />
    </div>
  );
}
