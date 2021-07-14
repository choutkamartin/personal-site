import styles from "../../styles/Comment.module.css";
import { format } from "date-fns";
import { useSession } from "next-auth/client";
import Image from "next/image";

export const Comment = ({ comment, deleteComment }) => {
  const [session, loading] = useSession();

  let buttons = null;

  // If user is logged in
  if (session) {
    // If e-mail adress of the author is same as the in session
    if (comment.author.email === session.user.email) {
      buttons = (
        <img
          src="/icons/x-circle.svg"
          alt="Ikona X"
          onClick={() => deleteComment(comment._id)}
        />
      );
    }
  }

  return (
    <div className={styles.comment} key={comment._id}>
      <div className={styles.image}>
        <Image
          src={comment.author.image}
          className={styles.image}
          width={32}
          height={32}
          alt="Profilová fotka"
        />
      </div>
      <div>
        <h4 className={styles.user}>{comment.author.name}</h4>
        <small>{format(new Date(comment.date), "dd/MM/yyyy")}</small>
        <div className={styles.text}>{comment.text}</div>
      </div>
      <div className={styles.buttons}>{buttons}</div>
    </div>
  );
};
