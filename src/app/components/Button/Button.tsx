import React from 'react';

import {ButtonProps} from '@/app/types/components';
import styles from './Button.module.css';

function Button({ text, variant = null, classes, onClick }: ButtonProps) {
  const buttonClassName = !variant ? '' : variant === 'primary' ? styles['button--primary'] : styles['button--secondary'];

  return (
    <button className={`${styles.button} ${buttonClassName} ${classes}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;