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
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChalengeProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
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

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentXp,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
