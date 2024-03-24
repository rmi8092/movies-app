import React from 'react';

export interface ButtonProps {
  text?: string;
  variant?: 'primary' | 'secondary' | null;
  classes?: string;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface MovieTrailerProps {
  isOpen: boolean;
  onClose: () => void;
  videoSite: string;
  videoKey: string;
  setIsPopupOpen: (boolean: boolean) => void;
}

export interface TruncatedTextProps {
  text: string;
  maxLength: number;
  setIsOpen: (boolean: boolean) => void;
}

export interface ReviewProps {
  author: string;
  updated_at: string;
  content: string;
}