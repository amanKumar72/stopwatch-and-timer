import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <section
      className="
        glass-card
        rounded-[40px]
        px-6 py-4 md:px-12 md:py-8
      "
    >
      <div className="flex flex-col items-center">
        <p className="uppercase tracking-[0.35em] text-xs text-[var(--text-soft)] mb-8">
          Stopwatch
        </p>

        <div
          className="
            h-64 w-64
            rounded-full
            border border-white/5
            glass-card
            flex items-center justify-center
            relative
            mb-6 md:mb-12
          "
        >
          <div
            className="
              absolute inset-4 rounded-full
              border border-white/5
            "
          />

          <div className="text-center">
            <h2
              className="
                text-3xl md:text-5xl
                font-extralight
                time-text
                text-[var(--text)]
              "
            >
              {formatTime(time)}
            </h2>

            <p className="mt-4 text-sm text-[var(--text-soft)] tracking-[0.25em] uppercase">
              Elapsed Time
            </p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="
                h-11 md:h-14 px-6 py-2 rounded-2xl
                bg-[var(--primary)]
                hover:bg-[var(--primary-hover)]
                text-white
                flex items-center gap-3
                transition-all duration-300
                hover:scale-105
              "
            >
              <Play size={18} />
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="
                h-11 md:h-14 px-6 py-2 rounded-2xl
                bg-[var(--secondary)]
                hover:bg-[var(--secondary-hover)]
                text-white
                flex items-center gap-3
                transition-all duration-300
                hover:scale-105
              "
            >
              <Pause size={18} />
              Pause
            </button>
          )}

          <button
            onClick={handleReset}
            className="
              h-11 md:h-14 px-8 rounded-2xl
              glass-card
              text-[var(--text)]
              flex items-center gap-3
              transition-all duration-300
              hover:scale-105
            "
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}