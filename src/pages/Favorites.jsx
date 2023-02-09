
import React from "react";
import Card from "../components/Cards/Card";

function Favorites({ items, onAddToFavorite }) {
    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {items
                    .map((item, index) => (
                        <Card
                            key={index}
                            favorited={true}
                            onClickFavorite={onAddToFavorite}
                            {...item}
                            // onClickPlus={(obj) => onAddToCart(obj)}
                            // onClickFavorite={(obj) => onAddToFavorite(obj)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Favorites