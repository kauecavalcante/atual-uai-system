import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <main id="conteudo" className="flex-1">
      <Hero />
      <Services />
    </main>
  );
}
