import { useRef, useEffect, useState, useCallback, RefObject } from "react";

class Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  ease: number;
  life: number;
  originalSize: number;
  angle: number;
  pulse: number;
  glowIntensity: number;

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    speedX: number,
    speedY: number,
  ) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.ease = 0.03 + Math.random() * 0.07;
    this.life = 1;
    this.originalSize = size;
    this.angle = Math.random() * Math.PI * 2;
    this.pulse = Math.random() * 0.5 + 0.5;
    this.glowIntensity = Math.random() * 0.5 + 0.5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 2,
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.5, this.color + "80");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  update(time: number, animationSpeed: number, currentShape: string) {
    this.pulse = 0.8 + Math.sin(time * 0.05 + this.angle) * 0.3;

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    this.x += dx * this.ease * animationSpeed;
    this.y += dy * this.ease * animationSpeed;

    if (currentShape !== "explode" && currentShape !== "quantum") {
      this.x += (Math.random() - 0.5) * 0.3;
      this.y += (Math.random() - 0.5) * 0.3;
    } else if (currentShape === "explode") {
      this.x += this.speedX * animationSpeed;
      this.y += this.speedY * animationSpeed;
      this.life -= 0.008;
      this.size = Math.max(0, this.originalSize * this.life);
    } else if (currentShape === "quantum") {
      this.x += Math.sin(time * 0.1 + this.angle) * 2;
      this.y += Math.cos(time * 0.08 + this.angle) * 2;
    }
  }
}

const shapes = [
  "line",
  "circle",
  "spiral",
  "square",
  "grid",
  "sinewave",
  "figureeight",
  "verticalline",
  "explode",
  "heart",
  "star",
  "dna",
  "galaxy",
  "mandala",
  "flower",
  "infinity",
  "wave3d",
  "vortex",
  "constellation",
  "fractal",
  "quantum",
];

const shapeNames = [
  "Line",
  "Circle",
  "Spiral",
  "Square",
  "Grid",
  "Sine Wave",
  "Figure Eight",
  "Vertical Line",
  "Explosion",
  "Heart",
  "Star",
  "DNA Helix",
  "Galaxy",
  "Mandala",
  "Flower",
  "Infinity",
  "3D Wave",
  "Vortex",
  "Constellation",
  "Fractal",
  "Quantum Field",
];

const colorPalettes = [
  ["#FF00FF", "#FFFFFF", "#BF40BF", "#800080", "#FF69B4"],
  ["#00FFFF", "#008080", "#FFFFFF", "#AFEEEE", "#20B2AA"],
  ["#FF6B6B", "#FFE66D", "#4ECDC4", "#F7FFF7", "#95E1D3"],
  ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#EE82EE"],
  ["#FFD700", "#FFA500", "#FF4500", "#DC143C", "#B22222"],
  ["#E0E0E0", "#C0C0C0", "#A0A0A0", "#808080", "#FFFFFF"],
  ["#00FF7F", "#32CD32", "#90EE90", "#98FB98", "#F0FFF0"],
  ["#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FFFFFF"],
];

const speedLevels = [0.5, 1, 2, 3];
const speedNames = ["Slow", "Normal", "Fast", "Turbo"];

