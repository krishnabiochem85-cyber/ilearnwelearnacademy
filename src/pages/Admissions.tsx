import { useEffect } from "react";

const Admissions = () => {
  useEffect(() => {
    document.title = "Admissions | Akanksha Academy";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/50 bg-gradient-to-b from-background via-background to-background/80">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
            Admissions
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            A clear, structured path to join Akanksha Academy.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            We keep our admissions process transparent and student-focused, with limited batch
            sizes to ensure individual attention.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:grid md:grid-cols-3 md:gap-10 md:py-16">
        <article className="space-y-6 md:col-span-2">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            How admissions work
          </h2>
          <ol className="space-y-4 text-sm text-muted-foreground md:text-[0.95rem]">
            <li>
              <span className="font-semibold text-foreground">1. Enquiry &amp; counselling:</span> Reach out to us via phone or the
              contact form. We understand the student&apos;s background, future goals and preferred
              stream.
            </li>
            <li>
              <span className="font-semibold text-foreground">2. Diagnostic assessment:</span> A short written test and/or
              interaction helps us gauge the current level and recommend suitable batches.
            </li>
            <li>
              <span className="font-semibold text-foreground">3. Stream &amp; subject planning:</span> We guide students on choosing
              subjects that align with their aspirations (engineering, medicine, CA, design,
              civil services etc.).
            </li>
            <li>
              <span className="font-semibold text-foreground">4. Registration &amp; documentation:</span> Once the batch is finalized,
              parents complete the registration form and submit required documents.
            </li>
            <li>
              <span className="font-semibold text-foreground">5. Orientation:</span> New students attend an orientation to
              understand our systems, schedules, discipline policy and exam calendar.
            </li>
          </ol>
        </article>

        <aside className="mt-10 space-y-5 rounded-xl border border-border/60 bg-muted/40 p-5 text-xs text-muted-foreground md:mt-0">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Eligibility</h2>
            <p className="mt-2">
              Open to students entering classes 11 and 12 or equivalent, from any recognized
              board.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Documents</h2>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Previous class mark sheet / progress report</li>
              <li>School ID or government-issued ID</li>
              <li>Two recent passport-size photographs</li>
              <li>Parent/guardian contact details</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Key dates</h2>
            <p className="mt-2">
              Admissions typically open in March and continue till batches are filled.
              Mid-year admissions are considered on a case-by-case basis.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Admissions;
