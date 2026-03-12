import React, { useState } from "react";

interface ShapeGridProps {
  show: boolean;
  currentShape: number;
  onShapeSelect: (shapeIndex: number) => void;
}

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

const ShapeGrid: React.FC<ShapeGridProps> = ({
  show,
  currentShape,
  onShapeSelect,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!show) return null;

  return (
    <>
      {/* Sidebar Container */}
      <div
        className="
          fixed left-6 top-6 bottom-6
          w-72 max-w-[calc(100vw-3rem)]
          z-20
          animate-slide-in-left
        "
        role="region"
        aria-label="Shape Library Sidebar"
      >
        {/* Glass Container */}
        <div
          className="
            h-full
            rounded-2xl
            bg-linear-to-br from-slate-950 via-slate-900 to-slate-950
            border border-slate-700/40
            shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
            flex flex-col
            overflow-hidden
            backdrop-blur-xl
          "
        >
          {/* Header Section */}
          <div
            className="
              sm:p-4
              p-3.5
              border-b border-slate-700/20
              shrink-0
            "
          >
            <p className="text-xs text-slate-400 mt-1">
              {shapeNames.length} items
            </p>
          </div>

          {/* Grid Content - Scrollable */}
          <div
            className="
              flex-1 overflow-y-auto
              px-3 py-4
            "
          >
            <div
              className="
                flex flex-col gap-2
              "
            >
              {shapeNames.map((name, index) => {
                const isActive = index === currentShape;
                const isHovered = hoveredIndex === index;

                return (
                  <button
                    key={index}
                    onClick={() => onShapeSelect(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    className={`
                      relative
                      py-1.5
                      px-2.5
                      sm:px-3 sm:py-2
                      text-xs
                      sm:text-sm font-medium
                      rounded-lg
                      transition-all duration-200 ease-out
                      border
                      outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-cyan-400
                      cursor-pointer
                      overflow-hidden
                      group
                      text-left
                      ${
                        isActive
                          ? `
                            bg-linear-to-r from-[#667eea] to-[#764ba2]
                            text-white
                            border-cyan-400/40
                            shadow-lg shadow-cyan-500/30
                          `
                          : `
                            bg-slate-800/40 border-slate-700/30
                            text-slate-300
                            hover:bg-slate-800/60
                            hover:border-slate-600/40
                            ${isHovered ? "translate-x-1" : ""}
                          `
                      }
                    `}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Select ${name} shape`}
                  >
                    {/* Animated Background Shine Effect (Active Only) */}
                    {isActive && (
                      <div
                        className="
                          absolute inset-0 -top-full
                          h-full w-full
                          bg-linear-to-b from-white/20 to-transparent
                          group-hover:top-0
                          transition-all duration-500
                          pointer-events-none
                        "
                      />
                    )}

                    {/* Text Content */}
                    <span className="relative z-10 block">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Info */}
          <div
            className="
              px-4 py-3
              border-t border-slate-700/20
              bg-linear-to-r from-slate-900/50 to-slate-900/30
              text-xs text-slate-500
              shrink-0
            "
          >
            {currentShape !== null && (
              <div className="truncate">
                <span className="text-slate-300 font-medium text-xs">
                  {shapeNames[currentShape]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-2rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Smooth scrollbar styling */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: transparent;
        }

        div::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
      `}</style>
    </>
  );
};

export default ShapeGrid;
