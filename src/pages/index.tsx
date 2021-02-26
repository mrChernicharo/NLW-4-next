import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/Home.module.css';
import ChallengeBox from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps {
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

function Home({ level, currentXp, challengesCompleted }: HomeProps) {
  return (
    <ChallengesProvider
      level={level}
      currentXp={currentXp}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Move It</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // tudo que for passado aqui vai rodar antes da renderização dos componentes.
  // Isto é, roda dentro do servidor Node do Next, antes do render.
  // Daí essas props ficam disponíveis pra usar componentes

  // aqui extraímos os dados outrora gravados nos cookies
  const { level, currentXp, challengesCompleted } = ctx.req.cookies;

  // e passamos via props, pro componente Home consumir
  return {
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
