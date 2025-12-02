export default function WelcomeMessage() {
  return (
    <article className="bg-background-light shadow-card flex max-w-md flex-col rounded-md">
      <section className="bg-background-lighter/60 py-2 text-center">
        <h3 className="text-foreground-strong text-3xl font-black">HELLO</h3>
        <p>and welcome</p>
      </section>
      <section className="p-4">
        <p>
          I like solving problems by building software. I primarily work on web
          apps. Please feel free to look through some of my projects.
        </p>
        <br />
        <p>Check out the contact page if you&apos;d like to get in touch.</p>
      </section>
    </article>
  );
}
