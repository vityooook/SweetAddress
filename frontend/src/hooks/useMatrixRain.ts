import { useEffect, useRef } from "react";

export const useMatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    updateCanvasSize();

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const fontSize = 10;
    let columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, .1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = "#FAA5D1";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      updateCanvasSize();
      columns = Math.floor(canvas.width / fontSize);
      drops.length = columns;
      for (let i = 0; i < columns; i++) {
        drops[i] = drops[i] || 1;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { canvasRef };
};
