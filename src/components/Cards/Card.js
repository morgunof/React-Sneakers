
import React from "react"
import ContentLoader from "react-content-loader"
import AppContext from "../../context";
import styles from './Card.module.scss'

function Card( {
   onClickFavorite,
   onClickPlus,
   title,
   id,
   imageUrl,
   price,
   favorited = false,
   Loading = false,
}) {
    const {isItemAdded} = React.useContext(AppContext)
    const [isFavorite, setIsFavorite]=React.useState(favorited)

    const onPlus = () => {
        onClickPlus( {id, title, imageUrl, price} )

    }

    const onFavorite = () => {
        onClickFavorite( {id, title, imageUrl, price} )
        setIsFavorite(!isFavorite)
    }



    return (
        <div className={styles.card}>
            {
                Loading ? <ContentLoader
                        speed={1.5}
                        width={150}
                        height={265}
                        viewBox="0 0 150 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="138" rx="5" ry="5" width="150" height="15" />
                        <rect x="0" y="166" rx="5" ry="5" width="100" height="15" />
                        <rect x="0" y="234" rx="5" ry="5" width="80" height="24" />
                        <rect x="0" y="36" rx="10" ry="10" width="150" height="91" />
                        <rect x="111" y="226" rx="10" ry="10" width="32" height="32" />
                    </ContentLoader>
                    :
                <>
                    <div className={styles.favorite} onClick={onFavorite}>
                    <img src={isFavorite ?"/img/heart_liked.svg" : "/img/heart_unliked.svg"} alt="Unliked"/>
                </div>
                    <img width="100%" height={130} src={imageUrl} alt=""/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                    </div>
                        <img className={styles.plus}
                        onClick={onPlus}
                        src={isItemAdded(id)? "/img/checked_btn.svg" : "/img/btn-plus.svg"}
                        alt="Plus"
                         />
                    </div>
                </>
             }
        </div>
    )
}

export default Card;