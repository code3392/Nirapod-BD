'use client';

import React, { useEffect, useRef } from 'react';

export default function BackgroundCyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinate tracking for interactive mesh gravity
    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseOnScreen = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnScreen = true;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      isMouseOnScreen = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes for Dhaka Civic Mesh
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      baseAlpha: number;
    }

    // Telemetry data packet traveling along a connection line
    interface Pulse {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      color: string;
    }

    const colors = [
      'rgba(168, 85, 247, ',   // Radiant Purple
      'rgba(147, 51, 234, ',   // Deep Violet
      'rgba(192, 132, 252, ',  // Bright Lavender
      'rgba(129, 140, 248, ',  // Electric Indigo
      'rgba(56, 189, 248, ',   // Civic Sky Accent
    ];

    const particleCount = Math.min(52, Math.max(26, Math.floor(width / 28)));
    const nodes: Node[] = [];
    const pulses: Pulse[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseA = Math.random() * 0.45 + 0.35;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseA,
        baseAlpha: baseA,
      });
    }

    // Spawn telemetry pulse packets periodically
    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      // Find nearest neighbor within distance
      let closestIdx = -1;
      let minD = 150;
      for (let j = 0; j < nodes.length; j++) {
        if (j === from) continue;
        const dx = nodes[from].x - nodes[j].x;
        const dy = nodes[from].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minD) {
          minD = dist;
          closestIdx = j;
        }
      }

      if (closestIdx !== -1 && pulses.length < 12) {
        pulses.push({
          fromIndex: from,
          toIndex: closestIdx,
          progress: 0,
          speed: 0.018 + Math.random() * 0.02,
          color: nodes[from].color,
        });
      }
    };

    let pulseTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Periodically trigger safety telemetry pulses
      pulseTimer++;
      if (pulseTimer % 45 === 0) {
        spawnPulse();
      }

      // 1. Render connected constellation lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Connect nearby nodes to user cursor with glowing beam
        if (isMouseOnScreen) {
          const mdx = nodes[i].x - mouseX;
          const mdy = nodes[i].y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 160) {
            const cursorAlpha = (1 - mDist / 160) * 0.45;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(192, 132, 252, ${cursorAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();

            // Slightly attract node towards cursor (gentle gravity)
            nodes[i].vx -= (mdx / mDist) * 0.015;
            nodes[i].vy -= (mdy / mDist) * 0.015;
          }
        }
      }

      // 2. Render telemetry data pulses traveling along lines
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        const fromNode = nodes[pulse.fromIndex];
        const toNode = nodes[pulse.toIndex];

        if (!fromNode || !toNode || pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const px = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${pulse.color}0.95)`;
        ctx.shadowColor = '#C084FC';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Render glowing nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Apply slight speed drag so particles don't accelerate infinitely
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Keep a minimum gentle drift
        if (Math.abs(node.vx) < 0.1) node.vx += (Math.random() - 0.5) * 0.2;
        if (Math.abs(node.vy) < 0.1) node.vy += (Math.random() - 0.5) * 0.2;

        node.x += node.vx;
        node.y += node.vy;

        // Soft screen bounce/wrap
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${node.alpha})`;
        ctx.shadowColor = '#A855F7';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Animated Drifting Cyber Coordinate Grid */}
      <div 
        className="absolute inset-0 opacity-[0.045] animate-cyber-grid pointer-events-none [background-image:linear-gradient(rgba(168,85,247,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.7)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      {/* 2. Fluid Morphing Atmospheric Aurora Nebulae */}
      {/* Aurora Orb 1: Deep Radiant Violet (Top Left) */}
      <div 
        className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-purple-600/22 blur-[100px] animate-aurora-1 pointer-events-none"
      />

      {/* Aurora Orb 2: Radiant Magenta & Obsidian Purple (Top Right) */}
      <div 
        className="absolute top-1/4 -right-28 w-[40rem] h-[40rem] rounded-full bg-violet-600/20 blur-[120px] animate-aurora-2 pointer-events-none"
      />

      {/* Aurora Orb 3: Electric Indigo Telemetry Core (Center Left) */}
      <div 
        className="absolute top-1/2 left-10 w-[34rem] h-[34rem] rounded-full bg-indigo-600/18 blur-[110px] animate-aurora-3 pointer-events-none"
      />

      {/* Aurora Orb 4: Deep Fuchsia Flare (Bottom Right) */}
      <div 
        className="absolute -bottom-28 right-1/4 w-[38rem] h-[38rem] rounded-full bg-purple-700/22 blur-[110px] animate-aurora-1 pointer-events-none"
      />

      {/* Aurora Orb 5: Civic Sky Accent (Bottom Left) */}
      <div 
        className="absolute bottom-10 left-1/3 w-[26rem] h-[26rem] rounded-full bg-sky-500/12 blur-[90px] animate-aurora-2 pointer-events-none"
      />

      {/* 3. Micro Twinkling Starlight Points */}
      <div className="absolute top-[18%] left-[22%] w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#C084FC] animate-star-shimmer" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[32%] right-[18%] w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38BDF8] animate-star-shimmer" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-[65%] left-[12%] w-1.5 h-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_#A855F7] animate-star-shimmer" style={{ animationDelay: '2.4s' }} />
      <div className="absolute top-[78%] right-[28%] w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#C084FC] animate-star-shimmer" style={{ animationDelay: '0.8s' }} />
      <div className="absolute top-[48%] left-[72%] w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-[0_0_8px_#818CF8] animate-star-shimmer" style={{ animationDelay: '1.8s' }} />

      {/* 4. Interactive Constellation Mesh Canvas */}
      <canvas ref={canvasRef} className="w-full h-full opacity-85" />
    </div>
  );
}
