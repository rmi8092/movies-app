import Modal from 'react-modal';
import { useState } from 'react';

import { ReviewProps } from "@/app/types/components";
import { formatDate } from "@/app/utils/common";
import TruncatedText from "@/app/components/TruncatedText/TruncatedText";
import { REVIEW } from "@/app/constants";
import styles from "./MovieReview.module.css";

function MovieReview({ author, updated_at, content }: ReviewProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={styles.review}>
        <div className={styles['review__header']}>
          <span className={styles['review__author']}>{author}</span>
          <span className={styles['review__date']}>{formatDate(updated_at)}</span>
        </div>
        <TruncatedText text={content} maxLength={200} setIsOpen={setIsOpen} />
      </div>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div className={styles['review__modal']}>
          <h2 className={styles['review__header']}>{REVIEW}</h2>
          <div className={styles['review__author-date']}>
            <div>
              <span className={styles['review__author-icon']}></span><span>{author}</span>
            </div>
            <div>
              <span className={styles['review__date-icon']}></span><span>{formatDate(updated_at)}</span>
            </div>
          </div>
          <p className={styles['review__modal-content']}>
            "{content}"
          </p>
          <span className='modal-close' onClick={closeModal}></span>
        </div>
      </Modal>
    </>
  );
}

export default MovieReview;
