import { useState } from 'react';
import styles from '../styles/components/ChallengeBox.module.css';
export default function ChallengeBox() {
  const [hasActiveChallenge, sethasActiveChallenge] = useState(true);

  return (
    <div className={styles.container}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>

          <main>
            <img src="icons/body.svg" alt="" />
            <strong>Novo desafio</strong>
            <p>Levante e caminhe</p>
          </main>

          <footer>
            <button type="button" className={styles.challengeFailedBtn}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSuccededBtn}>
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
