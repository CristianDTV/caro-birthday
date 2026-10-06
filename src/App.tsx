import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { siteConfig } from "./data/site";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useActiveSection } from "./hooks/useActiveSection";

import { LoadingScreen } from "./components/LoadingScreen";
import { ExperienceProgress } from "./components/ExperienceProgress";
import { FlowerDecoration } from "./components/FlowerDecoration";
import { FloatingMusicButton } from "./components/FloatingMusicButton";

import { Intro } from "./modules/Intro";
import { Welcome } from "./modules/Welcome";
import { Story } from "./modules/Story";
import { Memories } from "./modules/Memories";
import { SpecialMoments } from "./modules/SpecialMoments";
import { LoveNotes } from "./modules/LoveNotes";
import { DatePlanner } from "./modules/DatePlanner";
import { KeepBeingMyLove } from "./modules/KeepBeingMyLove";
import { Distance } from "./modules/Distance";
import { LoveLetter } from "./modules/LoveLetter";
import { OpenWhen } from "./modules/OpenWhen";
import { FinalReveal } from "./modules/FinalReveal";
import { LastSurprise } from "./modules/LastSurprise";

// Orden narrativo: pasado (historia, álbum, hitos) → presente
// (distancia) → el momento más íntimo (la carta) → un regalo para
// el futuro (Open When) → cierre.
const SECTION_IDS = [
  "welcome",
  "story",
  "memories",
  "special-moments",
  "love-notes",
  "date-planner",
  "keep-being-my-love",
  "distance",
  "love-letter",
  "open-when",
  "final-reveal",
  "last-surprise",
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [experienceStarted, setExperienceStarted] = useLocalStorage("experienceStarted", false);
  const player = useAudioPlayer(siteConfig.music.enabled ? siteConfig.music.src : "");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const activeIndex = useActiveSection(SECTION_IDS);

  const handleEnter = () => {
    setExperienceStarted(true);
    if (siteConfig.music.enabled) player.play();
    const target = document.getElementById("welcome");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && <LoadingScreen girlfriendName={siteConfig.girlfriendName} />}
      </AnimatePresence>

      <Intro onEnter={handleEnter} />

      <main>
        <Welcome />
        <Story />
        <Memories />
        <SpecialMoments />
        <LoveNotes />
        <DatePlanner />
        <KeepBeingMyLove />
        <Distance />
        <LoveLetter />
        <OpenWhen />
        <FinalReveal />
        <LastSurprise />
      </main>

      <footer className="w-full py-16 flex flex-col items-center justify-center bg-background text-center">
        <FlowerDecoration variant="field" className="w-full max-w-xs h-14 mb-6 opacity-80" />
        <p className="text-xs text-muted font-sans">
          hecho por {siteConfig.authorName}, para {siteConfig.girlfriendName}
        </p>
      </footer>

      {experienceStarted && <ExperienceProgress current={activeIndex} total={SECTION_IDS.length} />}

      {experienceStarted && siteConfig.music.enabled && (
        <FloatingMusicButton title={siteConfig.music.title} artist={siteConfig.music.artist} player={player} />
      )}
    </div>
  );
}
