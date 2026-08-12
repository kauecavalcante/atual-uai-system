import { Hero } from "@/components/sections/hero";
import { Registration } from "@/components/sections/registration";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <main id="conteudo" className="flex-1">
      <Hero />
      <Services />
      <Registration />
    </main>
  );
}
