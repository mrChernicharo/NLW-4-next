import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../challenges.json';

interface ChalengeProviderProps {
  children: ReactNode;
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
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChalengeProviderProps) {
  const [level, setLevel] = useState(1);

  const [currentXp, setCurrentXp] = useState(0);
  const xpToNextLevel = Math.pow((level + 1) * 4, 2); //

  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
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
        vibrate: true,
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
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
