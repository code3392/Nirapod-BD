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

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for Dhaka Civic Mesh
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const colors = [
      'rgba(37, 99, 235, ',    // Royal Civic Blue
      'rgba(2, 132, 199, ',    // Sky Blue
      'rgba(59, 130, 246, ',   // Electric Blue
      'rgba(16, 185, 129, ',   // Safety Green Accent
    ];

    const particleCount = Math.min(38, Math.floor(width / 35));
    const nodes: Node[] = [];

    for (let i = 0; i < particleCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render connected lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render glowing nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${node.alpha})`;
        ctx.shadowColor = '#2563EB';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Dynamic Animated Ambient Orbs in White & Blue */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-sky-400/10 blur-3xl animate-pulse"
        style={{ animationDuration: '12s' }}
      />
      <div 
        className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-indigo-500/10 blur-3xl animate-pulse"
        style={{ animationDuration: '10s' }}
      />
      
      {/* Mesh Canvas */}
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
    </div>
  );
}
