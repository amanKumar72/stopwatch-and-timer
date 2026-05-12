import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const DEFAULT_TIME = 5 * 60;

export default function Timer() {
  const [minutes, setMinutes] = useState<number>(5);

  const [secondsLeft, setSecondsLeft] =
    useState<number>(DEFAULT_TIME);

  const [initialSeconds, setInitialSeconds] =
    useState<number>(DEFAULT_TIME);

  const [isRunning, setIsRunning] = useState(false);

  const [customMinutes, setCustomMinutes] = useState("");
  const [customSeconds, setCustomSeconds] = useState("");

  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);

          setIsRunning(false);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  const progress =
    initialSeconds > 0
      ? secondsLeft / initialSeconds
      : 0;

  const radius = 120;

  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference * (1 - progress);

  const handlePreset = (value: number) => {
    const total = value * 60;

    setMinutes(value);

    setSecondsLeft(total);

    setInitialSeconds(total);

    setIsRunning(false);
  };

  const handleCustomTime = () => {
    const mins = Number(customMinutes) || 0;

    const secs = Number(customSeconds) || 0;

    const total = mins * 60 + secs;

    if (total <= 0) return;

    setMinutes(mins);

    setSecondsLeft(total);

    setInitialSeconds(total);

    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);

    setSecondsLeft(initialSeconds);

    setIsRunning(false);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);

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
        <p
          className="
            uppercase
            tracking-[0.35em]
            text-xs
            text-(--text-soft)
            mb-4
          "
        >
          Countdown
        </p>

        <div className="relative">
          <svg
            width="280"
            height="280"
            className="-rotate-90"
          >
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="14"
              fill="transparent"
            />

            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="var(--primary)"
              strokeWidth="14"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transition:
                  "stroke-dashoffset 1s linear",
                filter:
                  "drop-shadow(0 0 10px rgba(227,139,91,0.4))",
              }}
            />
          </svg>

          <div
            className="
              absolute inset-0
              flex items-center justify-center
            "
          >
            <div className="text-center">
              <h2
                className="
                  text-3xl md:text-5xl
                  font-extralight
                  time-text
                  text-(--text)
                "
              >
                {formatTime(secondsLeft)}
              </h2>

              <p
                className="
                  mt-4
                  text-sm
                  text-(--text-soft)
                  uppercase
                  tracking-[0.25em]
                "
              >
                Remaining
              </p>
            </div>
          </div>
        </div>

        {!isRunning && (
          <div className="w-full max-w-md mb-5 md:mb-10">
            <div className="flex gap-3 justify-center my-6">
              {[5, 15, 25, 45].map((value) => (
                <button
                  key={value}
                  onClick={() =>
                    handlePreset(value)
                  }
                  className={`
                    h-12 w-12 rounded-2xl
                    transition-all duration-300
                    ${
                      minutes === value
                        ? "bg-(--primary) text-white soft-ring"
                        : "glass-card text-(--text)"
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>

            <div
              className="
                glass-card
                rounded-[28px]
                p-4 md:p-6
              "
            >
              <p
                className="
                  text-xs uppercase
                  tracking-[0.3em]
                  text-(--text-soft)
                  mb-3 md:mb-5
                "
              >
                Custom Time
              </p>

              <div
                className="
                  flex items-center
                  justify-center
                  gap-2 md:gap-4
                "
              >
                <div
                  className="
                    flex flex-col items-center
                  "
                >
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={customMinutes}
                    onChange={(e) =>
                      setCustomMinutes(
                        e.target.value
                      )
                    }
                    placeholder="00"
                    className="
                      h-16 w-16
                      md:h-24 md:w-24
                      rounded-2xl
                      bg-(--surface-strong)
                      border border-white/5
                      text-center
                      text-3xl
                      font-extralight
                      text-(--text)
                      outline-none
                    "
                  />

                  <span
                    className="
                      mt-3
                      text-xs
                      uppercase
                      tracking-[0.25em]
                      text-(--text-soft)
                    "
                  >
                    Minutes
                  </span>
                </div>

                <span
                  className="
                    text-4xl
                    font-extralight
                    text-[var(--text-soft)]
                    -mt-6
                  "
                >
                  :
                </span>

                <div
                  className="
                    flex flex-col items-center
                  "
                >
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={customSeconds}
                    onChange={(e) =>
                      setCustomSeconds(
                        e.target.value
                      )
                    }
                    placeholder="00"
                    className="
                      h-16 w-16
                      md:h-24 md:w-24
                      rounded-2xl
                      bg-(--surface-strong)
                      border border-white/5
                      text-center
                      text-3xl
                      font-extralight
                      text-(--text)
                      outline-none
                    "
                  />

                  <span
                    className="
                      mt-3
                      text-xs
                      uppercase
                      tracking-[0.25em]
                      text-(--text-soft)
                    "
                  >
                    Seconds
                  </span>
                </div>
              </div>

              <button
                onClick={handleCustomTime}
                className="
                  mt-6
                  w-full h-11 md:h-14
                  rounded-2xl
                  bg-(--secondary)
                  hover:bg-(--secondary-hover)
                  text-white
                  transition-all duration-300
                  hover:scale-[1.02]
                "
              >
                Apply Custom Time
              </button>
            </div>
          </div>
        )}

        <div
          className="
            flex gap-4
            flex-wrap
            justify-center
          "
        >
          {!isRunning ? (
            <button
              onClick={() =>
                setIsRunning(true)
              }
              disabled={secondsLeft <= 0}
              className="
                h-11 md:h-14
                px-8
                rounded-2xl
                bg-(--primary)
                hover:bg-(--primary-hover)
                disabled:opacity-50
                disabled:cursor-not-allowed
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
                h-11 md:h-14
                px-8
                rounded-2xl
                bg-(--secondary)
                hover:bg-(--secondary-hover)
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
              h-11 md:h-14
              px-8
              rounded-2xl
              glass-card
              text-(--text)
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