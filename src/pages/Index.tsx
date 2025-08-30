import { RoastTimer } from "@/components/RoastTimer";
import { TaskList } from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroBanner from "@/assets/hero-banner.jpg";

const MOTIVATIONAL_ROASTS = [
  "Stop scrolling and start studying, you absolute disappointment.",
  "Your future self is already disappointed in present you.",
  "Every minute you waste is brain cells you'll never get back.",
  "Your GPA called. It's filing a restraining order.",
  "Netflix doesn't love you back. Books might.",
];

const Index = () => {
  const getRandomRoast = () => {
    return MOTIVATIONAL_ROASTS[Math.floor(Math.random() * MOTIVATIONAL_ROASTS.length)];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 glitch text-gradient-primary"
            data-text="ROASTIFY"
          >
            ROASTIFY
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 font-mono">
            The motivation app that <span className="text-roast-brutal font-bold">bullies</span> you into productivity
          </p>
          <div className="bg-roast-brutal/20 border border-roast-brutal/50 rounded-lg p-6 mb-8 backdrop-blur-sm">
            <p className="text-lg font-bold text-roast-brutal italic">
              "{getRandomRoast()}"
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8">
              Start Getting Roasted
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              I'm Too Weak For This
            </Button>
          </div>
        </div>
      </section>

      {/* Main App Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              Time to Face Reality
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No more excuses, no more "I'll start tomorrow." Your productivity journey starts with some harsh truths.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <RoastTimer />
            </div>
            <div className="space-y-6">
              <TaskList />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gradient-primary mb-12">
            How We'll Destroy Your Excuses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur-sm text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-primary mb-3">Brutal Timers</h3>
              <p className="text-muted-foreground">
                Pomodoro technique with aggressive coaching. Every break is an opportunity for mockery.
              </p>
            </Card>
            <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur-sm text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-primary mb-3">Toxic Task Tracking</h3>
              <p className="text-muted-foreground">
                Add tasks and get roasted for procrastinating. Complete them and get barely acknowledged.
              </p>
            </Card>
            <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur-sm text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-primary mb-3">Backhanded Achievements</h3>
              <p className="text-muted-foreground">
                Unlock badges that insult your past while grudgingly acknowledging your present.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Made with 💀 and zero sympathy for procrastinators
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Roastify © 2024 - Motivating through calculated cruelty
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;