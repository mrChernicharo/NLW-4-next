import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/Home.module.css';
import ChallengeBox from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
function Home(props) {
  console.log(props);
  return (
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
      level,
      currentXp,
      challengesCompleted,
    },
  };
};
