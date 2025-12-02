export default function WelcomeMessage() {
  return (
    <article className="flex flex-col bg-background-light rounded-md max-w-md shadow-card">
      <section className="py-2 bg-background-lighter/60 text-center">
        <h3 className="text-3xl font-black text-foreground-strong">HELLO</h3>
        <p>and welcome</p>
      </section>
      <section className="p-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          voluptatibus ullam veritatis, officia quaerat, hic porro beatae vel
          molestias quis minima a dolore. Tenetur quaerat exercitationem odit
          repudiandae quam eos!
        </p>
      </section>
    </article>
  );
}
