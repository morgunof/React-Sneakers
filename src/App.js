//import Card from './components/Cards/Card'
import Header from "./components/Header"
import Drawer from "./components/Drawer"
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import React from "react"
import {Routes, Route, Link,} from "react-router-dom";
import axios from "axios"




function App() {

    const [items, setItems]=React.useState([])
    const [cartItems, setCartItems]=React.useState([])
    const [favorites, setFavorites]=React.useState([])
    const [searchValue, setSearchValue]=React.useState('')
    const [cartOpened, setCartOpened]=React.useState(false)

    React.useEffect(() => {
        axios.get('https://63dc383ab8e69785e493dd3d.mockapi.io/items').then((res) => {
            setItems(res.data)
        })
        axios.get('https://63dc383ab8e69785e493dd3d.mockapi.io/cart').then((res) => {
            setCartItems(res.data)
        })
        axios.get('https://63dda00a367aa5a7a4121fda.mockapi.io/favorites').then((res) => {
            setFavorites(res.data)
        })
    }, [])

    const onAddToCart = (obj) => {
        axios.post('https://63dc383ab8e69785e493dd3d.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, obj])
    }

    const onDeleteItemToCart = (id) => {
        axios.delete(`https://63dc383ab8e69785e493dd3d.mockapi.io/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://63dda00a367aa5a7a4121fda.mockapi.io/favorites/${obj.id}`)
                //setFavorites((prev) => prev.filter(item => item.id !== obj.id))
            } else {
                const { data } = await axios.post('https://63dda00a367aa5a7a4121fda.mockapi.io/favorites', obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (error) {
            alert('Упс... что то не работает, попробуйте ещё раз')
        }
    }


    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

  return(

    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onCloseCart={() => setCartOpened(false)} onDelete={onDeleteItemToCart} />}
      <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
            <Route path="/" element={
                <Home
                    items={items}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavorite={onAddToFavorite}
                    onAddToCart={onAddToCart}

                />}
            />
        </Routes>

        <Routes>
            <Route path="/favorites" element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>}
            />
        </Routes>

    </div>
  );
}

export default App;
