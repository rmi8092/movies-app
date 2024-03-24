import Modal from 'react-modal';

import {MovieTrailerProps} from '@/app/types/components';
import { YOUTUBE, VIMEO, VIMEO_URL, YOUTUBE_URL } from '@/app/constants';
import styles from "./VideoPopup.module.css";

const VideoPopup: React.FC<MovieTrailerProps> = ({ isOpen, onClose, videoSite, videoKey, setIsPopupOpen }) => {
  const videoSrc = videoSite === YOUTUBE ? `${YOUTUBE_URL}${videoKey}?autoplay=1` : videoSite === VIMEO ? `${VIMEO_URL}${videoKey}?autoplay=1&muted=1` : '';
  
  function handleClose() {
    setIsPopupOpen(false)
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className={styles['trailer__modal']}>
        <iframe
          width="1120"
          height="630"
          src={videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <span className='modal-close' onClick={handleClose}></span>
      </div>
    </Modal>
  );
};

export default VideoPopup;
