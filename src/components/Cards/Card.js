import styles from './Card.module.scss'
import React from "react"

function Card( {onClickFavorite, onClickPlus, title, id, imageUrl, price, favorited = false}) {
   const [isAdded, setIsAdded]=React.useState(false)
   const [isFavorite, setIsFavorite]=React.useState(favorited)

    const onPlus = () => {
        onClickPlus( {title, imageUrl, price} )
        setIsAdded(!isAdded)
    }

    const onFavorite = () => {
        onClickFavorite( {id, title, imageUrl, price} )
        setIsFavorite(!isFavorite)
    }



    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src={isFavorite ?"/img/heart_liked.svg" : "/img/heart_unliked.svg"} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt=""/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                    <img className={styles.plus}
                         onClick={onPlus}
                         src={isAdded? "/img/checked_btn.svg" : "/img/btn-plus.svg"}
                         alt="Plus"
                    />
            </div>
        </div>
    )
}

export default Card;