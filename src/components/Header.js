function Header() {
    return (
        <header className="d-flex justify-between align-center">
            <div className="headerLeft d-flex align-center">
                <img wight={40} height={40} src="/img/logo.png"/>
                <div className="headerInfo">
                    <h3 className="text-uppercase">React sneakers</h3>
                    <p className="opacity-5">Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="headerRight d-flex">
                <li className="mr-30">
                    <img wight={18} height={17.18} src="/img/cart.svg"/>
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img wight={20} height={20} src="/img/user.svg"/>
                </li>
            </ul>
        </header>
    )

}

export default Header;