import styles from '../styles/components/Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.container}>
      <img
        src="https://avatars.githubusercontent.com/u/52944886?s=400&u=848be9ef8d675be4453d7254cdeae48bfcfe848a&v=4"
        alt="Avatar usuário"
      />
      <div>
        <strong>Felipe Chernicharo</strong>
        <p>level 1</p>
      </div>
    </div>
  );
};

export default Profile;
