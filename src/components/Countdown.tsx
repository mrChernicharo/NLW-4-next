import { useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

export default function Countdown() {
  // em Segundos
  const [time, setTime] = useState(25 * 60);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.container}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      <button type="button" className={styles.countdownBtn}>
        Iniciar um ciclo
      </button>
    </div>
  );
}
