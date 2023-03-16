import React from 'react';
import { AppContext } from '../../App';

import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header(props) {
	const state = React.useContext(AppContext);
	
	const totalPrice = state.cartItems.reduce((sum, obj) => sum + obj.price, 0);

	return (
		<header className={styles.header}>
			<div className={styles.header__body}>
				<div>
					<div className={styles.header__info}>
						<Link to={'/'}>
							<img width={40} height={40} src="/img/logo.png" alt="" />
							<div>
								<h3 className={styles.header__title}>REACT SNEAKERS</h3>
								<p className={styles.header__text}>Магазин лучших кроссовок</p>
							</div>
						</Link>
					</div>
				</div>
				<div>
					<ul className={styles.header__list}>
						<li onClick={props.onClickCart}>
							<img width={18} height={18} src="/img/cart.svg" alt="" />
							<span className={styles.header__price}>{totalPrice} руб.</span>
						</li>
						<li>
							<Link to={'/favorite'}><img width={18} height={18} src="/img/favorite.svg" alt="" /></Link>
						</li>
						<li>
							<Link to={'/orders'}><img width={18} height={18} src="/img/user.svg" alt="" /></Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;