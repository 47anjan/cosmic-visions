import React from "react";

interface ControlsProps {
  onNextShape: () => void;
  onChangeColors: () => void;
  onToggleFlow: () => void;
  onRandomize: () => void;
  onChangeSpeed: () => void;
  flowEnabled: boolean;
  speedName: string;
}

const Controls: React.FC<ControlsProps> = ({
  onNextShape,
  onChangeColors,
  onToggleFlow,
  onRandomize,
  onChangeSpeed,
  flowEnabled,
  speedName,
}) => {
  return (
    <div className="fixed bottom-2 left-3 right-3 sm:left-2 sm:right-2 z-10 flex flex-wrap justify-center gap-2 p-2 max-w-full rounded-[10px] bg-linear-to-b from-[rgba(30,30,30,0.9)] to-[rgba(50,50,50,0.8)] backdrop-blur-[10px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-fit mx-auto ">
      <button
        onClick={onNextShape}
        className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg text-white cursor-pointer border-none relative overflow-hidden transition-all duration-300  active:translate-y-0 font-['Orbitron',monospace] bg-linear-to-r from-[#667eea] to-[#764ba2] shadow-[0_10px_25px_rgba(102,126,234,0.4)] hover:shadow-[0_12px_30px_rgba(102,126,234,0.5)]"
      >
        Next Shape
      </button>

      <button
        onClick={onChangeColors}
        className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg text-white cursor-pointer border-none relative overflow-hidden transition-all duration-300  active:translate-y-0 font-['Orbitron',monospace] bg-linear-to-r from-[#667eea] to-[#764ba2] shadow-[0_10px_25px_rgba(102,126,234,0.4)] hover:shadow-[0_12px_30px_rgba(102,126,234,0.5)]"
      >
        Change Colors
      </button>

      <button
        onClick={onToggleFlow}
        className={`px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg text-white cursor-pointer border-none relative overflow-hidden transition-all duration-300  active:translate-y-0 font-['Orbitron',monospace] bg-linear-to-r ${flowEnabled ? "from-[#4CAF50] to-[#45a049] shadow-[0_10px_25px_rgba(76,175,80,0.4)] hover:shadow-[0_12px_30px_rgba(76,175,80,0.5)]" : "from-[#f44336] to-[#d32f2f] shadow-[0_10px_25px_rgba(244,67,54,0.4)] hover:shadow-[0_12px_30px_rgba(244,67,54,0.5)]"}`}
      >
        Flow: {flowEnabled ? "ON" : "OFF"}
      </button>

      <button
        onClick={onRandomize}
        className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg text-white cursor-pointer border-none relative overflow-hidden transition-all duration-300  active:translate-y-0 font-['Orbitron',monospace] bg-linear-to-r from-[#667eea] to-[#764ba2] shadow-[0_10px_25px_rgba(102,126,234,0.4)] hover:shadow-[0_12px_30px_rgba(102,126,234,0.5)]"
      >
        Randomize
      </button>

      <button
        onClick={onChangeSpeed}
        className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg text-white cursor-pointer border-none relative overflow-hidden transition-all duration-300  active:translate-y-0 font-['Orbitron',monospace] bg-linear-to-r from-[#667eea] to-[#764ba2] shadow-[0_10px_25px_rgba(102,126,234,0.4)] hover:shadow-[0_12px_30px_rgba(102,126,234,0.5)]"
      >
        Speed: {speedName}
      </button>
    </div>
  );
};

export default Controls;
