'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const SceneOpening = dynamic(() => import('@/components/SceneOpening'), { ssr: false });
const SceneFirstMet = dynamic(() => import('@/components/SceneFirstMet'), { ssr: false });
const SceneHeartMoment = dynamic(() => import('@/components/SceneHeartMoment'), { ssr: false });
const SceneLibrary = dynamic(() => import('@/components/SceneLibrary'), { ssr: false });
const SceneGrowing = dynamic(() => import('@/components/SceneGrowing'), { ssr: false });
const SceneMemoryMatch = dynamic(() => import('@/components/SceneMemoryMatch'), { ssr: false });
const SceneFinal = dynamic(() => import('@/components/SceneFinal'), { ssr: false });
const SceneEnd = dynamic(() => import('@/components/SceneEnd'), { ssr: false });

enum Scene {
  OPENING = 0,
  FIRST_MET = 1,
  HEART_MOMENT = 2,
  LIBRARY = 3,
  GROWING = 4,
  MEMORY_MATCH = 5,
  FINAL_REVEAL = 6,
  END_SCREEN = 7
}

export default function Home() {
  const [currentScene, setCurrentScene] = useState<Scene>(Scene.OPENING);

  const nextScene = () => setCurrentScene(prev => prev + 1);
  const restart = () => setCurrentScene(Scene.OPENING);

  const renderScene = () => {
    switch (currentScene) {
      case Scene.OPENING:
        return <SceneOpening onComplete={nextScene} />;
      case Scene.FIRST_MET:
        return <SceneFirstMet onComplete={nextScene} />;
      case Scene.HEART_MOMENT:
        return <SceneHeartMoment onComplete={nextScene} />;
      case Scene.LIBRARY:
        return <SceneLibrary onComplete={nextScene} />;
      case Scene.GROWING:
        return <SceneGrowing onComplete={nextScene} />;
      case Scene.MEMORY_MATCH:
        return <SceneMemoryMatch onComplete={nextScene} />;
      case Scene.FINAL_REVEAL:
        return <SceneFinal onComplete={nextScene} />;
      case Scene.END_SCREEN:
        return <SceneEnd onRestart={restart} />;
      default:
        return <div>Error: Unknown Scene</div>;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[80vh] flex flex-col items-center justify-center relative">
      <AnimatePresence mode="wait">
        {renderScene()}
      </AnimatePresence>
    </div>
  );
}
