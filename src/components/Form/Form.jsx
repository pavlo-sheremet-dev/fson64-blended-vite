import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiMailSend } from "react-icons/bi";
import styles from "./Form.module.css";
import { usePostCommentMutation } from "../../redux/commentApi";

export const Form = () => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [postComment, { isSuccess }] = usePostCommentMutation();

  useEffect(() => {
    if (!isSuccess) return;
    toast("Yeah!!!");
  }, [isSuccess]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setAuthor(value);
    if (name === "text") setContent(value);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await postComment({ author, content, thumbsUp: 0, thumbsDown: 0 });
    setAuthor("");
    setContent("");
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={author}
            onChange={onHandleChange}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea
            className={styles.input}
            name="text"
            rows="5"
            value={content}
            onChange={onHandleChange}
          ></textarea>
        </label>

        <button className={styles.formBtn}>
          <BiMailSend className={styles.icon} />
          Send
        </button>
      </form>
    </div>
  );
};
