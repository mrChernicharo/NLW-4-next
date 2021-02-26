import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
// tipagens para libs escritas em JS sem versões estão em
// https://github.com/DefinitelyTyped/DefinitelyTyped
// simplesmente instale com @types/<lib> -D

import challenges from '../challenges.json';
import LevelUpModal from '../components/LevelUpModal';

interface ChalengeProviderProps {
  children: ReactNode;
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

interface Challenge {
  type: string;
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

// desestruturar as props assim daria erro por duplicação de nomes:
// export function ChallengesProvider({ children, level, currentXp, challengesCompleted })
// a solução é usar o spread operator ...rest

export function ChallengesProvider({ children, ...rest }: ChalengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);

  const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
  const xpToNextLevel = Math.pow((level + 1) * 4, 2); //

  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentXp', String(currentXp));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentXp, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    console.log('new challenge!');
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🤠', {
        body: `Valendo ${challenge.amount}$ xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalXp = currentXp + amount;

    if (finalXp >= xpToNextLevel) {
      finalXp = finalXp - xpToNextLevel;
      levelUp();
    }

    setCurrentXp(finalXp);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        xpToNextLevel,
        currentXp,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
