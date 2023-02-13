import React from "react";
import Card from "../components/Cards/Card";
import axios from "axios";
import AppContext from "../context";

function Orders() {
    const {onAddToFavorite, onAddToCart} = React.useContext(AppContext)
    const [orders, setOrders]=React.useState([])
    const [isLoading, setIsLoading]=React.useState(true)

    React.useEffect(() => {
        async function fetchDataOrders() {
            try {
                const {data} = await axios.get('https://63dda00a367aa5a7a4121fda.mockapi.io/orers')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                alert('Не удалось получить список заказов(')
                console.log(error)
            }
        }
        fetchDataOrders()
    }, [])
    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                        <Card
                            key={index}
                            Loading={isLoading}
                            {...item}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Orders