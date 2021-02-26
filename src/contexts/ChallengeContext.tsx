import { createContext, useState } from 'react';

export const ChallengeContext = createContext({});

export function ChallengesProvider() {
  const [level, setLevel] = useState(1);

  function levelUp() {
    setLevel(level + 1);
  }

  return (
    <ChallengeContext.Provider value={{ level: 1, levelUp }}>
      {/* ................. */}
    </ChallengeContext.Provider>
  );
}
