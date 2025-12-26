import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col">
      <header className="w-full border-b border-border/40 bg-background/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-primary" />
            <span className="font-semibold text-lg tracking-tight text-foreground">Academy Dashboard</span>
          </div>
          <Button size="sm" variant="default" onClick={() => navigate("/auth")}>
            Admin Login
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-primary/20 bg-background/60 px-3 py-1 text-xs font-medium text-primary shadow-sm mb-4">
              Modern admin panel for schools
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Welcome to <span className="text-primary">Academy</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl">
              Manage classes, events, achievements, and campus information in one place. Built for principals, coordinators, and staff.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button size="lg" onClick={() => navigate("/auth")}>Go to Admin Login</Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
                View Dashboard Demo
              </Button>
            </div>
            <dl className="grid grid-cols-2 gap-4 max-w-md text-left">
              <div className="rounded-xl bg-background/70 border border-border/50 p-4 shadow-sm">
                <dt className="text-xs font-medium text-muted-foreground mb-1">For school leaders</dt>
                <dd className="text-sm font-semibold text-foreground">Admin & staff roles</dd>
              </div>
              <div className="rounded-xl bg-background/70 border border-border/50 p-4 shadow-sm">
                <dt className="text-xs font-medium text-muted-foreground mb-1">Academy overview</dt>
                <dd className="text-sm font-semibold text-foreground">Classes, events, map & more</dd>
              </div>
            </dl>
          </div>

          <aside className="relative">
            <div className="rounded-2xl border border-primary/20 bg-background/80 shadow-lg shadow-primary/20 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Dashboard preview</span>
                <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
              </div>
              <div className="space-y-3 text-left text-xs">
                <div className="flex justify-between items-center rounded-lg bg-muted/60 px-3 py-2">
                  <span className="font-medium text-foreground">Ongoing Classes</span>
                  <span className="text-[10px] text-muted-foreground">Today</span>
                </div>
                <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
                  <span className="mt-1 h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-semibold text-primary">
                    8A
                  </span>
                  <div>
                    <p className="text-xs font-medium text-foreground">Math – Algebra Basics</p>
                    <p className="text-[11px] text-muted-foreground">09:00 – 09:45 • Ms. Sharma</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
                  <span className="mt-1 h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-semibold text-primary">
                    10B
                  </span>
                  <div>
                    <p className="text-xs font-medium text-foreground">Science – Lab Session</p>
                    <p className="text-[11px] text-muted-foreground">11:15 – 12:00 • Mr. Kumar</p>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">
                    Plus achievements, upcoming events, contact details, and campus map – all editable from the admin panel.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="border-t border-border/40 bg-background/60">
          <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-left text-sm">
            <article>
              <h2 className="font-semibold text-foreground mb-2">Academy at a glance</h2>
              <p className="text-muted-foreground">
                Centralize academic, co-curricular, and campus information so that your team always knows what&apos;s happening.
              </p>
            </article>
            <article>
              <h2 className="font-semibold text-foreground mb-2">For principals & coordinators</h2>
              <p className="text-muted-foreground">
                Use the dashboard during meetings, open houses, and inspections to present a clear picture of school activity.
              </p>
            </article>
            <article>
              <h2 className="font-semibold text-foreground mb-2">Secure staff access</h2>
              <p className="text-muted-foreground">
                Give teachers read-only access so they can stay informed without changing official records.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Academy Dashboard. All rights reserved.</span>
          <span>Admin access only • Internal academy tool</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
