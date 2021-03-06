import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

const Profile = () => {
  const { level } = useContext(ChallengeContext);
  return (
    <div className={styles.container}>
      <img
        src="https://avatars.githubusercontent.com/u/52944886?s=400&u=848be9ef8d675be4453d7254cdeae48bfcfe848a&v=4"
        alt="Avatar usuário"
      />
      <div>
        <strong>Felipe Chernicharo</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          level {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
