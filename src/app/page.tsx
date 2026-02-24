import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Video, BarChart3, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      title: "Practice Problems",
      description: "Master data structures and algorithms with our curated problem set.",
      icon: <Code className="h-8 w-8 text-primary" />,
    },
    {
      title: "Mock Interviews",
      description: "Simulate real interview scenarios with AI-driven feedback sessions.",
      icon: <Video className="h-8 w-8 text-primary" />,
    },
    {
      title: "Track Progress",
      description: "Visualize your growth with detailed performance analytics.",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">P</div>
          <span className="text-xl font-bold tracking-tight text-foreground">Placement Prep</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Ace Your <span className="text-primary">Placement</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20" asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-20 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Built for Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <Card key={idx} className="border-none shadow-md hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-8 space-y-4">
                    <div className="p-3 bg-primary/10 rounded-2xl w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t text-center bg-white">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Placement Prep. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
