import React from 'react';
import axios from 'axios';
import { AppContext } from '../../App';

import styles from './Drawer.module.scss';

import CartItem from '../CartItem';
import CartInfo from '../CartInfo';

function Drawer(props) {
	const { cartItems, setCartItems } = React.useContext(AppContext);
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);
	const [orderId, setOrderId] = React.useState(0);
	const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

	const onClickOrder = async () => {
		try {
			setOrderId(await (await axios.post('http://localhost:3001/orderItems', { cartItems })).data.id);
			setIsOrderComplete(true);
			cartItems.map(e => {
				axios.delete(`http://localhost:3001/cartItems/${e.id}`, e);
			})
			setCartItems([]);
		} catch (error) {
		}
	};

	const body = document.querySelector('body');
	if (props.isCartOpened) {
		window.scrollTo(0, 0);
		body.classList.add('body_lock');
	}
	else body.classList.remove('body_lock');

	return (
		<div className={`${styles.drawer} ${props.isCartOpened && styles._active}`}>
			<div className={`${styles.drawer__body} ${props.isCartOpened && styles._active}`}>
				<h2>Корзина <img className={styles.drawer__btn} src="./img/btn-remove.svg" alt=""
					onClick={props.onClose} /></h2>

				{props.items.length > 0 ?
					<div className={styles.cart_items}>
						{
							props.items.map((obj) => (
								<CartItem
									key={obj.id}
									id={obj.id}
									title={obj.label}
									price={obj.price}
									imageUrl={obj.imageUrl}
									onRemoveItem={props.onRemoveItem} />
							))
						}
					</div>
					: <CartInfo
						title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
						imageUrl={isOrderComplete ? './img/order-complete.png' : './img/cart-empty.png'}
						onClose={props.onClose} />
				}

				{props.items.length > 0 &&
					<div>
						<ul>
							<li>
								<span>Итого: </span>
								<div></div>
								<b>{totalPrice} руб.</b>
							</li>
							<li>
								<span>Налог 5%: </span>
								<div></div>
								<b>{Math.round(totalPrice / 100 * 5)} руб.</b>
							</li>
						</ul>
						<button className="btn" onClick={onClickOrder}>
							<span>Оформить заказ</span>
							<img src="./img/btn-arrow.svg" alt="" />
						</button>
					</div>
				}
			</div>
		</div>
	);
}

export default Drawer;