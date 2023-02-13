import React from "react"
import axios from "axios"
import AppContext from "./context";

import Header from "./components/Header"
import Drawer from "./components/Drawer/Drawer"
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import {Routes, Route} from "react-router-dom";
import Orders from "./pages/Orders";

function App() {
    const [items, setItems]=React.useState([])
    const [cartItems, setCartItems]=React.useState([])
    const [favorites, setFavorites]=React.useState([])
    const [searchValue, setSearchValue]=React.useState('')
    const [cartOpened, setCartOpened]=React.useState(false)
    const [isLoading, setIsLoading]=React.useState(true)

    React.useEffect(() => {
        async function fetchData () {
            try {
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://63dc383ab8e69785e493dd3d.mockapi.io/cart'),
                    axios.get('https://63dda00a367aa5a7a4121fda.mockapi.io/favorites'),
                    axios.get('https://63dc383ab8e69785e493dd3d.mockapi.io/items'),
                ])

                setIsLoading(false)
                setCartItems(cartResponse.data)
                setFavorites(favoritesResponse.data)
                setItems(itemsResponse.data)
            } catch (error) {
                alert('Ошибка при запросе данных(')
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const onAddToCart = async (obj) => {
        try{
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
            if (findItem) {
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://63dc383ab8e69785e493dd3d.mockapi.io/cart/${findItem.id}`)
            } else {
                setCartItems((prev) => [...prev, obj])
                const {data} = await axios.post('https://63dc383ab8e69785e493dd3d.mockapi.io/cart', obj)
                setCartItems((prev) => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            alert('Ошибка при добавлении товара в корзину(')
            console.log(error)
        }
    }

    const onDeleteItemToCart = async (id) => {
        try {
            await axios.delete(`https://63dc383ab8e69785e493dd3d.mockapi.io/cart/${id}`)
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
        } catch (error) {
            alert('Ошибка при удалении товара из корзины(')
            console.log(error)
        }
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                await axios.delete(`https://63dda00a367aa5a7a4121fda.mockapi.io/favorites/${obj.id}`)
                //setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                const { data } = await axios.post('https://63dda00a367aa5a7a4121fda.mockapi.io/favorites', obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (error) {
            alert('Упс... что то не работает, попробуйте ещё раз')
            console.log(error)
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }

  return(
    <AppContext.Provider
        value={{
            items,
            cartItems,
            favorites,
            isItemAdded,
            onAddToFavorite,
            setCartOpened,
            setCartItems,
            onAddToCart
        }}>

        <div className="wrapper clear">
            <Drawer items={cartItems}
                    onCloseCart={() => setCartOpened(false)}
                    onDelete={onDeleteItemToCart}
                    opened={cartOpened}
            />

            <Header onClickCart={() => setCartOpened(true)} />

            <Routes>
                <Route path="/" element={
                    <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}

                    />}
                />
            </Routes>
            <Routes>
                <Route
                    path="/favorites" element={<Favorites />}
                />
            </Routes>

            <Routes>
                <Route
                    path="/orders" element={<Orders />}
                />
            </Routes>
        </div>
    </AppContext.Provider>
  );
}

export default App;
