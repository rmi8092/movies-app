import { useState } from 'react';

import { MovieReviewProps } from "@/app/types/movie";
import Button from "@/app/components/Button/Button";
import MovieReview from "@/app/components/MovieReview/MovieReview";
import styles from "./MovieReviews.module.css";
import { REVIEWS, SEE_ALL_REVIEWS } from "@/app/constants";
import { robotoCondensed } from './../../../../public/fonts/fonts';

function MovieReviews({ reviews }: MovieReviewProps) {
  const [numberOfReviews, setNumberOfReviews] = useState<number | undefined>(5);

  function handleShowReviews() {
    setNumberOfReviews(undefined)
  }
  
  return (
    <section aria-label='movie-reviews'>
      <h3 className={styles['reviews__subtitle']}>{REVIEWS}</h3>
      <div className={styles['reviews__wrapper']}>
        {reviews.slice(0, numberOfReviews).map((review, index) => (
          <MovieReview key={index} {...review} />
        ))}
      </div>
      <div className={styles['show-reviews']}>
        {numberOfReviews && (
          <Button
            classes={`${styles['show-reviews__button']} ${robotoCondensed.className} antialiased`}
            text={SEE_ALL_REVIEWS}
            variant="primary"
            onClick={handleShowReviews}
          />
        )}
      </div>
    </section>
  );
}

export default MovieReviews;
