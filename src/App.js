import Card from './components/Cards/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'
import React from "react"

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false)

    React.useEffect(() => {
        fetch('https://63dc383ab8e69785e493dd3d.mockapi.io/items')
           .then((res) => {
             return res.json()
            })
           .then((json) => {
             setItems(json)
        })
    }, [])

    const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj])
    }

  return (
    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onCloseCart={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search"/>
          <input placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex flex-wrap">

            {items.map((item) => (
                <Card
                    title = {item.title}
                    price = {item.price}
                    imageUrl = {item.imageUrl}
                    onClickPlus = {(obj) => onAddToCart(obj)}
                    onClickFavorite = {(obj) => console.log('Добавили в закладки')}
                />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
