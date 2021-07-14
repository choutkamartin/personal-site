import styles from "../styles/ProgressBar.module.css";

export const ProgressBar = ({ name, value }) => {
  return (
    <>
      <h4>{name}</h4>
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          role="progressbar"
          style={{ width: `${value}%` }}
          aria-valuenow={`${value}`}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </>
  );
};
