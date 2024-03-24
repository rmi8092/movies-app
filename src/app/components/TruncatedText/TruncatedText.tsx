import { TruncatedTextProps } from '@/app/types/components';
import styles from "./TruncatedText.module.css";
import { SHOW_MORE } from '@/app/constants';

function TruncatedText({ text, maxLength, setIsOpen }: TruncatedTextProps): JSX.Element {
  const truncatedText = `${text.slice(0, maxLength)}...`;

  const handleShowMore = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <p className={styles['review__content']}>
        {truncatedText}
        <span className={styles['review__show-more']} onClick={handleShowMore}>
          {SHOW_MORE}
        </span>
      </p>
    </div>
  );
};

export default TruncatedText;
