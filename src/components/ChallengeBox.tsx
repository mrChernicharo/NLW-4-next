import { useContext, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengeContext
  );

  return (
    <div className={styles.container}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedBtn}
              onClick={resetChallenge}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSuccededBtn}
              onClick={completeChallenge}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="level up" />
            Avance de nível completando os desafios
          </p>
        </div>
      )}
    </div>
  );
}