export const useParticleEngine = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [currentShape, setCurrentShape] = useState(0);
  const [currentColorPalette, setCurrentColorPalette] = useState(0);
  const [flowEnabled, setFlowEnabled] = useState(true);
  const [currentSpeedIndex, setCurrentSpeedIndex] = useState(1);

  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  const numParticles = 300;
  const animationSpeed = speedLevels[currentSpeedIndex];

  const applyShape = useCallback(
    (shapeIndex: number, particles: Particle[], canvas: HTMLCanvasElement) => {
      const shape = shapes[shapeIndex];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.forEach((particle, i) => {
        particle.life = 1;
        particle.size = particle.originalSize;

        switch (shape) {
          case "line":
            particle.targetX =
              canvas.width * 0.1 +
              (i / (numParticles - 1)) * (canvas.width * 0.8);
            particle.targetY = centerY;
            break;

          case "verticalline":
            particle.targetX = centerX;
            particle.targetY =
              canvas.height * 0.1 +
              (i / (numParticles - 1)) * (canvas.height * 0.8);
            break;

          case "circle":
            const radius = Math.min(canvas.width, canvas.height) * 0.35;
            const angle = (i / numParticles) * Math.PI * 2;
            particle.targetX = centerX + Math.cos(angle) * radius;
            particle.targetY = centerY + Math.sin(angle) * radius;
            break;

          case "spiral":
            const spiralRadius =
              (i / numParticles) * Math.min(centerX, centerY) * 0.8;
            const spiralAngle = i * 0.3;
            particle.targetX = centerX + Math.cos(spiralAngle) * spiralRadius;
            particle.targetY = centerY + Math.sin(spiralAngle) * spiralRadius;
            break;

          case "square":
            const sideLength = Math.min(canvas.width, canvas.height) * 0.6;
            const halfSide = sideLength / 2;
            const particlesPerSide = Math.floor(numParticles / 4);
            const segment = Math.floor(i / particlesPerSide);
            const posInSegment = i % particlesPerSide;
            const ratio = posInSegment / (particlesPerSide - 1);

            if (segment === 0) {
              particle.targetX = centerX - halfSide + ratio * sideLength;
              particle.targetY = centerY - halfSide;
            } else if (segment === 1) {
              particle.targetX = centerX + halfSide;
              particle.targetY = centerY - halfSide + ratio * sideLength;
            } else if (segment === 2) {
              particle.targetX = centerX + halfSide - ratio * sideLength;
              particle.targetY = centerY + halfSide;
            } else {
              particle.targetX = centerX - halfSide;
              particle.targetY = centerY + halfSide - ratio * sideLength;
            }
            break;

          case "grid":
            const cols = Math.floor(
              Math.sqrt(numParticles * (canvas.width / canvas.height)),
            );
            const rows = Math.ceil(numParticles / cols);
            const cellWidth = (canvas.width * 0.8) / cols;
            const cellHeight = (canvas.height * 0.8) / rows;
            const startX = canvas.width * 0.1;
            const startY = canvas.height * 0.1;
            const col = i % cols;
            const row = Math.floor(i / cols);

            if (row < rows) {
              particle.targetX = startX + col * cellWidth + cellWidth / 2;
              particle.targetY = startY + row * cellHeight + cellHeight / 2;
            } else {
              particle.targetX = centerX;
              particle.targetY = centerY;
            }
            break;

          case "sinewave":
            const amplitude = canvas.height * 0.2;
            const frequency = 3;
            const waveLength = canvas.width * 0.8;
            particle.targetX =
              canvas.width * 0.1 + (i / (numParticles - 1)) * waveLength;
            particle.targetY =
              centerY +
              Math.sin((i / numParticles) * Math.PI * 2 * frequency) *
                amplitude;
            break;

          case "figureeight":
            const scale = Math.min(canvas.width, canvas.height) * 0.3;
            const t = (i / numParticles) * Math.PI * 2;
            particle.targetX =
              centerX + (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
            particle.targetY =
              centerY +
              (scale * Math.sin(t) * Math.cos(t)) /
                (1 + Math.sin(t) * Math.sin(t));
            break;

          case "heart":
            const heartT = (i / numParticles) * Math.PI * 2;
            const heartScale = Math.min(canvas.width, canvas.height) * 0.02;
            particle.targetX =
              centerX + heartScale * 16 * Math.pow(Math.sin(heartT), 3);
            particle.targetY =
              centerY -
              heartScale *
                (13 * Math.cos(heartT) -
                  5 * Math.cos(2 * heartT) -
                  2 * Math.cos(3 * heartT) -
                  Math.cos(4 * heartT));
            break;

          case "star":
            const starAngle = (i / numParticles) * Math.PI * 2;
            const starRadius = Math.min(canvas.width, canvas.height) * 0.3;
            const starSpikes = 5;
            const outerRadius = starRadius;
            const innerRadius = starRadius * 0.4;
            const spikeAngle = Math.PI / starSpikes;
            const isOuter = Math.floor((starAngle / spikeAngle) % 2) === 0;
            const currentRadius = isOuter ? outerRadius : innerRadius;
            particle.targetX = centerX + Math.cos(starAngle) * currentRadius;
            particle.targetY = centerY + Math.sin(starAngle) * currentRadius;
            break;

          case "dna":
            const dnaT = (i / numParticles) * Math.PI * 8;
            const dnaRadius = Math.min(canvas.width, canvas.height) * 0.1;
            const dnaHeight = canvas.height * 0.6;
            const strand = i % 2;
            particle.targetX =
              centerX + Math.cos(dnaT + strand * Math.PI) * dnaRadius;
            particle.targetY =
              canvas.height * 0.2 + (i / numParticles) * dnaHeight;
            break;

          case "galaxy":
            const galaxyAngle = (i / numParticles) * Math.PI * 4;
            const galaxyRadius =
              (i / numParticles) * Math.min(canvas.width, canvas.height) * 0.4;
            particle.targetX = centerX + Math.cos(galaxyAngle) * galaxyRadius;
            particle.targetY =
              centerY + Math.sin(galaxyAngle) * galaxyRadius * 0.6;
            break;

          case "mandala":
            const mandalaLayers = 5;
            const layer = Math.floor((i / numParticles) * mandalaLayers);
            const mandalaRadius =
              ((layer + 1) / mandalaLayers) *
              Math.min(canvas.width, canvas.height) *
              0.35;
            const mandalaAngle = (i / numParticles) * Math.PI * 12;
            particle.targetX = centerX + Math.cos(mandalaAngle) * mandalaRadius;
            particle.targetY = centerY + Math.sin(mandalaAngle) * mandalaRadius;
            break;

          case "flower":
            const petalAngle = (i / numParticles) * Math.PI * 2;
            const petalRadius =
              Math.min(canvas.width, canvas.height) *
              0.2 *
              (1 + 0.5 * Math.sin(8 * petalAngle));
            particle.targetX = centerX + Math.cos(petalAngle) * petalRadius;
            particle.targetY = centerY + Math.sin(petalAngle) * petalRadius;
            break;

          case "infinity":
            const infT = (i / numParticles) * Math.PI * 4;
            const infScale = Math.min(canvas.width, canvas.height) * 0.2;
            particle.targetX =
              centerX +
              (infScale * Math.cos(infT)) /
                (1 + Math.sin(infT) * Math.sin(infT));
            particle.targetY =
              centerY +
              (infScale * Math.sin(infT) * Math.cos(infT)) /
                (1 + Math.sin(infT) * Math.sin(infT));
            break;

          case "wave3d":
            const wave3dX =
              (i / numParticles) * canvas.width * 0.8 + canvas.width * 0.1;
            const wave3dZ = Math.sin((i / numParticles) * Math.PI * 6) * 100;
            particle.targetX = wave3dX;
            particle.targetY =
              centerY +
              Math.sin((i / numParticles) * Math.PI * 4) * canvas.height * 0.2 +
              wave3dZ * 0.5;
            break;

          case "vortex":
            const vortexAngle = (i / numParticles) * Math.PI * 8;
            const vortexRadius =
              Math.pow(i / numParticles, 0.7) *
              Math.min(canvas.width, canvas.height) *
              0.4;
            particle.targetX = centerX + Math.cos(vortexAngle) * vortexRadius;
            particle.targetY = centerY + Math.sin(vortexAngle) * vortexRadius;
            break;

          case "constellation":
            const constellations = [
              { x: 0.2, y: 0.3 },
              { x: 0.4, y: 0.2 },
              { x: 0.6, y: 0.4 },
              { x: 0.8, y: 0.3 },
              { x: 0.3, y: 0.6 },
              { x: 0.5, y: 0.7 },
              { x: 0.7, y: 0.6 },
              { x: 0.2, y: 0.8 },
            ];
            const starGroup =
              constellations[
                Math.floor((i / numParticles) * constellations.length)
              ];
            const scatter = 30;
            particle.targetX =
              starGroup.x * canvas.width + (Math.random() - 0.5) * scatter;
            particle.targetY =
              starGroup.y * canvas.height + (Math.random() - 0.5) * scatter;
            break;

          case "fractal":
            const fractalDepth = 4;
            const fractalSize = Math.min(canvas.width, canvas.height) * 0.4;
            let fx = 0,
              fy = 0;
            let tempI = i;
            for (let d = 0; d < fractalDepth; d++) {
              const branch = tempI % 3;
              const branchSize = fractalSize / Math.pow(3, d);
              if (branch === 0) fx -= branchSize;
              else if (branch === 1) fx += branchSize;
              if (branch === 2) fy += branchSize;
              tempI = Math.floor(tempI / 3);
            }
            particle.targetX = centerX + fx;
            particle.targetY = centerY + fy;
            break;

          case "quantum":
            particle.targetX =
              centerX + (Math.random() - 0.5) * canvas.width * 0.6;
            particle.targetY =
              centerY + (Math.random() - 0.5) * canvas.height * 0.6;
            break;

          case "explode":
            particle.targetX = centerX;
            particle.targetY = centerY;
            particle.x = centerX;
            particle.y = centerY;
            const explodeAngle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 10 + 3;
            particle.speedX = Math.cos(explodeAngle) * speed;
            particle.speedY = Math.sin(explodeAngle) * speed;
            break;

          default:
            particle.targetX = Math.random() * canvas.width;
            particle.targetY = Math.random() * canvas.height;
        }

        if (shape !== "explode") {
          particle.speedX = 0;
          particle.speedY = 0;
        }
      });
    },
    [],
  );

  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.9;

    const currentColors = colorPalettes[currentColorPalette];
    const newParticles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 4 + 2;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color =
        currentColors[Math.floor(Math.random() * currentColors.length)];
      newParticles.push(new Particle(x, y, size, color, 0, 0));
    }

    particlesRef.current = newParticles;
    applyShape(currentShape, newParticles, canvas);
  }, [canvasRef, currentColorPalette, applyShape, currentShape]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    timeRef.current++;

    if (flowEnabled) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    let activeParticles = 0;
    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];
      particle.update(timeRef.current, animationSpeed, shapes[currentShape]);
      particle.draw(ctx);
      if (particle.life > 0 && particle.size > 0.1) {
        activeParticles++;
      }
    }

    if (shapes[currentShape] === "explode" && activeParticles === 0) {
      let nextShapeIndex = (currentShape + 1) % shapes.length;
      if (shapes[nextShapeIndex] === "explode") {
        nextShapeIndex = (nextShapeIndex + 1) % shapes.length;
      }
      setCurrentShape(nextShapeIndex);
    }

    // eslint-disable-next-line react-hooks/immutability
    animationIdRef.current = requestAnimationFrame(animate);
  }, [canvasRef, flowEnabled, currentShape, animationSpeed]);

  useEffect(() => {
    initializeParticles();
  }, [initializeParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !particlesRef.current.length) return;

    applyShape(currentShape, particlesRef.current, canvas);
  }, [currentShape, applyShape, canvasRef]);

  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [animate]);

  const nextShape = useCallback(() => {
    setCurrentShape((prev) => (prev + 1) % shapes.length);
  }, []);

  const changeColors = useCallback(() => {
    setCurrentColorPalette((prev) => {
      const newPalette = (prev + 1) % colorPalettes.length;
      const currentColors = colorPalettes[newPalette];
      particlesRef.current.forEach((p) => {
        p.color =
          currentColors[Math.floor(Math.random() * currentColors.length)];
      });
      return newPalette;
    });
  }, []);

  const toggleFlow = useCallback(() => {
    setFlowEnabled((prev) => !prev);
  }, []);

  const randomize = useCallback(() => {
    setCurrentShape(Math.floor(Math.random() * shapes.length));
    setCurrentColorPalette(() => {
      const newPalette = Math.floor(Math.random() * colorPalettes.length);
      const currentColors = colorPalettes[newPalette];
      particlesRef.current.forEach((p) => {
        p.color =
          currentColors[Math.floor(Math.random() * currentColors.length)];
      });
      return newPalette;
    });
  }, []);

  const changeSpeed = useCallback(() => {
    setCurrentSpeedIndex((prev) => (prev + 1) % speedLevels.length);
  }, []);

  const setShape = useCallback((shapeIndex: number) => {
    setCurrentShape(shapeIndex);
  }, []);

  return {
    currentShape,
    currentShapeName: shapeNames[currentShape],
    flowEnabled,
    animationSpeed,
    speedName: speedNames[currentSpeedIndex],
    nextShape,
    changeColors,
    toggleFlow,
    randomize,
    changeSpeed,
    setShape,
    initializeParticles,
  };
};
