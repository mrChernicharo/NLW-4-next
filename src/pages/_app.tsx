import '../styles/globals.css';

import { ChallengesProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// é comum a gente ter que disponibilizar vários contextos
// isso é possível
// só se liga que as vezes um contexto depende de outro
// Aí o que provê as dependências deve envolver o dependente, assim:

// <ChallengesProvider>
//    <CountdownProvider>
//        <Component {...pageProps} />
//    </CountdownProvider>
// </ChallengesProvider>
