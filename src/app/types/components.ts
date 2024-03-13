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