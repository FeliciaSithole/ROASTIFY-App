import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";

const ROASTS = {
  start: [
    "Finally decided to do something productive? Shocking.",
    "Oh look, someone's pretending to be studious.",
    "Let's see how long this motivation lasts... my bet is 5 minutes.",
  ],
  break: [
    "Already giving up? Typical.",
    "That was pathetic. Even a goldfish has better focus.",
    "Break time already? Your attention span is shorter than a TikTok video.",
  ],
  back: [
    "Back for more punishment? Brave... or stupid.",
    "Round 2? Let's see if you can last longer than last time.",
    "Welcome back, quitter. Try not to disappoint this time.",
  ]
};

export function RoastTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [roast, setRoast] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (isActive && minutes === 0 && seconds === 0) {
      // Timer finished
      setIsActive(false);
      setIsBreak(!isBreak);
      setMinutes(isBreak ? 25 : 5);
      setRoast(getRandomRoast(isBreak ? "back" : "break"));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak]);

  const getRandomRoast = (type: keyof typeof ROASTS) => {
    const roasts = ROASTS[type];
    return roasts[Math.floor(Math.random() * roasts.length)];
  };

  const startTimer = () => {
    setIsActive(true);
    if (!roast) {
      setRoast(getRandomRoast("start"));
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setRoast("");
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-8 border-primary/30 bg-card/50 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gradient-primary">
            {isBreak ? "Break Time" : "Focus Time"}
          </h2>
          <div className="text-6xl font-mono font-bold text-primary neon-glow">
            {formatTime(minutes, seconds)}
          </div>
        </div>

        {roast && (
          <div className="p-4 rounded-lg bg-roast-brutal/20 border border-roast-brutal/50">
            <p className="text-roast-brutal font-bold text-center italic">
              "{roast}"
            </p>
          </div>
        )}

        <div className="flex justify-center gap-4">
          {!isActive ? (
            <Button variant="hero" onClick={startTimer} className="gap-2">
              <Play className="w-4 h-4" />
              Start Grinding
            </Button>
          ) : (
            <Button variant="outline" onClick={pauseTimer} className="gap-2">
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          )}
          
          <Button variant="secondary" onClick={resetTimer} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}