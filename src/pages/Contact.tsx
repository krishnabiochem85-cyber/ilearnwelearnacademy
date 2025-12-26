import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Akanksha Academy";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/50 bg-gradient-to-b from-background via-background to-background/80">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
            Contact
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            We&apos;d love to hear from you.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Reach out for admissions, counselling, feedback or collaborations. Parents and
            students are always welcome to visit during office hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:grid md:grid-cols-[3fr,2fr] md:gap-10 md:py-16">
        <div className="space-y-6 text-sm text-muted-foreground md:text-[0.95rem]">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Send us a message
          </h2>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1 text-xs">
                <label htmlFor="name" className="font-medium text-foreground">
                  Student / parent name
                </label>
                <input
                  id="name"
                  type="text"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-1 text-xs">
                <label htmlFor="phone" className="font-medium text-foreground">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                  placeholder="Your contact number"
                />
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <label htmlFor="email" className="font-medium text-foreground">
                Email (optional)
              </label>
              <input
                id="email"
                type="email"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label htmlFor="message" className="font-medium text-foreground">
                Query / message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                placeholder="Tell us how we can help."
              />
            </div>
            <p className="text-[0.7rem] text-muted-foreground">
              This is a preview form for the website. In a later step, we can connect it to the
              backend so that submissions are stored and emailed to the academy.
            </p>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-md border border-transparent bg-primary px-4 text-xs font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Submit enquiry
            </button>
          </form>
        </div>

        <aside className="mt-10 space-y-5 rounded-xl border border-border/60 bg-muted/40 p-5 text-xs text-muted-foreground md:mt-0">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Visit the academy</h2>
            <p className="mt-2">
              Akanksha Academy,
              <br />
              [Street address placeholder]
              <br />
              Ahmedabad, Gujarat
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Contact details</h2>
            <p className="mt-2">
              Phone: +91-XXXXXXXXXX
              <br />
              Email: info@akankshaacademy.example
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Office hours</h2>
            <p className="mt-2">
              Monday to Saturday: 10:00 am – 7:00 pm
              <br />
              Sunday: By appointment only
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Contact;
