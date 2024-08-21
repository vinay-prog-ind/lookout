import styles from "./Message.module.css";

function Message({ message, emoji }) {
  return (
    <p className={styles.message}>
      <span role="img">{emoji}</span> {message}
    </p>
  );
}

export default Message;
