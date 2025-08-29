import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TASK_ROASTS = {
  add: [
    "Another task to procrastinate on? Bold strategy.",
    "Oh look, more things you'll ignore until the last minute.",
    "Adding tasks but will you actually DO them? Doubtful.",
  ],
  complete: [
    "Finally! One down, infinity to go.",
    "Wow, you actually finished something. Marked in history.",
    "Don't get cocky, it was probably the easiest one.",
  ],
  incomplete: [
    "Back to being a quitter, I see.",
    "Can't even finish what you started? Classic.",
    "Giving up already? Color me shocked.",
  ]
};

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [roast, setRoast] = useState("");

  const getRandomRoast = (type: keyof typeof TASK_ROASTS) => {
    const roasts = TASK_ROASTS[type];
    return roasts[Math.floor(Math.random() * roasts.length)];
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask.trim(), 
        completed: false 
      }]);
      setNewTask("");
      setRoast(getRandomRoast("add"));
      setTimeout(() => setRoast(""), 3000);
    }
  };

  const toggleTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTasks(tasks.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
      setRoast(getRandomRoast(!task.completed ? "complete" : "incomplete"));
      setTimeout(() => setRoast(""), 3000);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gradient-primary mb-2">
            Your Pathetic To-Do List
          </h2>
          <p className="text-muted-foreground">
            {totalCount === 0 
              ? "Empty list? Even your procrastination is procrastinating." 
              : `${completedCount}/${totalCount} tasks done. ${completedCount === 0 ? 'Disappointing.' : completedCount === totalCount ? 'Finally showing some backbone!' : 'Could be worse...'}`
            }
          </p>
        </div>

        {roast && (
          <div className="p-3 rounded-lg bg-roast-spicy/20 border border-roast-spicy/50 text-center">
            <p className="text-roast-spicy font-bold italic">"{roast}"</p>
          </div>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="What are you gonna ignore today?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1"
          />
          <Button variant="hero" onClick={addTask} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                task.completed 
                  ? "bg-accent/20 border-accent/50 text-muted-foreground" 
                  : "bg-secondary/50 border-secondary hover:border-primary/50"
              }`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>
                {task.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No tasks yet. Start adding some work to avoid!</p>
          </div>
        )}
      </div>
    </Card>
  );
}