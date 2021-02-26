import { createContext, ReactNode, useState } from 'react';

interface ChalengeProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  level: number;
  currentXp: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChalengeProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    console.log('new challenge!');
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentXp,
        challengesCompleted,
        levelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
