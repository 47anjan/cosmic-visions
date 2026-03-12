"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useParticleEngine } from "../hooks/useParticleEngine";
import Controls from "./Controls";
import ShapeGrid from "./ShapeGrid";

const ParticleVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showShapeGrid, setShowShapeGrid] = useState(false);

  const {
    currentShape,
    currentShapeName,
    flowEnabled,
    speedName,
    nextShape,
    changeColors,
    toggleFlow,
    randomize,
    changeSpeed,
    setShape,
    initializeParticles,
  } = useParticleEngine(canvasRef as React.RefObject<HTMLCanvasElement>);

  const toggleShapeGrid = useCallback(() => {
    setShowShapeGrid((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        // Auto-cycle functionality can be added here if needed
      }
    };

    const handleResize = () => {
      initializeParticles();
    };

    document.addEventListener("keydown", handleKeyPress);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
    };
  }, [initializeParticles]);

  return (
    <div className="particle-visualizer">
      <div className="absolute top-5 left-5 text-sm sm:text-[16px] font-bold z-10 text-gray-200">
        Shape: <span id="currentShape">{currentShapeName}</span>
      </div>

      <button
        className="px-2.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg text-white cursor-pointer border-none  overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 font-['Orbitron',monospace] bg-linear-to-r from-[#667eea] to-[#764ba2] shadow-[0_10px_25px_rgba(102,126,234,0.4)] hover:shadow-[0_12px_30px_rgba(102,126,234,0.5)] absolute top-5 right-5 z-30"
        onClick={toggleShapeGrid}
      >
        {showShapeGrid ? "Hide Menu" : "Shape Menu"}
      </button>

      <ShapeGrid
        show={showShapeGrid}
        currentShape={currentShape}
        onShapeSelect={setShape}
      />

      <canvas ref={canvasRef} id="particleCanvas" className="particle-canvas" />

      <Controls
        onNextShape={nextShape}
        onChangeColors={changeColors}
        onToggleFlow={toggleFlow}
        onRandomize={randomize}
        onChangeSpeed={changeSpeed}
        flowEnabled={flowEnabled}
        speedName={speedName}
      />
    </div>
  );
};

export default ParticleVisualizer;
