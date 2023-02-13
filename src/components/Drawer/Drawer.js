import React from "react";
import axios from "axios";

import Info from "../info";
import {useCart} from "../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onCloseCart, onDelete, items = [], opened }) {
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const sale = (totalPrice * 0.05)
    const totalPriceWithSale = (totalPrice - (totalPrice * 0.05))

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://63dda00a367aa5a7a4121fda.mockapi.io/orers', {
                items : cartItems
            })
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete('https://63dc383ab8e69785e493dd3d.mockapi.io/cart/' + item.id)
                await delay(1000)
            }
           } catch (error) {
            alert("Нам не удалось создать заказ(")
            console.log(error)
        }
        setIsLoading(false)
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
            <h2 className="d-flex justify-between mb-30">
                Корзина <img onClick={onCloseCart} className="removeBtn cu-p" src="/img/btn_remove.svg" alt="Close"/>
            </h2>

            {items.length > 0 ?
                <div className="d-flex flex-column flex">
                    <div className="items flex">
                        {items.map(obj => (
                            <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                <div
                                    style={{backgroundImage: `url(${obj.imageUrl})`}}
                                    className="cartItemImg"></div>

                                <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img onClick={()=> onDelete(obj.id)}
                                     className="removeBtn"
                                     src="/img/btn_remove.svg"
                                     alt="Remove"/>
                            </div>
                        ))}
                    </div>
                    <div className="cartTotalBlock">
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPriceWithSale.toFixed(0)} руб.</b>
                            </li>
                            <li>
                                <span>Ваша скидка 5%:</span>
                                <div></div>
                                <b>{sale.toFixed(0)} руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                            Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/>
                        </button>
                    </div>
                </div>
                :
                <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                      description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                      image={isOrderComplete ? "/img/complete_order.svg" : "/img/empty_cart.svg"}
                />
            }
            </div>
        </div>
    )
}

export default Drawer;