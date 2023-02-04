import Card from './components/Cards/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'
import React from "react"
import axios from "axios";


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
    }, [])

    const onAddToCart = (obj) => {
        axios.post('https://63dc383ab8e69785e493dd3d.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, obj])
    }

    const onDeleteItemToCart = (id) => {
        axios.delete(`https://63dc383ab8e69785e493dd3d.mockapi.io/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onAddToFavorite = (obj) => {
        axios.post('https://63dda00a367aa5a7a4121fda.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, obj])
    }


    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }



  return (
    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onCloseCart={() => setCartOpened(false)} onDelete={onDeleteItemToCart} />}
      <Header onClickCart={() => setCartOpened(true)} />

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
            {items
                .filter((item) => item.title.toLowerCase().includes(searchValue))
                .map((item, index) => (
                <Card
                    key={index}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onClickPlus={(obj) => onAddToCart(obj)}
                    onClickFavorite={(obj) => onAddToFavorite(obj)}
                />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
