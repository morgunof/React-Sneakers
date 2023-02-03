import styles from './Card.module.scss'
import React from "react"

function Card( {onClickFavorite, onClickPlus, title, imageUrl, price}) {
   const [isAdded, setIsAdded] = React.useState(false)

    const onPlus = () => {
        onClickPlus( {title, imageUrl, price} )
        setIsAdded(!isAdded)
    }



    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src="/img/heart_unliked.svg" alt="Unliked"/>
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