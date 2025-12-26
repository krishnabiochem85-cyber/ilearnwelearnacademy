import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";

// This page gives a public overview of classes. The detailed list in the
// admin dashboard remains separate and fully editable only by admins.

const Classes = () => {
  useEffect(() => {
    document.title = "Classes | Akanksha Academy";
  }, []);

  // Example structure of ongoing classes for illustration. In the future we
  // can hydrate this from the backend if needed.
  const sampleClasses: Pick<
    Tables<"ongoing_classes">,
    "title" | "level" | "instructor" | "schedule" | "description"
  >[] = [
    {
      title: "Foundation Science Batch",
      level: "XI",
      instructor: "Senior Faculty Team",
      schedule: "Mon, Wed, Fri — 4:30 pm to 7:00 pm",
      description:
        "Strong focus on Physics, Chemistry and Mathematics fundamentals with regular problem-solving.",
    },
    {
      title: "Commerce with Accounts Excellence",
      level: "XI / XII",
      instructor: "Accounts & Economics Faculty",
      schedule: "Tue, Thu, Sat — 4:30 pm to 7:00 pm",
      description:
        "Comprehensive coverage of Accountancy, Economics and Business Studies for board and competitive exams.",
    },
    {
      title: "Arts – Humanities Enrichment",
      level: "XI / XII",
      instructor: "Social Sciences Team",
      schedule: "Weekend batches",
      description:
        "Focus on History, Political Science, Sociology and Psychology with discussions and projects.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/50 bg-gradient-to-b from-background via-background to-background/80">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
            Classes
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Structured batches across Science, Commerce and Arts.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            We group students into carefully designed batches so that teaching pace, practice
            level and exam strategy are aligned with their goals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {sampleClasses.map((item) => (
            <article
              key={item.title}
              className="flex flex-col justify-between rounded-xl border border-border/60 bg-card/80 p-5 text-sm shadow-sm transition hover:border-primary/60 hover:shadow-md"
            >
              <div className="space-y-3">
                <header>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                  {item.level && (
                    <p className="mt-1 text-xs font-medium text-primary/70">Class {item.level}</p>
                  )}
                </header>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
                {item.instructor && (
                  <div className="flex gap-1">
                    <dt className="font-medium text-foreground/80">Faculty:</dt>
                    <dd>{item.instructor}</dd>
                  </div>
                )}
                {item.schedule && (
                  <div className="flex gap-1">
                    <dt className="font-medium text-foreground/80">Schedule:</dt>
                    <dd>{item.schedule}</dd>
                  </div>
                )}
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-dashed border-border/70 bg-muted/30 px-4 py-5 text-xs text-muted-foreground md:px-6 md:py-6">
          <p>
            For the latest batch timings and availability, please contact the academy office.
            The detailed real-time list of ongoing classes is maintained separately in our
            internal system.
          </p>
          <p className="mt-3">
            <Link
              to="/contact"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Go to Contact page
            </Link>{" "}
            for phone numbers and enquiry form.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Classes;
