import React, {useState} from "react";
import classNames from 'classnames';

import './rating-modal-window.css';

export function RatingModalWindow() {
    const [isReviewValue, setReviewValue] = useState('');
    const [isRatingModalWindow, toggleRatingModalWindow] = useState(false);
    const [checkedValue, setCheckedValue] = useState(null);

    const onToggleModalWindow = () => {
        toggleRatingModalWindow(!isRatingModalWindow);
        document.querySelector('body').style.overflow = isRatingModalWindow ? 'initial' : 'hidden';
    }

    const onSetCheckedInputValue = (e) => {
      setCheckedValue(e.target.value);
    }
    console.log(checkedValue);
    // let ratingActive, ratingValue;

    // const initRatings = () => {
    //     const initRating = (rating) => {
    //     }
    //
    //     for (let i = 0; i < ratings.length; i++) {
    //         const rating = ratings[i];
    //         initRating(rating);
    //     }
    //
    //
    //
    //     const initRatingVars = (rating) => {
    //         ratingActive = rating.querySelector('.rating__active')
    //         ratingActive = rating.querySelector('.rating__value')
    //     }
    //
    //     const setRatingActiveWidth = (inde) => {
    //
    //     }
    // }

    return (
        <>
            <button type="button"
                    className={classNames("rating__background-content", {visible: isRatingModalWindow})}
                    aria-label="content" onClick={() => {
                onToggleModalWindow();
            }}

            />
            <div className="rating-modal-window">
                <form className="rating-modal-window-form">
                    <h4 className="rating-modal-window-form__title">Оценить книгу</h4>
                    <p className="rating-modal-window-form__subtitle">Ваша оценка</p>
                    <div className="rating-modal-window-form__rating">
                        <div className="rating__body">
                        <div className="rating__active"/>
                        <div className="rating__items">
                            <input type="radio" value="1" name="rating" checked={checkedValue === '1'} onChange={onSetCheckedInputValue} className="rating__item"/>
                            <input type="radio" value="2" name="rating" checked={checkedValue === '2'} onChange={onSetCheckedInputValue} className="rating__item"/>
                            <input type="radio" value="3" name="rating" checked={checkedValue === '3'} onChange={onSetCheckedInputValue} className="rating__item"/>
                            <input type="radio" value="4" name="rating" checked={checkedValue === '4'} onChange={onSetCheckedInputValue} className="rating__item"/>
                            <input type="radio" value="5" name="rating" checked={checkedValue === '5'} onChange={onSetCheckedInputValue} className="rating__item"/>
                        </div>
                    </div>
                    </div>
                    <textarea name="" id="" cols="30" rows="10" value={isReviewValue}
                              onChange={(e) => setReviewValue(e.target.value)}
                              placeholder="Оставить отзыв"/>
                    <button aria-label="btn" type="submit" className="btn rating-modal-window__btn"/>
                </form>
            </div>
        </>
    )
}
