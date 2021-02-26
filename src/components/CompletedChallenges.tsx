import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompletedChallenges.module.css';
const CompletedChallenges = () => {
  const { challengesCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.container}>
      <span>Desafios Completados</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};

export default CompletedChallenges;
