import { createContext, useState } from 'react';

export const ChallengeContext = createContext({});

export function ChallengesProvider({ children }) {
  const [level, setLevel] = useState(1);

  function levelUp() {
    setLevel(level + 1);
  }

  return (
    <ChallengeContext.Provider value={{ level: 1, levelUp }}>
      {children}
    </ChallengeContext.Provider>
  );
}
