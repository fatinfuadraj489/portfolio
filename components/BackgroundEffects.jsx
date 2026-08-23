"use client";

import { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const bgGlowRef = useRef(null);
  const bgGlow2Ref = useRef(null);
  const bgGradientRef = useRef(null);
  const floatCanvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const bgGlow = bgGlowRef.current;
    const bgGlow2 = bgGlow2Ref.current;
    const bgGradient = bgGradientRef.current;

    let frameId;

    if (bgGlow && bgGlow2 && finePointer.matches && !reduceMotion.matches) {
      const MAX1 = 30, MAXY1 = 26;
      const MAX2 = 46, MAXY2 = 38;
      const MAXG = 2.5, MAXYG = 2;

      const state = {
        x: -0.12, y: -0.08,
        gx: 0.12, gy: 0.1,
        intensity: 0.45,
        tx: -0.12, ty: -0.08,
        tIntensity: 0.45,
        active: false
      };

      let lastX = window.innerWidth / 2;
      let lastY = window.innerHeight / 2;
      let lastT = performance.now();

      const handlePointerMove = (e) => {
        const now = performance.now();
        const dt = Math.max(now - lastT, 1);
        const vx = (e.clientX - lastX) / dt;
        const vy = (e.clientY - lastY) / dt;
        const speed = Math.min(Math.hypot(vx, vy), 8);

        state.tx = e.clientX / window.innerWidth - 0.5;
        state.ty = e.clientY / window.innerHeight - 0.5;
        state.tIntensity = Math.min(1, 0.45 + speed * 0.09);
        state.active = true;

        lastX = e.clientX;
        lastY = e.clientY;
        lastT = now;
      };

      const handlePointerEnter = () => {
        bgGlow.style.opacity = 1;
        bgGlow2.style.opacity = 1;
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerenter", handlePointerEnter, { passive: true });

      const render = (now) => {
        const wobbleX = Math.sin(now * 0.0008) * 0.06;
        const wobbleY = Math.cos(now * 0.0011) * 0.05;
        const idlePulse = 0.42 + 0.06 * Math.sin(now * 0.0007);

        const fx = (state.active ? state.tx : 0) + wobbleX;
        const fy = (state.active ? state.ty : 0) + wobbleY;
        state.tIntensity = state.active ? Math.max(idlePulse, state.tIntensity) : idlePulse;

        state.x += (fx - state.x) * 0.07;
        state.y += (fy - state.y) * 0.07;
        state.gx += (-fx - state.gx) * 0.04;
        state.gy += (-fy - state.gy) * 0.04;
        state.intensity += (state.tIntensity - state.intensity) * 0.05;

        const scale = 1 + state.intensity * 0.4;
        bgGlow.style.transform = `translate3d(${(state.x * MAX1).toFixed(3)}vw, ${(state.y * MAXY1).toFixed(3)}vh, 0) scale(${scale.toFixed(3)})`;
        bgGlow2.style.transform = `translate3d(${(state.gx * MAX2).toFixed(3)}vw, ${(state.gy * MAXY2).toFixed(3)}vh, 0) scale(${(2 - scale).toFixed(3)})`;
        bgGradient.style.transform = `translate3d(${(state.x * MAXG).toFixed(3)}vw, ${(state.y * MAXYG).toFixed(3)}vh, 0)`;
        bgGlow.style.opacity = state.intensity.toFixed(3);
        bgGlow2.style.opacity = (state.intensity * 0.9).toFixed(3);

        frameId = requestAnimationFrame(render);
      };

      frameId = requestAnimationFrame(render);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerenter", handlePointerEnter);
        cancelAnimationFrame(frameId);
      };
    }
  }, []);

  useEffect(() => {
    const floatCanvas = floatCanvasRef.current;
    if (!floatCanvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ctx = floatCanvas.getContext("2d");
    const COUNT = 50;
    let boxes = [];
    let dpr = 1;
    let W = 0;
    let H = 0;
    let resizeTimer;
    let frameId;

    const rand = (min, max) => min + Math.random() * (max - min);

    function makeBox() {
      return {
        x: rand(0, W),
        y: rand(0, H),
        size: rand(3, 8),
        speedY: rand(8, 30),
        speedX: rand(-14, 14),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.5, 1.6),
        alpha: rand(0.35, 0.55),
        color: Math.random() < 0.3 ? "96, 165, 250" : "167, 139, 250",
        rot: rand(0, Math.PI),
        rotSpeed: rand(-0.4, 0.4)
      };
    }

    function drawBox(b, near) {
      const strength = Math.min(b.alpha + near * 0.35, 0.9);
      const s = b.size;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.fillStyle = `rgba(${b.color}, ${strength.toFixed(3)})`;
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    }

    function drawStaticFrame() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      boxes.forEach((b) => drawBox(b, 0));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      floatCanvas.width = W * dpr;
      floatCanvas.height = H * dpr;
      floatCanvas.style.width = W + "px";
      floatCanvas.style.height = H + "px";
    }

    resize();
    boxes = Array.from({ length: COUNT }, makeBox);
    drawStaticFrame();

    const pointer = { x: -999, y: -999 };
    const handlePointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    if (!reduceMotion.matches) {
      let last = performance.now();

      window.addEventListener("pointermove", handlePointerMove, { passive: true });

      function render(now) {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        const t = now / 1000;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        for (const b of boxes) {
          b.y -= b.speedY * dt;
          b.x += (b.speedX + Math.sin(t * b.wobbleSpeed + b.wobble) * 12) * dt;
          b.rot += b.rotSpeed * dt;

          const dx = b.x - pointer.x;
          const dy = b.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0.01) {
            const force = (1 - dist / 110) * 70 * dt;
            b.x += (dx / dist) * force;
            b.y += (dy / dist) * force;
          }
          const near = Math.max(0, 1 - dist / 200);

          if (b.y < -30) {
            b.y = H + 30;
            b.x = rand(0, W);
          }
          if (b.x < -40) b.x = W + 40;
          else if (b.x > W + 40) b.x = -40;

          drawBox(b, near);
        }
        frameId = requestAnimationFrame(render);
      }
      frameId = requestAnimationFrame(render);
    }

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduceMotion.matches) drawStaticFrame();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={bgGradientRef} className="bg-gradient" aria-hidden="true" />
      <canvas ref={floatCanvasRef} id="bg-boxes" className="bg-boxes" aria-hidden="true" />
      <div ref={bgGlowRef} className="bg-glow" aria-hidden="true" />
      <div ref={bgGlow2Ref} className="bg-glow--2" aria-hidden="true" />
      <div className="bg-vignette" aria-hidden="true" />
    </>
  );
}
