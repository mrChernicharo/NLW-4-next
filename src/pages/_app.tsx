import '../styles/globals.css';

import { ChallengeContext } from '../contexts/ChallengeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengeContext.Provider value={{ level: 1 }}>
      <Component {...pageProps} />
    </ChallengeContext.Provider>
  );
}

export default MyApp;
