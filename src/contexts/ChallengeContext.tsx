import { createContext, ReactNode, useState } from 'react';
import challenges from '../challenges.json';

interface ChalengeProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye';
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
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChalengeProviderProps) {
  const [level, setLevel] = useState(1);

  const [currentXp, setCurrentXp] = useState(0);
  const xpToNextLevel = Math.pow((level + 1) * 4, 2); //

  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    console.log('new challenge!');
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
