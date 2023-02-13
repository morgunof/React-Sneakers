import Card from "../components/Cards/Card";
import React from "react";

function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading,
    })

    {
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        )

        return(isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onClickPlus={(obj) => onAddToCart(obj)}
                onClickFavorite={(obj) => onAddToFavorite(obj)}
                Loading={isLoading}
                {...item}
            />
            )
        )
    }

    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    {searchValue &&
                        <img
                            onClick={() => setSearchValue('')}
                            className="clear removeBtn"
                            src="/img/btn_remove.svg"
                            alt="Clear"/>}
                    <img src="/img/search.svg" alt="Search"/>
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home