import { useState } from "react";
import { Clock3, Timer as TimerIcon, Moon, Sun } from "lucide-react";

import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";

export default function App() {
  const [activeTab, setActiveTab] = useState("stopwatch");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="min-h-screen bg-(--bg) flex justify-center px-4 py-6 md:py-10 md:px-6">
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="uppercase tracking-[0.35em] text-lg text-(--text-soft) mb-3">
                Precision Time
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                h-12 w-12 rounded-full
                glass-card
                bg-(--surface)
                flex items-center justify-center
                text-(--text)
                transition-all duration-300
                hover:scale-105
              "
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div
            className="
              glass-card
              rounded-[36px]
              p-3
              inline-flex
              gap-3
              mb-4
            "
          >
            <button
              onClick={() => setActiveTab("stopwatch")}
              className={`
                flex items-center gap-2
                px-4 py-2 rounded-[24px]
                transition-all duration-300
                ${
                  activeTab === "stopwatch"
                    ? "bg-(--primary) text-white soft-ring"
                    : "text-(--text-soft) hover:bg-white/5"
                }
              `}
            >
              <Clock3 size={18} />
              Stopwatch
            </button>

            <button
              onClick={() => setActiveTab("timer")}
              className={`
                flex items-center gap-3
                px-4 py-2 rounded-[24px]
                transition-all duration-300
                ${
                  activeTab === "timer"
                    ? "bg-(--primary) text-white soft-ring"
                    : "text-(--text-soft) hover:bg-white/5"
                }
              `}
            >
              <TimerIcon size={18} />
              Timer
            </button>
          </div>

          {activeTab === "stopwatch" ? <Stopwatch /> : <Timer />}
        </div>
      </main>
    </div>
  );
}