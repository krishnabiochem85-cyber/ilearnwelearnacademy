import { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    document.title = "About | Akanksha Academy";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-background to-background/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="max-w-xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
              About the Academy
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Nurturing excellence in science, commerce & arts.
            </h1>
            <p className="text-balance text-sm text-muted-foreground md:text-base">
              Akanksha Academy is a higher secondary institution dedicated to building strong
              academic foundations, shaping character, and preparing students for competitive
              exams and life beyond the classroom.
            </p>
          </div>
          <div className="grid w-full max-w-md grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Streams</p>
              <p className="mt-1 text-lg font-semibold">Science, Commerce, Arts</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Flexible subject combinations tailored to each student&apos;s goals.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Focus</p>
              <p className="mt-1 text-lg font-semibold">Concept + Application</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Emphasis on understanding, practice and real-world relevance.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Batch Size</p>
              <p className="mt-1 text-lg font-semibold">Intentionally Limited</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Smaller batches for individual attention and mentoring.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Location</p>
              <p className="mt-1 text-lg font-semibold">Ahmedabad</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Conveniently located for students across the city.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-start">
          <article className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Our philosophy
            </h2>
            <p>
              We believe that every student carries unique potential. Our role as educators is
              to provide the right blend of structure, discipline, encouragement and
              opportunity so that this potential can be fully realized.
            </p>
            <p>
              The academy maintains a balance between board exam preparation and conceptual
              depth. Regular assessments, detailed feedback and doubt-solving sessions ensure
              no student is left behind.
            </p>
            <p>
              Beyond academics, we emphasize values such as integrity, persistence, humility
              and collaboration so that our students grow into responsible and confident
              individuals.
            </p>
          </article>

          <aside className="space-y-4 rounded-xl border border-border/60 bg-muted/40 p-5 text-xs text-muted-foreground">
            <h2 className="text-sm font-semibold text-foreground">Quick links</h2>
            <div className="space-y-2">
              <Link
                to="/admissions"
                className="block rounded-md border border-transparent bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition hover:border-primary/40 hover:bg-primary/15"
              >
                View admissions process
              </Link>
              <Link
                to="/classes"
                className="block rounded-md px-3 py-2 font-medium text-xs text-foreground/90 underline-offset-4 hover:text-primary hover:underline"
              >
                Explore available classes
              </Link>
              <Link
                to="/contact"
                className="block rounded-md px-3 py-2 font-medium text-xs text-foreground/90 underline-offset-4 hover:text-primary hover:underline"
              >
                Get in touch with the academy
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default About;
