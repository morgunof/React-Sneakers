import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="d-flex justify-between align-center">
            <Link to="/">
                <div className="headerLeft d-flex align-center">
                    <img wight={40} height={40} src="/img/logo.png" alt="Logotype"/>
                    <div className="headerInfo">
                        <h3 className="text-uppercase">React sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img wight={20} height={20} src="/img/cart.svg" alt="Cart"/>
                    <span>1205 руб.</span>
                </li>

                <li className="mr-20 cu-p">
                    <Link to="/favorites">
                        <img className="mr-30 cu-p" wight={20.87} height={18.95} src="/img/favorites.svg" alt="Favorites"/>
                    </Link>
                </li>

                <li>
                    <img wight={20} height={20} src="/img/user.svg" alt="User"/>
                </li>
            </ul>
        </header>
    )

}

export default Header;